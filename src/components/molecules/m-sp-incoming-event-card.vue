<template>
  <div class="event-upcoming">
    <a-sp-icon icon="icon-basketball" type="complex" class="mb-2" />

    <div class="event-upcoming__data">
      <a-sp-title :light="true" size="medium">Football sparing 5x5</a-sp-title>
      <a-sp-subtitle :light="true" class="pt-0">Sienkiewicza 22</a-sp-subtitle>
      <div class="time-counter mt-2">
        <span class="time-counter__el">2h</span>
        <span class="time-counter__separator">:</span>
        <span class="time-counter__el">15m</span>
      </div>
      <img class="event-upcoming__image" src="@/assets/img/player.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["minimized", "event"],
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped="true">
.event-upcoming {
  border-radius: $border-radius;
  background: $green;
  padding: $space-size-2;
  position: relative;
  .header {
    color: $white;
  }
  .header-sub {
    color: $white;
    opacity: 0.8;
  }
  &:after {
    content: "";
    display: block;
    width: 125px;
    height: 100px;
    border-top-left-radius: 100%;
    border-bottom-right-radius: 10px;
    background: $darkGreen;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  &__image {
    position: absolute;
    right: -20px;
    top: -$space-size-2;
    z-index: 1;
  }
}
.time-counter{
    display: flex;
    align-items: center;
    &__el{
        color: $darkGreen;
        background: $white;
        font-size: 13px;
        border-radius: $border-radius / 2;
        display: flex;
        height: $space-size-4;
        width: $space-size-5;
        align-items: center;
        justify-content: center;
    }
    &__separator{
        color: white;
        padding: $space-size / 2;
    }
}
</style>
