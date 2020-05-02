<template>
  <p class="text" :class="{ 'text-center': textCenter, 'text--light': color=='light', 'text--small': size=='small' }">
    <slot />
  </p>
</template>
<script>
export default {
  name: "text",
  props: ["text-center","color", "size"],
};
</script>
