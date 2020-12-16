<template>
  <div class="m-card" :class="{'m-card--small': size=='small'}" @click="handleClick()">
    <div class="m-card-header">
      <a-sp-icon :icon="event.discipline.icon" :color="event.discipline.color"  :size="size=='small'? 'extra-small':'small'" class="mb-2"/> 
      <a-sp-title :size="size=='small'? 'extra-small':'small'" type="light">{{event.name}}</a-sp-title>
      <a-sp-subtitle size="small" type="light" v-if="event.author">      {{event.author.displayName}}
</a-sp-subtitle>
    </div>
    <div class="m-card-meta">
      <a-sp-text size="small" v-if="event.locationData">{{event.locationData}}</a-sp-text>
      <a-sp-text size="small" v-if="event.date">{{moment(event.date.toDate()).format("hh:mm A")}}</a-sp-text>
    </div>
  </div>
</template>

<script>
export default {
  props: ["minimized", "event", "size"],
  methods: {
    handleClick() {
      this.$emit("click");
    }
  },
  mounted(){
    debugger
  }
};
</script>

<style lang="scss" scoped="true">
.m-card {
  flex-shrink: 0;
  border-radius: $border-radius;
  background: $white;
  box-shadow: $box-shadow-large;
  display: flex;
  flex-direction: column;
  padding: $space-size-2;
  justify-content: space-between;
  width: 160px;
  height: 160px;
  &--small {
    display: flex;
    align-items: center;
    width: 100px;
    height: 100px;
  }
}
</style>
