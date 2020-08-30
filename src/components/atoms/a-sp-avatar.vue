<template functional>
  <div
    class="a-avatar"
    :class="{
      'a-avatar--medium': size == 'medium',
      'a-avatar--small': size == 'small',
      'a-avatar--border': border,
    }"
  >
    <img :src="imageSrc" />
  </div>
</template>
<script>
export default {
  props: {
    imageSrc: {
      type: String,
    },
    size: {
      type: String,
      default: "small",
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.a-avatar {
  border-radius: 100%;
  overflow: hidden;
  box-sizing: content-box;
  flex-shrink: 0;
  &--border {
    border: 2px solid $white;
  }
  &--small {
    height: $space-size-3;
    width: $space-size-3;
  }
  &--medium {
    height: $space-size-6;
    width: $space-size-6;
  }
  img {
    height: 100%;
  }
}
</style>
