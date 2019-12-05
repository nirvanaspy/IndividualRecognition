import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

import './icons'
import echarts from 'echarts'

import $ from 'jquery'
import '@ztree/ztree_v3/js/jquery.ztree.core.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.excheck.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exhide.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exedit.min.js'
import '@ztree/ztree_v3/css/zTreeStyle/zTreeStyle.css'
// import '@ztree/ztree_v3/css/metroStyle/metroStyle.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$ = $

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
