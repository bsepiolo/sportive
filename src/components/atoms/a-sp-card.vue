<template>
  <div
    class="a-card p-1"
    @mousedown="mousedown($event)"
    :class="{
      'a-card--minimized': minimized,
      'a-card--ratio-wide': ratio == 'wide',
      'a-card--z-index-max': zIndex == 'max',
      'a-card--size-medium': (ratio == 'square') && size == 'medium',
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    minimized:{
      type: Boolean,
      default: false
    },
    ratio: {
      type: String,
      default: "square"
    },
    zIndex: {
      type: String
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  methods: {
    mousedown(e) {
      this.$emit("mousedown", e);
    },
  },
};
</script>

<style lang="scss" scoped="true">
.a-card {
  flex-shrink: 0;
  border-radius: $border-radius;
  background: $white;
  box-shadow: $box-shadow-large;
  display: flex;
  flex-direction: column;

  &--ratio-wide {
    width: 100%;
  }
  &--size-medium {
    width: 160px;
    height: 160px;
  }
  &--minimized {
    display: flex;
    align-items: center;
  }
  &--z-index-max{
    position: absolute;
    z-index: 9999999;
  }
}
</style>
