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

          <a-sp-text type="bold">{{ month }} {{ year }}</a-sp-text>
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
            v-for="(day, index) in firstDayOfMonth"
            :key="`current-${index}`"
          >
            {{ daysInLastMonth - firstDayOfMonth + day }}
          </div>
          <div
            class="m-datebox-editor__value"
            :class="{
              'is-selected': isSelected(day),
              'is-current': isSelected(day) ? false : isCurrent(day),
              'is-disabled': isDisabled(day),
            }"
            v-for="(day, index) in daysInMonth"
            :key="index"
            @mousedown="
              isDisabled(day) ? false : handleSelectDayClick(setValue, day)
            "
          >
            {{ index + 1 }}
          </div>
        </div>
      </template>
    </m-sp-selectbox>
  </div>
</template>

<script>
const name = "EventsAddStore";

export default {
  props: {
    placeholder: String,
    type: String,
    value: String,
    size: String,
    icon: String,
    name: String,
    displayValue: String,
    validationRules: Object,
  },
  data() {
    return {
      today: this.moment(),
      dateContext: this.moment(),
      isValid: true,
      iconColor: "default",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      selectedMonthNumber: null,
      selectedYear: null,
      startOfMonth: 0,
      currentDayNumber: 0,
    };
  },
  computed: {
    year() {
      return parseInt(this.dateContext.format("Y"));
    },
    month() {
      return this.dateContext.format("MMMM");
    },
    monthNumber() {
      return parseInt(this.dateContext.format("M"));
    },
    daysInLastMonth() {
      return this.dateContext.daysInMonth(-1);
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    currentDate() {
      return this.dateContext.get("date");
    },
    firstDayOfMonth() {
      var firstDay = this.moment(this.dateContext).subtract(
        this.currentDate,
        "days"
      );
      return firstDay.isoWeekday();
    },
    initialDate() {
      return this.today.get("date");
    },
    initialMonth() {
      return this.today.format("MMMM");
    },
    initialMonthNumber() {
      return parseInt(this.today.format("M"));
    },
    initialYear() {
      return parseInt(this.today.format("Y"));
    },
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
    handleSelectDayClick(setValue, day) {
      if (
        day >= this.initialDate ||
        this.currentMonthNumber != this.selectedMonthNumber
      ) {
        debugger;
        this.selectedDayTmp = day;
        this.dateContext = this.moment(this.dateContext.set("date", day));
        this.selectedMonthNumber = this.dateContext.format("M");
        this.selectedYear = this.dateContext.format("Y");
        this.$emit("isValid", this.isValid);
        this.$emit("input", {
          value: this.moment(this.dateContext).toISOString(),
          timestamp: this.moment(this.dateContext).toDate(),
        });
        setValue();
      }
    },
    isDisabled(day) {
      return (
        (day <= this.initialDate - 1 &&
          this.initialMonthNumber == this.monthNumber &&
          this.initialYear == this.year) ||
        this.initialMonthNumber > this.monthNumber && this.initialYear == this.year ||  this.initialYear > this.year
      );
    },
    isCurrent(day) {
      return (
        this.initialMonth == this.month &&
        day == this.initialDate &&
        this.initialYear == this.year
      );
    },
    isSelected(day) {
      return (
        day == this.currentDate &&
        this.selectedMonthNumber == this.monthNumber &&
        this.selectedYear == this.year
      );
    },
    handleNextMonthClick() {
      this.dateContext = this.moment(this.dateContext).add(1, "month");
    },
    handlePreviousMonthClick() {
      this.dateContext = this.moment(this.dateContext).subtract(1, "month");
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
      cursor: pointer;
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
// .fade-enter-active,
// .fade-enter {
//   animation: listHeightAnimation 0.3s ease-in normal;
// }
// .fade-leave-active,
// .fade-leave-to {
//   animation: listHeightAnimation 0.3s ease-out reverse;
// }
@keyframes listHeightAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.list-enter-active,
.list-leave-active {
  animation: listHeightAnimation 0.3s ease-out reverse;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  animation: listHeightAnimation 0.3s ease-out reverse;
}
</style>
