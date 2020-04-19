<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li><i class="eva eva-home"></i></li>
      <li><i class="eva eva-people"></i></li>
      <li><i class="eva eva-search"></i></li>
    </ul>
    <div class="navbar__btn">
      <i class="eva eva-plus"></i>
    </div>
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
