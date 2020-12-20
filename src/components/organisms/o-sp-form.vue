<template>
  <form ref="form" class="o-form" @submit.prevent="submitForm($event)">
    <a-sp-validation-group ref="validationGroup">
      <div v-for="(field, index) in fields" :key="index">
        <div class="o-form__group" v-if="field.type == 'group'">
          <div v-for="(field, index) in field.fields" :key="index">
            <component
              class="o-form__field"
              :is="componentName(field.type)"
              :type="field.type"
              :name="field.name"
              :icon="field.icon"
              :height="field.height"
              :fields="field.fields"
              :source="field.source"
              :action="field.action"
              :joinAs="field.joinAs"
              :maxHeight="field.maxHeight"
              :validationRules="field.validationRules"
              :displayValue="field.displayValue || ''"
              @input="(e) => updateValue(index, e)"
              :placeholder="field.placeholder"
              :depends="field.depends"
              :ref="`field${index}`"
            />
          </div>
        </div>
        <div v-else>
          <component
            class="o-form__field"
            :is="componentName(field.type)"
            :type="field.type"
            :name="field.name"
            :icon="field.icon"
            :maxHeight="field.maxHeight"
            :height="field.height"
            :joinAs="field.joinAs"
            :fields="field.fields"
            :source="field.source"
            :action="field.action"
            :validationRules="field.validationRules"
            :displayValue="field.displayValue || ''"
            @input="(e) => updateValue(index, e)"
            :placeholder="field.placeholder"
            :depends="field.depends"
            :ref="`field${index}`"
          />
        </div>
      </div>
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
    this.fields.forEach(({ name, type, validationRules, joinAs, mutation, fields }) => {
      if (validationRules) {
        this.validFieldsNumber++;
      }
      if (type == "group") {
        if (mutation) {
          this.$store.commit(`${this.namespace}/${mutation}`);
        }
        fields.forEach(({ name, type, joinAs }) => {
          this.$store.commit(`${this.namespace}/${mutations.ADD_FORM_FIELD}`, {
            name,
            type,
            joinAs,
          });
        });
      } else {
        this.$store.commit(`${this.namespace}/${mutations.ADD_FORM_FIELD}`, {
          name,
          joinAs,
          type,
        });
      }
    });
  },
  methods: {
    submitForm() {
      this.valid = this.$refs.validationGroup.validateFields();
      if (this.valid) {
        this.submitAction();
      }
    },
    updateValue(index, payload) {
      this.$store.commit(
        `${this.namespace}/${mutations.SET_FORM_FIELD}`,
        payload
      );
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
          return "m-sp-textarea";
        case "radio":
          return "m-sp-radio-group";
        default:
          return "m-sp-textbox";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.o-form {
  &__field {
    margin-bottom: $space-size;
  }
  &__group {
    display: flex;
    justify-content: space-between;
    > * {
      margin-right: $space-size;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.o-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
