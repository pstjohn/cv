<template>
  <section class="main-section">
    <h2 class="section-title">
      <font-awesome-icon :icon="['fa-solid', icon]" />{{ title }}
    </h2>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'MainSection',
  props: {
    title: String,
    icon: {
      type: String,
      default: 'question',
    },
  },
};
</script>

<style lang="scss">
.section-title {
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: 2px;
  color: $text-color;
  position: relative;
  margin-top: 0;
  margin-bottom: 20px;

  .svg-inline--fa {
    margin-right: 12px;
  }
}

.single-page {
  .section-title {
    margin-bottom: 10px;
  }

  .main-section {
    margin-bottom: 20px;
  }

  .main-section:last-child {
    margin-bottom: 0px !important;
  }
}

.main-section {
  margin-bottom: 45px;

  .meta {
    color: $text-grey;
    margin-bottom: 10px;
  }

  h3 {
    color: $text-color;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .intro {
    margin-bottom: 30px;
  }

  .item {
    margin-bottom: 30px;
  }
}

.upper-row {
  position: relative;
  overflow: hidden;
  margin-bottom: 2px;
}
</style>
