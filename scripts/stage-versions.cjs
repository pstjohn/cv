// Assemble Pages from the default build plus immutable, previously built snapshots.
// This command only writes local files. The deployment workflow persists the archive.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function snapshot(build, archive, sha) {
  assert(/^[a-f0-9]{40}$/.test(sha), 'Expected a full Git commit SHA');
  const key = sha.slice(0, 12);
  const destination = path.join(archive, 'versions', key);
  if (fs.existsSync(destination)) {
    assert.equal(JSON.parse(fs.readFileSync(path.join(destination, 'snapshot.json'))).sha, sha,
      'Snapshot prefix collision; refusing to overwrite');
    return; // First successful publication wins, including its PDF and statistics.
  }
  for (const file of ['index.html', 'resume.pdf', 'resume.txt', 'llms.txt']) {
    assert(fs.statSync(path.join(build, file)).isFile(), `Incomplete site build: ${file}`);
  }
  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(build, destination, { recursive: true });
  const prefix = `/cv/versions/${key}/`;
  const relocate = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      assert(!entry.isSymbolicLink(), 'Snapshot must not contain symlinks');
      if (entry.isDirectory()) relocate(file);
      else if (/\.(html|js|css|txt|json|map)$/.test(entry.name)) {
        // Includes compiled webpack paths, footer/noscript downloads and llms.txt.
        fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('/cv/', prefix));
      }
    }
  };
  try {
    relocate(destination);
    // Keep immutable text bytes equal to the PDF's embedded alternative text.
    fs.copyFileSync(path.join(build, 'resume.txt'), path.join(destination, 'resume.txt'));
    fs.writeFileSync(path.join(destination, 'snapshot.json'), JSON.stringify({ sha, path: prefix }, null, 2) + '\n');
  } catch (error) {
    fs.rmSync(destination, { recursive: true, force: true });
    throw error;
  }
}

function stage({ defaultBuild, defaultSha, snapshotBuild, snapshotSha, archive, output }) {
  const resolved = [defaultBuild, archive, ...(snapshotBuild ? [snapshotBuild] : [])].map(p => path.resolve(p));
  for (const input of resolved) {
    assert(path.resolve(output) !== input && !input.startsWith(path.resolve(output) + path.sep)
      && !path.resolve(output).startsWith(input + path.sep), 'Output must be separate from inputs');
  }
  snapshot(defaultBuild, archive, defaultSha);
  if (snapshotBuild) snapshot(snapshotBuild, archive, snapshotSha);
  const versions = fs.readdirSync(path.join(archive, 'versions')).sort().map(key => {
    assert(/^[a-f0-9]{12}$/.test(key), 'Unexpected archive directory');
    return JSON.parse(fs.readFileSync(path.join(archive, 'versions', key, 'snapshot.json')));
  });
  fs.writeFileSync(path.join(archive, 'versions.json'), JSON.stringify(versions, null, 2) + '\n');
  fs.rmSync(output, { recursive: true, force: true });
  fs.cpSync(defaultBuild, output, { recursive: true });
  fs.cpSync(path.join(archive, 'versions'), path.join(output, 'versions'), { recursive: true });
  fs.copyFileSync(path.join(archive, 'versions.json'), path.join(output, 'versions.json'));
  fs.writeFileSync(path.join(output, '.nojekyll'), '');
  console.log(`Staged default site and ${versions.length} immutable version(s) in ${output}`);
}

module.exports = stage;
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};
  const names = { '--default-build': 'defaultBuild', '--default-sha': 'defaultSha', '--snapshot-build': 'snapshotBuild',
    '--snapshot-sha': 'snapshotSha', '--archive': 'archive', '--output': 'output' };
  for (let i = 0; i < args.length; i += 2) {
    assert(names[args[i]] && args[i + 1], `Invalid argument: ${args[i]}`);
    options[names[args[i]]] = args[i + 1];
  }
  for (const name of ['defaultBuild', 'defaultSha', 'archive', 'output']) assert(options[name], `Missing ${name}`);
  assert(Boolean(options.snapshotBuild) === Boolean(options.snapshotSha), 'Snapshot build and SHA must be supplied together');
  stage(options);
}
