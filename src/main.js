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
    validation(rules, e) {
      if (rules) {
        let isValid = false;
        if (rules.required) {
          if (rules.required.length && e.length > rules.required.length) {
            isValid = true;
          } else if (e.length) {
            isValid = true;
          } else {
            isValid = false;
          }
        }

        if (rules.email) {
          //eslint-disable-next-line
          const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

          isValid = re.test(String(e).toLowerCase());
        }
        return isValid;
      } else {
        return true;
      }
    },
  },
});

Vue.config.productionTip = false;
import * as actions from "@/store/action_types.js";
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    router,
    store,
    created() {
      if (firebaseUser) {
        store.dispatch(actions.FETCH_USER, firebaseUser);
      }
    },
    render: (h) => h(App),
  }).$mount("#app");
  unsubscribe();
});
