<template>
  <form @submit.prevent="submitForm()" style="position: relative;">
    <sp-header :text-center="true" class="mt-5">Sign in</sp-header>
    <sp-subheader
      :text-center="true"
      class="mb-5"
    >Sportive helps you get a good shape with smile on your face!</sp-subheader>
    <sp-textbox type="text" v-model="name" icon="eva eva-person-outline" placeholder="Name" />
    <sp-textbox
      type="text"
      v-model="disicipline"
      icon="eva eva-award-outline"
      placeholder="Discipline"
    />
    <!-- <sp-textbox
      type="text"
      v-model="localization"
      icon="eva eva-email-outline"
      placeholder="Localization"
    />-->
    {{locationData}}s
    <sp-location-picker
      type="text"
      v-model="locationData"
      icon="eva eva-pin-outline"
      :dropdownSource="locationSearchResults"
      @input="findLocation($event)"
      placeholder="Location"
      :is-active="locationPickerActive"
      @getLocationByCoords="getLocationByCoords($event)"
      @focus="locationPickerActive = true"
    />
    <sp-textbox type="text" v-model="date" icon="eva eva-calendar-outline" placeholder="Date" />
    <sp-textbox type="text" v-model="access" icon="eva eva-shield-outline" placeholder="Access" />
    <sp-textbox
      type="text"
      v-model="description"
      icon="eva eva-file-text-outline"
      placeholder="Description"
    />
    <div class="actions actions-vertical mt-8">
      <sp-button text="Register" :submit="true" type="primary" :full-width="true" />
      <p class="text text--medium text--center mt-5">
        Don't have an account?
        <a href="#">Sing up</a>
      </p>
      <!-- <a href="#" class="btn btn--primary btn--outlined">Sign in</a> -->
    </div>
  </form>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import _ from "lodash";
const namespace = "EventsStore";

export default {
  data() {
    return {
      locationPickerActive: false,
    };
  },
  computed: {
    ...mapFields(namespace, [
      "eventForm.name",
      "eventForm.disicipline",
      "eventForm.locationData",
      "eventForm.date",
      "eventForm.access",
      "eventForm.description"
    ]),
    ...mapState(namespace, [
      "locationCoordsSearchResults",
      "locationSearchResults"
    ])
  },
  methods: {
    findLocation: _.debounce(function(e) {
      if (e.length > 2) {
        this.getLocationsByName(e);
      }
    }, 400),
    submitForm() {
      this.addEvent();
    },
    ...mapActions(namespace, [
      "addEvent",
      "getLocationByCoords",
      "getLocationsByName"
    ])
  },
  mounted() {}
};
</script>

<style></style>
