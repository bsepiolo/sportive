<template>
  <div class="textbox">
      <label class="textbox__label" v-if="label">{{label}}</label>
    <input class="textbox__input" type="text" :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
    props: ["label","placeholder"]
}
</script>