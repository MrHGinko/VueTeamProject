import api from "../utils/api";
import Http from "../utils/Http";

const state = {
    moviedata: "购买"
}

const getters = {

}

const mutations = {
    setmovieData(state, value) {
        state.data = value;
    }
}

const actions = {

}

// food store

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}