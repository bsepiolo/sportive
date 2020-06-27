<template>
  <button
    @click = "clickHandler"
    class="a-btn"
    :type="{'submit': submit }"
    :class="{
      'a-btn--primary': type == 'primary',
      'a-btn--basic': type == 'basic',
      'a-btn--circle': shape == 'circle',
      'a-btn--rectangle': shape != 'circle',
      'a-btn--secondary': type == 'secondary',
      'a-btn--outlined': stylingMode == 'outlined',
      'a-btn--full-width': fullWidth == true,
    }"
  >
    <span v-if="icon" :class="icon" class="a-btn__icon"></span>

    {{ text }}
  </button>
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
  methods:{
      clickHandler: function(){
      this.$emit("click");
      }
  }
};
</script>
<style lang="scss" scoped>
.a-btn {
  height: $space-size-6;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1rem;
  &__icon {
    font-size: $space-size-2 + 4;
  }
  &--rectangle {
    padding: 0 $space-size-5;
    border-radius: $border-radius;
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
  }
  &--primary.a-btn--outlined {
    border: 2px solid $blue;
    color: $blue;
  }
  &--secondary {
    border: 2px solid $gray200;
    color: $gray200;
  }
  &--outlined {
    background: none;
  }
  &--full-width {
    width: 100%;
  }
}
</style>
