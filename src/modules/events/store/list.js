import * as mutation from "@/store/mutation_types";
import * as action from "@/store/action_types";
export const EventsListStore = {
  namespaced: true,
  state: {
    events: {
      my: [],
      participate: [],
      recommended: [],
      upcoming: [],
    },
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
        debugger;

        let eventObj = { ...event.data(), id: event.id };

        const author = await eventObj.author.get();
        eventObj.author = author.data();

        const discipline = await eventObj.discipline.get();
        eventObj.discipline = discipline.data();

        commit(mutation.SET_UPCOMING_EVENT, eventObj);
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
        await Promise.all(
          eventsArray.map(async (e) => {
            const author = await e.author.get();
            e.author = author.data();

            const discipline = await e.discipline.get();
            e.discipline = discipline.data();

            return e;
          })
        );
        debugger;
        commit(mutation.SET_MY_EVENTS, eventsArray);
      } catch (err) {
        console.log(err);
      }
    },
    async [action.FETCH_PARTICIPATE_EVENTS]({ commit, rootState }) {
      try {
        const user = rootState.db.collection("users").doc(rootState.user.uid);

        const { docs: events } = await rootState.db
          .collection("events")
          .where("participators", "array-contains", user)
          .get();

        const eventsArray = events.map((e) => {
          return { ...e.data(), id: e.id };
        });
        await Promise.all(
          eventsArray.map(async (e) => {
            const author = await e.author.get();
            const discipline = await e.discipline.get();

            e.author = author.data();
            e.discipline = discipline.data();

            return e;
          })
        );
        debugger;
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
  },
};
