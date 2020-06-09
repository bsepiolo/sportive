<template>
  <div
    class="icon"
    :class="{
      'icon--complex': type == 'complex',
      'icon--standard': type == 'standard',
      'icon--absolute': absolute
    }"
  >
    <i :class="icon"></i>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
    },
    type: {
      type: String,
      default: "standard",
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style lang="scss" scoped>
.icon {
  &--complex {
    width: $space-size-4;
    height: $space-size-4;
    background: #f1ebfc;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    i {
      color: #9e79e8;
      font-size: $space-size-2 + 2;
      display: block;
      height: $space-size-2 + 2;
      width: $space-size-2 + 2;
    }
    &--color-reverse {
      background: $white;
      i {
        color: $green;
      }
    }
  }
  &--absolute{
    position: absolute;
  }
  &--standard {
    color: $secondary-text-color;
    // position: absolute;
    left: $space-size-2;
    font-size: $space-size-2 + 4;
  }
}
</style>
