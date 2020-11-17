<template>
  <li class="list__el">
    <i class="mr-1" :class="icon" v-if="icon"></i>
    <div class="list__data" :class="{'mt-0-5': icon}">
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  name: "list-el",
  props: ["icon"],
};
</script>
