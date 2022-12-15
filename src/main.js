import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import dateFilter from '@/filters/date'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { baseURL } from '@/config'

Axios.defaults.baseURL = baseURL

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.use(Toast, { timeout: 2000, position: POSITION.TOP_CENTER })

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
