import Vue from 'vue'
import VueHighlightJS from 'vue-highlight.js';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/default.css';

import Buefy from 'buefy'
import grifpkg from '@grifpkg/client'
import { loadStripe } from '@stripe/stripe-js/pure';
import 'buefy/dist/buefy.css'
import Style from './components/Style.scss'
import animations from 'vue-animate-transitions'

import App from './App.vue'
import router from './router'

import Ads from 'vue-google-adsense'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.use(Buefy)
Vue.use(Style)
Vue.use(animations)
Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    json,
  }
});

let stripe = null;

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



