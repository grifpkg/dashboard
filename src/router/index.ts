import { createRouter, createWebHistory, } from "vue-router"
import Home from "../views/Home.vue"
import Install from "../views/Install.vue"
import Search from "../views/Search.vue"

const routes = [
    { path: '/', component: Home },
    { path: '/install', component: Install },
    { path: '/search', component: Search },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
