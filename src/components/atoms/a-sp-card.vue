<template>
  <div class="m-card" @click="handleClick()" :class="{'a-card--minimized': minimized}">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["minimized"],
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped="true">
.m-card {
  flex-shrink: 0;
  border-radius: $border-radius;
  background: $white;
  box-shadow: $box-shadow-large;
  display: flex;
  flex-direction: column;
  padding: $space-size-2;
  width: 160px;
  height: 160px;
  &--minimized {
    display: flex;
    align-items: center;
  }
}
</style>
