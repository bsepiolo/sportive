<template>
  <div>
    <a-sp-title :text-center="true">Sign up to be in touch</a-sp-title>
    <a-sp-subtitle :text-center="true" size="medium" class="mb-8"
      >Sportive helps you get a good shape with smile on your
      face!</a-sp-subtitle
    >
    <o-sp-form
      :namespace="namespace"
      submitTitle="Register"
      :submitAction="signUp"
      :fields="fields"
    />

    <a-sp-text :text-center="true" class="mt-5">
      Don't have an account?
      <router-link :to="{ name: 'auth.signin' }" class="ml-1">
        Sing in
      </router-link>
    </a-sp-text>
  </div>
</template>
<script>
import OSpForm from "@/components/organisms/o-sp-form";
import { mapActions } from "vuex";
const namespace = "SignUpStore";

export default {
  data() {
    return {
      namespace: "SignUpStore",
      fields: [
        {
          type: "username",
          placeholder: "Username",
          model: "username",
          name: "username",
          icon: "eva eva-person-outline",
        },
        {
          type: "email",
          placeholder: "Email address",
          model: "email",
          name: "email",
          icon: "eva eva-email-outline",
        },
        {
          type: "password",
          placeholder: "Password",
          model: "password",
          name: "password",
          icon: "eva eva-lock-outline",
        },
      ],
    };
  },
  methods: {
    ...mapActions(namespace, ["signUp"]),
  },
  components: {
    OSpForm,
  },
};
</script>
