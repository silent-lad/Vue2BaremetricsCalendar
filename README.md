<h1 style="width:100%;text-align:center;">Vue Baremetrics Calendar</h1>

_A Vue.js wrapper for the beautiful date-range picker made by the **[Baremetrics](https://baremetrics.com)** team._

---

The Vue-Baremetrics date range picker is a simplified solution for selecting both date ranges and single dates all from a single calender view. With a revamped minimalistic redesign.

Redesigned and Wrapped for Vue.js by [Divyansh Tripathi](https://github.com/silent-lad)

[View a demo](https://silent-lad.github.io/Vue2BaremetricsCalendar/#/)

## Usage

### Global Usage

Global Registeration via Vue.use() method.

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import the plugin
import DateRangePicker from "vue2-baremetrics-calendar";

Vue.config.productionTip = false;

// use the plugin
Vue.use(DateRangePicker);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

Once registered you can use the component in its default settings with as follows:-

```html
<Calendar type="double" elementName="doubleRangePicker" />
<Calendar type="single" elementName="singleRangePicker" />
```

**REMEMBER _elementName_ is the only required prop and it should be different for each datepicker in your component**

```html
<template>
  <div>
    <h3>DateRangePicker with options</h3>
    <date-range-picker v-model="range" :options="options" />
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    data: () => ({
      range: ["01/09/2018", "01/10/2018"],
      options: {
        timePicker: true,
        startDate: moment().startOf("hour"),
        endDate: moment()
          .startOf("hour")
          .add(32, "hour"),
        locale: {
          format: "M/DD hh:mm A"
        }
      }
    })
  };
</script>
```

### Base Calendar Props

- **elementName** _\*required_ `[string]`
  - jQuery DOM object of the calendar div you're working on
- **earliest_date** `[date YYYY-MM-DD]`
  - The earliest date to show in the calendar
- **latest_date** `[date YYYY-MM-DD]`
  - The latest date to show in the calendar
- **callback** `[function]`
  - A function for whenever a new date is saved
  - Inside you have access to object variables like `this.earliest_date` and `this.latest_date` for doing things with your calendar's dates
- **format** `[object]`
  - Object containing formatting strings for.. you guessed it.. formatting your dates
  ```js
    format: {
      input: 'MMMM D, YYYY', // Format for the input fields
      jump_month: 'MMMM', // Format for the month switcher
      jump_year: 'YYYY' // Format for the year switcher
    }
  ```
- **days_array** `[array]`
  - Array of the 7 strings you'd like to represent your days in the calendar
  ```js
  days_array: ["S", "M", "T", "W", "T", "F", "S"];
  ```

### Single Calendar Props

- **current_date** `[date YYYY-MM-DD]`
  - The date to start the calendar on
- **required** `[boolean]`
  - Toggle if this field must have always have a valid selected date
- **placeholder** `[string]`
  - Set placeholder text (note this will only apply if the required key is set to `false`). The default will be whatever moment date format you're using. (i.e. 'M/D/YYYY')

### Double Calendar Props

- **start_date** `[date YYYY-MM-DD]`
  - The date to start the selection on for the calendar
- **end_date** `[date YYYY-MM-DD]`
  - The date to end the selection on for the calendar
- **same_day_range** `[boolean]`
  - Allow a range selection of a single day
- **format** `[preset key in format object] // see above`
  - The double calendar adds the `preset` key to the format object for formatting the preset dates in the preset dropdown
- **presets** `[boolean] or [object]`
  - If you don't want to show the preset link just set this to `false` otherwise the default is true which will just give you a basic preset of.. yep.. presets. BOOM!
  - Otherwise, if you want to customize it up you can include an array of preset objects. Something like:
  ```js
  presets: [
    {
      label: "Last month",
      start: moment()
        .subtract(1, "month")
        .startOf("month"),
      end: moment()
        .subtract(1, "month")
        .endOf("month")
    },
    {
      label: "Last year",
      start: moment()
        .subtract(1, "year")
        .startOf("year"),
      end: moment()
        .subtract(1, "year")
        .endOf("year")
    }
  ];
  ```
