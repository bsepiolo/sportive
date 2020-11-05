<template>
  <input
    class="texteditor"
    :class="{
      'texteditor--medium': size == 'medium',
      'is-error': !isValid,
    }"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :type="type"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  props: {
    placeholder: String,
    type: String,
    value: String,
    size: String,
    icon: String,
    isValid: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleFocus(e) {
      this.$emit("focus", e.target.value);
    },
    handleBlur(e) {
      this.$emit("blur", e.target.value);
    },
  },
};
</script>
