const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const research = require('../content/research.json');
const types = ['technical_blog', 'hf_model', 'hf_dataset', 'repository', 'tutorial', 'talk', 'paper'];
const outputs = ['resume', 'cv', 'linkedin'];
const ids = new Set();
for (const record of [...research.sources, ...research.claims, ...research.assets]) {
  assert(record.id && !ids.has(record.id), `Missing or duplicate record ID: ${record.id}`);
  ids.add(record.id);
}
const sources = new Map(research.sources.map(item => [item.id, item]));
const claims = new Map(research.claims.map(item => [item.id, item]));
for (const claim of research.claims) {
  assert(claim.sourceIds?.length && claim.sourceIds.every(id => sources.has(id)), `Invalid sources for ${claim.id}`);
}
const assets = research.assets.filter(item => item.selection === 'selected').map(item => {
  assert(item.verification === 'verified', `Selected asset must be verified: ${item.id}`);
  assert(!item.publicationState || item.publicationState === 'published', `Selected asset must be published: ${item.id}`);
  assert(types.includes(item.type), `Unknown asset type: ${item.type}`);
  assert(item.title && item.summary && item.publisher, `Incomplete asset: ${item.id}`);
  assert(new URL(item.url).protocol === 'https:', `Expected public HTTPS URL: ${item.id}`);
  assert(item.sourceIds?.length && item.sourceIds.every(id => sources.get(id)?.visibility === 'public'), `Selected asset needs public sources: ${item.id}`);
  assert(item.outputs?.length && item.outputs.every(value => outputs.includes(value)), `Invalid destinations: ${item.id}`);
  if (item.contribution) {
    assert(item.contributionClaimIds?.length && item.contributionClaimIds.every(id => {
      const claim = claims.get(id);
      return claim?.verification === 'verified' && claim.sourceIds.every(sourceId => sources.get(sourceId)?.visibility === 'public');
    }), `Published contribution credit needs public evidence: ${item.id}`);
  }
  // Only these public display fields are published; research notes stay local.
  return {
    id: item.id, type: item.type, title: item.title, url: item.url,
    publisher: item.publisher, summary: item.summary,
    contribution: item.contribution || '', outputs: item.outputs,
    ...(item.repository ? { repository: item.repository } : {}),
  };
});
fs.writeFileSync(path.resolve(__dirname, '../src/assets/public-assets.json'), JSON.stringify(assets, null, 2) + '\n');
require('./draft-linkedin.cjs');
console.log(`Prepared ${assets.length} selected public asset(s); candidates and research notes excluded.`);
