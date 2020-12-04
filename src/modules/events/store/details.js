import Vue from "vue";
import * as mutation from "@/store/mutation_types";
import * as action from "@/store/action_types";
import mapService from "../services";
export const EventsDetailsStore = {
  namespaced: true,
  state: {
    form:{},
    event: {},
    tt: window.tt,
    location: {
      distance: 0,
      time: 0,
      marker: null,
      map: null,
      current: { lat: 0, lon: 0 },
    },
  },
  actions: {
    async [action.FIND_LOCATION_BY_COORDS]({ commit, rootState }, payload) {
      try {
        const { data } = await mapService.getLocationByCoords(payload);
        const [addresses] = data.addresses;
        const { address } = addresses;
        const name = `${address.localName}, ${address.streetNameAndNumber ||
          ""}`;
        debugger;
        commit(mutation.SET_LOCATION_COORDS_SEARCH_RESULTS, {
          name,
          position: new rootState.firebase.firestore.GeoPoint(
            payload.lat,
            payload.lng
          ),
        });
      } catch (err) {
        console.log(err);
      }
    },
    [action.SET_USER_LOCATION]({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        const { location, tt } = state;
        debugger;
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
            debugger;
            state.location.map.setCenter({ lat, lng });

            new tt.Marker().setLngLat([lng, lat]).addTo(state.location.map);
            dispatch(action.FIND_LOCATION_BY_COORDS, { lat, lng });
            resolve();
          } catch (error) {
            console.error(error);
            reject();
          }
        })();
        debugger;
        if (location.marker && location.map) {
          commit(mutation.REMOVE_MARKER);
          commit(mutation.REMOVE_DISTANCE_AND_TIME);
        }
      });
    },
    async [action.ADD_EVENT_MEMBER]({ rootState }, { id }) {
      const user = await rootState.db
        .collection("users")
        .doc(rootState.user.uid);

      try {
        await rootState.db
          .collection("events")
          .doc(id)
          .update({
            attendees: rootState.firebase.firestore.FieldValue.arrayUnion(user),
          });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}, ${errorMessage}`);
      }
    },
    async [action.FETCH_EVENT]({ rootState, commit }, id) {
      try {
        const eventSnapShot = await rootState.db
          .collection("events")
          .doc(id)
          .get();
        debugger;
        const eventData = eventSnapShot.data();

        const eventAuthorRef = eventData.author;
        const eventAuthor = await eventData.author.get();

        eventData.author = eventAuthor.data();

        commit(mutation.SET_EVENT, {
          id: eventSnapShot.id,
          authorRef: eventAuthorRef,
          ...eventData,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [action.SET_MAP]({ commit, state, rootState }) {
      return new Promise((resolve) => {
        const { tt } = state;
        const map = tt.map({
          key: rootState.tomtomKey,
          container: "locationPickerMap",
          style: "tomtom://vector/1/basic-main",
          zoom: 14,
        });

        commit(mutation.SET_MAP, map);
        resolve();
      });
    },
    async [action.FIND_ROUTE_DISTANCE](
      { commit, dispatch, state, rootState },
      { lngLat: { lng, lat } }
    ) {
      debugger;
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
        location.map.on("load", (e) => {
          debugger
          e.target.setCenter({ lng, lat })
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
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    [mutation.SET_EVENT](state, payload) {
      Vue.set(state, "event", payload);
    },
    [mutation.REMOVE_EVENT](state) {
      state.event = {};
    },
    [mutation.REMOVE_MAP]({ location }) {
      debugger
      location.map.remove();
      location.map = null;
    },
    [mutation.SET_MAP]({ location }, payload) {
      location.map = payload;
    },
    [mutation.SET_MARKER]({ location, tt }, payload) {
      location.marker = new tt.Marker().setLngLat(payload).addTo(location.map);
    },
    [mutation.SET_DISTANCE]({ location }, payload) {
      location.distance = payload;
    },
    [mutation.SET_TIME]({ location }, payload) {
      location.time = payload;
    },
    [mutation.SET_LOCATION_SEARCH_RESULTS]({ location }, payload) {
      location.locationSearchResults = payload;
    },
    [mutation.SET_LOCATION]({ location }, { latitude: lat, longitude: lon }) {
      location.current = { lat, lon };
    },
    [mutation.SET_LOCATION_COORDS_SEARCH_RESULTS]({ form }, payload) {
      form.location = payload;
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
