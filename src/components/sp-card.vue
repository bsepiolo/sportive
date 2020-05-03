<template>
  <div class="card" @click="handleClick()" :class="{'card--minimized': minimized}">
    <slot />
  </div>
</template>

<script>
export default {
    props:["minimized"],
    methods:{
      handleClick(){
      this.$emit('click')
    }
    }
};
</script>

<style lang="scss" scoped="true">
.card {
  background: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow-large;
  position: relative;
  z-index: 2;
  padding: $space-size-2;
  &--minimized{
      display: flex;
      align-items: center;
  }
}
</style>
