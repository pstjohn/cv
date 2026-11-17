# My Resume

Based on Vue 3 / Bootstrap 5. Currently live at
[pcstj.com/cv](https://www.pcstj.com/cv)

- pulls paper data in CSL-JSON from zotero (cached via github actions TODO)
- pulls live h-index / total citations from web of science
- includes public GitHub statistics refreshed at build time

TODO:

- press links?
- collapseable sections? https://getbootstrap.com/docs/4.3/components/collapse/
- tag publications by topic?

## Inspiration

- https://github.com/xriley/Orbit-Theme/
- https://github.com/awakentrue/simple-resume-vue/
- https://resume.kdheepak.com/

## Project setup

### Profile content and LinkedIn draft


Edit `src/assets/profile.json` for the shared summary, headline, current NVIDIA
roles, and separate resume/CV bullet selections. The resume emphasizes current
work; the full CV retains historical detail. `npm run draft:linkedin` produces
`content/linkedin-draft.txt` for review and manual use in LinkedIn. The complete
site build regenerates this draft as well. It never posts to LinkedIn.

`content/research.json` records sources, claims, benchmark scope, public assets,
discovery tasks, and publication history. `content/research-plan.txt` lays out
the broader research and update process. `content/profile-candidates.json`
preserves provisional wording from the initial narrow PR review; it is not
published automatically. Keep private evidence and candidate wording outside
`public/` and `src/`.

Internal career records and unpublished work are kept in the Git-ignored
`content/private/` directory. `augmented-bullets.txt` is the readable working
bullet bank, `augmented-bullets.json` tracks source IDs and unresolved questions,
`source-notes.json` records relevant private-source facts, and `release-queue.json`
pairs forthcoming articles and related datasets for later publication checks.
These files are local only and are not loaded by any site or LinkedIn generator.
The release queue is a record of next actions, not a scheduled monitor.

Run `npm run prepare:content` after editing the inventory. It validates source
references and exports only verified assets whose selection is `selected` into
`src/assets/public-assets.json`, then regenerates the LinkedIn draft. Assets
can target the resume, CV, and/or LinkedIn. The Public Assets section supports
technical blogs, HF models/datasets, code, tutorials, talks, and papers. Blank
categories are hidden. Contribution credit needs its own verified claim; an
NVIDIA-hosted URL by itself does not establish personal authorship.

The content preparation command also runs during `npm run build:site`. Run it
once before `npm run serve` when changing the research inventory. For a new
featured GitHub repository, also add its snapshot entry to
`src/assets/github-repos.json` and run `npm run refresh:github`.

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

For the complete published site, including its downloadable one-page PDF, run
`npm run build:site` with Google Chrome installed. This generates `dist/resume.pdf`
and a local `public/resume.pdf` for the development server. The generated PDFs
are ignored by Git. GitHub Actions installs Chromium and runs the same export
before publishing `dist/` through the GitHub Pages deployment workflow.

### Refresh GitHub statistics

Run `npm run refresh:github` with an authenticated GitHub CLI (`gh auth login`).
The deployment workflow uses its built-in `GITHUB_TOKEN` for the same command.
Only public repository metadata and follower counts are saved in
`src/assets/github-repos.json` and `src/assets/github-user.json`; credentials
are never bundled into the site. Counts show the snapshot date on hover and
work even when GitHub's anonymous API is rate limited.

Edit `src/assets/github-repos.json` to choose the projects featured in both views,
then refresh the snapshot. Display names stay stable when GitHub redirects an older name.

### Print the one-page résumé

Open `/cv/?res` and use the print dialog with **US Letter**, portrait,
**100% scale**, and browser **headers and footers disabled**. The résumé has a
dedicated print stylesheet with 0.3-inch margins; screen styles are preserved.
The full CV remains a separate, multiple-page view. Recheck pagination after
adding content: the stylesheet does not truncate text to force a single page.

### Agent-readable contact and resume

`public/llms.txt` is published at `/cv/llms.txt`. It lists the public contact
email, direct PDF download at `/cv/resume.pdf`, web views, and professional links.
The HTML head advertises both resources, and the footer and JavaScript-free
fallback link to them. `llms.txt` is a discovery convention; agents can also
follow ordinary HTML links. No repository `AGENTS.md` is needed for visitors.

The contact address is `inquiries@agents.pcstj.com`, rendered as accessible
text with a `mailto:` link. Keep it consistent in `SidebarContacts.vue`,
`public/index.html`, and `public/llms.txt` when changing it.

The PDF export includes structure tags and a UTF-8 `resume.txt` attachment.
The same linear text is served at `/cv/resume.txt` and advertised in the HTML
head, footer, and agent guide. It is generated from the selected profile bullets
and visible education/contact links; internal research is never imported.
The phone number intentionally remains image-only and is excluded from these
text exports and metadata. Preserve that choice when updating contact extraction.
Ordinary browser print-to-PDF does not embed the attachment; use the generated
download for that feature. Some parsers ignore tags and attachments, so the
plain-text endpoint is the most direct fallback.

Run `npm run check:site` with Google Chrome installed to check both views,
repository links and counts, service failures, and single-page Letter printing
at desktop and mobile widths. It writes a review copy to
`output/pdf/peter-st-john-resume.pdf`. For Playwright's bundled Chromium instead,
run `npx playwright install chromium` and set `PLAYWRIGHT_CHANNEL=chromium`.

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Notes

Get citations with
`curl 'https://api.zotero.org/users/9700705/publications/items?limit=100&format=csljson&sort=date&order=desc' > src/assets/publications.txt`
Get grants with
`curl -H "Content-Type: application/json" https://pub.orcid.org/v2.1/0000-0002-7928-3722/fundings > grants.txt`

Pagination of citation requests following
`https://github.com/Juris-M/citeproc-js/blob/master/demo/demo.js`?
