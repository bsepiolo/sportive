<template functional>
  <label class="a-label" v-if="label">{{ title }}</label>
</template>
<script>
export default {
  props: ["title"]
};
</script>
