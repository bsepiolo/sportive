<template>
  <div>
    <a-sp-title size="large" :text-center="true" class="mt-2"
      >Event creator</a-sp-title
    >
    <a-sp-subtitle size="medium" :text-center="true" class="mb-5"
      >Sportive helps you get a good shape with smile on your
      face!</a-sp-subtitle
    >
    <o-sp-form
      :namespace="namespace"
      submitTitle="Create"
      :submitAction="addEvent"
      :fields="fields"
    />
  </div>
</template>

<script>
import * as actions from "@/store/action_types";
import * as mutations from "@/store/mutation_types";
import OSpForm from "@/components/organisms/o-sp-form";
import { mapActions, mapMutations, mapState } from "vuex";
import { debounce } from "lodash";
const namespace = "EventsAddStore";

export default {
  data() {
    return {
      locationPickerActive: false,
      namespace: "EventsAddStore",
      fields: [
        {
          type: "text",
          placeholder: "Name",
          model: "name",
          name: "name",
          icon: "eva eva-person-outline",
          validationRules: {
            required: { text: "Field is required" },
          },
        },
        {
          type: "selectbox",
          placeholder: "Disicipline",
          model: "discipline",
          name: "discipline",
          icon: "eva eva-award-outline",
          displayValue: "name",
          source: "disciplinesDictionary",
          action: actions.FETCH_EVENT_DISCIPLINES,
          validationRules: {
            required: { text: "Field is required" },
          },
        },
        {
          type: "location",
          placeholder: "Location",
          model: "location",
          name: "location",
          icon: "eva eva-pin-outline",
          displayValue: "name",
          validationRules: {
            required: { text: "Field is required" },
          },
        },
        {
          type: "datebox",
          placeholder: "Date",
          model: "date",
          name: "date",
          icon: "eva eva-calendar-outline",
          validationRules: {
            required: { text: "Field is required" },
          },
        },
        {
          type: "group",
          mutation: mutations.SET_CLOCK,
          fields: [
            {
              type: "selectbox",
              placeholder: "Hour",
              model: "hours",
              name: "hours",
              displayValue: "name",
              source: "hours",
              maxHeight: 200,
              joinAs: "time",
              depends: "date",
              validationRules: {
                required: { text: "Field is required" },
              },
            },
            {
              type: "selectbox",
              placeholder: "Minute",
              model: "minutes",
              name: "minutes",
              displayValue: "name",
              source: "minutes",
              maxHeight: 200,
              joinAs: "time",
              depends: "date",
              validationRules: {
                required: { text: "Field is required" },
              },
            },
          ],
        },
        {
          type: "radio",
          placeholder: "Access",
          model: "access",
          name: "access",
          validationRules: {
            required: { text: "Choose one of the fields above" },
          },
          fields: [
            {
              name: "Public",
              icon: "eva eva-people-outline",
            },
            {
              name: "Private",
              icon: "eva eva-lock-outline",
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
  computed: {
    ...mapState(namespace, ["form"]),
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(namespace, {
      removeDistanceAndTime: mutations.REMOVE_DISTANCE_AND_TIME,
    }),
    ...mapActions(namespace, {
      findLocationByName: actions.FIND_LOCATION_BY_NAME,
      addEvent: actions.ADD_EVENT,
    }),
    findLocation: debounce(function(e) {
      if (e.length > 2) {
        this.findLocationByName(e);
      }
    }, 400),
    submitForm() {
      this.addEvent();
    },
  },
  destroyed() {
    this.removeDistanceAndTime();
  },
  components: {
    OSpForm,
  },
};
</script>

<style></style>
