import * as firebase from "firebase/app";
import 'firebase/firestore'
import { getField, updateField } from "vuex-map-fields";

export const AuthStore = {
  namespaced: true,
  state: {
    signInForm: {},
    signUpForm: {},
  },
  actions: {
    signIn({commit, state}) {
        alert("asf")
        debugger
        firebase
        .auth()
        .signInWithEmailAndPassword(state.signInForm.email, state.signInForm.password)
        .then((data) => {
            debugger
          console.log("ok!");
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
    signUp({rootState,state}) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.signUpForm.email, state.signUpForm.password)
        .then((data) => {
          return rootState.db
            .collection("users")
            .doc(data.user.uid)
            .set({ username: state.signUpForm.username }).then(()=>{
                rootState.db
            .collection("users")
            .doc(data.user.uid)
            .get().then(doc=>{
                console.log("data", doc.data())
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
