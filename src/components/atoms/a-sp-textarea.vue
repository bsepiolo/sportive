<template>
  <textarea
    class="texteditor texteditor--textarea"
    :class="{
      'texteditor--medium': size == 'medium',
      'texteditor--padding-regular': !icon,
      'texteditor--shadow-disabled': shadowDisabled,
      'is-error': !isValid,
    }"
    :value="value"
    @input="handleInput"
    @keydown="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :type="type"
    :style="{ height: height }"
    :placeholder="placeholder"
    :readonly="readonly"
    ref="textarea"
  ></textarea>
</template>
<script>
export default {
  props: {
    placeholder: String,
    type: String,
    value: String,
    size: String,
    icon: String,
    shadowDisabled: Boolean,
    height: String,
    validationRules: Object,
    isValid: {
      type: Boolean,
      default: true,
    },
    readonly: Boolean
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleBlur(e) {
      console.log(e);
      this.$emit("blur", e.target.value);
    },
    handleFocus(e) {
      this.$emit("focus", e.target.value);
    },
    setBlur() {
      this.$refs.textarea.blur();
    },
  },
};
</script>
