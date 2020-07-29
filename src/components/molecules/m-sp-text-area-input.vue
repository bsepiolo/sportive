<template>
  <div class="m-input">
    <!-- <span :class="icon" class="m-input__icon"></span> -->
    <sp-icon :icon="icon" class="ml-2" :color="iconColor" :absolute="true" />

    <sp-textarea
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      :type="type"
      :size="size"
      :height="height"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size", "icon", "height"],
  data() {
    return {
      content: this.value,
      iconColor: "default",
    };
  },
  computed: {
    // ...mapFields(namespace, ["authForm.email"]),
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
    handleFocus: function() {
      this.iconColor = "primary";
    },
    handleBlur: function() {
      this.iconColor = "default";
    },
  },
};
</script>
<style lang="scss" scoped>
.m-input {
  position: relative;
  margin-bottom: $space-size;
  display: flex;
  align-items: center;
  &__icon {
    position: absolute;
    left: $space-size-2;
    font-size: $space-size-2 + $space-size / 4;
  }
}
</style>
