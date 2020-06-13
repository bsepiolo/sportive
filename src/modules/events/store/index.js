// import * as firebase from "firebase/app";
import "firebase/firestore";
import { getField, updateField } from "vuex-map-fields";

export const EventsStore = {
  namespaced: true,
  state: {
    form: {location: ""},
    events: null,
    locationSearchResults: null,
    locationCoordsSearchResults: null,
    distance: 0,
    time: 0,
    location: { lat: 0, lon: 0 },
  },
  actions: {
    addEvent({ state, rootState }) {
      rootState.db
        .collection("events")
        .add(state.eventForm)
        .then((data) => {
          console.log(data.data());
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`);
        });
    },
    getLocationByCoords({ commit }, payload) {
      this._vm.$http
        .get(
          `https://api.tomtom.com/search/2/reverseGeocode/${payload.lat},${payload.lng}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63`
        )
        .then((data) => {
          commit(
            "setLocationCoordsSearchResults",
            `${data.data.addresses[0].address.streetName || 'Address unknown'} ${data.data.addresses[0].address.streetNumber || ''}, ${data.data.addresses[0].address.municipality}`
          );
        });
    },
    getLocationsByName({ commit, state }, payload) {
      this._vm.$http
        .get(
          `https://api.tomtom.com/search/2/search/${payload}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63&countrySet=PL&lat=${state.location.lat}&lon=${state.location.lon}&radius=30000&idxSet=PAD,Addr,Str`
        )
        .then((data) => {
          debugger
          commit("setLocationSearchResults", data.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEvents({ commit, rootState }) {
      rootState.db
        .collection("events")
        .get()
        .then(function(data) {
          let eventsArray = data.docs.map((doc) => {
            return doc.data();
          });
          commit("setEvents", eventsArray);
        });
    },
  },
  mutations: {
    updateField,
    setEvents(state, payload) {
      state.events = payload;
    },
    setLocation(state, payload) {
      state.location.lat = payload.latitude;
      state.location.lon = payload.longitude;
    },
    setTime(state, payload) {
      state.time = payload;
    },
    setLocationName(state, payload) {
      state.form.location = payload;
    },
    clearLocationName(state) {
      state.form.location = null;
    },
    setDistance(state, payload) {
      state.distance = payload;
    },
    setLocationSearchResults(state, payload) {
      state.locationSearchResults = payload;
    },
    clearLocationSearchResults(state) {
      state.locationSearchResults = null;
    },
    setLocationCoordsSearchResults(state, payload) {
      state.form.location = payload;
    },
    clearLocationCoordsSearchResults(state) {
      state.form.location = null;
    },
    setFormField(state, payload){
      state.form[payload.name] = payload.value
    },
  },
  getters: {
    getField,
  },
};
