<template>
  <input
    class="texteditor"
    :class="{
      'texteditor--medium': size == 'medium',
    }"
    :value="value"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :type="type"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size", "icon"],
  data() {
    return {
      content: this.value,
      isFocused: false
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleFocus() {
      this.$emit("focus");
    },
    handleBlur(){
      this.$emit("blur");
    }
  },
};
</script>

