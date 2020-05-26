<template>
  <form @submit.prevent="submitForm()">
    <div v-for="(field, index) in fields" :key="index">
      <sp-textinput
        :type="field.type"
        :value="getValue(index)"
        :name="field.name"
        @input="e => updateValue(index, e)"
        :placeholder="field.placeholder"
      />
      {{field.model}}
    </div>

    <sp-textinput type="text" v-model="test" />
    {{test}}
    <div class="o-actions mt-8">
      <sp-button text="Login" type="primary" :submit="true" :full-width="true" />

      <p class="text text--medium text--center mt-5">
        Don't have an account?
        <a href="#">Sing up</a>
      </p>
      <sp-button
        class="mt-8"
        text="Continue with Google"
        type="secondary"
        styling-mode="outlined"
        :full-width="true"
      />
    </div>
  </form>
</template>
<script>
const namespace = "AuthStore";
export default {
  props: ["fields", "namespace", "submitAction"],
  data() {
    return {
      test: "asddwd"
    };
  },
  methods: {
    submitForm: function() {
      this.$store.dispatch(`${this.namespace}/${this.submitAction}`);
    },
    
    getValue: function(index){
      let name = this.fields[index].name;
      return this.$store.state[namespace].form[name];
    },

    updateValue: function(index, value) {
      let name = this.fields[index].name;
      this.$store.commit(`${namespace}/setFormField`, { name, value });
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
