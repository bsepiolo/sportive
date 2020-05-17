<template>
  <div class="textbox location-picker" :class="{ 'is-focused': mapVisible }">
    <label class="textbox__label" v-if="label">{{ label }}</label>
    <i class="textbox__icon" :class="icon" v-if="icon"></i>
    <textarea
      @keydown="handleInput"
      @input="handleInput"
      @focus="handleBlur"
      :value="value"
      class="textbox__input location-picker__input"
      :class="{
        'textbox__input--medium': size == 'medium',
        'textbox__input--icon': icon,
      }"
      :type="type"
      :placeholder="placeholder"
    ></textarea>
    <ul v-if="results">
      <li v-for="(item, index) in results" :key="index">
        {{ item.poi.name }} {{ item.dist }}
      </li>
    </ul>

    <sp-map v-if="mapVisible" />
  </div>
</template>
<script>
import SpMap from "./sp-location-map";
export default {
  props: ["label", "placeholder", "icon", "type", "value", "size", "is-active"],
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
  &.is-focused {
    position: absolute;
    z-index: 9999;
    top: $space-size-3;
    width: 100%;
    justify-content: flex-end;
    .location-picker__input,
    .textbox__icon {
      position: relative;
    }
    .location-picker__input {
      z-index: 9999;
      flex-shrink: 0;
    }

    .textbox__icon {
      left: 32px;
      z-index: 99999;
    }
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
