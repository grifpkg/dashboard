import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Install from "../views/Install.vue"
import Search from "../views/Search.vue"
import Login from "../views/Login.vue"

import Branding from "../views/Branding.vue"

import Drawer from "../views/Drawer.vue"

import Privacy from "../views/legal/Privacy.vue"
import Tos from "../views/legal/TOS.vue"
import Cookies from "../views/legal/Cookies.vue"

import Advertising from "../views/settings/Advertising.vue"
import General from "../views/settings/General.vue"
import Payouts from "../views/settings/Payouts.vue"
import Profiles from "../views/settings/Profiles.vue"
import Resources from "../views/settings/Resources.vue"
import UrlSuggestions from "../views/settings/UrlSuggestions.vue"

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/install', component: Install },
    { path: '/search', component: Search },
    { path: '/login', component: Login },
    { path: '/branding', component: Branding },
    {
        path: '/settings/',
        component: Drawer,
        redirect: '/settings/profiles',
        children: [
            { path: 'profiles', component: Profiles, meta: { icon: 'mdi-cat' }, name: "Linked Profiles" },
            { path: 'resources', component: Resources, meta: { icon: 'mdi-package-variant-closed' }, name: "Published & Owned Resources" },
            { path: 'payouts', component: Payouts, meta: { icon: 'mdi-hand-coin-outline' }, name: "Payouts & Donations" },
            { path: 'advertising', component: Advertising, meta: { icon: 'mdi-advertisements' }, name: "Advertising" },
            { path: 'url-suggestions', component: UrlSuggestions, meta: { icon: 'mdi-link-variant' }, name: "Suggested URLs" },
            { path: 'more', component: General, meta: { icon: 'mdi-cog' }, name: "Preferences" },
        ]
    },
    {
        path: '/legal/',
        component: Drawer,
        redirect: '/settings/tos',
        children: [
            { path: 'tos', component: Tos, meta: { icon: 'mdi-semantic-web' }, name: "Terms Of Service" },
            { path: 'privacy', component: Privacy, meta: { icon: 'mdi-incognito-circle' }, name: "Privacy Policy" },
            { path: 'cookies', component: Cookies, meta: { icon: 'mdi-cookie' }, name: "Cookie Policy" },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
