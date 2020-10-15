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
          @blur="handleBlur"
          @focus="handleFocus"
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
          @mousedown="(e) => e.preventDefault()"
        >
          <div class="m-selectbox-editor__header">
            <a-sp-button
              @click="handlePreviousMonthClick()"
              styling-mode="text"
              :submit="false"
              type="secondary"
              shape="square"
              icon="eva eva-arrow-ios-back-outline"
            />

            <a-sp-text type="bold">{{ monthName }}</a-sp-text>
            <a-sp-button
              @click="handleNextMonthClick()"
              styling-mode="text"
              :submit="false"
              type="secondary"
              shape="square"
              icon="eva eva-arrow-ios-forward-outline"
            />
          </div>
          <div class="m-selectbox-editor__days-list">
            <div
              class="m-selectbox-editor__day-label"
              v-for="(day, index) in days"
              :key="`last-${index}`"
            >
              {{ day }}
            </div>
          </div>
          <div class="m-selectbox-editor__days-list">
            <div
              class="m-selectbox-editor__day-value is-last-month"
              v-for="(day, index) in startOfMonth"
              :key="`current-${index}`"
            >
              {{ previousMonthDays - startOfMonth + index }}
            </div>
            <div
              class="m-selectbox-editor__day-value"
              :class="{
                'is-current':
                  currentDayNumber == day &&
                  currentMonthNumber == selectedMonthNumber,
                'is-disabled': day < currentDayNumber,
              }"
              v-for="(day, index) in daysInMonth"
              :key="index"
              @mousedown="handleSelectDayClick(day)"
            >
              {{ index + 1 }}
            </div>
          </div>
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
      daysInMonth: 0,
      previousMonthDays: 0,
      monthName: "",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      currentMonthNumber: null,
      selectedMonthNumber: null,
      fullDate: "",
      startOfMonth: 0,
      currentDayNumber: 0,
    };
  },
  computed: {
    inputValue() {
      const date = this.moment(this.$store.state[name].form[this.name]);
      const isDateValid = date.isValid();
      debugger;
      if (isDateValid) {
        return date.format("MMMM Do YYYY");
      } else {
        return "";
      }
    },
  },
  created() {
    const moment = this.moment;
    this.currentMonthNumber = moment().format("M");

    this.setSelectedMonth();
  },
  methods: {
    handleSelectDayClick(day) {
      if (day > this.currentDayNumber) {
        this.$emit("input", this.moment(this.fullDate).set("date", day));
        this.listVisible = false;
      }
    },
    setSelectedMonth() {
      const moment = this.moment;

      this.fullDate = moment();
      this.daysInMonth = moment().daysInMonth();
      this.monthName = moment().format("MMMM");
      this.currentDayNumber = moment().format("DD");
      this.selectedMonthNumber = moment().format("M");
      this.startOfMonth = Number(
        moment()
          .startOf("month")
          .format("d")
      );

      this.previousMonthDays =
        moment()
          .subtract(1, "months")
          .daysInMonth() + 1;
    },
    handleNextMonthClick() {
      this.daysInMonth = this.moment(this.fullDate)
        .add(1, "months")
        .daysInMonth();
      this.monthName = this.moment(this.fullDate)
        .add(1, "months")
        .format("MMMM");

      this.fullDate = this.moment(this.fullDate).add(1, "M");
      this.selectedMonthNumber = this.moment(this.fullDate).format("M");

      this.startOfMonth = Number(
        this.moment(this.fullDate)
          .startOf("month")
          .format("d")
      );
      this.previousMonthDays =
        this.moment(this.fullDate)
          .subtract(1, "months")
          .daysInMonth() + 1;
    },
    handlePreviousMonthClick() {
      this.daysInMonth = this.moment(this.fullDate)
        .subtract(1, "months")
        .daysInMonth();
      this.monthName = this.moment(this.fullDate)
        .subtract(1, "months")
        .format("MMMM");
      this.fullDate = this.moment(this.fullDate).subtract(1, "M");
      this.selectedMonthNumber = this.moment(this.fullDate).format("M");

      this.startOfMonth = Number(
        this.moment(this.fullDate)
          .startOf("month")
          .format("d")
      );
      this.previousMonthDays =
        this.moment(this.fullDate)
          .subtract(1, "months")
          .daysInMonth() + 1;
    },
    handleInput(e) {
      this.$emit("input", e);
    },
    handleFocus() {
      this.listVisible = true;
      this.iconColor = "primary";
    },
    handleBlur() {
      this.listVisible = false;
      this.iconColor = "default";
    },
    handleItemClick(item) {
      this.$emit("input", item);
      this.listVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-selectbox-editor {
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 0 $space-size $space-size + $space-size-05 $space-size;
  }
  &__day-label {
    width: calc(100% / 7);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__day-value {
    width: calc(100% / 7);
    color: $black;
    padding: 10px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.is-disabled {
      color: $gray200;
      cursor: unset;
    }
    &.is-current {
      color: $blue;
      font-weight: 900;
      position: relative;
      background: $gray150;
      border-radius: $border-radius;
      cursor: unset;
    }
    &.is-last-month {
      color: $gray175;
      cursor: unset;
    }
  }
  &__days-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__card {
    position: absolute;
    top: $space-size-6 + $space-size-05;
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
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
