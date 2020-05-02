<template>
  <div class="container container--auth container--vertical-center">
    <ul class="carousel">
      <li class="carousel__el">
        <div class="carousel__img">
          <img src="@/assets/img/carousel-man.png" />
      
        </div>
        <sp-header :text-center="true">Run like never before</sp-header>
        <sp-subheader :text-center="true">
          Sportive helps you get a good shape with smile on your face!
        </sp-subheader>
      </li>
      <li class="carousel__el"></li>
      <li class="carousel__el"></li>
    </ul>
    <ul class="carousel-nav">
      <li class="carousel-nav__el is-active"><span class="carousel-nav__ball"></span></li>
      <li class="carousel-nav__el"><span class="carousel-nav__ball"></span></li>
      <li class="carousel-nav__el"><span class="carousel-nav__ball"></span></li>
    </ul>
    <div class="actions mt-6">
            <a href="#" class="btn btn--primary btn--outlined mr-1-5">Sign up</a>
      <a href="#" class="btn btn--primary ml-1-5">Sign in</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// Initialize Firebase


export default {
  name: "Home",
  data() {
    return {
      test: ""
    };
  },
  components: {},
  
};
</script>
