<template>
  <a href="#" class="btn btn--primary" :class="{'btn--primary': type=='primary', 'btn--full-width': fullWidth==true}">{{text}}</a>
</template>
<script>
export default {
    props: ["text","type", "full-width"]
}
</script>