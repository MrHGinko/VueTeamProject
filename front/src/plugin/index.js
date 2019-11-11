import { Icon, Toast } from "vant";
import ScrollBox from "./scroll-box.vue";
import AppTabBar from "../components/tab-bar"
import AppScroll from "../components/app-scroll"
import AppHeader from "../components/app-header"


export default {
    install(Vue) {
        Vue.use(Icon);
        // Vue.use(Toast);
        Vue.prototype.$Toast = Toast;

        Vue.component(ScrollBox.name, ScrollBox);
        Vue.component(AppTabBar.name, AppTabBar);
        Vue.component(AppScroll.name, AppScroll);
        Vue.component(AppHeader.name, AppHeader);
    }
};