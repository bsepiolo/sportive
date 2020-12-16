<template>
  <div>
    <a-sp-title size="small" class="pt-0 mb-2 mt-3">
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
        class="event-upcoming__icon mb-2"
        color="white"
        :shadow="true"
      />

      <div class="event-upcoming__data mt-3">
        <a-sp-title :light="true" size="medium" :shadow="true">{{
          event.name
        }}</a-sp-title>
        <a-sp-subtitle
          :light="true"
          size="medium"
          :shadow="true"
          class="pt-0 mt-0"
          >{{ event.location.name }}</a-sp-subtitle
        >
        <div class="time-counter mt-1">
          <div class="time-counter__el">
            <span class="time-counter__value">{{ countdown.hours }}</span>
            <span class="time-counter__label">Hours</span>
          </div>
          <span class="time-counter__separator">:</span>
          <div class="time-counter__el">
            <span class="time-counter__value">{{ countdown.minutes }}</span>
            <span class="time-counter__label">Minutes</span>
          </div>
        </div>
      </div>
      <img class="event-upcoming__image" src="@/assets/img/soccer.jpg" />
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
  overflow: hidden;
  .header {
    color: $white;
  }
  .header-sub {
    color: $white;
    opacity: 0.8;
  }
  &__data,
  &__icon {
    position: relative;
    z-index: 1;
  }
  &__image {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    z-index: 0;
    opacity: 0.2;
    mix-blend-mode: luminosity;
  }
}
.time-counter {
  display: flex;
  align-items: center;
  margin-bottom: $space-size;
  &__el {
    color: white;
    border-radius: $border-radius / 2;
    display: flex;
    margin: 0 $space-size-05;
    align-items: center;
    justify-content: center;
    font-family: "Nunito";
  }
  &__value {
    line-height: 15px;
    font-size: 30px;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    font-weight: 800;
  }
  &__label {
    position: absolute;
    font-size: 9px;
    text-transform: uppercase;
    bottom: -$space-size-05 - 3px;
    opacity: 0.7;
    letter-spacing: 1.4px;
  }
  &__separator {
    color: var(--color-var);
    padding: $space-size / 2;
    margin-top: -4px;
    font-weight: 800;
    font-size: 35px;
        font-family: "Nunito";

  }
}
</style>
