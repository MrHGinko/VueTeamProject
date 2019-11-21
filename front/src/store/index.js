import Vue from "vue";
import Vuex from "vuex";
import food from "./food";
import movie from "./movie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: "?hello",
        moviedata: "购买",
        selectSet: '',
        Result_Z: {}
    },
    mutations: {},
    actions: {},
    modules: {
        food,
        movie
    }
});