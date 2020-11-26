<template>
  <div
    class="icon"
    @click="clickHandler"
    :style="{ background: lightenColor }"
    :class="{
      'icon--complex': stylingMode == 'complex',
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
  computed: {
    lightenColor() {
      if (this.color) {
        return this.lightenDarkenColor(this.color, 120);
      }
      return "";
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
    &--soccer {
    }
    &--basketball {
    }
    &--football {
    }
    &--volleyball {
    }
  }
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
