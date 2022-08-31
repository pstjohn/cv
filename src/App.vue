<template>
  <div>
    <div class="wrapper" ref="document" :class="{ singlePage: singlePage }">
      <div class="document-header"></div>
      <div class="content">
        <SidebarWrapper :singlePage="singlePage" />
        <MainWrapper :singlePage="singlePage" />
      </div>
      <div class="document-footer"></div>
    </div>
    <footer>
      <p>
        Looking for a PDF? Use your browser's
        <a href="#" id="print-button" onclick="window.print();return false;"
          >print dialog.
        </a>
      </p>
      <p>
        Built with Vue3. <a href="https://github.com/pstjohn/cv">view source</a>
      </p>
    </footer>
  </div>

  <Teleport to="#singlePageToggle">
    <Toggle v-model="singlePage">
      <template v-slot:label="{ checked, classList }">
        <span :class="classList.label">{{ checked ? 'res' : 'cv' }}</span>
      </template>
    </Toggle>
  </Teleport>
</template>

<script>
import SidebarWrapper from './components/SidebarWrapper.vue';
import MainWrapper from './components/MainWrapper.vue';
import Toggle from '@vueform/toggle';

export default {
  name: 'App',
  components: {
    SidebarWrapper,
    MainWrapper,
    Toggle,
  },
  data() {
    let urlParams = new URLSearchParams(window.location.search);

    return {
      singlePage: urlParams.has('res'),
    };
  },
};
</script>

<style lang="scss">
@import '@vueform/toggle/themes/default.css';

.content {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.software-footer {
  position: absolute;
  right: 0;
  bottom: 0;
}

* {
  transition: margin 0.25s ease;
}
</style>
