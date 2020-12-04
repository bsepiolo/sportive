<template>
    <div
      id="locationPickerMap"
      class="texteditor__location-map"
      :class="{ 'texteditor__location-map--z-index-max': zIndexMax }"
      @click="$emit('click')"
    ></div>
</template>

<script>
export default {
  props: [
    "location",
    "setMap",
    "calculateRouteOnLoad",
    "setUserLocation",
    "zIndexMax",
  ],
  created() {},
  mounted() {
    this.setMap().then(() => {
      this.setUserLocation().then(() => {
        debugger
        if (!this.calculateRouteOnLoad) {
          debugger
          this.location.map.on("click", (event) => {
            this.$emit("findRouteDistance", event);
          });
        } else {
          this.$emit("findRouteDistance", event);
        }
      });
    });
  },
  destroyed(){
    // this.$emit("removeMap");
  }
};
</script>

<style lang="scss" scoped>
.texteditor__location-map {
  &--z-index-max {
    z-index: 999;
  }
  background: $gray100;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
</style>
