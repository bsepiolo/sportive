<template>
     <div class="top-bar">
      <div class="top-bar__header">
        <sp-burger-nav />
        <sp-welcome-header />
      </div>
      <div class="top-bar__search mt-3">
        <sp-text-input
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

import SpBurgerNav from "../molecules/m-sp-buger-nav";
import SpWelcomeHeader from "../molecules/m-sp-welcome-header";
import SpTextInput from "../molecules/m-sp-textinput";

export default {
  props: ["title", "events"],
  components: {
    SpBurgerNav,
    SpWelcomeHeader,
    SpTextInput
  }
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
