import api from "../utils/api";
import Http from "../utils/Http";

const state = {
	commodities:[],
	ShopInfo:{}
};

const getters = {
	getCartInfo(state){
        return state.commodities;
	},
	getShopInfo(state){
        return state.ShopInfo;
    }
};

const mutations = {
	setCartInfo(state,data){
        state.commodities = data;
    },
	sendShopInfo(state,data){
		state.ShopInfo = data;
	}
};

const actions = {
	
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}