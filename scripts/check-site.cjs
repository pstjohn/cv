// Smoke checks against the production build, including Chrome's actual PDF output.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { PDFDocument, PDFName, PDFDict, PDFArray, PDFRawStream, decodePDFRawStream } = require('pdf-lib');
const profile = require('../src/assets/profile.json');
const repos = require('../src/assets/github-repos.json');
const server = require('./serve-build.cjs')();
const pageCount = pdf => (pdf.toString('latin1').match(/\/Type \/Page\b/g) || []).length;
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/cv/`;
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
  try {
    for (const offline of [false, true]) {
      for (const width of [1200, 390]) {
        const page = await browser.newPage({ viewport: { width, height: 1000 } });
        const errors = [], githubRequests = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('request', request => { if (request.url().includes('api.github.com')) githubRequests.push(request.url()); });
        await page.route('https://**/*', route => offline ? route.abort() : route.fulfill({ json: {
          hIndex: 27, timesCited: 3106, numPublicationsInWosCc: 62,
          message: { 'is-referenced-by-count': 1 },
        } }));
        await page.goto(url + '?res');
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        const checkRepo = async (destination = 'resume') => {
          const visibleRepos = repos.filter(repo => !repo.outputs || repo.outputs.includes(destination));
          assert.equal(await page.locator('.github-component').count(), visibleRepos.length);
          for (const repo of visibleRepos) {
            const card = page.locator('.github-component').filter({ hasText: repo.name });
            assert.equal(await card.locator('.num-stars').textContent(), String(repo.stargazers_count));
            assert.equal(await card.locator('.num-forks').textContent(), String(repo.forks_count));
            assert.equal(await card.locator('a').first().getAttribute('href'), `https://github.com/${repo.name}`);
          }
        };
        await checkRepo();
        assert(await page.locator('#public-assets').isVisible(), 'Selected public work must be visible');
        const email = page.locator('a[href="mailto:inquiries@agents.pcstj.com"]');
        assert(await email.isVisible(), 'Contact email must be readable and clickable');
        assert.equal(await email.textContent(), 'inquiries@agents.pcstj.com');
        const guide = await page.request.get(url + 'llms.txt');
        assert(guide.ok(), 'Agent guide must be available without JavaScript');
        const guideText = await guide.text();
        assert(guideText.includes('mailto:inquiries@agents.pcstj.com'));
        assert(guideText.includes('https://www.pcstj.com/cv/resume.pdf'));
        assert(guideText.includes('https://www.pcstj.com/cv/resume.txt'));
        const plainResponse = await page.request.get(url + 'resume.txt');
        assert(plainResponse.ok(), 'Plain-text resume must be available without JavaScript');
        assert(plainResponse.headers()['content-type'].includes('text/plain'));
        const plain = await plainResponse.text();
        for (const role of [profile.nvidia.current, profile.nvidia.previous, ...profile.nrel.roles]) {
          for (const bullet of role.resumeBullets) assert(plain.includes(bullet), 'Text export must include every selected bullet');
        }
        assert(plain.includes('inquiries@agents.pcstj.com'));
        assert(plain.includes('PhD in Chemical Engineering | University of California Santa Barbara | 2010-2015'));
        assert(!plain.includes('tel:') && !/\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/.test(plain), 'Phone must stay out of machine-readable text');
        assert(plain.indexOf('SUMMARY') < plain.indexOf('EXPERIENCE'));
        assert(plain.indexOf('NVIDIA\n') < plain.indexOf('National Renewable Energy Lab\n'));
        const download = await page.request.get(url + 'resume.pdf');
        assert(download.ok(), 'Direct PDF download must be available');
        assert.equal(download.headers()['content-type'], 'application/pdf');
        const downloaded = await download.body();
        assert.equal(pageCount(downloaded), 1);
        const document = await PDFDocument.load(downloaded);
        assert(document.catalog.has(PDFName.of('StructTreeRoot')), 'PDF must preserve its structure tree');
        assert.equal(document.catalog.lookup(PDFName.of('MarkInfo'), PDFDict).get(PDFName.of('Marked')).toString(), 'true');
        const embedded = document.catalog.lookup(PDFName.of('Names'), PDFDict)
          .lookup(PDFName.of('EmbeddedFiles'), PDFDict).lookup(PDFName.of('Names'), PDFArray);
        assert.equal(embedded.lookup(0).decodeText(), 'resume.txt');
        const stream = embedded.lookup(1, PDFDict).lookup(PDFName.of('EF'), PDFDict).lookup(PDFName.of('F'), PDFRawStream);
        const attachment = Buffer.from(decodePDFRawStream(stream).decode()).toString('utf8');
        assert.equal(attachment, plain, 'Embedded text must exactly match the downloadable text');
        const pdf = await page.pdf({ format: 'Letter', preferCSSPageSize: true, printBackground: true });
        assert.equal(pageCount(pdf), 1, `Resume must be one page: width=${width}, offline=${offline}`);
        assert(pdf.toString('latin1').includes('/MediaBox [0 0 612 792]'), 'Resume must be US Letter');

        await page.getByRole('switch').click();
        await page.waitForTimeout(300);
        assert(await page.getByText('Publications', { exact: true }).isVisible());
        await checkRepo('cv');
        if (width === 1200) {
          const cv = await page.pdf({ format: 'Letter', printBackground: true });
          assert(pageCount(cv) > 1, 'Full CV must retain its multiple-page content');
        }
        await page.getByRole('switch').click();
        assert.equal(await page.getByText('Publications', { exact: true }).count(), 0);
        assert.deepEqual(errors, [], 'No unhandled JavaScript errors');
        assert.deepEqual(githubRequests, [], 'GitHub data must load without browser API requests');
        console.log(`PASS: ${width}px, ${offline ? 'offline' : 'available'} services, counts, email, agent guide, PDF download, toggle, one-page Letter PDF`);
        await page.close();
      }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
