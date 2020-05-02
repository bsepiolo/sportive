<template>
  <div class="avatar">
    <img
      :src="imageSrc"
    />
  </div>
</template>
<script>
export default {
  props: ["imageSrc"],
};
</script>
