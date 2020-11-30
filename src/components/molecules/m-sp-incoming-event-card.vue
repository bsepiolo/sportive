<template>
  <div>
    <a-sp-title size="small" class="pt-0 mb-2 mt-2">
      {{ title }}
    </a-sp-title>
    <div
      class="event-upcoming"
      @click="$emit('click')"
      :style="{
        background: event.discipline.color,
        '--color-var': this.lightenDarkenColor(event.discipline.color, -30),
      }"
    >
      <a-sp-icon
        :icon="event.discipline.icon"
        styling-mode="complex"
        :color="event.discipline.color"
        class="mb-2"
      />

      <div class="event-upcoming__data">
        <a-sp-title :light="true" size="medium">{{ event.name }}</a-sp-title>
        <a-sp-subtitle :light="true" class="pt-0">{{
          event.location.name
        }}</a-sp-subtitle>
        <div class="time-counter mt-2">
          <span class="time-counter__el">{{ countdown.hours }}h</span>
          <span class="time-counter__separator">:</span>
          <span class="time-counter__el">{{ countdown.minutes }}m</span>
        </div>
        <img class="event-upcoming__image" src="@/assets/img/player.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["minimized", "event", "title"],
  computed: {
    countdown() {
      let now = this.moment().format("X");
      let { date: eventDate } = this.event;
      let formatedDate = eventDate.toDate();
      let end = this.moment(formatedDate);
      var diff = end.format("X") - now;

      let result = this.moment.duration(
        this.moment(diff) * 1000,
        "milliseconds"
      );

      // var duration = this.moment.duration(diffTime * 1000, "milliseconds");
      return { hours: result.hours(), minutes: result.minutes() };
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
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
    background: var(--color-var);
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
.time-counter {
  display: flex;
  align-items: center;
  &__el {
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
  &__separator {
    color: white;
    padding: $space-size / 2;
  }
}
</style>
