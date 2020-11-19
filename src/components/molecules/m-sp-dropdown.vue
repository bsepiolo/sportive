<template>
<div>
  <m-sp-selectbox
    :displayValue="displayValue"
    :value="value"
    :name="name"
    :icon="icon"
    :placeholder="placeholder"
    :validationRules="validationRules"
    @isValid="(e) => (isValid = e)"
    ref="selectbox"
  >
    <template #default="{ setValue, inputValue }">
      <m-sp-list
        class="m-selectbox-editor__list"
        @mousedown="handleItemClick"
        @click="setValue"
        :activeItem="value"
        :items="items"
        :displayValue="displayValue"
        :selectedItem="inputValue"
      />
      <!-- :selectedItem="ctx.context.inputValue" -->
    </template>
  </m-sp-selectbox>
</div>
</template>
<script>
const name = "EventsStore";
export default {
  props: [
    "placeholder",
    "type",
    "value",
    "size",
    "icon",
    "name",
    "displayValue",
    "validationRules",
    "source",
    "action"
  ],
  data() {
    return {
      isValid: true,
      iconColor: "default",
      listVisible: false
    };
  },
  created(){
    this.getData()
  },
  computed: {
    items(){
            return this.$store.state[name][this.source];
    },
    inputValue() {
      return this.$store.state[name].form[this.name][this.displayValue];
    },
  },
  methods: {
    getData(){
      this.$store.dispatch(`${name}/${this.action}`)
    },
    validate(){
      const validationResult = this.$refs.selectbox.validate();
      return validationResult;
    },
    toggleIsExpanded(ctx) {
      ctx.context.listVisible = false;
      ctx.context.$el.children[0].querySelector("textarea").blur();
    },
    handleItemClick(item) {
      this.$emit("isValid", this.isValid);

      this.$emit("input", item);
      this.listVisible = false;
    },
  },
};
</script>
