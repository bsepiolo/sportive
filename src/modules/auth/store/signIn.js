import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { getField } from "vuex-map-fields";
import * as mutation from "@/store/mutation_types";
import router from "@/routes";
// import * as action from "@/store/action_types";
export const SignInStore = {
  namespaced: true,
  state: {
    form: {},
    user: null,
  },
  actions: {
    async signIn({ commit, state }) {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(state.form.email, state.form.password);

        commit(mutation.SET_USER, user, { root: true });
        router.push({ name: "events.list" });
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
  },
  getters: {
    getField,
  },
};
