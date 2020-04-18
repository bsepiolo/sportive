<template>
    <div class="container">  
        <div class="top-bar">
            <sp-header size="medium">Events</sp-header>
            <div class="top-bar__user">
                <div class="top-bar__avatar"><img src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=100" /></div>
            </div>
        </div>    
        <router-view />
    </div>
</template>
<script>
export default {
    name: "EventsModule"
}
</script>