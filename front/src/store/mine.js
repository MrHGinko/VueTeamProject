import api from "../utils/api";
import Http from "../utils/Http";

const state = {
        username: null
};

const getters = {};

const mutations = {
        setUsername(state, value) {
		state.username = value;
        }
};

const actions = {
        async userLoginAction(context, user) {
                let result = await Http.post(api.USER_LOGIN_API, {
			tel: 		user.username,
			password:  user.password
		});
		return result.data;
        },
        async userRegiesterAction(context, user) {
		let result = await Http.post(api.USER_REGIESTER_API, {
			tel: 		user.username,
			password:  user.password
		});
		// context.dispatch('userLoginAction', user);
		return result.data;
	},
	async userLogoutAction(context) {
		let result = await Http.get(api.USER_LOGOUT_API,{});
		return result.data;
	},
	async checkLogin(context) {
		let result = await Http.get(api.USER_CHECK_API, {});
		return result.data;
	}
};

export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
};
