// A linear, UTF-8 companion for the rendered resume. Contact fields are an
// explicit allowlist: the intentionally image-only phone is never read here.
const profile = require('../src/assets/profile.json');
const assets = require('../src/assets/public-assets.json');

module.exports = async page => {
  const rendered = await page.evaluate(() => {
    const clean = value => value.replace(/\s+/g, ' ').trim();
    const education = [...document.querySelectorAll('.sidebar-wrapper .container-block')]
      .find(block => block.querySelector('h2')?.textContent.trim() === 'Education');
    return {
      contact: [...document.querySelectorAll('.contact-list li:not(.phone)')].map(item => {
        const link = item.querySelector('a');
        const label = clean(item.textContent);
        return link && !link.href.startsWith('mailto:') ? `${label} - ${link.href}` : label;
      }),
      education: [...(education?.querySelectorAll('.item') || [])].map(item =>
        ['.degree', '.meta', '.time'].map(selector => clean(item.querySelector(selector)?.textContent || ''))
          .filter(Boolean).join(' | ')),
    };
  });
  const roleText = role => [role.title, ...(role.department ? [role.department] : []), role.dates,
    ...role.resumeBullets.map(bullet => `- ${bullet}`), ''];
  return [
    profile.name, profile.tagline, '', 'CONTACT', ...rendered.contact,
    '', 'SUMMARY', profile.summary,
    '', 'SKILLS', ...profile.skills.map(skill => `${skill.label}: ${skill.text}`),
    '', 'EXPERIENCE', 'NVIDIA', ...roleText(profile.nvidia.current), ...roleText(profile.nvidia.previous),
    'National Renewable Energy Lab', ...profile.nrel.roles.flatMap(roleText),
    'EDUCATION', ...rendered.education,
    '', 'SELECTED WORK',
    ...assets.filter(asset => asset.outputs.includes('resume')).map(asset =>
      `${asset.title}${asset.contribution ? ` (${asset.contribution})` : ''}\n${asset.url}`),
    ...profile.nvidia.current.upcomingAssets.map(asset => `${asset.title} - ${asset.label}`), '',
  ].join('\n');
};
