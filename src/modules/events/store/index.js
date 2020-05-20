// import * as firebase from "firebase/app";
import 'firebase/firestore'
import { getField, updateField } from "vuex-map-fields";

export const EventsStore = {
  namespaced: true,
  state: {
    eventForm: {},
    events: null,
    locationSearchResults: null,
    locationCoordsSearchResults: null,
    distance: 0,
    time: 0,
    location: { lat: 0, lon: 0 },
  },
  actions: {
    addEvent({state, rootState}) {
        rootState.db.collection('events')
        .add(state.eventForm)
        .then((data) => {
            console.log(data.data())
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`)
        });
    },
    getLocationByCoords({commit}, payload) {
      this._vm.$http
        .get(
          `https://api.tomtom.com/search/2/reverseGeocode/${payload.lat},${payload.lng}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63`
        )
        .then((data) => {
          commit("setLocationCoordsSearchResults", data.data.addresses[0].address.freeformAddress)
        });
        
    },
    getLocationsByName({commit, state}, payload){
      debugger
      this._vm.$http
        .get(
          `https://api.tomtom.com/search/2/search/${payload}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63&lat=${state.location.lat}&lon=${state.location.lon}`
        )
        .then((data) => {
          commit("setLocationSearchResults", data.data.results)
        })
        .catch(err=>{console.log(err)});
    },
    getEvents({commit, rootState}) {
      rootState.db.collection('events')
      .get().then(function(data) {
        let eventsArray = data.docs.map(doc=>{
          return doc.data();
        })
        commit('setEvents', eventsArray)
      });
  }
  },
  mutations: {
    updateField,
    setEvents(state, payload){
      state.events = payload
    },
    setLocation(state, payload){
      state.location.lat = payload.latitude;
      state.location.lon = payload.longitude;
    },
    setTime(state, payload){
      state.time = payload;
    },
    setDistance(state, payload){
      state.distance = payload;
    },
    setLocationSearchResults(state, payload){
      state.locationSearchResults = payload;
    },
    setLocationCoordsSearchResults(state, payload){
      
      state.locationCoordsSearchResults = payload;
      debugger
    }
  },
  getters: {
    getField,
  },
};
