// Run locally with authenticated gh; only public repository metadata is saved.
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../src/assets/github-repos.json');
const repos = JSON.parse(readFileSync(file, 'utf8'));
const refreshed = repos.map(repo => {
  const data = JSON.parse(execFileSync('gh', ['api', `repos/${repo.name}`], { encoding: 'utf8' }));
  if (data.private !== false || !Number.isInteger(data.stargazers_count) || !Number.isInteger(data.forks_count)) {
    throw new Error(`Expected public repository statistics for ${repo.name}`);
  }
  return {
    ...repo,
    // Keep the display/lookup key stable when GitHub redirects an older name.
    name: repo.name,
    description: data.description || '',
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
});
const profile = JSON.parse(execFileSync('gh', ['api', 'users/pstjohn'], { encoding: 'utf8' }));
if (!Number.isInteger(profile.followers) || profile.followers < 0) {
  throw new Error('Expected public GitHub follower count');
}
writeFileSync(path.join(__dirname, '../src/assets/github-user.json'), JSON.stringify({
  followers: profile.followers,
  updatedAt: new Date().toISOString().slice(0, 10),
}, null, 2) + '\n');
writeFileSync(file, JSON.stringify(refreshed, null, 2) + '\n');
console.log(`Updated ${refreshed.length} public repository snapshot(s).`);
