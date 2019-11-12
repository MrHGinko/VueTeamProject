import Vue from "vue";
import Vuex from "vuex";
import food from "./food";
import mine from "./mine"
import order from "./order"

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
		isLogin: (localStorage.getItem('isLogin') === 'true') ? true : false,
		username: localStorage.getItem('username') || '获取错误',
	},
        mutations: {
		setLogin(state, flag) {
			state.isLogin = flag;
			localStorage.setItem('isLogin', flag);
		},
		setUsername(state, value) {
			state.username = value;
			localStorage.setItem('username', value);
		}
	},
        actions: {
		
	},
        modules: {
		food,
		mine,
		order
        }
});
