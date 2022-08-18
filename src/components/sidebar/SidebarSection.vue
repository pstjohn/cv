<template>
  <div class="container-block">
    <h2 class="container-block-title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SidebarSection',
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.container-block {
  padding: 15px 30px;

  .item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .meta {
    color: $text-grey;
    font-weight: 500;
    margin-bottom: 0px;
    margin-top: 0;
    font-size: 14px;
  }

  .time {
    color: $text-grey;
    font-weight: 500;
    margin-bottom: 0px;
  }
}

.container-block-title {
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 2px;
  margin-top: 0;
  margin-bottom: 15px;
}
</style>
