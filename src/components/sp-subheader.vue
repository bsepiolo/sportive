<template>
  <p class="header-sub" :class="{ 'text-center': textCenter }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "subHeader",
  props: ["text-center"],
};
</script>
