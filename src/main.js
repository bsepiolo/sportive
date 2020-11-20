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
      const errors = [];
      if (rules) {
        let isValid = false;
        if (rules.required) {
          if (rules.required.length && e.length > rules.required.length) {
            isValid = true;
          } else if (e.length) {
            isValid = true;
          } else {
            errors.push(rules.required.text);

            isValid = false;
          }
        }
        if (isValid && rules.email) {
          //eslint-disable-next-line
          const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

          isValid = re.test(String(e).toLowerCase());
          if (!isValid) {
            errors.push(rules.email.text);
          }
        }
        return errors;
      } else {
        return errors;
      }
    },
  },
});

Vue.config.productionTip = false;
import * as mutations from "@/store/mutation_types.js";
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    router,
    store,
    created() {
      if (firebaseUser) {
        store.commit(mutations.SET_USER, firebaseUser);
      }
    },
    render: (h) => h(App),
  }).$mount("#app");
  unsubscribe();
});
