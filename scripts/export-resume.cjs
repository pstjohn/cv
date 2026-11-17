// Export the same print layout used by visitors; never crop to force one page.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { PDFDocument, AFRelationship } = require('pdf-lib');
const resumeText = require('./resume-text.cjs');
const server = require('./serve-build.cjs')();
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/cv/?res`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => !document.querySelector('.citation-stats .fa-spin'));
    const text = await resumeText(page);
    const printed = await page.pdf({ format: 'Letter', preferCSSPageSize: true, printBackground: true, tagged: true });
    const document = await PDFDocument.load(printed);
    document.setTitle('Peter St. John - Resume');
    document.setAuthor('Peter St. John');
    document.setSubject('One-page resume; a linear UTF-8 text version is embedded as resume.txt. Contact via email.');
    await document.attach(Buffer.from(text, 'utf8'), 'resume.txt', {
      mimeType: 'text/plain',
      description: 'Linear, UTF-8 resume text in reading order. Contact via email.',
      afRelationship: AFRelationship.Alternative,
    });
    // Preserve browser structure tags and keep page dictionaries inspectable.
    const pdf = Buffer.from(await document.save({ useObjectStreams: false }));
    assert.deepEqual(errors, [], 'Resume must render without JavaScript errors');
    assert.equal((pdf.toString('latin1').match(/\/Type \/Page\b/g) || []).length, 1, 'Resume must fit one page; adjust the content or print styles');
    assert(/\/MediaBox\s*\[\s*0\s+0\s+612\s+792\s*\]/.test(pdf.toString('latin1')), 'Resume must be US Letter');
    for (const file of ['dist/resume.pdf', 'public/resume.pdf', 'output/pdf/peter-st-john-resume.pdf']) {
      const target = path.resolve(__dirname, '..', file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, pdf);
    }
    for (const file of ['dist/resume.txt', 'public/resume.txt', 'output/pdf/peter-st-john-resume.txt']) {
      fs.writeFileSync(path.resolve(__dirname, '..', file), text, 'utf8');
    }
    console.log('Exported one-page tagged Letter resume with embedded resume.txt and /cv/resume.txt');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
