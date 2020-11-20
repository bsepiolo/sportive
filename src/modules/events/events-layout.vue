<template>
  <div class="l-container l-container--standard">
    <o-sp-top-bar :user="user" v-if="isNavbarVisible" />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
    <m-sp-bottom-nav v-if="isNavbarVisible" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import MSpBottomNav from "../../components/molecules/m-sp-bottom-nav";
import OSpTopBar from "@/components/organisms/o-sp-top-bar";

export default {
  name: "EventsModule",
  computed: {
    isNavbarVisible() {
      const {
        $route: { name },
      } = this;
      return name !== "events.details" && name !== "events.add";
    },
    ...mapState(["user"]),
  },
  components: {
    OSpTopBar,
    MSpBottomNav,
  },
};
</script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
