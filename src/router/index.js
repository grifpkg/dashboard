import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/explore' },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: "about" */ '../views/Explore.vue')
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resources.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/install',
    name: 'install',
    component: () => import(/* webpackChunkName: "about" */ '../views/Install.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
