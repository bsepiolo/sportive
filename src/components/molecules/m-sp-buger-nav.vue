<template>
  <div class="burger-nav">
    <div class="burger-nav--header">
      <sp-icon icon="eva eva-menu-2-outline" size="medium" class="mr-1"/>
      <sp-avatar
        class="mr-2"
        size="medium"
        :border="false"
        imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=46&h=46&q=80"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["placeholder", "type", "value", "size"],
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
