import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import pubsub from './pubub'
import plugin from './plugin'


import './utils/common.scss'


Vue.config.productionTip = false;

Vue.use(plugin);

Vue.prototype.$pubsub = pubsub;

Vue.prototype.$center = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
