import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './routes.js'
import store from './store.js'
import "./globalComponents.js"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
