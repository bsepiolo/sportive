<template>
  <textarea
    class="a-texteditor"
    :class="{
      'a-texteditor--medium': size == 'medium',
      'a-texteditor--shadow-disabled': shadowDisabled
    }"
    :value="value"
    @input="handleInput"
    @keydown="handleInput"
    @focus="handleBlur"
    :type="type"
    :placeholder="placeholder"
  ></textarea>
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size", "icon", "shadowDisabled"],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleBlur() {
      this.$emit("focus");
    },
  },
};
</script>
<style lang="scss" scoped>
.a-texteditor {
  resize: none;
  &--medium {
    height: $space-size-5;
  }
  &--shadow-disabled{
    box-shadow: none;
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
</style>
