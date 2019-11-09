export default {
	path: '/food',
	components: { default: () =>import(/* webpackChunkName: "about" */ "../views/Food/root/Food.vue") },
	children: [
		{
			path: '/children',
			components: { },
		},

	]
}