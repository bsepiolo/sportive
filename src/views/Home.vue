<template>
   <div class="l-container l-container--auth l-container--vertical-center">
    <sp-carousel />
    <div class="p-actions">
      <sp-button type="primary" text="Sign in"/>
      <sp-button type="primary" class="ml-3" styling-mode="outlined" text="Sign up"/>
    </div>
  </div>
</template>

<script>

import SpCarousel from "@/components/molecules/sp-carousel.vue";
export default {
  name: "Home",
  data() {
    return {
      test: ""
    };
  },
  components: {
    SpCarousel
  }
};
</script>
<style lang="scss" scoped>
  .p-actions{
    margin-top: $space-size-6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

