<template>
  <div class="location-picker" :class="{ 'is-focused': mapVisible }">
    <div class="texteditor texteditor--location-picker">
      <label class="texteditor__label" v-if="label">{{ label }}</label>
          <i class="texteditor__icon" :class="icon" v-if="icon"></i>

      <textarea
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
      ></textarea>
  
    </div>
        <div class="texteditor__details" v-if="distance || time">
        {{distance}}km
        {{time}}minutes
      </div>
      <ul style="background: white; position: relative; z-index: 9999;">
        {{dropdownSource}}
        <!-- <li v-for="(item, index) in results" :key="index">
        {{ item.poi.name }} {{ item.dist }}
        </li>-->
      </ul>

      <sp-map v-if="mapVisible" />
  </div>
</template>
<script>
import SpMap from "./sp-location-map";
import { mapState } from "vuex";
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
    "is-active"
  ],
  data() {
    return {
      content: this.value,
      results: null,
      currentVal: null,
      localization: "test",
      mapVisible: false
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
    }
  },
  components: {
    SpMap
  }
};
</script>
<style lang="scss">
.location-picker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: $space-size;
  
  .texteditor--location-picker {
    display: flex;
    margin-bottom: 0;
  }

  .texteditor__icon {
    z-index: 99999;
  }
  .texteditor__input--location-picker {
    resize: none;
    border-radius: $border-radius;
  }
  &.is-focused {
    position: absolute;
    z-index: 9999;
    top: $space-size-3;
    width: 100%;
    justify-content: center;
    .texteditor__input--location-picker {
      z-index: 9999;
      flex-shrink: 0;
    }
  }
  .texteditor__details {
    background: $gray150;
    position: relative;
    z-index: 9999;
    width: 100%;
  }
}
</style>
