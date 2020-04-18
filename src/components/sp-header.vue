<template>
  <h2
    class="header"
    :class="{
      'text-center': textCenter,
      'header--medium': size == 'medium',
      'header--large': size == 'large',
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
