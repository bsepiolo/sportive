import Vue from "vue";
import * as mutation from "./mutation_types";
import mapService from "../services";
export const EventsStore = {
  namespaced: true,
  state: {
    form: {},
    events: null,
    tt: window.tt,
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
      const { location, tt } = state;
      const getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

      (async () => {
        try {
          const { coords } = await getCurrentPosition();
          const { latitude: lat, longitude: lng } = coords;

          commit(mutation.SET_LOCATION, { latitude: lat, longitude: lng });

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
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`);
        });
    },
    async getLocationByCoords({ commit }, payload) {
      try {
        const { data } = await mapService.getLocationByCoords(payload);
        const [addresses] = data.addresses;
        const { position } = addresses;
        const { address } = addresses;
        const locationName = `${
          address.localName
        }, ${address.streetNameAndNumber || ""}`;

        commit("setLocationCoordsSearchResults", { locationName, position });
      } catch (err) {
        console.log(err);
      }
    },
    async getLocationsByName({ commit, state }, payload) {
      const {
        location: { current },
      } = state;
      try {
        const { data } = await mapService.getLocationsByName(current, payload);

        const locationSearchResults = data.results.map(
          ({ address, position }) => {
            let locationName = `${address.localName}, ${
              address.streetName
            } ${address.streetNumber || ""}`;

            return { locationName, position };
          }
        );

        commit("setLocationSearchResults", locationSearchResults);
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

        commit(mutation.SET_EVENTS, eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
    setMap({ commit, state, rootState }) {
      const { tt } = state;
      const map = tt.map({
        key: rootState.tomtomKey,
        container: "locationPickerMap",
        style: "tomtom://vector/1/basic-main",
        zoom: 15,
      });
      commit("setMap", map);
    },
    async calculateRoute(
      { commit, dispatch, state, rootState },
      { lngLat: { lng, lat } }
    ) {
      const { location, tt } = state;
      const { current } = location;

      try {
        let response = await tt.services
          .calculateRoute({
            key: rootState.tomtomKey,
            traffic: true,
            locations: `${current.lon},${current.lat}:${lng},${lat}`,
          })
          .go();

        const geojson = response.toGeoJson();

        const [routes] = response.routes;
        const {
          summary: { lengthInMeters, travelTimeInSeconds },
        } = routes;

        commit(mutation.SET_DISTANCE, Math.round(lengthInMeters / 100) / 10);
        commit(mutation.SET_TIME, Math.round(travelTimeInSeconds / 60));

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
    [mutation.SET_EVENTS]({ events }, payload) {
      events;
      events = payload;
    },
    [mutation.SET_LOCATION]({ location }, { latitude: lat, longitude: lon }) {
      location.current = { lat, lon };
    },
    [mutation.SET_DISTANCE]({ location }, payload) {
      location.distance = payload;
    },
    [mutation.SET_TIME]({ location }, payload) {
      location.time = payload;
    },
    [mutation.SET_LOCATION_NAME]({ form }, payload) {
      form.location = payload;
    },
    clearDistanceAndTime({ location }) {
      location.distance = location.time = null;
    },
    clearLocationSearchResults({ location }) {
      location.locationSearchResults = [];
    },
    setLocationSearchResults({ location }, payload) {
      location.locationSearchResults = payload;
    },
    setMap({ location }, payload) {
      location.map = payload;
    },
    clearLocation({ location, form }) {
      form.location = {};
      form.location.distance = form.location.time = null;
      location.locationSearchResults = [];
      location.distance = location.time = null;
    },
    setLocationCoordsSearchResults({ form }, payload) {
      form.location = payload;
    },
    registerFormField({ form }, { name, type }) {
      Vue.set(form, name, type !== "text" ? "" : null);
    },
    clearLocationCoordsSearchResults({ form }) {
      form.location = { name: "", coords: { lat: 0, lon: 0 } };
    },
    setFormField({ form }, { name, value }) {
      form[name] = value;
    },
    destroyMap({ location }) {
      location.map.remove();
      location.map = null;
    },
    setMarker({ location, tt }, payload) {
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
};
