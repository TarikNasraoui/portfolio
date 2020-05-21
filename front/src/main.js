import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import axios from 'axios'

Vue.use(VueRouter)

Vue.config.productionTip = false

axios.defaults.baseURL = "/"

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
