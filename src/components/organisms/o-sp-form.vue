<template>
  <form ref="form" @submit.prevent="submitForm($event)">
    {{ this.validFields.length }}
    valid {{ valid }}\
    <a-sp-validation-group>
      <component
        v-for="(field, index) in fields"
        :is="componentName(field.type)"
        :key="index"
        :type="field.type"
        :name="field.name"
        :icon="field.icon"
        :height="field.height"
        :fields="field.fields"
        :validationRules="field.validationRules"
        :displayValue="field.displayValue || ''"
        @isValid="(e) => isValid(index, e)"
        @input="(e) => updateValue(index, e)"
        :placeholder="field.placeholder"
        :ref="`field${index}`"
      />
    </a-sp-validation-group>

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
  data() {
    return {
      fieldsToValidateNumber: 0,
      validFields: [],
      valid: false,
    };
  },
  created() {
    this.fields.forEach(({ name, type, validationRules }) => {
      if (validationRules) {
        this.validFieldsNumber++;
      }
      this.$store.commit(`${this.namespace}/${mutations.ADD_FORM_FIELD}`, {
        name,
        type,
      });
    });
  },
  methods: {
    isValid(index, e) {
      debugger;
      const isInArray = this.validFields.some((e) => e == index);
      if (e && !isInArray) {
        this.validFields.push(index);
      } else if (!e && isInArray) {
        this.validFields = this.validFields.filter((e) => e != index);
      }
    },
    submitForm() {
      const data = this.fields.filter((el) => {
        return el.validationRules;
      });
      debugger;
    //  this.$refs.field0[0].validate();
      // for (ref in this.$refs) {
      //   console.log(ref);
      // }
      // this.$refs.forEach((e, index) => {
      //   const valid = this.validFields.filter((validIndex) => {
      //     return index == validIndex;
      //   });
      //   if (!valid) {
      //     e[0].isValid = false;
      //   }
      // });

      // this.$refs.field3[0].isValid = false;
      const validated = this.validFields.filter((validIndex) => {
        return data.filter((e, index) => {
          validIndex != index;
        });
      });
      console.log("validated", validated);
      if (this.validFields.length == data.length) {
        this.valid = true;
      } else {
        this.valid = false;
      }

      // this.submitAction();
      // this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },
    updateValue(index, value) {
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
