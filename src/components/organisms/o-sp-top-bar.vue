<template>
     <div class="top-bar">
      <div class="top-bar__header">
        <m-sp-burger-nav />
        <m-sp-welcome-header />
      </div>
      <div class="top-bar__search mt-3">
        <m-sp-textbox
          type="password"
          v-model="password"
          icon="eva eva-search-outline"
          placeholder="Search"
          size="medium"
        />
      </div>
    </div>
</template>
<script>

export default {
  props: ["title", "events"]
};
</script>
<style lang="scss" scoped>
.top-bar{
  margin-top: $space-size-3;
  display: flex;
  flex-direction: column;
  &__header{
    display: flex;
  }
}
</style>
