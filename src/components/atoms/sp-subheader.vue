<template>
  <p class="a-subheader" :class="{'text-center': textCenter, 'a-header-sub--dark': color=='dark' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subHeader",
  props: ["text-center","color"],
};
</script>
<style lang="scss" scoped>
.a-subheader {
  padding: $space-size 0;
  line-height: $space-size-3;
  display: flex;
  align-items: center;
  
  &--dark {
    color: $black;
  }
}
</style>