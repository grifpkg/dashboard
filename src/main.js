import Vue from 'vue'
import Buefy from 'buefy'
import grifpkg from '@grifpkg/client'
import 'buefy/dist/buefy.css'

import App from './App.vue'
import router from './router'

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.$grifpkg = grifpkg;
Vue.prototype.$client = new grifpkg();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
