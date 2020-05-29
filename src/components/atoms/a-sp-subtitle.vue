<template>
  <p class="a-subtitle" :class="{'text-center': textCenter, 'a-header-sub--dark': color=='dark' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subtitle",
  props: ["text-center", "color"]
};
</script>
<style lang="scss" scoped>
.a-subtitle {
  font-size: 12px;
  color: $secondary-text-color;
  margin-top: $space-size;
  &--dark {
    color: $black;
  }
}
</style>