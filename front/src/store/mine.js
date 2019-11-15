import api from "../utils/api";
import Http from "../utils/Http";

const state = {
	userInfo: {}
};

const getters = {};

const mutations = {
	setUserInfo(state, userInfo) {
		state.userInfo = userInfo;
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
	},
	async userGetInfo(context) {
		let result = await Http.get(api.USER_GETINFO_API,{});
		return result.data;
	},
	async userChangeInfo(context, options) {
		let result = await Http.post(api.USER_CHANGEINFO_API,options);
		return result.data;
	},
	async refreshData(context) {
		let result = await context.dispatch('userGetInfo');
		context.commit('setUserInfo', result.data[0]);
		context.commit('setUsername',  result.data[0].nickName, { root: true }); // 设置第三个参数 {root: true} 则代表使用index下的方法
	}
};

export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
};
