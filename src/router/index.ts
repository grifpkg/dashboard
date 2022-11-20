import { createRouter, createWebHashHistory, } from "vue-router"

const routes = [
    { path: '/', component: import('../views/Home.vue') },
    { path: '/install', component: import('../views/Install.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
