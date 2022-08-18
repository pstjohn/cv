<template>
  <div>
    <div class="wrapper" ref="document">
      <div class="document-header"></div>
      <div class="content">
        <SidebarWrapper />
        <MainWrapper />
      </div>
      <div class="document-footer"></div>
    </div>
    <footer>
      <a href="TODO">view source</a>
    </footer>
  </div>
</template>

<script>
// import MyCitations from './components/MyCitations.vue'
import SidebarWrapper from './components/SidebarWrapper.vue';
import MainWrapper from './components/MainWrapper.vue';

export default {
  name: 'App',
  components: {
    SidebarWrapper,
    MainWrapper,
  },
};
</script>

<style lang="scss">
.content {
  overflow: hidden;
  position: relative;
  width: 100%;
}
</style>
