<template>
  <div
    class="icon"
    @click="clickHandler"
    :class="{
      'icon--standard': stylingMode == 'standard',
      'icon--absolute': absolute,
      'icon--size-medium': size == 'medium',
      'icon--size-large': size == 'large',
      'icon--color-primary': type == 'primary',
    }"
  >
    <i :class="icon" :style="{ color: color }"></i>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
    },
    stylingMode: {
      type: String,
      default: "standard",
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
    },
    type: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  methods: {
    clickHandler: function() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  &--color-primary {
    i {
      color: $blue;
    }
  }
  &--size-medium {
    i {
      font-size: calc(1em + 3px);
    }
  }
  &--size-large {
    i {
      font-size: calc(1em + 6px);
    }
  }
  &--absolute {
    position: absolute;
  }
  &--standard {
    color: $secondary-text-color;
    // position: absolute;
    font-size: $space-size-2 + 4;
  }
}
</style>
