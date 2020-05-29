<template>
  <form @submit.prevent="submitForm()">

    <sp-textinput
      v-for="(field, index) in fields"
      :key="index"
      :type="field.type"
      :value="getValue(index)"
      :name="field.name"
      :icon="field.icon"
      @input="e => updateValue(index, e)"
      :placeholder="field.placeholder"
    />

    <div class="o-actions mt-8">
      <sp-button :text="submitTitle" type="primary" :submit="true" :full-width="true" />
    </div>
  </form>
</template>
<script>
export default {
  props: ["fields", "namespace", "submitAction", "submitTitle"],
  methods: {
    submitForm: function() {
      this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },

    getValue: function(index) {
      let name = this.fields[index].name;
      return this.$store.state[this.namespace].form[name];
    },

    updateValue: function(index, value) {
      let name = this.fields[index].name;
      this.$store.commit(`${this.namespace}/setFormField`, { name, value });
    }
  }
};
</script>
<style lang="scss" scoped>
.o-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
