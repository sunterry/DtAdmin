
import Vue from 'vue';
import iView from 'iview';
import locale from 'iview/dist/locale/zh-CN';
import 'iview/dist/styles/iview.css';
import router from '@/router';
import App from './App.vue';
import store from './store/index';

if (process.env.NODE_ENV === 'development') {
  require('./mock/index.js'); /* eslint-disable-line */
}
Vue.use(iView, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
