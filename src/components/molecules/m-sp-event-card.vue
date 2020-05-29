<template>
  <div class="m-card" @click="handleClick()" :class="{'a-card--minimized': minimized}">
    <div class="m-card-header">
      <sp-icon icon="icon-basketball"/> 
      <sp-title size="small" type="light">Event name</sp-title>
      <sp-subtitle size="small" type="light">Angela Jenskins</sp-subtitle>
    </div>
    <div class="m-card-meta">
      <sp-text size="small">ul. Sienkiewicza 5/6</sp-text>
      <sp-text size="small">10:30 PM</sp-text>
    </div>
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
  justify-content: space-between;
  width: 160px;
  height: 160px;
  &--minimized {
    display: flex;
    align-items: center;
  }
}
</style>
