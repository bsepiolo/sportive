<template>
  <div>
    <slot />
    <button @click="handleClick">test</button>
  </div>
</template>
<script>
export default {
  props: [
    "text",
    "type",
    "full-width",
    "submit",
    "styling-mode",
    "shape",
    "icon",
  ],
  methods: {
    handleClick() {
      this.$children.forEach((e) => {
        debugger;
        if (e.validate) {
          e.validate();
        }
      });
    },
    mouseDownHandler(e) {
      this.$emit("mousedown", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.a-btn {
  height: $space-size-6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1rem;
  border-radius: $border-radius;
  transition: transform 0.2s, background 0.2s;

  &:active {
    transform: scale(0.95);
  }
  &__icon {
    font-size: $space-size-2 + 4;
  }
  &--square {
    height: unset;
    padding: $space-size;
  }
  &--rectangle {
    padding: 0 $space-size-5;
  }
  &--circle {
    width: $space-size-6;
    height: $space-size-6;
    background: $white;
    color: $black;
    border-radius: 100%;
  }
  &--basic {
    background: $white;
    color: $black;
  }
  &--primary {
    background: $blue;
    color: $white;
    &:not(.a-btn--outlined):active {
      background: darken($blue, 5%);
    }
  }
  &--primary.a-btn--outlined {
    border: 2px solid $blue;
    color: $blue;
    &:active {
      background: $gray150;
    }
  }
  &--secondary {
    background: $gray200;
    color: $white;
  }
  &--secondary.a-btn--outlined {
    border: 2px solid $gray200;
    color: $gray200;
    &:active {
      background: $gray150;
      border-color: $gray150;
    }
  }
  &--secondary.a-btn--text {
    color: $gray200;
    transition: background 0.2s;

    &:active {
      background: $gray150;
      border-color: $gray150;
    }
  }
  &--outlined {
    background: none;
  }
  &--text {
    background: none;
    border: none;
  }
  &--full-width {
    width: 100%;
  }
}
</style>
