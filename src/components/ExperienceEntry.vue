<template>
  <div class="item">
    <div class="meta">
      <div>
        <h3 class="d-lg-inline">
          <span class="job-title" v-text="jobTitle" />
          <span class="department" v-text="department" v-if="department" />
        </h3>
        <span class="float-lg-end">{{ time }}</span>
      </div>
      <!--//upper-row-->
      <div class="company" v-text="company" />
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
