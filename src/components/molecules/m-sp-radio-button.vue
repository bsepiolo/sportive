<template>
  <div
    class="m-sp-radio-button"
    :class="{ 'is-checked': isChecked }"
    @click="handleClick"
  >
    <div class="m-sp-radio-button__selector"></div>
    <input
      class="m-sp-radio-button__input"
      name="radio"
      v-model="model"
      value="Public"
      ref="radioInput"
      type="radio"
    />
    <a-sp-icon size="large" :color="isChecked?'primary':''" :icon="icon" class="m-selectbox-editor__icon" />
    <a-sp-text :color="isChecked?'secondary':'light'" class="mt-1">{{ name }}</a-sp-text>
  </div>
</template>

<script>
export default {
  props: ["name", "icon", "isChecked"],
  data() {
    return {
      model: "",
      iconColor: ''
    };
  },
  methods: {
    handleClick() {
      this.$refs.radioInput.click();
      this.$emit("click");
    },
  },
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
  position: relative;
  &__input {
    display: none;
  }
  &.is-checked {
    .m-sp-radio-button__selector{
      border-color: $blue;
      &:after{
        position: absolute;
        content: '';
        display: block;
        width: $space-size + $space-size / 4;
        height: $space-size + $space-size / 4;
        background: $blue;
        margin: auto;
        border-radius: 100%;;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  &__selector {
    width: $space-size-2;
    height: $space-size-2;
    border: 1px solid $gray200;
    border-radius: 100%;
    position: absolute;
    left: $space-size;
    top: $space-size;
  }
}
</style>
