import Vue from 'vue';
import iView from 'iview';
import locale from 'iview/dist/locale/zh-CN';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(iView, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
