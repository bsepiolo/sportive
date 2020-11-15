<template>
  <div>
    <m-sp-selectbox
      :displayValue="displayValue"
      :name="name"
      :icon="icon"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      class="m-datebox"
      :validationRules="validationRules"
      @isValid="(e) => (isValid = e)"
      ref="selectbox"
    >
      <template #default="{ setValue }">
        <div class="m-datebox-editor__header">
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
        <div class="m-datebox-editor__days-list">
          <div
            class="m-datebox-editor__label"
            v-for="(day, index) in days"
            :key="`last-${index}`"
          >
            {{ day }}
          </div>
        </div>
        <div class="m-datebox-editor__days-list">
          <div
            class="m-datebox-editor__value is-last-month"
            v-for="(day, index) in startOfMonth"
            :key="`current-${index}`"
          >
            {{ previousMonthDays - startOfMonth + index }}
          </div>
          <div
            class="m-datebox-editor__value"
            :class="{
              'is-selected':
                inputValue.monthNumber == selectedMonthNumber &&
                inputValue.dayNumber == index + 1,
              'is-current':
                currentDayNumber == day &&
                currentMonthNumber == selectedMonthNumber,
              'is-disabled':
                day < currentDayNumber &&
                currentMonthNumber == selectedMonthNumber,
            }"
            v-for="(day, index) in daysInMonth"
            :key="index"
            @mousedown="handleSelectDayClick(day)"
            @click="setValue"
          >
            {{ index + 1 }}
          </div>
        </div>
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
  ],
  data() {
    return {
      isValid: true,
      iconColor: "default",
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
  created() {
    const moment = this.moment;
    this.currentMonthNumber = moment().format("M");

    this.setSelectedMonth();
  },
  computed: {
    inputValue() {
      const date = this.moment(this.$store.state[name].form[this.name]);
      const isDateValid = date.isValid();
      if (isDateValid) {
        return {
          monthNumber: date.format("M"),
          dayNumber: date.format("D"),
        };
      } else {
        return "";
      }
    },
  },
  methods: {
    validate() {
      const validationResult = this.$refs.selectbox.validate();
      return validationResult;
    },
    handleSelectDayClick(day) {
      if (
        day > this.currentDayNumber ||
        this.currentMonthNumber != this.selectedMonthNumber
      ) {
        this.$emit("isValid", this.isValid);
        debugger;
        this.$emit("input", this.moment(this.fullDate).toISOString());
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
  },
};
</script>
<style lang="scss" scoped>
.m-datebox-editor {
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 0 $space-size $space-size + $space-size-05 $space-size;
  }
  &__label,
  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__label {
    font-size: $space-size + $space-size-05;
    text-transform: uppercase;
    padding: 10px 8px;
    width: calc(100% / 7);
    font-weight: 900;
    color: $secondary-text-color;
  }
  &__value {
    width: calc((100% / 7) - 8px);
    padding: 6px 4px;
    margin: 4px;

    color: $black;
    cursor: pointer;
    transition: background 0.3s;

    &.is-disabled {
      color: $gray200;
      cursor: unset;
    }
    &.is-current,
    &.is-selected {
      font-weight: 900;
      position: relative;
      border-radius: $border-radius-small;
      cursor: unset;
    }
    &.is-current {
      color: $blue;
      background: $gray100;
    }
    &.is-selected {
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        background: $blue;
        border-radius: $border-radius-small;
        animation: selectedAnimation 0.4s;
      }
      color: white;
      @keyframes selectedAnimation {
        0% {
          transform: scale(1);
          opacity: 0.3;
        }
        30% {
          transform: scale(0.9);
          opacity: 0.6;
        }
        60% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
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
}
</style>
