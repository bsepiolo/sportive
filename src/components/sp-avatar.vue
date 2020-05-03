<template>
  <div class="avatar">
    <img
      :src="imageSrc"
    />
  </div>
</template>
<script>
export default {
  props: ["imageSrc"],
};
</script>
<style lang="scss" scoped>
.avatar{
  height: $space-size-3;
  width: $space-size-3;
  border-radius: 100%;
  overflow: hidden;
  border: 2px solid $white;
  box-sizing: content-box;
  flex-shrink: 0;
  img{
    width: 100%;
  }
}
</style>