<template>
   <ul class="m-list">
    <li class="m-list__el" v-for="(item, index) in items" :key="index" @click="clickHandler(item)">
      {{item[displayValue]}}
    </li>
  </ul>
</template>
<script>
export default {
  props: ["items", "displayValue"],
  methods: {
    clickHandler(e){
      this.$emit("click", e)
    }
  }
};
</script>
<style lang="scss" scoped>

.m-list{
  &__el{
    padding: $space-size + $space-size / 2 0;
    &:last-child{
      padding-bottom: $space-size / 2;
    }
    &:first-child{
      padding-top: $space-size / 2;
    }
  }
}
</style>
