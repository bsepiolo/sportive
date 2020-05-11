<template>
  <div id="locationPickerMap" class="location-picker__map"></div>
</template>

<script>
export default {
  data() {
    return {
      content: this.value,
      location: { lat: 0, lon: 0 },
      results: null,
      currentVal: null,
      distance: null,
      localization: "test",
      mapVisible: false,
    };
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
      vm.location.lat = data.latitude;
      vm.location.lon = data.longitude;
      map.setCenter({ lat: vm.location.lat, lng: vm.location.lon });
      new tt.Marker().setLngLat([vm.location.lon, vm.location.lat]).addTo(map);
    });

    const map = tt.map({
      key: "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63",
      container: "locationPickerMap",
      style: "tomtom://vector/1/basic-main",
      zoom: 15,
    });
    let marker;

    map.on("click", function(event) {
      // var lngLat = new tt.LngLat(event.lngLat.lng, event.lngLat.lat);

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
          vm.distance = response.routes[0].summary.lengthInMeters / 1000;
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
      debugger;

      marker = new tt.Marker()
        .setLngLat([event.lngLat.lng, event.lngLat.lat])
        .addTo(map);

      vm.$emit("getLocationByCoords", {
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
      });
    });
    map.once("load", function() {});
  },
};
</script>

<style></style>
