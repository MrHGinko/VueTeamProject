import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由模块
import mineRouter from './mine-router';
import orderRouter from './order-router';
import Movie from './movie';
import Mine from './mine';
import Cinema from './cinema';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/home/Home.vue'),
	},
	{
		path: '/detail/:id',
		name: 'detail',
		props: true,
		component: () => import('../views/detail/Detail.vue'),
	},
	{
		path: '/pay',
		name: 'pay',
		component: () => import('../views/detail/Pay.vue'),
	},
	{
		path: '/classify',
		name: 'classify',
		component: () => import('../views/home/ClassifyShop.vue'),
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
	orderRouter,
	Movie,
	Mine,
	Cinema,
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
