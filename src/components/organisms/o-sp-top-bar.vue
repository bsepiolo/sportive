<template>
  <div class="top-bar">
    <div class="top-bar__header">
      <m-sp-burger-nav />
      <div>
      <a-sp-subtitle>{{date}}</a-sp-subtitle>
      <a-sp-title size="medium" class="mt-1">Hello, {{user.displayName}}</a-sp-title>
      </div>
    </div>
    <div class="top-bar__search mt-3">
      <m-sp-textbox
        type="text"
        v-model="searchValue"
        icon="eva eva-search-outline"
        placeholder="Search"
        size="medium"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "events", "user"],
  data() {
    return {
      password: "",
      date: this.moment().format("MMMM Do YYYY")
    };
  },
};
</script>
<style lang="scss" scoped>
.top-bar {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
  }
}
</style>
