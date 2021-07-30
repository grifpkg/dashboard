import Vue from 'vue'
import Buefy from 'buefy'
import grifpkg from '@grifpkg/client'
import { loadStripe } from '@stripe/stripe-js/pure';
import 'buefy/dist/buefy.css'

import App from './App.vue'
import router from './router'

let stripe = null;
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.$grifpkg = grifpkg;
Vue.prototype.$client = new grifpkg();
Vue.prototype.$stripe = function () {
  return stripe
}

loadStripe('pk_test_51JHO2HICkEUHKkiUPaDS1FoAPVgHEMywq1pjizCqX7ELTZkI9NmTg3ocBknsPESxVEvMARWaO37UttYGK6LgMnBx00e6bAy3LV').then((client) => {
  stripe = client;
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
});



