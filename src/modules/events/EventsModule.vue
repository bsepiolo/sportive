<template>
  <div class="l-container l-container--standard">
   
    <router-view />
    <sp-navbar v-if="$route.name !== 'events.details' && $route.name !== 'events.add' " />
  </div>
</template>
<script>
import SpNavbar from "../../components/molecules/m-sp-bottom-nav"

export default {
  name: "EventsModule",
  components:{
    SpNavbar
  }
};
</script>
