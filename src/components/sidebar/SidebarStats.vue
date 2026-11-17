<template>
  <div class="container-block citation-stats">
    <p v-if="failed">Citation statistics unavailable.</p>
    <template v-else>
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
      <span class="wos"
        >*Web of Science, <span class="wos-date" v-text="date"></span
      ></span>
    </template>
  </div>
</template>

<script>
import { fetchJson } from '@/utils/fetchJson';

export default {
  name: 'SidebarStats',
  data() {
    return {
      failed: false,
      stats: {
        ready: false,
        hIndex: null,
        timesCited: null,
      },
    };
  },
  async created() {
    const data = await fetchJson(
      'https://publons.com/wos-op/api/stats/individual/4486958/'
    );
    if (['hIndex', 'timesCited', 'numPublicationsInWosCc'].every(
      key => Number.isInteger(data?.[key]) && data[key] >= 0
    )) {
      this.stats = { ...data, ready: true };
    } else {
      this.failed = true;
    }
  },
  computed: {
    date() {
      let today = new Date();
      return today.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    },
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
