import Vue from "vue";
import Calendar from "./Calendar.vue";

const Components = {
  Calendar
};

// Object.keys(Components).forEach(name => {
//   Vue.component(name, Components[name]);
// });

// export default Components;

// Object.keys(Components).forEach(name => {
Vue.component(Calendar);
// });

export default Calendar;
