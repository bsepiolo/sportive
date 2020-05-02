<template>
  <div class="textbox">
    <label class="textbox__label" v-if="label">{{ label }}</label>
    <i :class="icon" v-if="icon"></i>
    <input
      class="textbox__input"
      :class="{
        'textbox__input--medium': size == 'medium',
        'textbox__input--icon': icon,
      }"
      @input="handleInput"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  props: ["label", "placeholder", "icon", "type", "value", "size"],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
