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
      @input="(e) => updateValue(index, e)"
      :placeholder="field.placeholder"
    />

    <div class="o-actions mt-8">
      <sp-button
        :text="submitTitle"
        type="primary"
        :submit="true"
        :full-width="true"
      />
    </div>
  </form>
</template>
<script>
import SpLocationpicker from "@/components/molecules/m-sp-location-input";
import SpSelectbox from "@/components/molecules/m-sp-selectbox";
import SpTextAreaInput from "@/components/molecules/m-sp-text-area-input";
import SpRadioButton from "@/components/molecules/m-sp-radio-group";

export default {
  props: ["fields", "namespace", "submitAction", "submitTitle"],
  computed: {},
  created() {
    this.fields.forEach(({name, type}) => {
      this.$store.commit(`${this.namespace}/registerFormField`, {name, type});
    });
  },
  methods: {
    submitForm() {
      this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },
    updateValue(index, value) {
      let name = this.fields[index].name;
      this.$store.commit(`${this.namespace}/setFormField`, { name, value });
    },
    componentName(type) {
      switch (type) {
        case "location":
          return "sp-locationpicker";
        case "selectbox":
          return "sp-selectbox";
        case "textarea":
          return "sp-text-area-input";
          case "radio":
            return "sp-radio-button";
        default:
          return "sp-textinput";
      }
    },
  },
  components: {
    SpLocationpicker,
    SpSelectbox,
    SpTextAreaInput,
    SpRadioButton
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
