<template>
  <div class="container-block citation-stats">
    <p>
      <span class="label">total citations: </span
      ><span v-if="stats.ready" v-text="stats.timesCited" />
      <font-awesome-icon v-else spin icon="fa-solid fa-rotate" />*
    </p>
    <p>
      <span class="label">h-index: </span
      ><span v-if="stats.ready" v-text="stats.hIndex" />
      <font-awesome-icon v-else spin icon="fa-solid fa-rotate" />*
    </p>
    <p>
      <span class="label">total publications: </span
      ><span v-if="stats.ready" v-text="stats.numPublicationsInWosCc" />
      <font-awesome-icon v-else spin icon="fa-solid fa-rotate" />*
    </p>
    <span class="wos">*indexed by Web of Science</span>
  </div>
</template>

<script>
export default {
  name: 'SidebarStats',
  data() {
    return {
      stats: {
        ready: false,
        hIndex: null,
        timesCited: null,
      },
    };
  },
  async created() {
    const response = await fetch(
      'https://publons.com/wos-op/api/stats/individual/4486958/',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    this.stats = data;
  },
};
</script>

<style lang="scss">
.citation-stats {
  color: $text-grey;

  p {
    margin: 0;
  }

  span.label {
    font-weight: 700;
  }

  .wos {
    font-size: 12px;
    font-weight: 300;
  }
}
</style>

// await fetch("https://publons.com/wos-op/api/stats/individual/4486958/", { //
"headers": { // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15;
rv:91.0) Gecko/20100101 Firefox/91.0", // "Accept": "application/json,
text/javascript, */*; q=0.01", // "Accept-Language": "en-US,en;q=0.5", //
"X-CSRFToken":
"wlRNGmTojG89OXceP2ZmGs4Pyv9ODUtb6U5ycI4xhFjZWUmILRIwcKs9EIKCDU98", //
"X-Requested-With": "XMLHttpRequest", // }, // "referrer":
"https://publons.com/wos-op/researcher/4486958/peter-st-john/", // "method":
"GET", // "mode": "cors" // });
