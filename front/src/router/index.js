import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由模块
import mineRouter from './mine-router'
import orderRouter from './order-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/home/Home.vue')
	},
	{
		path: '/detail',
		name: 'detail',
		component: () => import('../views/detail/Detail.vue')
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('../views/detail/test.vue')
	},
	// {
	// 	path: "/",
	// 	name: "home",
	// 	components: {
	// 		default: () => import( /* webpackChunkName: "about" */ "../views/Home.vue")
	// 	}
	// },
	// 添加路由模块
	mineRouter,
	orderRouter
];

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router