<template>
  <div class="m-sp-radio-group" :class="{ 'is-error': !isValid }">
    <div class="m-sp-radio-group__header mb-1 mt-2">
      <a-sp-text color="secondary">Access</a-sp-text>
    </div>

    <div class="m-sp-radio-group__container">
      <m-sp-radio-button
        v-for="(field, index) in fields"
        :key="index"
        :isValid="isValid"
        :isDefault="field.default || false"
        :icon="field.icon"
        :name="field.name"
        :isChecked="isChecked(index)"
        @click="handleClick(index, field)"
      />
    </div>
    <span class="validator__text" v-if="!isValid">{{
      validationRules.required.text
    }}</span>
  </div>
</template>

<script>
export default {
  props: ["fields", "validationRules"],
  data() {
    return {
      isValid: true,
      content: "",
      rules: null,
      currentElementIndex: null,
      previousElementIndex: null,
    };
  },
  methods: {
    handleClick(index, data) {
      if (this.currentElementIndex == null) this.currentElementIndex = index;
      else {
        this.previousElementIndex = this.currentElementIndex;
        this.currentElementIndex = index;
      }
      this.content = data.name;

      this.validate();

      this.$emit("isValid", this.isValid);

      this.$emit("input", data);
    },
    validate() {
      this.rules = this.validation(this.validationRules, this.content);
      this.isValid = !this.rules.length;

      return this.isValid;
    },
    isChecked(index) {
      if (index == this.previousElementIndex) {
        this.previousElementIndex = null;
        return false;
      }
      return index == this.currentElementIndex ? true : false;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.m-sp-radio-group {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: flex-end;
  }
  &__container {
    display: flex;
    justify-content: center;
    & > * {
      margin: $space-size / 2;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
