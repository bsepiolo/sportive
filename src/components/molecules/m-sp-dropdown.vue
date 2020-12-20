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
      :maxHeight="maxHeight"
      ref="selectbox"
      :joinAs="joinAs"
      :depends="depends"
    >
      <template #default="{ setValue, value }">
        <m-sp-list>
          <m-sp-list-el
            class="p-1 mx-0-5"
            v-for="(item, index) in items"
            :isSelected="index == selectedIndex"
            :isActive="item == value"
            @mousedown="handleItemClick(item, index)"
            @click="setValue"
            :key="index"
          >
            {{ item[displayValue] }}
          </m-sp-list-el>
        </m-sp-list>
      </template>
    </m-sp-selectbox>
  </div>
</template>
<script>
const name = "EventsAddStore";
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
    "action",
    "joinAs",
    "maxHeight",
    "depends"
  ],
  data() {
    return {
      isValid: true,
      iconColor: "default",
      listVisible: false,
      selectedIndex: null,
    };
  },
  created() {
    if (this.action) {
      this.getData();
    }
  },
  computed: {
    items() {
      return this.$store.state[name][this.source];
    },
    inputValue() {
      if (this.joinAs) {
        return this.$store.state[name].form[this.joinAs][this.name][
          this.displayValue
        ];
      } else {
        return this.$store.state[name].form[this.name][this.displayValue];
      }
    },
  },
  methods: {
    getData() {
      this.$store.dispatch(`${name}/${this.action}`);
    },
    validate() {
      const validationResult = this.$refs.selectbox.validate();
      return validationResult;
    },
    handleItemClick(item, index) {
      debugger;
      this.$emit("isValid", this.isValid);
      this.$emit("input", { value: item, name: this.name, joinAs: this.joinAs });
      this.selectedIndex = index;
      this.listVisible = false;
    },
  },
};
</script>
