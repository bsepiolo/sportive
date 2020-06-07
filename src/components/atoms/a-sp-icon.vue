<template>
  <div class="icon">
    <i :class="icon"></i>
  </div>
</template>
<script>
export default {
  props: ["icon"]
};
</script>
<style lang="scss" scoped>
.icon {
  width: $space-size-4;
  height: $space-size-4;
  background: #f1ebfc;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  i {
    color: #9e79e8;
    font-size: $space-size-2 + 2;
    display: block;
    height: $space-size-2 + 2;
    width: $space-size-2 + 2;
  }
  &--color-reverse {
    background: $white;
    i {
      color: $green;
    }
  }
}
</style>