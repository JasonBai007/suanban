<template>
  <div id="app">
    <router-view></router-view>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components:{ Navbar }
}
</script>

<style>
body {
  margin:0;
  padding:0;
}

</style>
