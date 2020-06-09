<template>
  <div class="l-container l-container--standard">
   
    <router-view />
    <sp-navbar />
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
