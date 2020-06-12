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
          @keydown="handleInput"
          @input="findLocation($event)"
          @focus="handleBlur"
          :type="type"
          :size="size"
          :shadowDisabled="mapVisible"
          :class="{ 'is-active': mapVisible }"
        />
      </div>
      <div class="m-location-editor__details" v-if="distance || time">
        Distance: {{ distance }}km Time: {{ time }}minutes
      </div>
      <!-- <textarea
        @keydown="handleInput"
        @input="handleInput"
        @focus="handleBlur"
        v-model="value"
        class="texteditor__input texteditor__input--location-picker"
        :class="{
          'texteditor__input--medium': size == 'medium',
        }"
        :type="type"
        :placeholder="placeholder"
      ></textarea> -->
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
import { mapActions, mapState } from "vuex";
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
      iconColor: "default"
    };
  },
  computed: {
    ...mapState(name, [
      "distance",
      "time",
      "locationCoordsSearchResults",
      "locationSearchResults",
    ]),
  },
  methods: {
    handleBlur: function() {
      this.mapVisible = true;
      this.iconColor = "primary"
      this.$emit("focus");
    },
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    },
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
