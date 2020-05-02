<template>
  <div>
        <sp-header size="small" class="pt-0 mb-1">
            Upcoming

    </sp-header>
    <div class="events-list__upcoming">
      <div class="events-list__icon events-list__icon--color-reverse">
        <i class="icon-049-dumbbell"></i>
      </div>
      <div class="events-list__data">
        <sp-header size="medium">
          Football sparing 5x5
        </sp-header>
        <sp-subheader class="pt-0">
          Sienkiewicza 22
        </sp-subheader>
        <div class="time-counter mt-1">
          <span class="time-counter__el">2h</span>
          <span class="time-counter__separator">:</span>
          <span class="time-counter__el">15m</span>
        </div>
        <img class="events-list__image" src="../../../assets/img/player.png">
      </div>
    </div>
    <sp-header size="small" class="mt-3 mb-1">
            Your participation

    </sp-header>

    <div class="events-list">
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
    </div>
    <sp-header size="small" class="mt-3 mb-1">
      Recommended
    </sp-header>

    <div class="events-list">
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
      <sp-events-list-el />
    </div>
  </div>
</template>
<script>
import SpEventsListEl from "../components/sp-event-list-el/sp-event-list-el";
export default {
  components: {
    SpEventsListEl,
  },
};
</script>
