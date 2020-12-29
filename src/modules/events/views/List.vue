<template>
  <div>
    <sp-incoming-event-card
      title="Upcoming"
      @click="
        $router.push({
          name: 'events.details',
          params: { id: events.upcoming.id },
        })
      "
      :event="events.upcoming"
      v-if="notEmptyObject(events.upcoming)"
    />

    <sp-event-card-list
      class="mt-2"
      title="Created by You"
      :events="events.my"
      size="small"
      v-if="!!events.my.length"
    />
    <sp-event-card-list
      class="mt-2"
      title="Your participation"
      :events="events.participate"
      v-if="!!events.participate.length"
    />
    <sp-event-card-list
      class="mt-2 mb-10"
      title="Recommended"
      :events="events.recommended"
      v-if="!!events.recommended.length"
    />
  </div>
</template>
<script>
import SpEventCardList from "@/components/organisms/o-sp-event-card-list";
import SpIncomingEventCard from "@/components/molecules/m-sp-incoming-event-card";
import * as actions from "@/store/action_types";
import { mapState, mapActions } from "vuex";
const namespace = "EventsListStore";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(namespace, ["events"]),
  },
  components: {
    SpEventCardList,
    SpIncomingEventCard,
  },
  methods: {
    ...mapActions(namespace, {
      fetchMyEvents: actions.FETCH_MY_EVENTS,
      fetchParticipateEvents: actions.FETCH_PARTICIPATE_EVENTS,
      fetchUpcomingEvent: actions.FETCH_UPCOMING_EVENT,
      fetchRecommendedEvents: actions.FETCH_RECOMMENDED_EVENTS,
    }),
  },
  mounted() {
    this.fetchUpcomingEvent();
    this.fetchMyEvents();
    this.fetchParticipateEvents();
    this.fetchRecommendedEvents();
  },
};
</script>
