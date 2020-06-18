<template>
  <div>
    <sp-title size="large" :text-center="true" class="mt-6">Event creator</sp-title>
      <sp-subtitle size="medium" :text-center="true" class="mb-5"
        >Sportive helps you get a good shape with smile on your
        face!</sp-subtitle>
    <sp-form
      :namespace="namespace"
      submitTitle="Create"
      submitAction="addEvent"
      :fields="fields"
    />
    <!-- <form @submit.prevent="submitForm()" style="position: relative;"> -->
      <!-- <sp-header :text-center="true" class="mt-5">Sign in</sp-header>
      <sp-subheader :text-center="true" class="mb-5"
        >Sportive helps you get a good shape with smile on your
        face!</sp-subheader
      > -->
<!-- 
      <sp-textbox
        type="text"
        v-model="name"
        icon="eva eva-person-outline"
        placeholder="Name"
      />
      <sp-textbox
        type="text"
        v-model="disicipline"
        icon="eva eva-award-outline"
        placeholder="Discipline"
      />
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
      <sp-textbox
        type="text"
        v-model="date"
        icon="eva eva-calendar-outline"
        placeholder="Date"
      />
      <sp-textbox
        type="text"
        v-model="access"
        icon="eva eva-shield-outline"
        placeholder="Access"
      />
      <sp-textbox
        type="text"
        v-model="description"
        icon="eva eva-file-text-outline"
        placeholder="Description"
      />
      <div class="actions actions-vertical mt-8">
        <sp-button
          text="Register"
          :submit="true"
          type="primary"
          :full-width="true"
        />
        <p class="text text--medium text--center mt-5">
          Don't have an account?
          <a href="#">Sing up</a>
        </p> -->
        <!-- <a href="#" class="btn btn--primary btn--outlined">Sign in</a> -->
      <!-- </div> -->
    <!-- </form> -->
  </div>
</template>

<script>
import SpForm from "@/components/organisms/sp-form";

import { mapActions, mapState } from "vuex";
import _ from "lodash";
const namespace = "EventsStore";

export default {
  data() {
    return {
      locationPickerActive: false,
      namespace: "EventsStore",
      fields: [
        {
          type: "text",
          placeholder: "Name",
          model: "name",
          name: "name",
          icon: "eva eva-person-outline",
        },
        {
          type: "text",
          placeholder: "Disicipline",
          model: "disicipline",
          name: "disicipline",
          icon: "eva eva-award-outline",
        },
        {
          type: "location",
          placeholder: "Location",
          model: "location.name",
          name: "location.name",
          icon: "eva eva-pin-outline",
        },
        {
          type: "text",
          placeholder: "Date",
          model: "date",
          name: "date",
          icon: "eva eva-calendar-outline",
        },
        {
          type: "text",
          placeholder: "Access",
          model: "access",
          name: "access",
          icon: "eva eva-shield-outline",
        },
        {
          type: "text",
          placeholder: "Description",
          model: "description",
          name: "description",
          icon: "eva eva-file-text-outline",
        },
      ],
    };
  },
  computed: {
    // ...mapFields(namespace, [
    //   "eventForm.name",
    //   "eventForm.disicipline",
    //   "eventForm.locationData",
    //   "eventForm.date",
    //   "eventForm.access",
    //   "eventForm.description",
    // ]),
    ...mapState(namespace, [
      "locationCoordsSearchResults",
      "locationSearchResults",
    ]),
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
     // "addEvent",
      "getLocationByCoords",
      "getLocationsByName",
    ]),
  },
  components: {
    SpForm,
  },
};
</script>

<style></style>
