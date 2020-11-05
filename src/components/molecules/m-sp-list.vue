<template>
  <ul class="m-list">
    <li
      class="m-list__el"
      :class="{ 'is-active': selectedItem == item[displayValue] }"
      v-for="(item, index) in items"
      :key="index"
      @mousedown="mouseDownHandler(item)"
      @click="clickHandler(item)"
    >
      {{ item[displayValue] }}
    </li>
  </ul>
</template>
<script>
export default {
  props: ["items", "displayValue", "activeItem", "selectedItem"],
  methods: {
    clickHandler(e) {
      this.$emit("click", e);
    },
    mouseDownHandler(e) {
      this.$emit("mousedown", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.m-list {
  &__el {
    padding: $space-size + $space-size / 2 $space-size;
    border-radius: $border-radius-small;
    &.is-active {
      background: $gray100;
    }
  }
}
</style>
