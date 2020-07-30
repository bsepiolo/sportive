<template>
  <div class="m-sp-radio-group">
    <sp-radio-button v-for="(field, index) in fields" :key="index" :icon="field.icon" :name="field.name"/>
  </div>
</template>

<script>
import SpRadioButton from "../molecules/m-sp-radio-button"
export default {
  methods: {

  },
  props:["fields"],
  computed: {
  },
  created() {},
  mounted() {
    
  },
  components:{
    SpRadioButton
  }
};
</script>

<style lang="scss" scoped>
.m-sp-radio-group{
  display: flex;
  justify-content: space-between;
  margin-bottom: $space-size;
}
</style>
