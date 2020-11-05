<template>
  <div
    class="m-input"
    :class="{ 'is-focused': isFocused, 'is-error': !isValid }"
  >
    <div class="m-input__container">
      <a-sp-icon
        :icon="icon"
        class="ml-2"
        :color="iconColor"
        :absolute="true"
      />

      <a-sp-textarea
        :placeholder="placeholder"
        :value="value"
        @input="handleInput"
        :type="type"
        :size="size"
        :height="height"
        @focus="handleFocus"
        @blur="handleBlur"
        :isValid="isValid"
      />
    </div>
    <span class="m-input__error" v-if="!isValid">{{
      validationRules.required.text
    }}</span>
  </div>
</template>
<script>
export default {
  props: [
    "placeholder",
    "type",
    "value",
    "size",
    "icon",
    "height",
    "validationRules",
  ],
  data() {
    return {
      isValid: true,
      isFocused: false,
      content: "",
      iconColor: "default",
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
      this.content = e;
      if (!this.isValid) {
        this.isValid = this.validation(this.validationRules, e);
      }
    },
    validate() {
      this.isValid = this.validation(this.validationRules, this.content);
    },
    handleFocus() {
      this.isFocused = true;
      this.iconColor = "primary";
    },
    handleBlur(e) {
      this.isFocused = false;
      this.isValid = this.validation(this.validationRules, e);
      this.$emit("isValid", this.isValid);
      this.iconColor = "default";
    },
  },
};
</script>
<style lang="scss" scoped>
.m-input {
  margin-bottom: $space-size;
  display: flex;
  flex-direction: column;

  &.is-focused {
    .m-input__container {
      &:after {
        opacity: 1;
      }
    }
  }
  &.is-error {
    .m-input__container {
      &:after {
        box-shadow: 0px 4px 9px rgba(255, 0, 0, 0.1);
      }
    }
  }
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    &:after {
      transition: opacity 0.2s;
      opacity: 0;
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      box-shadow: $box-shadow-large;
      border-radius: $border-radius;
    }
  }
  &__error {
    font-size: $space-size + $space-size-05;
    color: $red;
    margin-top: $space-size-05;
    margin-bottom: $space-size-05;
    padding-left: $space-size;
  }
  &__icon {
    position: absolute;
    left: $space-size-2;
    font-size: $space-size-2 + $space-size / 4;
  }
}
</style>
