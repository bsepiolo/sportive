import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { getField } from "vuex-map-fields";
import * as mutation from "@/store/mutation_types";
// import * as action from "@/store/action_types";
export const SignUpStore = {
  namespaced: true,
  state: {
    form: {},
    map: null,
  },
  actions: {
    async signUp({ rootState, state, dispatch, commit }) {
      try {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            state.form.email,
            state.form.password
          );
        await rootState.db
          .collection("users")
          .doc(data.user.uid)
          .set({ displayName: state.form.username, email: data.user.email });

        await rootState.db
          .collection("users")
          .doc(data.user.uid)
          .get();

        data.user.updateProfile({
          displayName: state.form.username,
        });
        commit(
          `SignInStore/${mutation.SET_FORM_FIELD}`,
          { name: "email", value: state.form.email },
          { root: true }
        );
        commit(
          `SignInStore/${mutation.SET_FORM_FIELD}`,
          { name: "password", value: state.form.password },
          { root: true }
        );
        dispatch(
          "SignInStore/signIn",
          { email: state.form.email, password: state.form.password },
          { root: true }
        );
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(`${errorCode}, ${errorMessage}`);
      }
    },
  },
  mutations: {
    [mutation.ADD_FORM_FIELD]({ form }, { name, type }) {
      Vue.set(form, name, type !== "text" ? "" : null);
    },
    [mutation.SET_FORM_FIELD]({ form }, { name, value }) {
      form[name] = value;
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
