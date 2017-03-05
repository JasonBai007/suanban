<template>
  <div class="navbar">
    <router-link to="/movie">热映影片</router-link>
    <router-link to="/event">同城活动</router-link>
    <router-link to="/about">关于我</router-link>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Navbar',
  data () {
    return {
      selected:'movie'
    }
  }
}
</script>

<style scoped>
  .navbar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width:100%;
  }
  .navbar a {
    display: inline-block;
    padding: 7px 0;
    text-decoration: none;
    color: #666;
    width: 32%;
  }
  .navbar a.router-link-active {
    background-color: #eaeaea;
    color: #26a2ff;
  }
</style>
