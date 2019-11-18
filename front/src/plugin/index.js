import { Toast } from "vant";
import ScrollBox from "./scroll-box.vue";
import RightInfoBox from "./RightInfo-scroll.vue";
import LeftInfoBox from "./LeftInfo-scroll.vue";

export default {
    install(Vue) {

    Vue.prototype.$Toast = Toast;

    Vue.component(ScrollBox.name, ScrollBox);

    Vue.component(RightInfoBox.name, RightInfoBox);

    Vue.component(LeftInfoBox.name, LeftInfoBox);
    }
};
