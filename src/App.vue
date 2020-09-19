<template>
  <div id="app">
    <Navbar />

    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a1a1a;
  margin-top: 50px;
  background-color: #fafafa;

}
</style>
