import api from '../utils/api';
import Http from '../utils/Http';

const state = {
	orderList: [],
};

const getters = {
	showList(state, flag) {
		return state.orderList.filter(item => item.status === flag);
	},
};

const mutations = {
	setOrderList(state, list) {
		state.orderList = list;
		// push
	},
};

const actions = {
	async getOrderList(context) {
		context.commit('setLoading', true, { root: true });
		// 检查登录 并 同时获取一次订单
		let result = await Http.get(api.ORDER_LIST_API, {});
		// context.commit('setOrderList', result.data.list);
		context.commit('setLoading', false, { root: true });
		return result.data;
	},
	async addOrder(context, info) {
		let result = await Http.post(api.ORDER_ADD_API, info);
		
		return result.data;
	},
	async changeStatus(context, order) {
		context.commit('setLoading', true, { root: true });
		let result = await Http.post(api.ORDER_CHANGE_API, {
			id: order.id, //订单id
			change: order.change,
		});
		context.commit('setLoading', false, { root: true });
		return result;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
