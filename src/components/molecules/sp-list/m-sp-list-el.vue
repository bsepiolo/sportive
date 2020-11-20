<template>
  <li
    class="list__el"
    @mousedown="mouseDownHandler()"
    @click="clickHandler()"
    :class="{ 'is-active': isSelected || isActive }"
  >
    <i class="mr-1" :class="icon" v-if="icon"></i>
    <div class="list__data" :class="{ 'mt-0-5': icon }">
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  name: "list-el",
  props: ["icon", "displayValue", "activeItem", "isSelected", "isActive"],
  methods: {
    clickHandler() {
      this.$emit("click");
    },
    mouseDownHandler() {
      this.$emit("mousedown");
    },
  },
};
</script>
<style lang="scss" scoped>
.list__el {
  // padding: $space-size + $space-size / 2 $space-size;
  border-radius: $border-radius-small;
  &.is-active {
    background: $gray100;
  }
}
</style>
