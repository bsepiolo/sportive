// import * as firebase from "firebase/app";
import Vue from "vue";
import "firebase/firestore";
import { getField, updateField } from "vuex-map-fields";

export const EventsStore = {
  namespaced: true,
  state: {
    form: {
      location: {
        name: "",
        coords: { lat: 0, lon: 0 },
      },
    },
    events: null,
    location: {
      locationSearchResults: [],
      locationCoordsSearchResults: [],
      distance: 0,
      time: 0,
      marker: null,
      map: null,
      current: { lat: 0, lon: 0 },
    },
  },
  actions: {
    setUserLocation({ state, commit, dispatch }) {
      const tt = window.tt;
      const { location } = state;
      const getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

      (async function() {
        try {
          const { coords } = await getCurrentPosition();
          const { latitude: lat, longitude: lng } = coords;

          commit("setLocation", { latitude: lat, longitude: lng });

          state.location.map.setCenter({ lat, lng });

          new tt.Marker().setLngLat([lng, lat]).addTo(state.location.map);
          dispatch("getLocationByCoords", { lat, lng });
        } catch (error) {
          console.error(error);
        }
      })();

      if (location.marker) {
        commit("removeMarker");
        commit("clearDistanceAndTime");
      }
    },
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
    async getLocationByCoords({ commit }, { lng, lat }) {
      try {
        const { data } = await this._vm.$http.get(
          `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63`
        );
        const [addresses] = data.addresses;
        const { address } = addresses;

        const locationName = `${address.streetName ||
          "Address unknown"} ${address.streetNumber || ""}, ${
          address.municipality
        }`;

        commit("setLocationCoordsSearchResults", locationName);
      } catch (err) {
        console.log(err);
      }
    },
    async getLocationsByName({ commit, state }, payload) {
      const {
        location: { current },
      } = state;
      try {
        const { data } = await this._vm.$http.get(
          `https://api.tomtom.com/search/2/search/${payload}.json?key=T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63&countrySet=PL&lat=${current.lon}&radius=30000&idxSet=PAD,Addr,Str`
        );
        commit("setLocationSearchResults", data.results);
      } catch (err) {
        console.log(err);
      }
    },
    async getEvents({ commit, rootState }) {
      try {
        const { docs: events } = await rootState.db.collection("events").get();

        const eventsArray = events.map(({ data }) => {
          return data();
        });

        commit("setEvents", eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
    async calculateRoute(
      { commit, dispatch, state, rootState },
      { lngLat: { lng, lat } }
    ) {
      const tt = window.tt;
      const { location } = state;
      const { current } = location;

      try {
        let response = await tt.services
          .calculateRoute({
            key: rootState.tomtomKey,
            traffic: true,
            locations: `${current.lon},${current.lat}:${lng},${lat}`,
          })
          .go();

        var geojson = response.toGeoJson();

        const [routes] = response.routes;
        const {
          summary: { lengthInMeters, travelTimeInSeconds },
        } = routes;

        commit("setDistance", Math.round(lengthInMeters / 100) / 10);
        commit("setTime", Math.round(travelTimeInSeconds / 60));

        location.map.getLayer("route") && location.map.removeLayer("route");

        location.map.getSource("route") && location.map.removeSource("route");

        location.marker && commit("removeMarker");
        

        commit("setMarker", [lng, lat]);

        dispatch("getLocationByCoords", { lng, lat });

        location.map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          paint: {
            "line-color": "#4a90e2",
            "line-width": 8,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    updateField,
    setEvents({ events }, payload) {
      events;
      events = payload;
    },
    setLocation({ location }, { latitude: lat, longitude: lon }) {
      location.current = { lat, lon };
    },
    setTime({ location }, payload) {
      location.time = payload;
    },
    setLocationName({ form }, payload) {
      form.location.name = payload;
    },
    clearDistanceAndTime({ location }) {
      location.distance = location.time = null;
    },
    clearLocationName({ form }) {
      form.location = {
        name: "",
        coords: { lat: 0, lon: 0 },
      };
      form.location.distance = form.location.time = null;
    },
    setDistance({ location }, payload) {
      location.distance = payload;
    },
    setLocationSearchResults({ location }, payload) {
      location.locationSearchResults = payload;
    },
    clearLocationSearchResults({ location }) {
      location.locationSearchResults = [];
    },
    setLocationCoordsSearchResults({ form }, payload) {
      form.location = {
        name: payload,
        coords: { lat: 0, lon: 0 },
      };
    },
    registerFormField({ form }, { name, type }) {
      Vue.set(form, name, type !== "text" ? "" : null);
    },
    clearLocationCoordsSearchResults({ form }) {
      form.location = { name: "", coords: { lat: 0, lon: 0 } };
    },
    setFormField({ form }, { name, value }) {
      name == "location" ? (form.location.name = value) : (form.name = value);
    },
    setMap({ location }) {
      const tt = window.tt;
      location.map = tt.map({
        key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
        container: "locationPickerMap",
        style: "tomtom://vector/1/basic-main",
        zoom: 15,
      });
    },
    destroyMap({ location }) {
      location.map.remove();
      location.map = null;
    },
    setMarker({ location }, payload) {
      const tt = window.tt;
      location.marker = new tt.Marker().setLngLat(payload).addTo(location.map);
    },
    removeMarker({ location }) {
      if (location.marker) {
        location.marker.remove();
        location.marker = null;

        location.map.getLayer("route") && location.map.removeLayer("route");
        location.map.getSource("route") && location.map.removeSource("route");
      }
    },
  },
  getters: {
    getField,
  },
};
