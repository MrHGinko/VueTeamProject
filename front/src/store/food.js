import api from "../utils/api";
import Http from "../utils/Http";

const state = {
	data: null
}

const getters = {
	
}

const mutations = {
	setData(state, value) {
		state.data = value;
	}
}

const actions = {
	async requestFoodIndexData(context) {
		const {data : result} = await Http.get(api.FOOD_API, {});

		context.commit('setData', result);
	}
}

// food store

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}