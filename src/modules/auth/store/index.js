import * as firebase from "firebase/app";
import 'firebase/firestore'
import { getField, updateField } from "vuex-map-fields";

export const AuthStore = {
  namespaced: true,
  state: {
    authForm: {},
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
    updateField,
    setAuthenticatedUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getField,
  },
};
