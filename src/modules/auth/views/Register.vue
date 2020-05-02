<template>
  <div>
    <sp-header :text-center="true">
      Sign up to be in touch
    </sp-header>
    <sp-subheader :text-center="true" class="mb-8">
      Sportive helps you get a good shape with smile on your face!
    </sp-subheader>
    <form @submit.prevent="submitForm()">
      <sp-textbox
        type="text"
        v-model="username"
        icon="eva eva-person-outline"
        placeholder="Username"
      />
      <sp-textbox
        type="email"
        v-model="email"
        icon="eva eva-email-outline"
        placeholder="E-maill address"
      />
      <sp-textbox
        type="password"
        v-model="password"
        icon="eva eva-lock-outline"
        placeholder="Password"
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
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
const namespace = "AuthStore";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapFields(namespace, [
      "authForm.username",
      "authForm.email",
      "authForm.password",
    ]),
  },
  methods: {
    submitForm() {
      this.$store.dispatch(`${namespace}/signUp`);
    },
  },
};
</script>
