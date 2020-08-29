<template>
  <div>
    <sp-title :text-center="true">Sign in</sp-title>
    <sp-subtitle
      :text-center="true"
      size="medium"
      class="mb-8"
    >Sportive helps you get a good shape with smile on your face!</sp-subtitle>
    <sp-form :namespace="namespace" submitTitle="Login" submitAction="signIn" :fields="fields" />
    <sp-text text-center="true" class="mt-5">
      Don't have an account?
      <router-link :to="{name: 'auth.signup'}" class="ml-1">Sing up</router-link>
    </sp-text>
    <sp-button
      class="mt-8"
      text="Continue with Google"
      type="secondary"
      styling-mode="outlined"
      :full-width="true"
    />
  </div>
</template>
<script>
import SpForm from "@/components/organisms/o-sp-form";
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
          icon: "eva eva-email-outline"
        },
        {
          type: "password",
          placeholder: "Password",
          model: "password",
          name: "password",
          icon: "eva eva-lock-outline"
        }
      ]
    };
  },
  components: {
    SpForm
  }
};
</script>
