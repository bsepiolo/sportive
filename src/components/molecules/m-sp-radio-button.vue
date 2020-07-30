<template>
  <div class="m-sp-radio-button">
    <input class="m-sp-radio-button__input" type="radio" />
     <sp-icon
     size="large"
          :icon="icon"
          class="m-selectbox-editor__icon"
        />
        {{name}}
  </div>
</template>

<script>
export default {
  props: ["name", "icon"],
  methods: {

  },
  computed: {
  },
  created() {},
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.m-sp-radio-button{
  background: $white;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  padding: $space-size-3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: $space-size;
  margin: 0 $space-size / 2;
  &__input{
    display: none;
  }
}
</style>
