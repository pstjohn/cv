const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const stage = require('./stage-versions.cjs');

test('versions retain assets, local links and exact PDF/text bytes across default updates', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-versions-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const build = path.join(root, 'build'), archive = path.join(root, 'archive'), output = path.join(root, 'pages');
  fs.mkdirSync(build);
  fs.writeFileSync(path.join(build, 'index.html'), '<script src="/cv/app.js"></script>');
  fs.writeFileSync(path.join(build, 'app.js'), 'download="/cv/resume.pdf";text="/cv/resume.txt"');
  fs.writeFileSync(path.join(build, 'llms.txt'), 'https://www.pcstj.com/cv/resume.pdf');
  fs.writeFileSync(path.join(build, 'resume.txt'), 'Contact https://www.pcstj.com/cv/');
  fs.writeFileSync(path.join(build, 'resume.pdf'), Buffer.from([0, 255, 1, 128]));
  const sha = 'a'.repeat(40);
  const run = defaultSha => stage({ defaultBuild: build, defaultSha, archive, output });
  run(sha);
  const frozen = path.join(output, 'versions', sha.slice(0, 12));
  const original = Object.fromEntries(fs.readdirSync(frozen).map(f => [f, fs.readFileSync(path.join(frozen, f))]));
  assert.match(original['index.html'].toString(), /\/cv\/versions\/aaaaaaaaaaaa\/app.js/);
  assert.match(original['app.js'].toString(), /\/cv\/versions\/aaaaaaaaaaaa\/resume.pdf/);
  assert.match(original['llms.txt'].toString(), /\/cv\/versions\/aaaaaaaaaaaa\/resume.pdf/);
  assert.deepEqual(original['resume.pdf'], fs.readFileSync(path.join(build, 'resume.pdf')));
  assert.deepEqual(original['resume.txt'], fs.readFileSync(path.join(build, 'resume.txt')));
  fs.writeFileSync(path.join(build, 'index.html'), 'new default');
  run(sha); // Rebuilding the same source cannot replace a published version.
  run('b'.repeat(40));
  assert.equal(fs.readFileSync(path.join(output, 'index.html'), 'utf8'), 'new default');
  for (const [file, bytes] of Object.entries(original)) assert.deepEqual(fs.readFileSync(path.join(frozen, file)), bytes);
  assert.equal(JSON.parse(fs.readFileSync(path.join(output, 'versions.json'))).length, 2);
  assert.throws(() => run('a'.repeat(12) + 'c'.repeat(28)), /collision/);
  assert.throws(() => run('../not-a-sha'), /full Git commit SHA/);
  const alternative = path.join(root, 'alternative');
  fs.cpSync(build, alternative, { recursive: true });
  fs.writeFileSync(path.join(alternative, 'index.html'), 'alternative branch');
  stage({ defaultBuild: build, defaultSha: 'b'.repeat(40), archive, output,
    snapshotBuild: alternative, snapshotSha: 'c'.repeat(40) });
  assert.equal(fs.readFileSync(path.join(output, 'index.html'), 'utf8'), 'new default');
  assert.equal(fs.readFileSync(path.join(output, 'versions', 'c'.repeat(12), 'index.html'), 'utf8'), 'alternative branch');
  assert.throws(() => stage({ defaultBuild: build, defaultSha: sha, archive, output: build }), /separate/);
});
