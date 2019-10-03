<template>
  <div id="app">
    <Calendar type="double" elementName="otherRangePicker" />
    <br />
    <br />
    <Calendar type="double" elementName="primaryRangePicker" />
  </div>
</template>
<script>
import Calendar from "./components/Calendar";
export default {
  components: {
    Calendar
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
