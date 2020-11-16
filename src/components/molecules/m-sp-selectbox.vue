<template>
  <div>
    <div class="m-selectbox-editor">
      <div
        class="m-selectbox-editor__container"
        :class="{ validator: !isValid }"
      >
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
            :type="type"
            :size="size"
            @focus="handleFocus"
            @blur="handleBlur"
            ref="textarea"
            :readonly="true"
            :isValid="isValid"
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
            @mousedown="(e) => e.preventDefault()"
          >
            <slot :setValue="hideList" :inputValue="inputValue" />
          </a-sp-card>
        </transition>
        <span class="validator__text" v-if="!isValid">{{
          validationRules.required.text
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const name = "EventsStore";

export default {
  props: {
    displayValue: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    value: {
      type: String,
    },
    size: {
      type: String,
    },
    type: {
      type: String,
    },
    validationRules: {
      type: Object,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listVisible: false,
      iconColor: "default",
      content: "",
      isValid: true,
    };
  },
  computed: {
    inputValue() {
      if (this.displayValue) {
        return this.$store.state[name].form[this.name][this.displayValue];
      } else {
        const date = this.moment(this.$store.state[name].form[this.name]);
        const isDateValid = date.isValid();
        if (isDateValid) {
          return date.format("MMMM Do YYYY");
        } else {
          return "";
        }
      }
    },
  },
  methods: {
    validate() {
      this.isValid = this.validation(
        this.validationRules,
        this.inputValue || ""
      );
      return this.isValid;
    },
    handleFocus() {
      this.listVisible = true;
      this.iconColor = "primary";
    },
    handleBlur(e) {
      this.listVisible = false;
      this.iconColor = "default";
      this.isValid = this.validation(this.validationRules, e);
    },
    hideList() {
      setTimeout(() => {
        this.listVisible = false;
        this.iconColor = "default";
        this.$refs.textarea.setBlur();
      }, 200);
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
    pointer-events: none;
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
    opacity: 0;
    max-height: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    max-height: 200px;
  }
}
.fade-enter-active,
.fade-enter {
  animation: listHeightAnimation 0.3s ease-in normal;
}
.fade-leave-active,
.fade-leave-to {
  animation: listHeightAnimation 0.3s ease-out reverse;
}
</style>
