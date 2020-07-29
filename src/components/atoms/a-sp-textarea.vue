<template>
  <textarea
    class="texteditor texteditor--textarea"
    :class="{
      'texteditor--medium': size == 'medium',
      'texteditor--shadow-disabled': shadowDisabled
    }"
    :value="value"
    @input="handleInput"
    @keydown="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :type="type"
    :style="{height: height}"
    :placeholder="placeholder"
    :readonly="readonly"
  ></textarea>
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size", "icon", "shadowDisabled", "height", "readonly"],
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
      this.$emit("blur");
    },
    handleFocus() {
      this.$emit("focus");
    }
  },
};
</script>
