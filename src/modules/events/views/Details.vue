<template>
  <div class="event">
    <div class="event__container">
      <a-sp-card
      class="p-2"
        ratio="wide"
        :minimized="messagesVisible"
        @click="messagesVisible = false"
      >
        <div
          class="events-list__icon"
          :class="{ 'mb-2': !messagesVisible, 'mr-2': messagesVisible }"
        >
          <i class="icon-basketball"></i>
        </div>
        <a-sp-title
          class="event__header"
          :size="messagesVisible ? 'small' : 'medium'"
        >
          {{ event.name }}
          <a-sp-button
            size="small"
            styling-mode="reversed"
            text="Join"
            type="primary"
            @click="handleJoinClick"
          />
        </a-sp-title>
        <template v-if="!messagesVisible">
          <div class="event__author mt-1">
            <a-sp-avatar class="mr-1" :image-src="event.author.photoURL" />
            <a-sp-text class="pt-0">
              {{ event.author.displayName }}
            </a-sp-text>
          </div>

          <m-sp-list class="mt-3">
            <m-sp-list-el icon="eva eva-calendar-outline">
              <a-sp-text>
                {{ moment(event.date.toDate()).format("MMMM Do YYYY") }}
              </a-sp-text>
              <a-sp-text size="small" color="light" class="mt-1">
                {{ moment(event.date.toDate()).format("hh:mm A") }}
              </a-sp-text>
            </m-sp-list-el>
            <m-sp-list-el icon="eva eva-people-outline" class="mt-2">
              <a-sp-text>
                Ongoing people
              </a-sp-text>
              <m-sp-avatar-list
                class="mt-1"
                :count="event.attendees.length"
                :items="[
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                  {
                    imageSrc:
                      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80',
                  },
                ]"
              />
            </m-sp-list-el>
            <m-sp-list-el icon="eva eva-map-outline" class="mt-2 mb-1">
              <a-sp-text>
                {{ event.location.name }}
              </a-sp-text>
              <!-- <a-sp-text size="small" color="light" class="mt-1">
                {{ event.location.name }}
              </a-sp-text> -->
            </m-sp-list-el>
          </m-sp-list>
        </template>
      </a-sp-card>
      <a-sp-card
        ratio="wide"
        :minimized="!messagesVisible"
        class="mt-1 mb-2"
        @click="messagesVisible = true"
      >
        <div
          class="events-list__icon"
          :class="{ 'mb-1': messagesVisible, 'mr-2': !messagesVisible }"
        >
          <i class="eva eva-message-square-outline"></i>
        </div>
        <a-sp-title :size="!messagesVisible ? 'small' : 'medium'">
          Messages
        </a-sp-title>
        <template v-if="messagesVisible">
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message message--owner">
            <div class="message__container">
              <p class="message__text">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Hello amigo
              </p>
            </div>
          </div>
          <div class="message">
            <a-sp-avatar
              image-src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&h=50&q=80"
              class="mr-1"
            />
            <div class="message__container">
              <div class="message__header">
                <a class="message__author mr-2" href="#">
                  John Kowalsky
                </a>
                <span class="message__date">
                  10 m. ago
                </span>
              </div>
              <p class="message__text mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                luctus eget ipsum a pulvinar. Etiam pellentesque enim eu feugiat
                lacinia.
              </p>
            </div>
          </div>
        </template>
      </a-sp-card>
    </div>

    <a-sp-map
      class="map"
      :location="location"
      :setUserLocation="setUserLocation"
      :setMap="setMap"
      :class="{ 'map--first-plan': mapFirstPlan }"
      @click="changeIndex"
      :calculateRouteOnLoad="true"
      @findRouteDistance="findRouteDistanceHandler(event)"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";

import * as actions from "@/store/action_types.js";
import * as mutations from "@/store/mutation_types.js";

const namespace = "EventsDetailsStore";
export default {
  name: "EventDetails",
  data() {
    return {
      messagesVisible: false,
      mapFirstPlan: false,
      currentPlace: null,
    };
  },
  computed: {
    ...mapState(namespace, ["event", "location"]),
  },
  methods: {
    ...mapActions(namespace, {
      findRouteDistance: actions.FIND_ROUTE_DISTANCE,
      setUserLocation: actions.SET_USER_LOCATION,
      setMap: actions.SET_MAP,
    }),
    ...mapActions(namespace, {
      fetchEvent: actions.FETCH_EVENT,
      addEventMember: actions.ADD_EVENT_MEMBER,
    }),
    ...mapMutations(namespace, {
      removeEvent: mutations.REMOVE_EVENT,
      removeMap: mutations.REMOVE_MAP,
      removeMarker: mutations.REMOVE_MARKER,
    }),
    changeIndex: function() {
      // alert("asf")
      this.mapFirstPlan = !this.mapFirstPlan;
    },
    handleJoinClick() {
      const {event:{id,authorRef}} = this;
      this.addEventMember({id, authorRef});
    },
    findRouteDistanceHandler() {
      this.findRouteDistance({
        lngLat: {
          lng: this.event.location.position.longitude,
          lat: this.event.location.position.latitude,
        },
      });
    },
  },
  mounted() {
    this.fetchEvent(this.$route.params.id);
  },
  destroyed() {
    this.removeEvent();
    this.removeMarker();
    this.removeMap();
  },
};
</script>
<style lang="scss" scoped>
.event {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__container {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0 24px;
  }
  &__author {
    display: flex;
  }
}
</style>
