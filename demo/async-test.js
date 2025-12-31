import { createApp } from 'vue';

import VueTreeSelect from '../src/index.js';
import AsyncSearchTest from './async-search-test.vue';

createApp(AsyncSearchTest)
    .component('vue-treeselect', VueTreeSelect)
    .mount('#app');

