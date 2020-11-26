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
    lightenDarkenColor(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },
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
        debugger;
        store.commit(mutations.SET_USER, firebaseUser);
      }
    },
    render: (h) => h(App),
  }).$mount("#app");
  unsubscribe();
});
