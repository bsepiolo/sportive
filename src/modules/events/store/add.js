import Vue from "vue";
import * as mutation from "@/store/mutation_types";
import * as action from "@/store/action_types";
import mapService from "../services";
export const EventsStore = {
  namespaced: true,
  state: {
    form: {},
    events: [],
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
    disciplinesDictionary: []
  },
  actions: {
    [action.SET_USER_LOCATION]({ state, commit, dispatch }) {
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
          dispatch(action.FIND_LOCATION_BY_COORDS, { lat, lng });
        } catch (error) {
          console.error(error);
        }
      })();

      if (location.marker) {
        commit(mutation.REMOVE_MARKER);
        commit(mutation.REMOVE_DISTANCE_AND_TIME);
      }
    },
    [action.ADD_EVENT]({ state, rootState }) {
      rootState.db
        .collection("events")
        .add(state.form)
        .then((data) => {
          console.log(data.data());
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`);
        });
    },
    async [action.FIND_LOCATION_BY_COORDS]({ commit }, payload) {
      try {
        const { data } = await mapService.getLocationByCoords(payload);
        const [addresses] = data.addresses;
        const { position, address } = addresses;
        const locationName = `${
          address.localName
        }, ${address.streetNameAndNumber || ""}`;

        commit(mutation.SET_LOCATION_COORDS_SEARCH_RESULTS, { locationName, position });
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FIND_LOCATION_BY_NAME]({ commit, state }, payload) {
      
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

        commit(mutation.SET_LOCATION_SEARCH_RESULTS, locationSearchResults);
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FETCH_EVENTS]({ commit, rootState }) {
      try {
        const { docs: events } = await rootState.db.collection("events").get();

        const eventsArray = events.map((e) => {
          return {...e.data(), id: e.id};
        });

        commit(mutation.SET_EVENTS, eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FETCH_EVENT_DISCIPLINES]({ rootState, commit }) {
      try {
        const {docs} = await rootState.db.collection("dictionaries").doc("disciplines").collection("discipline").get();
        
        const disciplinesDictionary = docs.map(e=>{
         const data = e.data()
         return {id: e.id, name: data.name}
        })

        commit(mutation.SET_EVENT_DISCIPLINES, disciplinesDictionary)
      } catch (err) {
        console.log(err);
      }
    },
    [action.SET_MAP]({ commit, state, rootState }) {
      const { tt } = state;
      const map = tt.map({
        key: rootState.tomtomKey,
        container: "locationPickerMap",
        style: "tomtom://vector/1/basic-main",
        zoom: 15,
      });
      commit(mutation.SET_MAP, map);
    },
    async [action.FIND_ROUTE_DISTANCE](
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

        location.marker && commit(mutation.REMOVE_MARKER);

        commit(mutation.SET_MARKER, [lng, lat]);

        dispatch(action.FIND_LOCATION_BY_COORDS, { lng, lat });

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
    [mutation.SET_EVENT_DISCIPLINES]({ disciplinesDictionary }, payload) {
      disciplinesDictionary
      disciplinesDictionary.push(...payload); 
    },
    [mutation.SET_EVENTS]({ events }, payload) {
      events;
      events.push(...payload);
      debugger
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
    [mutation.REMOVE_DISTANCE_AND_TIME]({ location }) {
      location.distance = location.time = null;
    },
    [mutation.REMOVE_LOCATION_SEARCH_RESULTS]({ location }) {
      location.locationSearchResults = [];
    },
    [mutation.SET_LOCATION_SEARCH_RESULTS]({ location }, payload) {
      location.locationSearchResults = payload;
    },
    [mutation.SET_MAP]({ location }, payload) {
      location.map = payload;
    },
    [mutation.REMOVE_LOCATION]({ location, form }) {
      form.location = {};
      form.location.distance = form.location.time = null;
      location.locationSearchResults = [];
      location.distance = location.time = null;
    },
    [mutation.SET_LOCATION_COORDS_SEARCH_RESULTS]({ form }, payload) {
      form.location = payload;
    },
    [mutation.ADD_FORM_FIELD]({ form }, { name, type }) {
      Vue.set(form, name, type !== "text" ? "" : null);
    },
    [mutation.REMOVE_LOCATION_COORDS_SEARCH_RESULTS]({ form }) {
      form.location = { name: "", coords: { lat: 0, lon: 0 } };
    },
    [mutation.SET_FORM_FIELD]({ form }, { name, value }) {
      form[name] = value;
    },
    [mutation.REMOVE_MAP]({ location }) {
      location.map.remove();
      location.map = null;
    },
    [mutation.SET_MARKER]({ location, tt }, payload) {
      location.marker = new tt.Marker().setLngLat(payload).addTo(location.map);
    },
    [mutation.REMOVE_MARKER]({ location }) {
      if (location.marker) {
        location.marker.remove();
        location.marker = null;

        location.map.getLayer("route") && location.map.removeLayer("route");
        location.map.getSource("route") && location.map.removeSource("route");
      }
    },
  },
};
