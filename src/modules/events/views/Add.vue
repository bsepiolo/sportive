<template>
  <div>
    <a-sp-title size="large" :text-center="true" class="mt-6"
      >Event creator</a-sp-title
    >
    <a-sp-subtitle size="medium" :text-center="true" class="mb-5"
      >Sportive helps you get a good shape with smile on your face!</a-sp-subtitle
    >
    <o-sp-form
      :namespace="namespace"
      submitTitle="Create"
      submitAction="addEvent"
      :fields="fields"
    />
  </div>
</template>

<script>
import * as actions from "../store/action_types"
import OSpForm from "@/components/organisms/o-sp-form";

import { mapActions } from "vuex";
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
          type: "selectbox",
          placeholder: "Disicipline",
          model: "discipline",
          name: "discipline",
          icon: "eva eva-award-outline",
          displayValue: "value"
        },
        {
          type: "location",
          placeholder: "Location",
          model: "location",
          name: "location",
          icon: "eva eva-pin-outline",
          displayValue: "locationName"
        },
        {
          type: "text",
          placeholder: "Date",
          model: "date",
          name: "date",
          icon: "eva eva-calendar-outline",
        },
        {
          type: "radio",
          placeholder: "Access",
          model: "access",
          name: "access",
          fields: [
            {
              name: "Public",
              icon: "eva eva-lock-outline",
              isChecked: false,
            },
            {
              name: "Private",
              icon: "eva eva-people-outline",
              isChecked: false,
            },
          ],
          icon: "eva eva-shield-outline",
        },
        {
          type: "textarea",
          placeholder: "Description",
          model: "description",
          name: "description",
          icon: "eva eva-file-text-outline",
          height: "100px",
        },
      ],
    };
  },
  methods: {
    findLocation: _.debounce(function(e) {
      if (e.length > 2) {
        this.findLocationByName(e);
      }
    }, 400),
    submitForm() {
      this.addEvent();
    },
    ...mapActions(namespace, {
      findLocationByName: actions.FIND_LOCATION_BY_NAME
    }),
  },
  components: {
    OSpForm,
  },
};
</script>

<style></style>
