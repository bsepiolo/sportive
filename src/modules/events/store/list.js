// import Vue from "vue";
import * as mutation from "@/store/mutation_types";
import * as action from "@/store/action_types";
export const EventsListStore = {
  namespaced: true,
  state: {
    events: {
      my: [],
      participate: [],
      recommended: [],
      upcoming: {},
    },
    tt: window.tt,
  },
  actions: {
    async [action.FETCH_UPCOMING_EVENT]({ commit, rootState }) {
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);

        const {
          docs: [event],
        } = await rootState.db
          .collection("events")
          .where("author", "==", user)
          .orderBy("date", "asc")
          .limit(1)
          .get();

        if (event) {
          let eventObj = { ...event.data(), id: event.id };

          const author = await eventObj.author.get();
          eventObj.author = author.data();

          const discipline = await eventObj.discipline.get();
          eventObj.discipline = discipline.data();

          commit(mutation.SET_UPCOMING_EVENT, eventObj);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async [action.FETCH_RECOMMENDED_EVENTS]({ rootState, commit }) {
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);


        const getCurrentPosition = (options = {}) => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
          });
        };
        
        let location;

        await (async () => {
          try {
            const { coords } = await getCurrentPosition();
            const { latitude: lat, longitude: lng } = coords;
  debugger
          location = {lat, lon: lng };
  
          } catch (error) {
            console.error(error);
          }
        })()


        debugger;
        const distance = 10;
        let lat = 0.0233238261;
        let lon = 0.0292608;

        let lowerLat = location.lat - lat * distance;
        let lowerLon = location.lon - lon * distance;

        let greaterLat = location.lat + lat * distance;
        let greaterLon = location.lon + lon * distance;

        var lesserGeopoint = new rootState.firebase.firestore.GeoPoint(
          lowerLat,
          lowerLon
        );
        var greaterGeopoint = new rootState.firebase.firestore.GeoPoint(
          greaterLat,
          greaterLon
        );

        const filteredByLocation = (
          await rootState.db
            .collection("events")
            .where("location.position", ">=", lesserGeopoint)
            .where("location.position", "<=", greaterGeopoint)
            .get()
        ).docs;

        const filteredByAttendee = (
          await rootState.db
            .collection("eventsAttendees")
            .where("attendeeRef", "!=", user)
            .get()
        ).docs;

        if (filteredByAttendee.length && filteredByLocation.length) {
          const ev = filteredByLocation.filter((e) => {
            return filteredByAttendee.filter((x) => {
              e.data().author != x.data().authorRef;
            });
          });
          let arr = [];
          await Promise.all(
            ev.map(async (e, index) => {
              arr.push({ ...e.data(), id: e.id });
              const author = await arr[index].author.get();
              const discipline = await arr[index].discipline.get();
              arr[index].author = author.data();
              arr[index].discipline = discipline.data();
            })
          );
          commit(mutation.SET_RECOMMENDED_EVENTS, arr);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FETCH_MY_EVENTS]({ commit, rootState }) {
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);

        const { docs: events } = await rootState.db
          .collection("events")
          .where("author", "==", user)
          .get();

        let eventsArray = events.map((e) => {
          return { ...e.data(), id: e.id };
        });
        //to do
        eventsArray.map(async (e) => {
          e.author = (await e.author.get()).data();
          e.discipline = (await e.discipline.get()).data();

          return e;
        });

        commit(mutation.SET_MY_EVENTS, eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FETCH_PARTICIPATE_EVENTS]({ commit, rootState }) {
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);

        const docs = await rootState.db
          .collection("eventsAttendees")
          .where("user", "==", user)
          .get();
        const eventsArray = [];

        docs.forEach(async (e) => {
          let event = (
            await rootState.db
              .collection("events")
              .doc(e.id)
              .get()
          ).data();
          if (event.author.id != user.id) {
            event.author = (await event.author.get()).data();
            event.discipline = (await event.discipline.get()).data();

            eventsArray.push({
              id: e.id,
              ...event,
            });
          }
        });
        commit(mutation.SET_PARTICIPATE_EVENTS, eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    [mutation.SET_MY_EVENTS]({ events }, payload) {
      events;
      events.my = payload;
    },
    [mutation.SET_PARTICIPATE_EVENTS]({ events }, payload) {
      events;
      events.participate = payload;
    },
    [mutation.SET_UPCOMING_EVENT]({ events }, payload) {
      events;
      events.upcoming = payload;
    },
    [mutation.SET_RECOMMENDED_EVENTS]({ events }, payload) {
      events;
      events.recommended = payload;
    },
  },
};
