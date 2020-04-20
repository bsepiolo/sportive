import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './routes.js'
import store from './store.js'
import "./globalComponents.js"
import * as firebase from "firebase/app";


// If you enabled Analytics in your project, add the Firebase SDK for Analytics


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      console.log(firebaseUser)
    })
  }
}).$mount('#app')
