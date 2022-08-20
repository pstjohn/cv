import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'holderjs';

import '@fontsource/raleway';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createApp } from 'vue';
import App from './App.vue';
import MasonryWall from '@yeger/vue-masonry-wall';

// import mitt from 'mitt';
// import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(fas, fab, far);

// const emitter = mitt();

let app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(MasonryWall);
// app.config.globalProperties.emitter = emitter;
// app.use(VueMasonryPlugin);
app.mount('#app');
