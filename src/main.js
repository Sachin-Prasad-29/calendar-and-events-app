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

import { baseURL } from '@/config';

Axios.defaults.baseURL = baseURL;

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
