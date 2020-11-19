<template>
     <div class="top-bar">
      <div class="top-bar__header">
        <m-sp-burger-nav />
        <m-sp-welcome-header />
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
  props: ["title", "events"],
  data(){
    return{
      password: ''
    }
  }
};
</script>
<style lang="scss" scoped>
.top-bar{
  display: flex;
  flex-direction: column;
  &__header{
    display: flex;
  }
}
</style>
