import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import dateFilter from '@/filters/date';
// import {baseURL} from '@/config'

// Axios.defaults.baseURL = baseURL;
Axios.defaults.baseURL = 'http://localhost:5001/api/';
Vue.config.productionTip = false;
Vue.filter('date', dateFilter);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
