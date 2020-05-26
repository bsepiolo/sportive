<template>
  <h2
    class="a-header"
    :class="{
      'text-center': textCenter,
      'a-header--small': size == 'small',
      'a-header--medium': size == 'medium',
      'a-header--large': size == 'large',
    }"
  >
    <slot />
  </h2>
</template>
<script>
export default {
  name: "header-title",
  props: {
    textCenter: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "large",
    },
  },
};
</script>
<style lang="scss" scoped>
.a-header {
  color: $black;
  padding: $space-size 0;
  font-family: "Hind";
  font-weight: 700;
  &--medium {
    font-size: 20px;
  }
  &--large {
    font-size: 24px;
  }
  &--small {
    font-size: 1rem;
  }
}

</style>