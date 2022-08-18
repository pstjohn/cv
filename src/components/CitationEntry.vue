<template>
  <div class="citation" :class="{ highlight: note }">
    <span class="citation-wrapper" v-html="html_with_tag" />
    <a :href="doi_link">[doi]</a>
    <div class="note" v-if="note">
      <span class="citation-count" v-if="showCitations">
        <span class="label">
          (<span v-if="citationCount" v-text="citationCount" />
          <font-awesome-icon v-else spin icon="fa-solid fa-rotate" />
          <span v-text="citationWord" />)
        </span>
      </span>
      <span v-html="note" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CitationEntry',
  props: {
    html: String,
    doi: String,
    note: String,
  },
  data() {
    return {
      citationCount: null,
      showCitations: true,
      citationWord: ' citations',
    };
  },
  async created() {
    if (this.note) {
      const response = await fetch(
        `https://api.crossref.org/works/${this.doi}`
      );
      const data = await response.json();
      this.citationCount = data['message']['is-referenced-by-count'];
      if (this.citationCount == 0) {
        this.showCitations = false;
      } else if (this.citationCount == 1) {
        this.citationWord = ' citation';
      }
    }
  },
  computed: {
    html_with_tag() {
      return this.html.replace(
        'St. John, P. C.',
        "<span class='me'>St. John, P. C.</span>"
      );
    },
    doi_link() {
      return 'https://doi.org/'.concat(this.doi);
    },
  },
};
</script>

<style lang="scss">
.citation .me {
  font-weight: 700;
  break-inside: avoid;
}

.note {
  margin-top: 0.2rem;
  font-size: 12px;
  color: $text-grey;
}

.has-note {
  width: 5px;
}

.csl-entry {
  display: inline;
}

.citation {
  font-family: 'Roboto';
  font-size: 13px;
  // line-height: 15px;
}

.highlight {
  // padding: 8px 9px 10px 10px;
  border: 1pt solid;
  border-color: $lighter-grey;
}

.note .citation-count .label {
  font-weight: 500;
}
</style>
