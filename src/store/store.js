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
import * as mutations from "@/store/mutation_types";
import { SignUpStore } from "../modules/auth/store/signUp";
import { SignInStore } from "../modules/auth/store/signIn";
import { EventsAddStore } from "../modules/events/store/add";
import { EventsDetailsStore } from "../modules/events/store/details";
import { EventsListStore } from "../modules/events/store/list";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    firebase: firebase,
    db: firebase.firestore(),
    tomtomKey: 'T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63'
  },
  mutations: {
    [mutations.SET_USER](state, {uid, displayName, email}) {
      
      state.user = {
        uid,
        email,
        displayName,
      };
    },
  },
  getters: {
    isAuthenticated({user}) {
      return user !== null && user !== undefined;
    },
  },
  modules: {
    SignInStore,
    SignUpStore,
    EventsAddStore,
    EventsListStore,
    EventsDetailsStore
  },
});
