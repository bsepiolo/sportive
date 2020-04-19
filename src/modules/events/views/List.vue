<template>
  <div>
    <div class="date-picker">
      <ul class="date-picker__list">
        <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
        <li class="date-picker__el is-active">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
        <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
        <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
        <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
        <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
           <li class="date-picker__el">
          <span class="date-picker__day">
            Mon
          </span>
          <span class="date-picker__date">
            21
          </span>
        </li>
      </ul>
    </div>
    <div class="tabpanel">
      <ul class="tabpanel__nav">
        <li class="tabpanel__name is-active">My</li>
        <li class="tabpanel__name">Nearest</li>
        <li class="tabpanel__name">All</li>
      </ul>
      <div class="tabpanel__item">
        <sp-events-list-el />
        <sp-events-list-el />
        <sp-events-list-el />
        <sp-events-list-el />
      </div>
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
