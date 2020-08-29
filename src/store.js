import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/analytics";
// import router from '@/routes'

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8N9r2ATD4-5c-uKrgg_L_m4m0KKguY_0",
  authDomain: "sportive-fbbd4.firebaseapp.com",
  databaseURL: "https://sportive-fbbd4.firebaseio.com",
  projectId: "sportive-fbbd4",
  storageBucket: "sportive-fbbd4.appspot.com",
  messagingSenderId: "460864406383",
  appId: "1:460864406383:web:b604005880e7ed68515e9a",
  measurementId: "G-DVCGZD4DF0",
};

firebase.initializeApp(firebaseConfig);

import { AuthStore } from "./modules/auth/store/index";
import { EventsStore } from "./modules/events/store/add";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    db: firebase.firestore(),
    tomtomKey: 'T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63'
  },
  mutations: {
    setUser(state) {
      state.user = {
        email: state.email,
      };
    },
  },
  actions: {
    setUser({ commit, state }, {uid, email}) {
      state.db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          commit("setUser", {
            username: doc.data().username,
            email,
          });
        });
    },
  },
  getters: {
    isAuthenticated({user}) {
      return user !== null && user !== undefined;
    },
  },
  modules: {
    AuthStore,
    EventsStore,
  },
});
