<template>
  <div class="m-input" :class="{ 'is-focused': isFocused }">
    <div class="m-input__container" :class="{ validator: !isValid }">
      <a-sp-icon
        :icon="icon"
        class="ml-2"
        :color="iconColor"
        :absolute="true"
      />
      <a-sp-textbox
        :placeholder="placeholder"
        @input="handleInput"
        :type="type"
        :size="size"
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
    validationRules: Object,
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      iconColor: "default",
      content: "",
    };
  },
  methods: {
    validate() {
      this.isValid = this.validation(this.validationRules, this.content);
      return this.isValid;
  },
    handleInput(e) {
      this.content = e;
      this.$emit("input", e);
      if (!this.isValid) {
        this.isValid = this.validation(this.validationRules, e);
      }
    },
    handleFocus() {
      this.iconColor = "primary";
      this.isFocused = true;
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

