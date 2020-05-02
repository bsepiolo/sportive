<template>
  <div class="container container--standard">
    <div class="top-bar">
      <div class="top-bar__user">
        <div class="top-bar__thumbnail mr-2">
          <div class="top-bar__burger mr-1">
            <span class="eva eva-menu-2-outline"></span>
          </div>
          <div class="top-bar__avatar">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=100"
            />
          </div>
        </div>
        <div class="top-bar__data">
          <sp-subheader>24th Thu July</sp-subheader>
          <sp-header size="medium" class="pt-0">Hello, Katherine</sp-header>
        </div>
      </div>
      <div class="top-bar__search mt-3">
        <sp-textbox
        type="password"
        v-model="password"
        icon="eva eva-search-outline"
        placeholder="Search"
        size="medium"
      />
      </div>
    </div>
    <router-view />
    <sp-navbar />
  </div>
</template>
<script>
export default {
  name: "EventsModule",
};
</script>
