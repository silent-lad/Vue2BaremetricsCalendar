<template>
  <div
    class="daterange"
    :class="[
      type == 'double' ? 'daterange--double' : 'daterange--single',
      `${elementName}`
    ]"
  ></div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import Calendar from "baremetrics-calendar";

Calendar.prototype.presetClose = function() {
  if (this.presetIsOpen == true) {
    if (this.calIsOpen == true) this.calendarClose();
    this.presetIsOpen = false;
    $(".dr-preset-list", this.element).slideToggle(200);
    $(".dr-input", this.element).removeClass("dr-active");
    $(".dr-presets", this.element).removeClass("dr-active");
    this.element.removeClass("dr-active");
  }
};
export default {
  name: "BaremetricsCalendar",
  data() {
    return {
      elementObject: ""
    };
  },
  props: {
    isRangePicker: {
      type: Boolean,
      default: true
    },
    elementName: {
      type: String,
      required: true
    },
    earliest_date: {
      type: String,
      default: "1970-01-01"
    },
    latest_date: {
      type: String,
      default: "2900-12-31"
    },
    callback: {
      type: Function,
      default: () => console.debug("Date selected")
    },
    format: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "double",
      validator: val => {
        return val == "single" || val == "double";
      }
    },
    days_array: {
      type: Array,
      default: () => moment.weekdaysMin(),
      validator: val => {
        return val.length == 7;
      }
    },
    start_date: {
      type: String,
      default: null
    },
    end_date: {
      type: String,
      default: null
    },
    same_day_range: {
      type: Boolean,
      default: true
    },
    presets: {
      default: () => []
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    current_date: {
      type: String,
      default: null
    }
  },
  mounted() {
    this.InitCalendar();
    document.querySelectorAll(".dr-date").forEach(el => {
      el.removeAttribute("contenteditable");
    });
  },
  methods: {
    InitCalendar() {
      var vm = this;
      var elName = this.elementName;
      if (this.type == "double") {
        this.elementObject = new Calendar({
          element: $(`.${elName}`),
          earliest_date: "1970-01-01",
          latest_date: moment(),
          start_date: vm.start_date,
          end_date: vm.end_date,
          same_day_range: vm.same_day_range,
          format: vm.format,
          callback: function() {
            vm.elementObject.calendarClose = this.calendarClose;
            vm.elementObject.presetClose = this.presetClose;
            vm.$emit("dateEdit", [
              this.start_date.unix() * 1000,
              this.end_date.unix() * 1000
            ]);
            vm.callback();
          }
        });
      } else if (this.type == "single") {
        this.elementObject = new Calendar({
          element: $(`.${elName}`),
          earliest_date: "1970-01-01",
          latest_date: vm.latest_date,
          format: vm.format,
          current_date: vm.current_date,
          required: vm.required,
          placeholder: vm.placeholder,
          callback: function() {
            vm.elementObject.calendarClose = this.calendarClose;
            vm.elementObject.presetClose = this.presetClose;
            vm.$emit("dateEdit", this.current_date.unix() * 1000);
            vm.callback();
          }
        });
      }

      document.addEventListener("click", event => {
        if (!this.$el.contains(event.target)) {
          this.elementObject.calendarClose("force");
          this.elementObject.presetClose();
        }
      });
    }
  }
};
</script>


<style scoped>
@import url("./Calendar.css");
</style>
