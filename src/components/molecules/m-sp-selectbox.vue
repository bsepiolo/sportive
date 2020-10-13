<template>
  <div class="m-selectbox-editor">
    <!-- <span :class="icon" class="m-input__icon"></span> -->
    <div class="m-selectbox-editor__container">
      <div class="m-selectbox-editor__input">
        <a-sp-icon
          :icon="icon"
          class="ml-2"
          :color="iconColor"
          :absolute="true"
        />

        <a-sp-textarea
          :placeholder="placeholder"
          :value="inputValue"
          @input="handleInput"
          :type="type"
          :size="size"
          @focus="handleFocus"
          @blur="handleBlur"
          :readonly="true"
        />
        <a-sp-icon
          icon="eva eva-chevron-down-outline"
          :color="iconColor"
          :absolute="true"
          class="mr-2 m-selectbox-editor__icon"
        />
      </div>
      <transition name="fade">
        <a-sp-card
          class="m-selectbox-editor__card"
          ratio="wide"
          z-index="max"
          v-if="listVisible"
        >
          <m-sp-list
            class="m-selectbox-editor__list"
            @mousedown="handleItemClick"
            :items="items"
            displayValue="value"
          />
        </a-sp-card>
      </transition>
    </div>
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
      debugger;
      return this.$store.state[name].form[this.name][this.displayValue];
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
    handleFocus() {
      this.listVisible = true;
      this.iconColor = "primary";
    },
    handleBlur() {
      debugger;
      this.listVisible = false;
      this.iconColor = "default";
    },
    handleItemClick(item) {
      debugger;
      this.$emit("input", item);
      this.listVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-selectbox-editor {
  &__card {
    position: absolute;
    top: $space-size-6 + $space-size-05;
    overflow: hidden;
    padding: 0;
  }
  &__icon {
    right: 0;
  }
  &__clear-button {
    right: $space-size-2;
  }
  &__btn-return {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  &.is-filled {
    .m-selectbox-editor__input {
      background: $white;
    }
    .m-selectbox-editor__input {
      background: $white;
    }
  }
  &.is-focused {
    position: absolute;
    top: $space-size-4;
    width: calc(100% - 48px);
    .m-selectbox-editor__icon {
      position: absolute;
      z-index: 99999999;
    }
    .m-selectbox-editor__input {
      background: $white;
      margin: 0;
      padding-right: $space-size-6;
    }
    .m-selectbox-editor__container {
      background: $white;
      // top: $space-size-2;
    }
  }
  &__submit {
    position: fixed;
    z-index: 999999;
    bottom: $space-size-3;
    width: calc(100% - 48px);
  }
  &__container {
    margin-bottom: $space-size;
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: $border-radius;
  }
  &__input {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__list {
    padding: $space-size;
  }
  &__details {
    background: $gray150;
    position: relative;
    width: 100%;
    padding: $space-size;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
  &__results-list {
    background: $white;
    position: relative;
    z-index: 9999;
  }
}
@keyframes listHeightAnimation {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 200px;
  }
}
.fade-enter-active,
.fade-enter {
  //  transition: max-height 0.2s;
  // animation:  listHeightAnimation .5s ease-in-out alternate;
  animation: listHeightAnimation 0.2s ease-in normal;
}
.fade-leave-active,
.fade-leave-to {
  //  transition: max-height 0.2s;
  // animation:  listHeightAnimation .5s ease-in-out alternate;
  animation: listHeightAnimation 0.2s ease-out reverse;
}
</style>
