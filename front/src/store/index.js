import Vue from "vue";
import Vuex from "vuex";
import food from "./food";
import mine from "./mine"

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
		isLogin: false,
		username: null,
	},
        mutations: {
		setLogin(state, flag) {
			state.isLogin = flag;
		},
		setUsername(state, value) {
			state.username = value;
		}
	},
        actions: {
		
	},
        modules: {
		food,
		mine
        }
});
