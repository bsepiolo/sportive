<template>
  <div
    class="m-location-editor"
    :class="{
      'is-focused': mapVisible,
      'is-filled': location.distance && location.time,
    }"
  >
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
          :value="inputValue"
          @input="findLocation($event), handleInput($event)"
          @focus="handleFocus"
          :type="type"
          :size="size"
          :shadowDisabled="mapVisible || (location.distance && location.time)"
          :class="{ 'is-active': mapVisible }"
        />
        <sp-icon
          icon="eva eva-compass-outline"
          class="ml-2"
          :class="{ 'm-location-editor__clear-button': mapVisible }"
          :absolute="true"
          v-if="mapVisible"
          @click="setUserLocation"
        />
      </div>
      <div
        class="m-location-editor__details"
        v-if="location.distance || location.time"
      >
        <sp-text
          >Distance: {{ location.distance }}km Time:
          {{ location.time }}minutes</sp-text
        >
      </div>
    </div>
    <sp-card
      ratio="wide"
      v-if="location.locationSearchResults.length"
      z-index="max"
    >
      <sp-list @click="selectItem" :items="location.locationSearchResults" />
    </sp-card>
    <sp-button
      text="Accept"
      type="primary"
      class="m-location-editor__submit"
      :full-width="true"
      v-if="mapVisible"
      @click="closeMap"
    />

    <sp-map v-if="mapVisible || form.location.name" v-show="mapVisible" />
  </div>
</template>
<script>
import SpMap from "../atoms/sp-location-map";
import SpCard from "../atoms/a-sp-card";
import SpList from "../molecules/m-sp-list";
import SpButton from "../atoms/a-sp-button";
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
    inputValue() {
      return this.$store.state["EventsStore"].form["location"].name;
    }
  },
  methods: {
    handleFocus() {
      this.mapVisible = true;
      this.iconColor = "primary";
      this.$emit("focus");
    },
    clearInput() {
      this.clearLocationName();
      this.clearLocationSearchResults();
      this.$emit("input", "");
      this.showClearButton = false;

      if (this.location.marker) {
        this.removeMarker();
      }
    },
    handleInput(e) {
      this.$emit("input", e);
    },
    selectItem({position, address}) {
      const {lat, lon} = position;
      const {streetName, streetNumber, municipality} = address;

      let locationName = `${streetName || "Address unknown"} ${streetNumber || ""}, ${municipality}`;

      this.setLocationCoordsSearchResults(locationName);
      this.calculateRoute({
        lngLat: { lng: lon, lat },
      });
      this.location.map.setCenter({ lat, lng: lon });

      this.clearLocationSearchResults();
    },
    ...mapMutations(name, [
      "removeMarker",
      "destroyMap",
      "setLocationCoordsSearchResults",
      "clearLocationName",
      "clearLocationSearchResults",
    ]),
    ...mapActions(name, [
      "getLocationByCoords",
      "getLocationsByName",
      "calculateRoute",
      "setUserLocation",
    ]),
    findLocation: _.debounce((e) => {
      if (e.length > 2) {
        this.getLocationsByName(e);
      }
    }, 400),
    closeMap() {
      this.mapVisible = false;
    },
  },

  components: {
    SpMap,
    SpCard,
    SpList,
    SpButton,
  },
};
</script>
<style lang="scss" scoped>
.m-location-editor {
  &__clear-button {
    right: $space-size-2;
  }
  &__btn-return {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  &.is-filled {
    .m-location-editor__input {
      background: $white;
    }
    .m-location-editor__input {
      background: $white;
    }
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
      padding-right: $space-size-6;
    }
    .m-location-editor__container {
      background: $white;
      // top: $space-size-2;
    }
  }
  &__submit {
    position: fixed;
    z-index: 999999;
    bottom: $space-size-3;
    width: calc(100% - 48px);
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
