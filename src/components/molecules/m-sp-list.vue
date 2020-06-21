<template>
   <ul class="m-list">
    <li class="m-list__el" v-for="(item, index) in items" :key="index" @click = "clickHandler(item)">
      {{item.address.freeformAddress}}
    </li>
  </ul>
</template>
<script>
export default {
  props: ["items"],
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clickHandler(e){
      this.$emit("click", e)
    }
  }
};
</script>
<style lang="scss" scoped>

.m-list{
  &__el{
    padding: $space-size 0;
    border-bottom: 1px solid $gray150;
    &:last-child{
      border: none; 
      padding-bottom: 0;
    }
    &:first-child{
      padding-top: 0;
    }
  }
}
</style>
