<template>
   <div>
    <ul class="m-carousel">
      <li class="m-carousel__el">
        <div class="m-carousel__img">
          <img src="@/assets/img/carousel-man.png" />
      
        </div>
        <a-sp-title :text-center="true">Run like never before</a-sp-title>
        <a-sp-subtitle :text-center="true" size="medium">
          Sportive helps you get a good shape with smile on your face!
        </a-sp-subtitle>
      </li>
      <li class="m-carousel__el"></li>
      <li class="m-carousel__el"></li>
    </ul>
    <ul class="m-carousel-nav">
      <li class="m-carousel-nav__el is-active"><span class="m-carousel-nav__ball"></span></li>
      <li class="m-carousel-nav__el"><span class="m-carousel-nav__ball"></span></li>
      <li class="m-carousel-nav__el"><span class="m-carousel-nav__ball"></span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size"],
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-carousel {
  display: flex;
  position: relative;
  justify-content: center;
  &__img {
    height: 52vh;
    position: relative;
    &:after,
    &:before {
      content: "";
      display: block;
 
      border-radius: 100%;
      position: absolute;
    }
    &:before {
      background: $gray150;
      right: 0px;
      bottom: -10px;
      width: 224px;
      height: 224px;
    }
    &:after {
      border: 3px solid $blue;
      left: 30px;
      top: -30px;
      width: 200px;
      height: 200px;
    }
    // @media (max-width: 375px) {
    height: 250px;
    text-align: center;
    margin-bottom: 64px;
    svg {
      width: 100%;
      height: 100%;
    }
    //  }

    * {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
    }
    img {
      z-index: 1;
      // margin-top: 80px;
      left: 20px;
      margin-top: -$space-size-3 / 2;
      height: calc(100% + 24px);
      @media (max-width: 370px) {
        height: 100%;
        margin: auto;
        left: 0;
        right: 0;
      }
    }
  }
  &-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: $space-size-2 0 0 0;
    padding: $space-size-2;
    &__el {
      margin: 0 $space-size + 4;
      &.is-active {
        .carousel-nav__ball {
          background-color: $blue;
          width: $space-size;
          height: $space-size;
        }
      }
    }
    &__ball {
      display: block;
      width: $space-size - 2;
      height: $space-size - 2;
      background: $gray200;
      border-radius: 100%;
    }
  }
}

</style>
