import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './routes.js'
import store from './store.js'
import "./globalComponents.js"
import * as firebase from "firebase/app";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBGtMT9BPWP0WT3CASl6lLJCXzVBHrFY6E",
    libraries: "places" // necessary for places input
  }
});

// If you enabled Analytics in your project, add the Firebase SDK for Analytics



Vue.config.productionTip = false
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
new Vue({
  router,
  store,
  created(){
    if(firebaseUser){
      store.dispatch("setUser", firebaseUser)
    }

  },
  render: h => h(App)
}).$mount('#app')
unsubscribe()

})