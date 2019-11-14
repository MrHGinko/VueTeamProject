import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import plugin from "./plugin";
import axios from 'axios';
import VueAxios from 'vue-axios'
import './style/common.scss'
import VueScroller from 'vue-scroller'

Vue.use(VueScroller)

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(plugin, axios.VueAxios);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");