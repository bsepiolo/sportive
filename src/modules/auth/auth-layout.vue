<template>
  <div class="l-container l-container--auth l-container--vertical-center">
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "AuthModule",
};
</script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity .2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
