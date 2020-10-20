<template>
  <m-sp-selectbox
    :displayValue="displayValue"
    :value="value"
    :name="name"
    :icon="icon"
    :placeholder="placeholder"
    :isExpanded="listVisible"
  >
    <template slot-scope="ctx">
      <m-sp-list
        class="m-selectbox-editor__list"
        @mousedown="handleItemClick"
        @click="toggleIsExpanded(ctx)"
        :selectedItem="ctx.context.inputValue"
        :activeItem="value"
        :items="items"
        displayValue="value"
      />
    </template>
  </m-sp-selectbox>
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
  ],
  data() {
    return {
      iconColor: "default",
      listVisible: false,
      items: [
        {
          id: 1,
          value: "Soccer",
        },
        {
          id: 2,
          value: "Basketball",
        },
        {
          id: 3,
          value: "Volleyball",
        },
        {
          id: 4,
          value: "Tennis",
        },
      ],
    };
  },
  computed: {
    inputValue() {
      return this.$store.state[name].form[this.name][this.displayValue];
    },
  },
  methods: {
    toggleIsExpanded(ctx) {
      ctx.context.listVisible = false;
      ctx.context.$el.children[0].querySelector("textarea").blur();
    },
    handleItemClick(item) {
      this.$emit("input", item);
      this.listVisible = false;
    },
  },
};
</script>
