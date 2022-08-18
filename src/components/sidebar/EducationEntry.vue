<template>
  <div class="item">
    <h4 class="degree">{{ degree }}</h4>
    <h5 class="meta">{{ location }}</h5>
    <div class="time">{{ time }}</div>
    <div class="education-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EducationEntry',
  props: {
    degree: String,
    location: String,
    time: String,
  },
};
</script>

<style lang="scss">
.degree {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 5px;
}

.education-content {
  color: $text-grey;
  line-height: 1.25;
}
</style>
