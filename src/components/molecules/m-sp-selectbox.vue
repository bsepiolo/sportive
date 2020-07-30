<template>
  <div class="m-selectbox-editor">
    <!-- <span :class="icon" class="m-input__icon"></span> -->
    <div class="m-selectbox-editor__container">
      <div class="m-selectbox-editor__input">
        <sp-icon
          :icon="icon"
          class="ml-2"
          :color="iconColor"
          :absolute="true"
        />

        <sp-textarea
          :placeholder="placeholder"
          :value="inputValue"
          @input="handleInput"
          :type="type"
          :size="size"
          @focus="handleFocus"
          @blur="handleBlur"
          :readonly="true"
        />
        <sp-icon
          icon="eva eva-chevron-down-outline"
          :color="iconColor"
          :absolute="true"
          class="mr-2 m-selectbox-editor__icon"
        />
      </div>
      <transition name="fade">
        <sp-card
          class="m-selectbox-editor__card"
          ratio="wide"
          z-index="max"
          v-if="listVisible"
        >
          <sp-list class="m-selectbox-editor__list" @click="selectItem" :items="items" />
        </sp-card>
      </transition>
    </div>
  </div>
</template>

<script>
import SpCard from "../atoms/a-sp-card";
import SpList from "../molecules/m-sp-list";
//  const name = "EventsStore";

export default {
  props: ["placeholder", "type", "value", "size", "icon"],
  data() {
    return {
      iconColor: "default",
      listVisible: false,
      items: [
        {
          address: {
            freeformAddress: "Soccer",
          },
        },
        {
          address: {
            freeformAddress: "Basketball",
          },
        },
        {
          address: {
            freeformAddress: "Volleyball",
          },
        },
        {
          address: {
            freeformAddress: "Tennis",
          },
        },
      ],
    };
  },
  computed: {
    inputValue: function() {
      return this.$store.state["EventsStore"].form["discipline"];
    },
    // ...mapFields(namespace, ["authForm.email"]),
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
    handleFocus: function() {
      this.listVisible = true;
      this.iconColor = "primary";
    },
    handleBlur: function() {
      const vm = this;
      setTimeout(function() {
        vm.listVisible = false;
        vm.iconColor = "default";
      }, 0);
    },
    selectItem: function(e) {
      this.listVisible = false;
      this.$emit("input", e.address.freeformAddress);
      // this.$store.commit(`${name}/setDiscipline`, e);
    },
  },
  components: {
    SpCard,
    SpList,
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
    //max-height: 0;
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
  &__list{
    padding: $space-size-2;
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
  animation: listHeightAnimation 0.3s ease-in normal;
}
.fade-leave-active,
.fade-leave-to {
  //  transition: max-height 0.2s;
  // animation:  listHeightAnimation .5s ease-in-out alternate;
  animation: listHeightAnimation 0.3s ease-out reverse;
}
</style>