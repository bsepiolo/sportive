<template>
  <div class="o-events">
    <sp-title size="small"  class="mt-3 mb-1">{{title}}</sp-title>
    <div class="o-events__list">
      <sp-event-card v-for="(event, index) in events" :event="event" :key="index" class="mr-1" />
  
    </div>
  </div>
</template>
<script>
import SpEventCard from "../molecules/m-sp-event-card";

export default {
  props: ["title", "events"],
  components: {
    SpEventCard
  }
};
</script>
<style lang="scss" scoped>
.o-events {
  &__list {
    display: flex;
    flex-direction: row;
  }
}
</style>
