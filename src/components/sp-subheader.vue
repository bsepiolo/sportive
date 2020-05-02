<template>
  <p class="header-sub" :class="{ 'text-center': textCenter, 'header-sub--dark': color=='dark' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subHeader",
  props: ["text-center","color"],
};
</script>
