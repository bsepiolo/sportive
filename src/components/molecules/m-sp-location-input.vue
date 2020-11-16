<template>
  <div
    class="m-location-editor"
    :class="{
      'is-focused': mapVisible,
      'is-filled': location.distance && location.time,
    }"
  >
    <div class="m-location-editor__container" :class="{'is-active': mapVisible || location.distance || location.time, validator: !isValid }">
      <div class="m-location-editor__input">
        <a-sp-icon
          :icon="icon"
          class="ml-2"
          :class="{ 'm-location-editor__icon': mapVisible }"
          :absolute="true"
          :color="iconColor"
          v-if="!mapVisible || (!form.location.name && mapVisible)"
        />
        <a-sp-icon
          icon="eva eva-close-outline"
          class="ml-2"
          :class="{ 'm-location-editor__icon': mapVisible }"
          :absolute="true"
          color="default"
          @click="clearInput"
          v-if="form.location.name && mapVisible"
        />
        <a-sp-textarea
          :placeholder="placeholder"
          :value="inputValue"
          @input="findLocation($event), handleInput($event)"
          @focus="handleFocus"
          :type="type"
          :size="size"
          :isValid="isValid"
          :validationRules="validationRules"
          @isValid="(e) => (isValid = e)"
          :shadowDisabled="mapVisible || (location.distance && location.time) > 0"
          class="m-location-editor__textbox"
          :class="{ 'is-active': mapVisible }"
        />
        <a-sp-icon
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
        <a-sp-text
          >Distance: {{ location.distance }}km Time:
          {{ location.time }}minutes</a-sp-text
        >
      </div>
    </div>
    <a-sp-card
      ratio="wide"
      v-if="location.locationSearchResults.length"
      z-index="max"
    >
      <m-sp-list
        @click="selectItem"
        displayValue="locationName"
        :items="location.locationSearchResults"
      />
    </a-sp-card>
    <a-sp-button
      text="Accept"
      type="primary"
      class="m-location-editor__submit"
      v-if="mapVisible"
      @click="closeMap"
    />

    <a-sp-map v-if="mapVisible || form.location.name" v-show="mapVisible" />
    <span class="validator__text" v-if="!isValid">{{
      validationRules.required.text
    }}</span>
  </div>
</template>
<script>
import * as actions from "../../store/action_types";
import * as mutations from "../../store/mutation_types";
import { debounce } from "lodash";
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
    "name",
    "is-active",
    "displayValue",
    "validationRules",
  ],
  data() {
    return {
      isValid: true,
      mapVisible: false,
      iconColor: "default",
      showClearButton: false,
    };
  },
  computed: {
    ...mapState(name, ["form", "location"]),
    inputValue() {
      return this.$store.state["EventsStore"].form[this.name][
        this.displayValue
      ];
    },
    inputData() {
      return this.$store.state["EventsStore"].form[this.name];
    },
  },
  methods: {
    ...mapMutations(name, {
      removeMarker: mutations.REMOVE_MARKER,
      setLocationCoordsSearchResults:
        mutations.SET_LOCATION_COORDS_SEARCH_RESULTS,
      removeLocation: mutations.REMOVE_LOCATION,
      removeLocationSearchResults: mutations.REMOVE_LOCATION_SEARCH_RESULTS,
    }),
    ...mapActions(name, {
      findLocationByCoords: actions.FIND_LOCATION_BY_COORDS,
      findLocationByName: actions.FIND_LOCATION_BY_NAME,
      findRouteDistance: actions.FIND_ROUTE_DISTANCE,
      setUserLocation: actions.SET_USER_LOCATION,
    }),
    validate() {
      this.isValid = this.validation(
        this.validationRules,
        this.inputValue || ""
      );
      return this.isValid;
    },
    handleFocus() {
      this.mapVisible = true;
      this.iconColor = "primary";
      this.$emit("focus");
    },
    clearInput() {
      this.removeLocation();
      this.$emit("input", "");
      this.showClearButton = false;

      this.location.marker && this.removeMarker();
    },
    handleInput(e) {
      this.$emit("input", e);
    },
    selectItem({ position, address }) {
      const { lat, lon } = position;
      if (!this.isValid) {
        this.isValid = this.validation(this.validationRules, address);
      }
      this.setLocationCoordsSearchResults({ position, address });
      this.findRouteDistance({
        lngLat: { lng: lon, lat },
      });
      this.location.map.setCenter({ lat, lng: lon });

      this.removeLocationSearchResults();
    },

    findLocation: debounce(function(e) {
      let vm = this;
      if (e.length > 2) {
        vm.findLocationByName(e);
      }
    }, 400),
    closeMap() {
      this.isValid =
        this.validation(this.validationRules, this.inputData.position || "") &&
        this.validation(
          this.validationRules,
          this.inputData.locationName || ""
        );
      this.$emit("isValid", this.isValid);
      this.mapVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-location-editor {
  height: 100%;

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
  }
  &.is-focused {
    position: absolute;
    top: -$space-size-6;
    width: calc(100% - 48px);
    height: 100vh;
    .m-location-editor__icon {
      position: absolute;
      z-index: 99999999;
    }
    .m-location-editor__textbox {
      border: none;
    }
    .m-location-editor__input {
      background: $white;
      margin: 0;
      padding-right: $space-size-6;
    }
    .m-location-editor__container {
      background: $white;
      margin-top: $space-size-7;
    }
  }
  &__submit {
    position: absolute;
    bottom: $space-size-7;
    z-index: 999999;
    width: 100%;
  }
  &__container {
    display: flex;
    position: relative;
    flex-direction: column;
    position: relative;
    z-index: 9999;
    border-radius: $border-radius;
    overflow: hidden;
    &.is-active{
      background: white;
       .m-location-editor__textbox {
      border: none;
    }
      border-bottom: 1px solid #D6DAE9;
    }
  }
  &__input {
    display: flex;
    align-items: center;
    position: relative;
    textarea {
      &:focus {
        box-shadow: none;
      }
    }
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
