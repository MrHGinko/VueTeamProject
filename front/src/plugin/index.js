import { Icon, Toast } from 'vant';

import HeaderBar from '../components/header-bar.vue';
import Loading from '../components/loading.vue';

import ScrollBox from '../components/scroll-box.vue';
import LeftInfoBox from '../components/LeftInfo-scroll.vue';
import RightInfoBox from '../components/RightInfo-scroll.vue';
import AppTabBar from '../components/tab-bar/index';
import AppScroll from '../components/app-scroll/index';
import AppHeader from '../components/app-header/index';

export default {
	install(Vue) {
		Vue.use(Icon);
		// Vue.use(Toast);
		Toast.setDefaultOptions({
			position: 'bottom',
		});
		Vue.prototype.$Toast = Toast;

		Vue.component(HeaderBar.name, HeaderBar);
		Vue.component(Loading.name, Loading);

		Vue.component(ScrollBox.name, ScrollBox);
		Vue.component(LeftInfoBox.name, LeftInfoBox);
		Vue.component(RightInfoBox.name, RightInfoBox);

		Vue.component(AppTabBar.name, AppTabBar);
		Vue.component(AppScroll.name, AppScroll);
		Vue.component(AppHeader.name, AppHeader);
	},
};
