<template>
  <h2
    class="a-header"
    :class="{
      'text-center': textCenter,
      'a-title--small': size == 'small',
      'a-title--medium': size == 'medium',
      'a-title--large': size == 'large',
      'a-title--thin': type=='thin',
      'a-title--bold': type=='bold',
      'a-title--light': light
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
      default: false
    },
    size: {
      type: String,
      default: "large"
    },
    type: {
      type: String,
      default: "bold"
    },
    light:{
      type: Boolean
    }
  }
};
</script>
<style lang="scss" scoped>
.a-title {
  color: $black;
  padding: $space-size 0;

  &--thin {
    font-weight: 600;
  }
  &--bold {
    font-family: "Hind";
    font-weight: 700;
  }
  &--medium {
    font-size: 20px;
  }
  &--large {
    font-size: 24px;
  }
  &--small {
    font-size: 1rem;
  }
  &--light{
    color: white;
  }
}
</style>