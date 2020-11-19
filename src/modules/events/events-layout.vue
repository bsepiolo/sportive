<template>
  <div class="l-container l-container--standard">
    <router-view />
    <sp-navbar v-if="isNavbarVisible" />
  </div>
</template>
<script>
import SpNavbar from "../../components/molecules/m-sp-bottom-nav"

export default {
  name: "EventsModule",
  computed:{
    isNavbarVisible(){
      const {$route: {name}} = this;
      return name !== 'events.details' && name !== 'events.add';
    }
  },
  components:{
    SpNavbar
  }
};
</script>
