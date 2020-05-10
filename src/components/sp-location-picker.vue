<template>
  <div class="textbox location-picker">
    <label class="textbox__label" v-if="label">{{ label }}</label>
    <i :class="icon" v-if="icon"></i>
    <textarea
      @keydown="handleInput"
      @input="handleInput"
      @focus="handleBlur"
      class="textbox__input location-picker__input"
      :class="{
        'textbox__input--medium': size == 'medium',
        'textbox__input--icon': icon,
        'is-focused': isActive
      }"
      :type="type"
      :placeholder="placeholder"
    ></textarea>
    <ul v-if="results">
      <li v-for="(item, index) in results" :key="index">
        {{ item.poi.name }} {{ item.dist }}
      </li>
    </ul>
    
    <div id="locationPickerMap" v-show="isActive" class="location-picker__map"></div>
  </div>
</template>
<script>
export default {
  props: ["label", "placeholder", "icon", "type", "value", "size", "is-active"],
  data() {
    return {
      content: this.value,
      location: { lat: 0, lon: 0 },
      results: null,
      currentVal: null,
      distance: null,
    };
  },
  methods: {
    handleBlur: function(){
      this.$emit('focus')
    },
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    },
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
          map.addLayer(
            {
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
            }
          );
        });

      if (marker) {
        marker.remove();
        marker = null;
      }
      debugger;

      marker = new tt.Marker()
        .setLngLat([event.lngLat.lng, event.lngLat.lat])
        .addTo(map);

      vm.$emit("getLocationByCoords", {lng: event.lngLat.lng, lat: event.lngLat.lat});
      
    });
    map.once("load", function() {});
  },
};
</script>
<style lang="scss" scoped>
.location-picker {
  &-input.is-focused {
    position: absolute;
    z-index: 9999;
    top: 0;
  }
  &__map {
    position: fixed;
    z-index: 999;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
  }
}
</style>
