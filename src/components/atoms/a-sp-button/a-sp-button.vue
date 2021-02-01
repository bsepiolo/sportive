<template>
  <button
    @click="clickHandler"
    @mousedown="mouseDownHandler"
    class="a-btn"
    :type="submit ? 'submit' : 'button'"
    :class="{
      'a-btn--primary': type == 'primary',
      'a-btn--basic': type == 'basic',
      'a-btn--circle': shape == 'circle',
      'a-btn--square': shape == 'square',
      'a-btn--small': size == 'small',
      'a-btn--rectangle': shape != 'circle' && shape != 'square',
      'a-btn--secondary': type == 'secondary',
      'a-btn--outlined': stylingMode == 'outlined',
      'a-btn--reversed': stylingMode == 'reversed',
      'a-btn--text': stylingMode == 'text',
      'a-btn--full-width': fullWidth == true,
    }"
  >
    <span v-if="icon" :class="icon" class="a-btn__icon"></span>

    {{ text }}
  </button>
</template>
<script>
export default {
  props: [
    "text",
    "type",
    "full-width",
    "submit",
    "styling-mode",
    "shape",
    "icon",
    "size",
  ],
  methods: {
    clickHandler: function() {
      this.$emit("click");
    },
    mouseDownHandler: function(e) {
      this.$emit("mousedown", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.a-btn {
  height: $space-size-6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1rem;
  border-radius: $border-radius;
  transition: transform 0.2s, background 0.2s;

  &:active {
    transform: scale(0.95);
  }
  &__icon {
    font-size: $space-size-2 + 4;
  }
  &--small {
    padding: $space-size $space-size-2 !important;
    font-size: 0.875rem;
    height: auto;
  }
  &--square {
    height: unset;
    padding: $space-size;
  }
  &--rectangle {
    padding: 0 $space-size-5;
  }
  &--circle {
    width: $space-size-6;
    height: $space-size-6;
    background: $white;
    color: $black;
    border-radius: 100%;
  }
  &--basic {
    background: $white;
    color: $black;
  }
  &--primary {
    background: $blue;
    color: $white;
    &:not(.a-btn--outlined):active {
      background: darken($blue, 5%);
    }
  }
  &--primary.a-btn--outlined {
    border: 2px solid $blue;
    color: $blue;
    &:active {
      background: $gray150;
    }
  }
  &--primary.a-btn--reversed {
    background: $gray150;
    color: $blue;
    &:active {
      background: $blue;
      color: white;
    }
  }
  &--secondary {
    background: $gray200;
    color: $white;
  }
  &--secondary.a-btn--outlined {
    border: 2px solid $gray200;
    color: $gray200;
    &:active {
      background: $gray150;
      border-color: $gray150;
    }
  }
  &--secondary.a-btn--text {
    color: $gray200;
    transition: background 0.2s;

    &:active {
      background: $gray150;
      border-color: $gray150;
    }
  }
  &--outlined {
    background: none;
  }

  &--text {
    background: none;
    border: none;
  }
  &--full-width {
    width: 100%;
  }
}
</style>
