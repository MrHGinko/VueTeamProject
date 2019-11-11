import { Icon, Toast } from "vant";
import ScrollBox from "../components/scroll-box.vue";
import HeaderBar from "../components/header-bar.vue";

export default {
        install(Vue) {
		Vue.use(Icon);
		// Vue.use(Toast);
		Toast.setDefaultOptions({position: 'bottom'});
		Vue.prototype.$Toast = Toast;


		Vue.component(ScrollBox.name, ScrollBox);
		Vue.component(HeaderBar.name, HeaderBar);

		//event bus 发布订阅
		Vue.$center = Vue.prototype.$center = new Vue();
        }
};
