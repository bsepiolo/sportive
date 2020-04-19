<template>
  <div class="textbox">
    <label class="textbox__label" v-if="label">{{ label }}</label>
    <i :class="icon" v-if="icon"></i>
    <input
      class="textbox__input"
      @input="handleInput"
      :type="type"
      :class="{ 'textbox__input--icon': icon }"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  props: ["label", "placeholder", "icon", "type", "value"],
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
