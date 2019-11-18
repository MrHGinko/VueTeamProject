import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/home/Home.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import( '../views/order/Order.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import( '../views/my/Mine.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import( '../views/detail/Detail.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import( '../views/detail/test.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
