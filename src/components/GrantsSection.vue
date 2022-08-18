<template>
  <div class="item">
    <div v-for="(grant, index) in grants" class="item" :key="index">
      <div class="meta">
        <div>
          <h3 class="grant-title d-lg-inline">{{ grant.title.title.value }}</h3>
        </div>
        <div class="d-lg-inline">
          {{ grant.organization.name }}
        </div>
        <div class="d-lg-inline float-lg-end">
          {{ this.formatDate(grant['start-date']) }} to
          {{ this.formatDate(grant['end-date']) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import grants_data from 'raw-loader!@/assets/grants.txt';

export default {
  name: 'GrantsSection',
  data() {
    let grants = JSON.parse(grants_data);

    const funding = grants['group'].map(
      (element) => element['funding-summary'][0]
    );

    return { grants: funding };
  },
  methods: {
    formatDate(date) {
      return `${date.month.value}-${date.day.value}-${date.year.value}`;
    },
  },
};
</script>
