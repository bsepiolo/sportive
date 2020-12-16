<template>
  <p class="a-subtitle" :class="{'a-subtitle--light': light,'a-subtitle--size-medium': size=='medium', 'a-subtitle--shadow': shadow,'text-center': textCenter, 'a-header-sub--dark': color=='dark' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subtitle",
  props: ["text-center", "color", "light", "size", "shadow"]
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
  &--size-medium{
    font-size: 14px;
    line-height: $space-size-3;
  }
  &--light{
    color: white;
  }
   &--shadow{
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  }
}
</style>