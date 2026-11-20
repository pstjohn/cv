const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { PDFDocument, PDFName, PDFDict, PDFArray, PDFRawStream, decodePDFRawStream } = require('pdf-lib');
const server = require('./serve-build.cjs')('.pages');
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
  try {
    for (const version of JSON.parse(fs.readFileSync('.pages/versions.json'))) {
      const page = await browser.newPage();
      const errors = [], localRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (response.url().startsWith(origin)) {
          assert(response.ok(), `Failed version asset: ${response.url()}`);
          localRequests.push(new URL(response.url()).pathname);
        }
      });
      await page.route('https://**/*', route => route.abort());
      await page.goto(origin + version.path + '?res');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      for (const resource of ['resume.pdf', 'resume.txt', 'llms.txt']) {
        const link = page.locator(`footer a[href="${version.path}${resource}"]`);
        assert.equal(await link.count(), 1, `Version must link to its own ${resource}`);
        assert((await page.request.get(origin + version.path + resource)).ok());
      }
      assert(localRequests.every(url => url.startsWith(version.path)), 'Snapshot must not load default-version assets');
      const guide = await (await page.request.get(origin + version.path + 'llms.txt')).text();
      assert(guide.includes(version.path + 'resume.pdf'));
      const plain = await (await page.request.get(origin + version.path + 'resume.txt')).text();
      const pdf = await PDFDocument.load(await (await page.request.get(origin + version.path + 'resume.pdf')).body());
      assert.equal(pdf.getPageCount(), 1);
      const embedded = pdf.catalog.lookup(PDFName.of('Names'), PDFDict)
        .lookup(PDFName.of('EmbeddedFiles'), PDFDict).lookup(PDFName.of('Names'), PDFArray);
      const stream = embedded.lookup(1, PDFDict).lookup(PDFName.of('EF'), PDFDict).lookup(PDFName.of('F'), PDFRawStream);
      assert.equal(Buffer.from(decodePDFRawStream(stream).decode()).toString('utf8'), plain);
      assert.deepEqual(errors, []);
      await page.getByRole('switch').click();
      assert(await page.getByText('Publications', { exact: true }).isVisible());
      await page.close();
      console.log(`PASS: ${version.path} assets, local downloads, embedded text, one-page PDF and CV toggle`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
