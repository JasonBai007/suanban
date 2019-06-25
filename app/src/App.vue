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
header {
  padding: 10px 0;
  box-shadow: 0px 0px 16px #666;
}
select {
  text-align: center;
  text-align-last: center;
}
.m-wrap {
    margin: 41px 0;
}
</style>
