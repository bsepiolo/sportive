<template>
  <div id="app">
    <div class="wrapper">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import "eva-icons/style/eva-icons.css";
import "./assets/css/scss/5_vendors/iconmoon/style.css";
export default {};
</script>

<style lang="scss" src="@/assets/css/scss/main.scss"></style>
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