<template>
  <div>
    <sp-title :text-center="true">Sign up to be in touch</sp-title>
    <sp-subtitle
      :text-center="true"
      size="medium"
      class="mb-8"
    >Sportive helps you get a good shape with smile on your face!</sp-subtitle>
    <sp-form :namespace="namespace" submitTitle="Register" submitAction="signIn" :fields="fields" />

    <sp-text :text-center="true" class="mt-5">
      Don't have an account?
      <router-link :to="{name: 'auth.signin'}" class="ml-1">
        Sing in
      </router-link>
    </sp-text>
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
          type: "username",
          placeholder: "Username",
          model: "username",
          name: "username",
          icon: "eva eva-person-outline"
        },
        {
          type: "email",
          placeholder: "Email address",
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
