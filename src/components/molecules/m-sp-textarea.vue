<template>
  <div class="m-input" :class="{ 'is-focused': isFocused }">
    <div class="m-input__container" :class="{ validator: !isValid }">
      <a-sp-icon
        :icon="icon"
        class="ml-2"
        :color="iconColor"
        :absolute="true"
      />

      <a-sp-textarea
        :placeholder="placeholder"
        @input="handleInput"
        :type="type"
        :size="size"
        :height="height"
        @focus="handleFocus"
        @blur="handleBlur"
        :isValid="isValid"
      />
    </div>
    <span class="validator__text" v-if="!isValid">{{
      validationRules.required.text
    }}</span>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
    type: String,
    size: String,
    icon: String,
    height: String,
    validationRules: Object,
  },
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
      return this.isValid;
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
