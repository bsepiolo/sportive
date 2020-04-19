<template>
  <button class="btn btn--primary" :type="{'submit': submit}" :class="{'btn--primary': type=='primary', 'btn--full-width': fullWidth==true}">{{text}}</button>
</template>
<script>
export default {
    props: ["text","type", "full-width", "submit"]
}
</script>