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
        />

        <sp-textarea
          :placeholder="placeholder"
          :value="value"
          @input="findLocation($event), handleInput($event)"
          @focus="handleBlur"
          :type="type"
          :size="size"
          :shadowDisabled="mapVisible"
          :class="{ 'is-active': mapVisible }"
        />
        <sp-icon
          icon="eva eva-close-outline"
          class="m-location-editor__clear-button"
          :absolute="true"
          color="default"
          @click="clearInput"
          v-if="form.location.name"
        />
      </div>
      <div class="m-location-editor__details" v-if="distance || time">
        Distance: {{ distance }}km Time: {{ time }}minutes
      </div>
    </div>

    <ul class="m-location-editor__results-list" v-if="locationSearchResults">
      <li v-for="(item, index) in locationSearchResults" :key="index">
        {{ item.address.freeformAddress }}
      </li>
    </ul>

    <sp-map v-if="mapVisible" />
  </div>
</template>
<script>
import SpMap from "./sp-location-map";
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
    ...mapState(name, [
      "distance",
      "form",
      "time",
      "locationCoordsSearchResults",
      "locationSearchResults",
      "marker",
    ]),
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
      this.$emit("input", "");
      this.showClearButton = false;
      if (this.marker) {
        this.removeMarker();
      }
    },
    handleInput: function(e) {
      this.$emit("input", e);
    },
    ...mapMutations(name, ["removeMarker"]),
    ...mapActions(name, [
      // "addEvent",
      "getLocationByCoords",
      "getLocationsByName",
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
