<template>
  <ul class="avatar-list">
    <li class="avatar-list__el" v-for="(item, index) in items" :key="index">
      <a-sp-avatar :image-src="item.imageSrc" />
    </li>
    <li class="avatar-list__el">
      <div class="avatar-list__counter">
8
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["items"],
};
</script>
<style lang="scss" scoped>
.avatar-list{
  display: flex;
  &__el{
    margin-right: -$space-size;
  }
  &__counter{
    border: 2px solid $gray150;
    color: $blue;
    width: $space-size-3;
    height: $space-size-3;
    border-radius: 100%;
    font-weight: 800;
    font-size: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $white;
    box-sizing: content-box;
  }
}
</style>