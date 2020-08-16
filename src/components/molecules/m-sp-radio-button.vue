<template>
  <div
    class="m-sp-radio-button"
    :class="{ 'is-checked': isChecked }"
    @click="handleClick"
  >
    <input
      class="m-sp-radio-button__input"
      name="test"
      v-model="model"
      value="Public"
      ref="radioInput"
      type="radio"
    />
    <sp-icon size="large" :icon="icon" class="m-selectbox-editor__icon" />
    <sp-text color="light" class="mt-1">{{ name }}</sp-text>
  </div>
</template>

<script>
import SpText from "../atoms/a-sp-text"
export default {
  props: ["name", "icon", "isChecked"],
  data() {
    return {
      model: '',
    };
  },
  methods: {
    handleClick() {
      this.$refs.radioInput.click();
      this.$emit("click");
    }
  },
  components:{
    SpText
  }
};
</script>

<style lang="scss" scoped>
.m-sp-radio-button {
  background: $white;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  padding: $space-size-3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  &__input {
    display: none;
  }
  &.is-checked {
    background: $blue;
  }
}
</style>
