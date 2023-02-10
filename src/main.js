import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import axios from './config/url_connect'
import router from './config/router'

Vue.prototype.$http = axios;

Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
