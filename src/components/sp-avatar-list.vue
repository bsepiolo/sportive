<template>
  <ul class="avatar-list">
    <li class="avatar-list__el" v-for="item in items" :key="item.imageSrc">
      <sp-avatar :image-src="item.imageSrc" />
    </li>
    <li class="avatar-list__el">
      <div class="avatar-list__counter">
8
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["items"],
};
</script>
