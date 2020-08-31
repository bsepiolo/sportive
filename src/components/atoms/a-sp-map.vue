<template>
  <div id="locationPickerMap" class="texteditor__location-map"></div>
</template>

<script>
import * as actions from "../../store/action_types";
import { mapActions, mapState } from "vuex";
const name = "EventsStore";
export default {
  methods: {
    ...mapActions(name, {
      findRouteDistance: actions.FIND_ROUTE_DISTANCE,
      setUserLocation: actions.SET_USER_LOCATION,
      setMap: actions.SET_MAP,
    }),
  },
  computed: {
    ...mapState(name, ["location"]),
  },
  mounted() {
    this.setMap();
    this.setUserLocation();

    this.location.map.on("click", (event) => {
      this.findRouteDistance(event);
    });
  },
};
</script>

<style lang="scss" scoped>
.texteditor__location-map {
  background: $gray100;
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
</style>
