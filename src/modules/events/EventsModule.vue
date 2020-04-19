<template>
  <div class="container">
    <div class="top-bar">
      <sp-header size="medium">Events</sp-header>
      <div class="top-bar__user">
        <div class="top-bar__alerts top-bar__alerts--is-new">
                    <i class="eva eva-bell-outline"></i>
        </div>
        <div class="top-bar__thumbnail">
          <div class="top-bar__avatar">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=100"
            />
          </div>
          <div class="top-bar__avatar top-bar__avatar--blur">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=100"
            />
          </div>
        </div>

        <div class="top-bar__burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
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
