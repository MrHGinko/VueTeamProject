import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import plugin from "./plugin";
import axios from 'axios';
import VueAxios from 'vue-axios'
import './style/common.scss'
import VueAMap from 'vue-amap'
import VueScroller from 'vue-scroller'

VueAMap.initAMapApiLoader({
    key: '你的key值',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
    uiVersion: '1.0.11' // 版本号
})

Vue.use(VueScroller, VueAMap)

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(plugin, axios.VueAxios);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");