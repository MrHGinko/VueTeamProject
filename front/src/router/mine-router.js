export default {
        path: "/mine",
	components: { default: () =>import(/* webpackChunkName: "about" */ "../views/Mine/Mine.vue") },
};
