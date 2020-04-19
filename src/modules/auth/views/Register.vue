<template>
  <div>
    <sp-header :text-center="true">
      Sign up to be in touch
    </sp-header>
    <sp-subheader :text-center="true" class="mb-8">
      Sportive helps you get a good shape with smile on your face!
    </sp-subheader>
    <form @submit="submitForm()">
      <sp-textbox
        type="text"
        v-model="user.username"
        icon="eva eva-person-outline"
        placeholder="Username"
      />
      <sp-textbox
        type="email"
        v-model="user.email"
        icon="eva eva-email-outline"
        placeholder="E-maill address"
      />
      <sp-textbox
        type="password"
        v-model="user.password"
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
        <p class="text text--medium text--center mt-4">
          Don't have an account? <a href="#">Sing up</a>
        </p>
        <!-- <a href="#" class="btn btn--primary btn--outlined">Sign in</a> -->
      </div>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyD8N9r2ATD4-5c-uKrgg_L_m4m0KKguY_0",
  authDomain: "sportive-fbbd4.firebaseapp.com",
  databaseURL: "https://sportive-fbbd4.firebaseio.com",
  projectId: "sportive-fbbd4",
  storageBucket: "sportive-fbbd4.appspot.com",
  messagingSenderId: "460864406383",
  appId: "1:460864406383:web:b604005880e7ed68515e9a",
  measurementId: "G-DVCGZD4DF0",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          return db.collection("users").doc(data.user.uid).set({username: this.user.username});
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(`${errorCode}, ${errorMessage}`)
        });
      
    },
  },
  mounted: function() {
    const userRef = db.collection("Users").where("email", "==", "test");
    console.log(userRef);
  },
};
</script>
