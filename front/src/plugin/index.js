import { Icon, Toast } from "vant";
import ScrollBox from "./scroll-box.vue";

export default {
        install(Vue) {
		Vue.use(Icon);
		// Vue.use(Toast);
		Vue.prototype.$Toast = Toast;

		Vue.component(ScrollBox.name, ScrollBox);
        }
};
