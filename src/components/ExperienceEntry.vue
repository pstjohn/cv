<template>
  <div class="item">
    <span class="path-node" />
    <div class="meta">
      <div>
        <h3 class="d-lg-inline">
          <span class="job-title" v-text="jobTitle" />
          <span class="department" v-text="department" v-if="department" />
        </h3>
        <span class="float-lg-end">{{ time }}</span>
      </div>
    </div>
    <!--//meta-->
    <div class="details">
      <slot></slot>
    </div>
    <!--//details-->
  </div>
</template>

<script>
export default {
  name: 'ExperienceEntry',
  props: {
    jobTitle: String,
    department: String,
    time: String,
    company: String,
  },
};
</script>

<style lang="scss">
.item {
  position: relative;

  ul {
    padding-left: 20px;
  }

  .path-node {
    position: absolute;
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    height: 8px;
    width: 8px;
    top: 6px;
    left: -25px;
  }
}

.department {
  color: $text-grey;
  &:before {
    content: ' | ';
  }
}

.company {
  font-size: 16px;
  font-weight: 400;
}
</style>
