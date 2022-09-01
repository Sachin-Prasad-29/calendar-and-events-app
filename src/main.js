import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import dateFilter from '@/filters/date';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'animate.css';

<<<<<<< HEAD
import { baseURL } from '@/config';

Axios.defaults.baseURL = baseURL;

=======
import {baseURL} from '@/config'

 Axios.defaults.baseURL = baseURL;
// Axios.defaults.baseURL = 'http://localhost:5001/api/';
// // Axios.defaults.baseURL = 'https://calendar-and-events.herokuapp.com/api/';
>>>>>>> 886ec7f1a80e988e987f7fbae1424a00d76569df
Vue.config.productionTip = false;

Vue.prototype.$spinner = {
    color: 'rgb(51, 102, 255)',
    backgroundColor: 'white',
    blur: '9px',
    height: 100,
    width: 100,
};

Vue.filter('date', dateFilter);
Vue.use(VueLoading);
Vue.use(Toast, { timeout: 2000, position: POSITION.TOP_CENTER });

new Vue({
    router,
    store,
    vuetify,
    VueLoading,
    render: (h) => h(App),
}).$mount('#app');
