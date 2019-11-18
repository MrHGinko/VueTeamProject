export default {
        path: "/mine",
	components: { default: () =>import(/* webpackChunkName: "about" */ "../views/Mine/Mine.vue") },
	children: [
		{
			path:"pointMark",
			components: { mineChild: () =>import(/* webpackChunkName: "about" */ "../views/Mine/children/pointMark.vue") },
		}
	]
};
