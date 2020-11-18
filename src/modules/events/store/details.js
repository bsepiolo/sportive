import Vue from "vue";
import * as mutation from "@/store/mutation_types";
import * as action from "@/store/action_types";
import mapService from "../services";
export const EventDetailsStore = {
  namespaced: true,
  state: {
    event: {},
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
    async [action.FETCH_EVENT]({ rootState, commit }, id) {
      try {
        
        const eventSnapShot = await rootState.db.collection("events").doc(id).get();
  
        const eventData = eventSnapShot.data();
        const eventAuthor = await eventData.author.get()

        // const disciplinesDictionary = docs.map(e=>{
        //  const data = e.data()
        //  return {id: e.id, name: data.name}
        // })
        eventData.author = eventAuthor.data();
        
        commit(mutation.SET_EVENT, {...eventData})
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
    [mutation.SET_EVENT](state, payload) {
      Vue.set(state, 'event', payload)
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
