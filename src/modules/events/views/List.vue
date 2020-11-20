<template>
  <div>
    <a-sp-title size="small" class="pt-0 mb-2 mt-2">
      Upcoming
    </a-sp-title>

    <sp-incoming-event-card />

    <sp-event-card-list class="mt-2" title="Created by You" :events="events.my" />
    <sp-event-card-list class="mt-2" title="Your participation" :events="events.participate" />
  </div>
</template>
<script>
import SpEventCardList from "@/components/organisms/o-sp-event-card-list";
import SpIncomingEventCard from "@/components/molecules/m-sp-incoming-event-card";
import * as actions from "@/store/action_types";
import { mapState, mapActions } from "vuex";
const namespace = "EventsStore";
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
    ...mapActions(namespace, { fetchMyEvents: actions.FETCH_MY_EVENTS, fetchParticipateEvents: actions.FETCH_PARTICIPATE_EVENTS }),
  },
  mounted() {
    this.fetchMyEvents();
    this.fetchParticipateEvents();
  },
};
</script>
