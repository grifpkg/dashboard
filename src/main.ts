/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

import router from "./router/index.js"
//import VueClipboard from 'vue-clipboard2'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Style
import "./App.css"

const app = createApp(App)

registerPlugins(app)

app
    .use(router)
    //.use(VueClipboard)
    .mount('#app')
