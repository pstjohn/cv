<template>
  <div class="item grants-entry">
    <div class="meta">
      <div>
        <h3 class="grant-title d-lg-inline">{{ title }}</h3>
      </div>
      <div>
        <div class="d-lg-inline">{{ organization }}</div>
        <div class="d-lg-inline float-lg-end">{{ time }}</div>
      </div>
      <div>
        <div class="d-lg-inline">Total Funding: {{ amount }}</div>
        <div class="d-lg-inline float-lg-end">
          <a :href="link">[More Info]</a>
        </div>
      </div>
      <div>
        <div class="d-lg-inline">Lead PI: {{ pi }}</div>
      </div>
    </div>
    <div class="details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrantsEntry',
  props: {
    title: String,
    time: String,
    pi: String,
    organization: String,
    link: String,
    amount: String,
  },
};
</script>

<style lang="scss">
.grants-entry .meta {
  // color: $text-color-secondary;
  .grant-title {
    font-size: 14px;
  }
}
</style>
