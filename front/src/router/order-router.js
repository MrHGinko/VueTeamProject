export default {
	path: "/order",
	components: { default: () =>import(/* webpackChunkName: "about" */ "../views/Order/Order.vue") },
	children: [
		{
			path: '/children',
			components: { },
		},
	]
}