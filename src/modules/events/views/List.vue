<template>
  <div>
    <sp-top-bar />
    <sp-title size="small" class="pt-0 mb-2 mt-2">
      Upcoming
    </sp-title>
    <SpIncomingEventCard />


    <sp-event-card-list 
    class="mt-2"
    title="Recommended"
    :events="events"/> 

  </div>
</template>
<script>
import SpEventCardList from "@/components/organisms/o-sp-event-card-list"
import SpIncomingEventCard from "@/components/molecules/m-sp-incoming-event-card"
import SpTopBar from "@/components/organisms/o-sp-top-bar"
import {mapState} from "vuex"
const namespace = "EventsStore";
export default {
  data(){
    return{}
  },
  computed: {
    ...mapState(namespace, ['events'])
  },
  components: {
    SpEventCardList,
    SpIncomingEventCard,
    SpTopBar
  },
  mounted() {
      this.$store.dispatch(`${namespace}/getEvents`)
  }
};
</script>
