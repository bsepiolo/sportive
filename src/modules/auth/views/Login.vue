<template>
  <div>
    <a-sp-title :text-center="true">Sign in</a-sp-title>
    <a-sp-subtitle
      :text-center="true"
      size="medium"
      class="mb-8"
    >Sportive helps you get a good shape with smile on your face!</a-sp-subtitle>
    <o-sp-form :namespace="namespace" submitTitle="Login" :submitAction="signIn" :fields="fields" />
    <a-sp-text text-center="true" class="mt-5">
      Don't have an account?
      <router-link :to="{name: 'auth.signup'}" class="ml-1">Sing up</router-link>
    </a-sp-text>
    <a-sp-button
      class="mt-8"
      text="Continue with Google"
      type="secondary"
      styling-mode="outlined"
      :full-width="true"
    />
  </div>
</template>
<script>
import OSpForm from "@/components/organisms/o-sp-form";
import {mapActions} from "vuex";
const namespace = "AuthStore";
export default {
  data() {
    return {
      namespace: "AuthStore",
      fields: [
        {
          type: "email",
          placeholder: "E-mail address",
          model: "email",
          name: "email",
          icon: "eva eva-email-outline",
          validationRules: {
            required: { text: "Field is required" },
            email: { text: "Email is invalid" },
          }
        },
        {
          type: "password",
          placeholder: "Password",
          model: "password",
          name: "password",
          icon: "eva eva-lock-outline",
          validationRules: {
            required: { text: "Field is required" },
          }
        }
      ]
    };
  },
  components: {
    OSpForm
  },
  methods:{
    ...mapActions(namespace, ['signIn'])
  }
};
</script>
