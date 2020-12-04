<template>
  <div class="burger-nav">
    <div class="burger-nav--header">
      <a-sp-icon icon="eva eva-menu-2-outline" size="medium" class="mr-1"/>
      <a-sp-avatar
        class="mr-2"
        size="medium"
        :border="false"
        :imageSrc="img"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["img"],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.burger-nav {
  display: flex;
  &--header{
    display: flex;
    align-items: center;
  }
}
</style>
