<template>
  <button class="a-btn" :type="{'submit': submit}" :class="{'a-btn--primary': type=='primary', 'a-btn--secondary': type=='secondary', 'a-btn--outlined': stylingMode=='outlined', 'a-btn--full-width': fullWidth==true}">{{text}}</button>
</template>
<script>
export default {
    props: ["text","type", "full-width", "submit", "styling-mode"]
}
</script>
<style lang="scss" scoped>
.a-btn{
    height: $space-size-6;
    padding: 0 $space-size-5;
    border-radius: $border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 1rem;
    &--primary{
        background: $blue;
        color: $white;
    }
    &--primary.a-btn--outlined{
        border: 2px solid $blue;
        color: $blue;
    }
    &--secondary{
        border: 2px solid $gray200;
        color: $gray200;
    }
    &--outlined{
        background: none;
    }
    &--full-width{
        width: 100%;
    }
}
</style>