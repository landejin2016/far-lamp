import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vant';
import './plugins/components';
import './hooks/class-component-hooks';
import Utils from './plugins/utils';
import Verify from './plugins/verify';
import '@/assets/style/public.less';
import '@/assets/style/reset.css';
import '@/theme/icon.css';
import '@/assets/style/animate.less';
import VConsole from 'vconsole';
const vConsole = new VConsole();

Vue.config.productionTip = false;
const utils = new Utils();
Vue.prototype.$utils = utils;
Vue.prototype.$api = utils.api;
Vue.prototype.$verify = new Verify();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
