<template>
   <div>
    <sp-header :text-center="true">
      Sign up to be in touch
    </sp-header>
    <sp-subheader :text-center="true" class="mb-8">
      Sportive helps you get a good shape with smile on your face!
    </sp-subheader>
    <form>
      <sp-textbox placeholder="Username" />
      <sp-textbox placeholder="E-maill address" />
      <sp-textbox placeholder="Password" />
      <div class="actions actions-vertical mt-8">
        <sp-button text="Register" type="primary" :full-width="true" />
        <p class="text text--medium text--center mt-4">Don't have an account? <a href="#">Sing up</a></p>
        <!-- <a href="#" class="btn btn--primary btn--outlined">Sign in</a> -->
      </div>
    </form>
  </div>
</template>
