<template>
  <div>
    <sp-header :text-center="true">Sign in</sp-header>
    <sp-subheader
      :text-center="true"
      class="mb-8"
    >Sportive helps you get a good shape with smile on your face!</sp-subheader>
    <sp-form 
    :namespace="namespace" 
    submitAction="signIn" 
    :fields="fields" />
  </div>
</template>
<script>
import SpForm from "@/components/organisms/sp-form";
export default {
  data() {
    return {
      namespace: "AuthStore",
      fields: [
        {
          type: "email",
          placeholder: "E-mail address",
          model: "email",
          name: "email"
        },
         {
          type: "passowrd",
          placeholder: "Password",
          model: "password",
          name: "password"
        }
      ]
    };
  },
  components: {
    SpForm
  }
};
</script>
