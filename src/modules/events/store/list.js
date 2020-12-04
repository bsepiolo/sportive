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
      debugger;
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);
        // const userRef = rootState.firebase.auth().currentUser;
        // userRef;
        // const storageRef = rootState.firebase
        //   .storage()
        //   .ref(`avatars/${userRef.uid}.jpg`);
        // storageRef.getDownloadURL().then((img) => {
        //   userRef.updateProfile({
        //     photoURL: img,
        //   });
        // });
        // userRef.updateProfile({
        //   photoURL: storageRef
        // }
        // )
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
            debugger;
            location = { lat, lon: lng };
          } catch (error) {
            console.error(error);
          }
        })();

        debugger;
        const distance = 10;
        const lat = 0.0233238261;
        const lon = 0.0292608;

        const lowerLat = location.lat - lat * distance;
        const lowerLon = location.lon - lon * distance;

        const greaterLat = location.lat + lat * distance;
        const greaterLon = location.lon + lon * distance;

        const lesserGeopoint = new rootState.firebase.firestore.GeoPoint(
          lowerLat,
          lowerLon
        );
        const greaterGeopoint = new rootState.firebase.firestore.GeoPoint(
          greaterLat,
          greaterLon
        );

        let filteredByLocation = (
          await rootState.db
            .collection("events")
            .where("location.position", ">=", lesserGeopoint)
            .where("location.position", "<=", greaterGeopoint)
            .limit(10)
            .get()
        ).docs;
        debugger;
        filteredByLocation = filteredByLocation.filter((e) => {
          return e.data().author.id != user.id;
        });

        let events = [];
        filteredByLocation.forEach((x) => {
          let isValid = true;
          x.data().attendees.forEach((e) => {
            if (e.id == user.id) {
              isValid = false;
            }
          });
          if (isValid) {
            events.push(x);
          }
        });

        let arr = [];
        await Promise.all(
          events.map(async (e, index) => {
            arr.push({ ...e.data(), id: e.id });
            arr[index].author = (await arr[index].author.get()).data();
            arr[index].discipline = (await arr[index].discipline.get()).data();
          })
        );
        commit(mutation.SET_RECOMMENDED_EVENTS, arr);
        //}
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
          .collection("events")
          .where("attendees", "array-contains", user)
          .get();
        const eventsArray = [];

        docs.forEach(async (e) => {
          debugger;
          const event = e.data();
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
