<template>
  <div class="m-card" @click="handleClick()" :class="{'a-card--minimized': minimized}">
    <div class="m-card-header">
      <a-sp-icon icon="icon-basketball" type="complex" class="mb-1"/> 
      <a-sp-title size="small" type="light">{{event.name}}</a-sp-title>
      <a-sp-subtitle size="small" type="light">Angela Jenskins</a-sp-subtitle>
    </div>
    <div class="m-card-meta">
      <a-sp-text size="small">{{event.locationData}}</a-sp-text>
      <a-sp-text size="small">10:30 PM</a-sp-text>
    </div>
  </div>
</template>

<script>
export default {
  props: ["minimized", "event"],
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
