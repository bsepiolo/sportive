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
    <div class="events-list__upcoming">
      <div class="events-list__icon events-list__icon--color-reverse">
        <i class="icon-soccer"></i>
      </div>
      <div class="events-list__data">
        <sp-title size="medium">
          Football sparing 5x5
        </sp-title>
        <sp-subtitle class="pt-0">
          Sienkiewicza 22
        </sp-subtitle>
        <div class="time-counter mt-1">
          <span class="time-counter__el">2h</span>
          <span class="time-counter__separator">:</span>
          <span class="time-counter__el">15m</span>
        </div>
        <img class="events-list__image" src="../../../assets/img/player.png" />
      </div>
    </div>
    <sp-title size="small" class="mt-3 mb-1">
      Your participation
    </sp-title>

    <div class="events-list">
      <sp-event-card />
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
    </div>
    <sp-header size="small" class="mt-3 mb-1">
      Recommended
    </sp-header>
{{events}}
    <div class="events-list">
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
    </div>
  </div>
</template>
<script>
import SpEventsListEl from "../components/sp-event-list-el/sp-event-list-el";
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
    SpEventsListEl,
  },
  mounted() {
      this.$store.dispatch(`${namespace}/getEvents`)
  }
};
</script>
