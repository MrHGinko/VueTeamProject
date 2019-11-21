import api from "../utils/api";
import Http from "../utils/Http";

const state = {
	commodities:[],
	ShopInfo:{},
	info:{}
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
	},
	setInfo(state,data){
		state.info = data;
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