<template>
  <p class="a-subtitle" :class="{'a-subtitle--light': light,'text-center': textCenter, 'a-header-sub--dark': color=='dark' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subtitle",
  props: ["text-center", "color", "light"]
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
  &--light{
    color: white;
    opacity: .9;
  }
}
</style>