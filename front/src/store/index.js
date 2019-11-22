import Vue from 'vue';
import Vuex from 'vuex';
import mine from './mine';
import order from './order';
import shoppingCart from './shoppingCart';
import movie from './movie';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogin:
			localStorage.getItem('isLogin') === 'true'
				? true
				: false,
		username: localStorage.getItem('username') || '获取错误',
		isLoading: false,
		moviedata: '购买',
		selectSet: '',
		Result_Z: {},
		cinemaSelect: '123',
		Z_result: [],
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
		},
		getCinemaSelect(state, value) {
			state.cinemaSelect = value;
		},

		result(state, value) {
			state.Z_result = value;
		},
	},

	modules: {
		mine,
		order,
		shoppingCart,
		movie,
	},
});
