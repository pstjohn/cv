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
    <span class="wos"
      >*Web of Science, <span class="wos-date" v-text="date"></span
    ></span>
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
