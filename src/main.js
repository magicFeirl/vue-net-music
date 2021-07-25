import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'

import '@/assets/css/global.css'

import http from '@/api/http.js'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

Vue.component('VueSlider', VueSlider)

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')