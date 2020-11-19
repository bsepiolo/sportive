<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li class="navbar__el is-active"><a-sp-icon icon="eva eva-home-outline" color="primary" size="medium" /></li>
      <li class="navbar__el"><a-sp-icon icon="eva eva-people-outline" size="medium"  /></li>
      <li class="navbar__el"><a-sp-icon icon="eva eva-bell-outline" size="medium" /></li>
    </ul>
    <div class="navbar__btn" @click="handleAddEventClick()">
      <i class="eva eva-plus"></i>
    </div>
    <svg
      class="navbar__bg"
      width="375"
      height="56"
      viewBox="0 0 375 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M276.334 7.06514C274.392 3.0335 270.567 0 266.092 0L0.1 0C0.0447715 0 0 0.0447705 0 0.099999V55.9C0 55.9552 0.0447732 56 0.100002 56H374.9C374.955 56 375 55.9552 375 55.9V0.1C375 0.0447715 374.955 0 374.9 0H365.908C361.433 0 357.608 3.0335 355.666 7.06514C348.562 21.8183 333.47 32 316 32C298.53 32 283.438 21.8183 276.334 7.06514Z"
        fill="white"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "header-title",
  props: {
    textCenter: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "large",
    },
  },
    methods:{
    handleAddEventClick(){
      this.$router.push({name: 'events.add'})
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar{
 // background: white;
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  height: $space-size-7;
  width: 100%;
  box-shadow: $box-shadow-large-top;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $space-size-2;
  &:before{
    position: absolute;
    content: "";
    display: block;
    left: 0;
    background: $white;
    height: 100%;
    width: calc(100% - 150px);
  }
  &__bg{
    position: absolute;
    bottom:0;
    right:0;
    z-index: -1;
  }
  &__list{
    display: flex;
  }
  &__el{
    &.is-active{
      color: $blue;
    }
    &:first-child{
      margin-left: $space-size-2;
    }
    &:last-child{
      margin-right: 0;
    }
    padding: $space-size;
    font-size: $space-size-3;
    margin-right: $space-size-7;
  }
  &__btn{
    margin-top: -$space-size-8 - $space-size;
    box-sizing: content-box;
    width: $space-size-8;
    height: $space-size-8;
    border-radius: 100%;
    background: $blue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: white;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: $space-size + $space-size / 2 - 1;
    box-shadow: 0px 4px 15px rgba(97, 128, 237, 0.8);
  }
}
</style>