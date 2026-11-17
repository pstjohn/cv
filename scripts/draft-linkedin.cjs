// Generate reviewable copy from the same profile used by the local résumé.
// This script never writes to LinkedIn.
const fs = require('node:fs');
const path = require('node:path');
const profile = require('../src/assets/profile.json');
const research = require('../content/research.json');
const assets = research.assets.filter(asset => asset.selection === 'selected' && asset.outputs.includes('linkedin'));
const roles = [profile.nvidia.current, profile.nvidia.previous];
const text = [
  'LINKEDIN CONTENT DRAFT — FOR REVIEW',
  'Generated from src/assets/profile.json. Nothing has been posted to LinkedIn.',
  'Experience bullets mirror the one-page résumé. Unpublished results and partner references remain local draft content for review before publication.',
  '', 'HEADLINE', profile.headline,
  '', 'ABOUT', profile.about.join('\n\n'),
  '', 'SKILLS',
  ...profile.skills.map(skill => `${skill.label}: ${skill.text}`),
  '', 'NVIDIA EXPERIENCE',
  ...roles.flatMap(role => [
    '', `${role.title} (${role.department})`, role.dates,
    ...role.resumeBullets.map(bullet => `• ${bullet}`),
  ]),
  '', 'NREL EXPERIENCE',
  ...profile.nrel.roles.flatMap(role => [
    '', `${role.title}: ${role.dates}`,
    ...role.resumeBullets.map(bullet => `• ${bullet}`),
  ]),
  '', 'PUBLISHED WORK TO CONSIDER FOR FEATURED',
  ...assets.map(asset => `${asset.title} - ${asset.url}`),
  '', 'UPCOMING WORK — NO PUBLIC LINK YET',
  ...profile.nvidia.current.upcomingAssets.map(asset => `${asset.title} — ${asset.label}`),
  '', 'REVIEW BEFORE PUBLICATION',
  'Confirm unpublished metric release status and external wording for partner work. GeneAnnotationBench is a composite benchmark score; chemistry is a development-set result. Evidence and remaining questions are recorded in local research. No general frontier-parity or customer-adoption gains are claimed.',
  '',
].join('\n');
fs.writeFileSync(path.resolve(__dirname, '../content/linkedin-draft.txt'), text);
console.log('Updated content/linkedin-draft.txt');
