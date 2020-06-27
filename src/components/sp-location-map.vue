<template>
  <div id="locationPickerMap" class="texteditor__location-map"></div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
const name = "EventsStore";
export default {
  methods: {
    ...mapActions(name, [
      "getLocationByCoords",
      "calculateRoute",
      "setUserLocation",
    ]),
    ...mapMutations(name, [
      "setMap",
      "setLocation",
      "setDistance",
      "setTime",
      "setMap",
      "setMarker",
      "removeMarker",
    ]),
  },
  computed: {
    ...mapState(name, ["location", "form"]),
  },
  created() {},
  mounted() {
    let vm = this;
    // const tt = window.tt;
      this.setMap();
      this.setUserLocation();
      // let geolocation = new Promise((resolve, reject) => {
      //   navigator.geolocation.getCurrentPosition(
      //     (position) => {
      //       resolve(position.coords);
      //     },
      //     (error) => {
      //       reject(error);
      //     }
      //   );
      // }).catch((error) => error);

      // geolocation.then((data) => {
      //   vm.setLocation({ latitude: data.latitude, longitude: data.longitude });
      //   vm.location.map.setCenter({ lat: data.latitude, lng: data.longitude });
      //   new tt.Marker().setLngLat([data.longitude, data.latitude]).addTo(vm.location.map);
      //   vm.getLocationByCoords({ lat: data.latitude, lng: data.longitude })
      // });

      this.location.map.on("click", function(event) {
        vm.calculateRoute(event);
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
