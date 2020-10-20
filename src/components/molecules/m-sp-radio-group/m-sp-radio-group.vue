<template>
  <div class="m-sp-radio-group">
    <a-sp-text color="secondary" class="mt-2 mb-1">Access</a-sp-text>
    <div class="m-sp-radio-group__container">
      <m-sp-radio-button
        v-for="(field, index) in fields"
        :key="index"
        :icon="field.icon"
        :name="field.name"
        :isChecked="isChecked(index)"
        @click="handleClick(index, field)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["fields"],
  data() {
    return {
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
      this.$emit("input", data);
    },
    isChecked(index) {
      if (index == this.previousElementIndex) {
        this.previousElementIndex = null;
        return false;
      }
      return index == this.currentElementIndex ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.m-sp-radio-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: $space-size;
  flex-direction: column;
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
