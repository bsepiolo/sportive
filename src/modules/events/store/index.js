// import * as firebase from "firebase/app";
import 'firebase/firestore'
import { getField, updateField } from "vuex-map-fields";

export const EventsStore = {
  namespaced: true,
  state: {
    eventForm: {},
  },
  actions: {
    addEvent({state, rootState}) {
        rootState.db.collection('events')
        .add(state.eventForm)
        .then((data) => {
            console.log(data.data())
        //   commit("setAuthenticatedUser", data.data())
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(`${errorCode}, ${errorMessage}`)
        });
    }
  },
  mutations: {
    updateField,
  },
  getters: {
    getField,
  },
};
