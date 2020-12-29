<template>
   <div class="l-container l-container--auth l-container--vertical-center" style="height: 100%;">
    <m-sp-carousel />
    <div class="p-actions">
      <a-sp-button type="primary" text="Sign in" @click="handleRedirectClick('auth.signin')"/>
      <a-sp-button type="primary" class="ml-3" @click="handleRedirectClick('auth.signup')" styling-mode="outlined" text="Sign up"/>
    </div>
  </div>
</template>

<script>

// import SpCarousel from "@/components/molecules/m-sp-carousel.vue";
export default {
  name: "Home",
  methods:{
    handleRedirectClick(name){
      this.$router.push({name})
    }
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

