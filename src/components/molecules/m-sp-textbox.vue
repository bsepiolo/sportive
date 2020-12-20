<template>
  <div class="m-input" :class="{ 'is-focused': isFocused }">
    <div class="m-input__container" :class="{ validator: !isValid }">
      <a-sp-icon
        :icon="icon"
        class="ml-2"
        :type="iconColor"
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
        :icon="icon"
      />
    </div>
    <template v-if="!isValid">
      <span v-for="(rule, index) in rules" :key="index" class="validator__text">
        {{ rule }}
      </span>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
    type: String,
    size: String,
    icon: String,
    name: String,
    validationRules: Object,
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      iconColor: "default",
      content: "",
      rules: null,
    };
  },
  methods: {
    validate() {
      this.rules = this.validation(this.validationRules, this.content);
      this.isValid = !this.rules.length;

      return this.isValid;
    },
    handleInput(e) {
      this.content = e;
      this.$emit("input", {name: this.name, value: e});
      if (!this.isValid) {
        this.validate();
      }
    },
    handleFocus() {
      this.iconColor = "primary";
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
      this.validate();
      this.$emit("isValid", this.isValid);
      this.iconColor = "default";
    },
  },
};
</script>
