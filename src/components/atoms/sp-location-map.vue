<template>
  <div id="locationPickerMap" class="texteditor__location-map"></div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const name = "EventsStore";
export default {
  methods: {
    ...mapActions(name, [
      "calculateRoute",
      "setUserLocation",
      "setMap",
    ]),
  },
  computed: {
    ...mapState(name, ["location"]),
  },
  mounted() {
    this.setMap();
    this.setUserLocation();

    this.location.map.on("click", (event) => {
      this.calculateRoute(event);
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
