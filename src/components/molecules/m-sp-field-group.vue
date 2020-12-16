<template>
 <div>
   <div v-for="(el, index) in fields" :key="index">
     {{el}}
   </div>
 </div>
</template>

<script>
export default {
  props: ["fields"],
  methods: {
    handleClick() {
      this.$emit("click");
    }
  },
};
</script>

<style lang="scss" scoped="true">

</style>
