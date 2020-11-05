<template>
  <div
    class="m-sp-radio-button"
    :class="{ 'is-checked': isChecked, 'is-error': !isValid }"
    @click="handleClick"
  >
    <div class="m-sp-radio-button__selector">
      <span class="eva eva-checkmark" v-if="isChecked"></span>
    </div>
    <input
      class="m-sp-radio-button__input"
      name="radio"
      v-model="model"
      value="Public"
      ref="radioInput"
      type="radio"
    />
    <a-sp-icon
      size="large"
      :color="isChecked ? 'primary' : ''"
      :icon="icon"
      class="m-selectbox-editor__icon"
    />
    <a-sp-text :color="isChecked ? '' : 'light'" class="mt-1">{{
      name
    }}</a-sp-text>
  </div>
</template>

<script>
export default {
  props: ["name", "icon", "isChecked", "isValid"],
  data() {
    return {
      model: "",
      iconColor: "",
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
  &.is-error {
    border-bottom: 1px solid red;
  }
  background: $white;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  padding: $space-size-2 $space-size-6 $space-size-2 $space-size-2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: -1;
    border-radius: $border-radius;
    box-shadow: 0px 2px 7px rgba(97, 128, 237, 0.3);
    opacity: 0;
  }
  &__input {
    display: none;
  }
  &.is-checked {
    cursor: unset;
    box-shadow: inset 0px 0 0 2px $blue;
    &:before {
      opacity: 1;
    }
    .m-sp-radio-button__selector {
      background: $blue;
      color: white;
      font-size: $space-size-2 - $space-size-05;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 2px 7px rgba(97, 128, 237, 0.3);
    }
  }
  &__selector {
    width: $space-size-2;
    height: $space-size-2;
    background: $gray150;
    border-radius: 100%;
    position: absolute;
    right: $space-size;
    top: $space-size;
  }
}
</style>
