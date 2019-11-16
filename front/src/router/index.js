import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由模块
import Movie from './movie'
import Mine from './mine'
import Cinema from './cinema'

Vue.use(VueRouter);

const routes = [
    // {
    //         path: "/",
    //         name: "movie",
    //         components: {
    //             default: () =>
    //                 import ( /* webpackChunkName: "about" */ "../views/Movie")
    //         }
    //     },
    {
        path: '/movie',
        redirect: '/movie/nowplaying'
    },
    {
        path: '/',
        redirect: '/movie'
    },
    Movie,
    Mine,
    Cinema,
    // 添加路由模块
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;