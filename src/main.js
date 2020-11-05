import Vue from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./routes.js";
import store from "./store/store.js";
import "./globalComponents.js";
import * as firebase from "firebase/app";
import Axios from "axios";
import moment from "moment";

Vue.prototype.moment = moment;

Vue.prototype.$http = Axios;

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
Vue.mixin({
  methods: {
    validation({ required, email }, e) {
      let isValid = false;
debugger
      if (required) {
        if (required.length && (e.length > required.length)) {
          isValid = true;
        } else if (e.length) {
          isValid = true;
        }else{
          isValid = false;
        }
      }

      if(email){
        //eslint-disable-next-line
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        isValid = re.test(String(e).toLowerCase())
      }
      return isValid;
    },
  },
});

Vue.config.productionTip = false;
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    router,
    store,
    created() {
      if (firebaseUser) {
        store.dispatch("setUser", firebaseUser);
      }
    },
    render: (h) => h(App),
  }).$mount("#app");
  unsubscribe();
});
