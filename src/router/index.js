import { createRouter, createWebHistory } from "vue-router"
import Drawer from '@/layouts/Drawer'

const routes = [
  { path: '/', component: () => import('@/views/Home') },
  { path: '/install', component: () => import('@/views/Install') },
  { path: '/search', component: () => import('@/views/Search') },
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/branding', component: () => import('@/views/Branding') },
  { path: '/robot', component: () => import('@/views/Robot') },
  {
    path: '/settings/',
    component: Drawer,
    redirect: '/settings/profiles',
    children: [
      { path: 'profiles', component: () => import('@/views/settings/Profiles'), meta: { icon: 'mdi-cat' }, name: "Linked Profiles" },
      { path: 'resources', component: () => import('@/views/settings/Resources'), meta: { icon: 'mdi-package-variant-closed' }, name: "Published & Owned Resources" },
      { path: 'payouts', component: () => import('@/views/settings/Payouts'), meta: { icon: 'mdi-hand-coin-outline' }, name: "Payouts & Donations" },
      { path: 'advertising', component: () => import('@/views/settings/Advertising'), meta: { icon: 'mdi-advertisements' }, name: "Advertising" },
      { path: 'url-suggestions', component: () => import('@/views/settings/UrlSuggestions'), meta: { icon: 'mdi-link-variant' }, name: "Suggested URLs" },
      { path: 'more', component: () => import('@/views/settings/General'), meta: { icon: 'mdi-cog' }, name: "Preferences" },
    ]
  },
  {
    path: '/legal/',
    component: Drawer,
    redirect: '/legal/tos',
    children: [
      { path: 'tos', component: () => import('@/views/legal/TOS'), meta: { icon: 'mdi-semantic-web' }, name: "Terms Of Service" },
      { path: 'privacy', component: () => import('@/views/legal/Privacy'), meta: { icon: 'mdi-incognito-circle' }, name: "Privacy Policy" },
      { path: 'cookies', component: () => import('@/views/legal/Cookies'), meta: { icon: 'mdi-cookie' }, name: "Cookie Policy" },
    ]
  },
  {
    path: '/suggest/',
    component: () => import('@/views/Suggest'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router