<template>
  <div
    v-for="(year_split, index) in reference_array"
    class="year-split"
    :key="index"
  >
    <h3 class="year">{{ year_split[0] }}</h3>
    <div class="citation-container">
      <masonry-wall
        :items="year_split[1]"
        :ssr-columns="1"
        :column-width="300"
        :gap="10"
      >
        <template #default="{ item }">
          <CitationEntry
            :html="item[1]"
            :doi="item[0].DOI"
            :note="item[0].note"
          />
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script>
import { _ } from 'vue-underscore';
import * as CSL from 'citeproc';
import CitationEntry from './CitationEntry.vue';

import publications from '@/assets/publications.json';
import publication_notes from '@/assets/publication_notes.json';

import apa from 'raw-loader!@/assets/apa.txt';
import locale from 'raw-loader!@/assets/locals-en-US.txt';

export default {
  name: 'MainCitations',
  components: {
    CitationEntry,
  },
  data() {
    var citations = {};
    var itemIDs = [];

    // eslint-disable-next-line no-unused-vars
    let only_pubs = _.filter(publications.items, function (item) {
      return item['type'] == 'article-journal';
    });

    for (var i = 0, ilen = only_pubs.length; i < ilen; i++) {
      let item = _.omit(only_pubs[i], 'URL', 'DOI');
      var id = item.id;
      only_pubs[i]['note'] = publication_notes[only_pubs[i].DOI];
      citations[id] = item;
      itemIDs.push(id);
    }

    let citeprocSys = {
      retrieveLocale: function () {
        return locale;
      },
      retrieveItem: function (id) {
        return citations[id];
      },
    };

    var citeproc = new CSL.Engine(citeprocSys, apa);
    citeproc.updateItems(itemIDs);
    var result = citeproc.makeBibliography();

    Object.fromEntries(_.zip(only_pubs, result[1]));

    let combined = _.zip(only_pubs, result[1]);
    let split = _.groupBy(combined, function (entry) {
      let year = entry[0]['issued']['date-parts'][0][0];
      if (parseInt(year) <= 2014) {
        year = '2014 and earlier';
      }
      return year;
    });
    split = _.sortBy(Object.entries(split), function (entry) {
      return entry[0];
    }).reverse();

    // console.log(split);

    return { reference_array: split };
  },
};
</script>

<style lang="scss">
.year-split {
  break-inside: avoid;
}

.citation-container {
  width: calc(100% + 20px);
  position: relative;
  left: -10px;
}

//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   height: 100px;

// .citation {
//   height: 300px;
// }
// }

// .citation-container {
//   list-style: none;
//   column-count: 2;
//   column-width: 225px;
//   column-gap: 10px;
//   padding-left: 0rem;
//   column-fill: balance;
//   font-weight: 300;
//   margin-bottom: 0;

//   li {
//     position: relative;
//     // margin-bottom: 0.5rem;
//     break-inside: avoid;
//     -webkit-column-break-inside: avoid;
//     -moz-column-break-inside: avoid;
//     -moz-page-break-inside: avoid;
//     page-break-inside: avoid;

//     // .citation {
//     //   padding: 8px 9px 10px 10px;
//     // }
//   }
// }
</style>
