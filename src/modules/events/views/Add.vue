<template>
  <form @submit.prevent="submitForm()" style="position: relative;">
      <sp-header :text-center="true" class="mt-5">
      Sign in
    </sp-header>
    <sp-subheader :text-center="true" class="mb-5">
      Sportive helps you get a good shape with smile on your face!
    </sp-subheader>
    <sp-textbox
      type="text"
      v-model="name"
      icon="eva eva-person-outline"
      placeholder="Name"
    />
    <sp-textbox
      type="text"
      v-model="disicipline"
      icon="eva eva-email-outline"
      placeholder="Discipline"
    />
    <!-- <sp-textbox
      type="text"
      v-model="localization"
      icon="eva eva-email-outline"
      placeholder="Localization"
    /> -->
    <sp-location-picker
      type="text"
      v-model="locationCoordsSearchResults"
      icon="eva eva-lock-outline"
      placeholder="Location"
      :is-active="locationPickerActive"
      @getLocationByCoords="getLocationByCoords($event)"
      @focus="locationPickerActive = true"
    />
    <sp-textbox
      type="text"
      v-model="date"
      icon="eva eva-lock-outline"
      placeholder="Date"
    />
    <sp-textbox
      type="text"
      v-model="access"
      icon="eva eva-lock-outline"
      placeholder="Access"
    />
    <sp-textbox
      type="text"
      v-model="description"
      icon="eva eva-lock-outline"
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
        Don't have an account? <a href="#">Sing up</a>
      </p>
      <!-- <a href="#" class="btn btn--primary btn--outlined">Sign in</a> -->
    </div>
  </form>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
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
      "eventForm.description",
    ]),
    ...mapState(namespace, ["locationCoordsSearchResults"]),
  },
  methods: {
    submitForm() {
      this.addEvent();
    },
    ...mapActions(namespace, [
      "addEvent",
      "getLocationByCoords",
      "getLocationByName",
    ]),
  },
  mounted() {},
};
</script>

<style></style>
