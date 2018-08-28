import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import iView from 'iview'
import Directive from '@/directive'
import 'iview/dist/styles/iview.css'
import '@/assets/fonts/iconfont.css'
import '@/theme/index.less'
import locale from 'iview/dist/locale/zh-CN'
Vue.use(iView, {locale})
Directive(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
