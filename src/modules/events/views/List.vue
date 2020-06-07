<template>
  <div>
    <div class="top-bar">
      <div class="top-bar__user">
        <div class="top-bar__thumbnail mr-2">
          <div class="top-bar__burger mr-1">
            <span class="eva eva-menu-2-outline"></span>
          </div>
          <div class="top-bar__avatar">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=100"
            />
          </div>
        </div>
        <div class="top-bar__data">
          <sp-subtitle>24th Thu July</sp-subtitle>
          <sp-title size="medium" class="pt-0">Hello, Katherine</sp-title>
        </div>
      </div>
      <div class="top-bar__search mt-3">
        <sp-textbox
          type="password"
          v-model="password"
          icon="eva eva-search-outline"
          placeholder="Search"
          size="medium"
        />
      </div>
    </div>
    <sp-title size="small" class="pt-0 mb-1">
      Upcoming
    </sp-title>
    <SpIncomingEventCard />


    <sp-event-card-list 
    title="Recommended"
    :events="events"/> 

  </div>
</template>
<script>
import SpEventCardList from "@/components/organisms/o-sp-event-card-list"
import SpIncomingEventCard from "@/components/molecules/m-sp-incoming-event-card"
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
    SpIncomingEventCard
  },
  mounted() {
      this.$store.dispatch(`${namespace}/getEvents`)
  }
};
</script>
