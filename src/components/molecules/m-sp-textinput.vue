<template>
  <div class="m-input">
    <span :class="icon" class="m-input__icon"></span>
    <sp-textbox :placeholder="placeholder" :value="value" @input="handleInput" :type="type" :size="size"/>
  </div>
</template>
<script>

export default {
  props: ["placeholder", "type", "value", "size", "icon"],
  data() {
    return {
      content: this.value
    };
  },
   computed: {
   // ...mapFields(namespace, ["authForm.email"]),
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-input{
  position: relative;
  margin-bottom: $space-size;
  display: flex;
  align-items: center;
  &__icon{
    position: absolute;
    left: $space-size-2;
    font-size: $space-size-2 + $space-size / 4;
  }
}

</style>
