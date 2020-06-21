<template>
  <div class="m-location-editor" :class="{ 'is-focused': mapVisible }">
    <div class="m-location-editor__container">
      <div class="m-location-editor__input">
        <sp-icon
          :icon="icon"
          class="ml-2"
          :class="{ 'm-location-editor__icon': mapVisible }"
          :absolute="true"
          :color="iconColor"
          v-if="!mapVisible || (!form.location.name && mapVisible)"
        />
        <sp-icon
          icon="eva eva-close-outline"
          class="ml-2"
          :class="{ 'm-location-editor__icon': mapVisible }"
          :absolute="true"
          color="default"
          @click="clearInput"
          v-if="form.location.name && mapVisible"
        />
        <sp-textarea
          :placeholder="placeholder"
          :value="value.name"
          @input="findLocation($event), handleInput($event)"
          @focus="handleBlur"
          :type="type"
          :size="size"
          :shadowDisabled="mapVisible"
          :class="{ 'is-active': mapVisible }"
        />
      </div>
      <div
        class="m-location-editor__details"
        v-if="location.distance || location.time"
      >
        Distance: {{ location.distance }}km Time: {{ location.time }}minutes
      </div>
    </div>
    <sp-card
      ratio="wide"
      v-if="location.locationSearchResults.length"
      z-index="max"
    >
      <sp-list @click="selectItem" :items="location.locationSearchResults" />
    </sp-card>
    <sp-map v-if="mapVisible" />
  </div>
</template>
<script>
import SpMap from "./sp-location-map";
import SpCard from "./atoms/a-sp-card";
import SpList from "./molecules/m-sp-list";
import _ from "lodash";
import { mapActions, mapState, mapMutations } from "vuex";
const name = "EventsStore";

export default {
  props: [
    "label",
    "placeholder",
    "icon",
    "type",
    "value",
    "size",
    "dropdownSource",
    "is-active",
  ],
  data() {
    return {
      content: this.value,
      results: null,
      currentVal: null,
      localization: "test",
      mapVisible: false,
      iconColor: "default",
      showClearButton: false,
    };
  },
  computed: {
    ...mapState(name, ["form", "location"]),
  },
  methods: {
    handleBlur: function() {
      this.mapVisible = true;
      this.iconColor = "primary";
      this.$emit("focus");
    },
    clearInput: function() {
      this.$store.commit(`${name}/clearLocationName`);
      this.$store.commit(`${name}/clearLocationSearchResults`);
      debugger;
      this.$emit("input", "");
      this.showClearButton = false;

      if (this.location.marker) {
        this.removeMarker();
      }
    },
    handleInput: function(e) {
      this.$emit("input", e);
    },
    selectItem(e) {
      debugger;
      let locationName = `${e.address.streetName || "Address unknown"} ${e
        .address.streetNumber || ""}, ${e.address.municipality}`;
      this.setLocationCoordsSearchResults(locationName);
      this.calculateRoute({
        lngLat: { lng: e.position.lon, lat: e.position.lat },
      });
      this.location.map.setCenter({ lat: e.position.lat, lng: e.position.lon });

      this.$store.commit(`${name}/clearLocationSearchResults`);
    },
    ...mapMutations(name, ["removeMarker", "setLocationCoordsSearchResults"]),
    ...mapActions(name, [
      "getLocationByCoords",
      "getLocationsByName",
      "calculateRoute",
    ]),
    findLocation: _.debounce(function(e) {
      if (e.length > 2) {
        debugger;
        this.getLocationsByName(e);
      }
    }, 400),
  },

  components: {
    SpMap,
    SpCard,
    SpList,
  },
};
</script>
<style lang="scss" scoped>
.m-location-editor {
  &__clear-button {
    right: $space-size-2;
  }
  &.is-focused {
    position: absolute;
    top: $space-size-4;
    width: calc(100% - 48px);
    .m-location-editor__icon {
      position: absolute;
      z-index: 99999999;
    }
    .m-location-editor__input {
      background: $white;
      margin: 0;
    }
    .m-location-editor__container {
      background: $white;
    }
  }
  &__container {
    margin-bottom: $space-size;
    display: flex;
    position: relative;
    flex-direction: column;
    position: relative;
    z-index: 9999;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $box-shadow;
  }
  &__input {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__details {
    background: $gray150;
    position: relative;
    z-index: 9999;
    width: 100%;
    padding: $space-size;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
  &__results-list {
    background: $white;
    position: relative;
    z-index: 9999;
  }
}
</style>
