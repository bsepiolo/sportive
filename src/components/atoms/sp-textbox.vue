<template>
  <input
    class="a-texteditor"
    :class="{
        'a-texteditor--medium': size == 'medium',
      }"
      :value="value"
    @input="handleInput"
    :type="type"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size"],
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      debugger
      this.$emit("input", e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.a-texteditor {
  &--medium {
    height: $space-size-5;
  }
  height: $space-size-6;
  border-radius: $border-radius;
  background: $white;
  box-shadow: $box-shadow;
  border: none;
  width: 100%;
  font-size: 1rem;
  padding: 13px $space-size-2 13px $space-size-6;
  color: $black;
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder,
  &::placeholder {
    /* Edge */
    color: #a5b0d4;
  }
}
// &__icon {
//   color: $secondary-text-color;
//   position: absolute;
//   left: $space-size-2;
//   font-size: $space-size-2 + 4;
// }
</style>
