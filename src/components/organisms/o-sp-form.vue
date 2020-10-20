<template>
  <form @submit.prevent="submitForm()">
    <component
      v-for="(field, index) in fields"
      :is="componentName(field.type)"
      :key="index"
      :type="field.type"
      :name="field.name"
      :icon="field.icon"
      :height="field.height"
      :fields="field.fields"
      :displayValue="field.displayValue || ''"
      @input="(e) => updateValue(index, e)"
      :placeholder="field.placeholder"
    />

    <div class="o-actions mt-8">
      <a-sp-button
        :text="submitTitle"
        type="primary"
        :submit="true"
        :full-width="true"
      />
    </div>
  </form>
</template>
<script>
import * as mutations from "@/store/mutation_types";
export default {
  props: ["fields", "namespace", "submitAction", "submitTitle"],
  created() {
    this.fields.forEach(({ name, type }) => {
      this.$store.commit(`${this.namespace}/${mutations.ADD_FORM_FIELD}`, {
        name,
        type,
      });
    });
  },
  methods: {
    submitForm() {
      this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },
    updateValue(index, value) {
      debugger;
      const name = this.fields[index].name;

      this.$store.commit(`${this.namespace}/${mutations.SET_FORM_FIELD}`, {
        name,
        value,
      });
    },
    componentName(type) {
      switch (type) {
        case "location":
          return "m-sp-location-input";
        case "selectbox":
          return "m-sp-dropdown";
        case "datebox":
          return "m-sp-datebox";
        case "textarea":
          return "m-sp-textarea-input";
        case "radio":
          return "m-sp-radio-group";
        default:
          return "m-sp-text-input";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.o-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
