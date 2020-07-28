<template>
  <form @submit.prevent="submitForm()">
    <component
      v-for="(field, index) in fields"
      :is="componentName(field.type)"
      :key="index"
      :type="field.type"
      :name="field.name"
      :icon="field.icon"
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
import SpLocationpicker from "@/components/sp-location-picker";
import SpSelectbox from "@/components/molecules/m-sp-selectbox";

export default {
  props: ["fields", "namespace", "submitAction", "submitTitle"],
  computed: {},
  created() {
    this.fields.forEach((e) => {
      this.$store.commit(`${this.namespace}/registerFormField`, {name: e.name, type: e.type});
    });
  },
  methods: {
    submitForm: function() {
      this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },
    updateValue: function(index, value) {
      let name = this.fields[index].name;
      this.$store.commit(`${this.namespace}/setFormField`, { name, value });
    },
    componentName: function(type) {
      switch (type) {
        case "location":
          return "sp-locationpicker";
        case "selectbox":
          return "sp-selectbox";
        default:
          return "sp-textinput";
      }
    },
  },
  components: {
    SpLocationpicker,
    SpSelectbox,
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
