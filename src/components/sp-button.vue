<template>
  <button class="btn" :type="{'submit': submit}" :class="{'btn--primary': type=='primary', 'btn--secondary': type=='secondary', 'btn--outlined': stylingMode=='outlined', 'btn--full-width': fullWidth==true}">{{text}}</button>
</template>
<script>
export default {
    props: ["text","type", "full-width", "submit", "styling-mode"]
}
</script>