# My Resume

Based on Vue 3 / Bootstrap 5. Currently live at
[pcstj.com/cv](https://www.pcstj.com/cv)

- pulls paper data in CSL-JSON from zotero (cached via github actions TODO)
- pulls live h-index / total citations from web of science
- pulls live repo statistics from github

TODO:

- press links?
- collapseable sections? https://getbootstrap.com/docs/4.3/components/collapse/
- tag publications by topic?

## Inspiration

- https://github.com/xriley/Orbit-Theme/
- https://github.com/awakentrue/simple-resume-vue/
- https://resume.kdheepak.com/

## Project setup

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
