<template>
  <div id="locationPickerMap" class="texteditor__location-map"></div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex"
const name = "EventsStore";
export default {
  data() {
    return {
      content: this.value,
      results: null,
      currentVal: null,
      distance: null,
      localization: "test",
      mapVisible: false
    };
  },
  methods:{
    ...mapActions(name, ["getLocationByCoords"]),
    ...mapMutations(name, ["setTime", "setDistance", "setLocation"])
  },
  computed:{
    ...mapState(name, ["location"])
  },
  mounted() {
    const tt = window.tt;
    let vm = this;
    let geolocation = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    }).catch((error) => error);

    geolocation.then((data) => {
      vm.setLocation({latitude: data.latitude, longitude: data.longitude})
      map.setCenter({ lat: data.latitude, lng: data.longitude });
      new tt.Marker().setLngLat([data.longitude, data.latitude]).addTo(map);
    });

    const map = tt.map({
      key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
      container: "locationPickerMap",
      style: "tomtom://vector/1/basic-main",
      zoom: 15,
    });
    let marker;

    map.on("click", function(event) {
debugger
      tt.services
        .calculateRoute({
          key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
          traffic: true,
          locations: `${vm.location.lon},${vm.location.lat}:${event.lngLat.lng},${event.lngLat.lat}`,
        })
        .go()
        .then(function(response) {
          var geojson = response.toGeoJson();
          debugger;
          vm.setDistance(Math.round(response.routes[0].summary.lengthInMeters / 100) / 10);
          vm.setTime(Math.round(response.routes[0].summary.travelTimeInSeconds / 60));
          
          if (map.getLayer("route")) {
            map.removeLayer("route");
          }
          if (map.getSource("route")) {
            map.removeSource("route");
          }
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            paint: {
              "line-color": "#4a90e2",
              "line-width": 8,
            },
          });
        });

      if (marker) {
        marker.remove();
        marker = null;
      }

      marker = new tt.Marker()
        .setLngLat([event.lngLat.lng, event.lngLat.lat])
        .addTo(map);

      vm.getLocationByCoords({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
      });
    });
    map.once("load", function() {});
  },
};
</script>

<style lang="scss" scoped>
  .texteditor__location-map{
    background: $gray100;
        position: fixed;
    z-index: 999;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
  }
</style>
