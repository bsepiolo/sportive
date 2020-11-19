<template>
  <div class="o-events">
    <a-sp-title size="small"  class="mt-3 mb-2">{{title}}</a-sp-title>
    <div class="o-events__list">
      <m-sp-event-card v-for="(event, index) in events" :event="event" :key="index" @click="handleClick(event.id)" class="mr-1" />
    </div>
  </div>
</template>
<script>

export default {
  props: ["title", "events"],
  methods:{
    handleClick(id){
      debugger
      this.$router.push({name: 'events.details', params: { id } })
    }
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
