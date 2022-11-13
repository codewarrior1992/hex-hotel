import Vue from 'vue'
import App from './App.vue'
import router  from './router'
import store from './store'

import '@/assets/js/loading-overlay.js';
import '@/assets/js/google-map.js';
import '@/assets/js/vee-validate.js';
import '@/assets/js/v-mask.js';
import '@/assets/js/axios.js';
import { i18n } from '@/assets/js/i18n/i18n.js';

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
