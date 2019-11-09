import Vue from "vue";
import Vuex from "vuex";
import food from "./food";

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
                username: "?hello"
        },
        mutations: {},
        actions: {},
        modules: {
                food
        }
});
