import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { getField } from "vuex-map-fields";
import * as mutation from "@/store/mutation_types";
import router from "@/routes";
// import * as action from "@/store/action_types";
export const AuthStore = {
  namespaced: true,
  state: {
    form: {},
    map: null,
    user: null,
  },
  actions: {
    signIn({ commit, state }) {
      debugger;
      firebase
        .auth()
        .signInWithEmailAndPassword(state.form.email, state.form.password)
        .then((data) => {
          data.user.updateProfile({
            displayName: state.form.username,
          });

          commit("setAuthenticatedUser", data.user.email);
          router.push({ name: "events.list" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(`${errorCode}, ${errorMessage}`);
        });
    },
    signUp({ rootState, state, dispatch }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.form.email, state.form.password)
        .then((data) => {
          return rootState.db
            .collection("users")
            .doc(data.user.uid)
            .set({ displayName: state.form.username, email: data.user.email })
            .then(() => {
              rootState.db
                .collection("users")
                .doc(data.user.uid)
                .get()
                .then((doc) => {
                  console.log("data", doc.data());
                  dispatch("signIn");
                });
            });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(`${errorCode}, ${errorMessage}`);
        });
    },
  },
  mutations: {
    // setFormField(state, payload){
    //   state.form[payload.name] = payload.value
    // },
    [mutation.ADD_FORM_FIELD]({ form }, { name, type }) {
      Vue.set(form, name, type !== "text" ? "" : null);
    },
    [mutation.SET_FORM_FIELD]({ form }, { name, value }) {
      form[name] = value;
    },
    setAuthenticatedUser(state, payload) {
      state.user = payload;
    },
    setMap(state, payload) {
      state.map = payload;
    },
    clearMap(state) {
      state.map = null;
    },
  },
  getters: {
    getField,
  },
};
