import * as firebase from "firebase/app";
import 'firebase/firestore'
import { getField } from "vuex-map-fields";

export const AuthStore = {
  namespaced: true,
  state: {
    form: {},
    map: null
  },
  actions: {
    signIn({commit, state}) {
        firebase
        .auth()
        .signInWithEmailAndPassword(state.authForm.email, state.authForm.password)
        .then((data) => {
          commit("setAuthenticatedUser", data.data())
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(`${errorCode}, ${errorMessage}`)
        });
    },
    signUp({rootState,state, dispatch}) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.authForm.email, state.authForm.password)
        .then((data) => {
          return rootState.db
            .collection("users")
            .doc(data.user.uid)
            .set({ username: state.authForm.username }).then(()=>{
                rootState.db
            .collection("users")
            .doc(data.user.uid)
            .get().then(doc=>{
                console.log("data", doc.data())
                dispatch("signIn")
            })
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
    setFormField(state, payload){
      state.form[payload.name] = payload.value
    },
    setAuthenticatedUser(state, payload) {
      state.user = payload;
    },
    setMap(state, payload) {
      state.map = payload;
    },
    clearMap(state) {
      state.map = null;
    }
  },
  getters: {
    getField,
  },
};
