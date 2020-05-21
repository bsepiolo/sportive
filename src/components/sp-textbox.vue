<template>
  <div class="texteditor">
    <label class="texteditor__label" v-if="label">{{ label }}</label>
    <i class="texteditor__icon" :class="icon" v-if="icon"></i>
    <input
      class="texteditor__input"
      :class="{
        'texteditor__input--medium': size == 'medium',
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
