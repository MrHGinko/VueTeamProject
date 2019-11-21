export default {
        path: "/mine",
	components: { default: () =>import(/* webpackChunkName: "about" */ "../views/Mine/Mine.vue") },
	children: [
		{
			path:"pointMark",
			components: { mineChild: () =>import(/* webpackChunkName: "about" */ "../views/Mine/children/pointMark.vue") },
		},
		{
			path:"comment",
			name: "comment",
			props: true,
			components: { mineChild: () =>import(/* webpackChunkName: "about" */ "../views/Mine/children/comment.vue") },
		}
	]
};
