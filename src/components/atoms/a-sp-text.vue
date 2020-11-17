<template>
  <p
    class="a-text"
    :class="{
      'text-center': textCenter,
      'a-text--bold': type == 'bold',
      'a-text--secondary': color == 'secondary',
      'a-text--light': color == 'light',
      'a-text--small': size == 'small',
      'a-text--medium': size == 'medium',
    }"
  >
    <slot />
  </p>
</template>
<script>
export default {
  name: "text-simple",
  props: ["text-center", "color", "size", "type"],
};
</script>
<style lang="scss" scoped>
.a-text {
  display: flex;
  align-items: center;
  &--bold{
    font-weight: 800;
  }
  &--secondary {
    color: $secondary-text-color;
  }
  &--light {
    color: $gray175;
  }
  &--small {
    font-size: 12px;
    margin: 4px 0;
    &:last-child {
      margin: 0;
    }
  }
  &--medium {
    font-size: 0.8125rem;
  }
  &--center {
    text-align: center;
  }
}
</style>
