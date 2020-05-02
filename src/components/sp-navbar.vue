<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li class="navbar__el is-active"><i class="eva eva-home-outline"></i></li>
      <li class="navbar__el"><i class="eva eva-people-outline"></i></li>
      <li class="navbar__el"><i class="eva eva-bell-outline"></i></li>
    </ul>
    <div class="navbar__btn">
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
};
</script>
