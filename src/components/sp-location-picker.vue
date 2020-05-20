<template>
  <div class="location-picker" :class="{ 'is-focused': mapVisible }">
    <label class="textbox__label" v-if="label">{{ label }}</label>
    <i class="textbox__icon" :class="icon" v-if="icon"></i>
    <textarea
      @keydown="handleInput"
      @input="handleInput"
      @focus="handleBlur"
      class="location-picker__input"
      :class="{
        'textbox__input--medium': size == 'medium',
        'textbox__input--icon': icon,
      }"
      :type="type"
      :placeholder="placeholder"
    ></textarea>
    <div class="location-picker__details">
      {{distance}}km
      {{time}}minutes
    </div>
    <ul style="background: white; position: relative; z-index: 9999;">
      <li>asdasd</li>
      {{dropdownSource}}
      <!-- <li v-for="(item, index) in results" :key="index">
        {{ item.poi.name }} {{ item.dist }}
      </li> -->
    </ul>

    <sp-map v-if="mapVisible" />
  </div>
</template>
<script>
import SpMap from "./sp-location-map";
import { mapState } from 'vuex';
const name = "EventsStore";

export default {
  props: ["label", "placeholder", "icon", "type", "value", "size", "dropdownSource", "is-active"],
  data() {
    return {
      content: this.value,
      results: null,
      currentVal: null,
      localization: "test",
      mapVisible: false,
    };
  },
  computed: {
    ...mapState(name, ["distance", "time"])
  },
  methods: {
    handleBlur: function() {
      this.mapVisible = true;
      this.$emit("focus");
    },
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    },
  },
  components: {
    SpMap,
  },
};
</script>
<style lang="scss">
.location-picker {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  border: none;
  .location-picker__input{
    border: none;
  }
  &.is-focused {
    position: absolute;
    z-index: 9999;
    top: $space-size-3;
    width: 100%;
    justify-content: flex-end;
    .location-picker__input {
      z-index: 9999;
      flex-shrink: 0;
    }
  }
  &__details{
    background: $gray150;
    position: relative;
    z-index: 9999;
    width: 100%;
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
