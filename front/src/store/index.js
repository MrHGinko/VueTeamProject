import Vue from "vue";
import Vuex from "vuex";
import mine from "./mine"
import order from "./order"

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
		isLogin: (localStorage.getItem('isLogin') === 'true') ? true : false,
		username: localStorage.getItem('username') || '获取错误',
		isLoading: false,
	},
        mutations: {
		setLogin(state, flag) {
			state.isLogin = flag;
			localStorage.setItem('isLogin', flag);
		},
		setUsername(state, value) {
			state.username = value;
			localStorage.setItem('username', value);
		},
		setLoading(state, flag) {
			state.isLoading = flag;
		}
	},
        actions: {
		
	},
        modules: {
		mine,
		order
        }
});
