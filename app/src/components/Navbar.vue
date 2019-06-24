<template>
  <div class="navbar">
    <router-link to="/movie">热映影片</router-link>
    <router-link to="/event">同城活动</router-link>
    <router-link to="/about">关于蒜瓣</router-link>
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
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    box-shadow: 0px 0px 16px #666;
  }
  .navbar a {
    padding: 1rem 0;
    text-decoration: none;
    color: #fff;
    width: 34%;
    background: #34495E;
    text-align: center;
    letter-spacing: 3px;
    border-right: 1px solid #546769;
  }
  .navbar a:last-child {
    border-right: none;
  }
  .navbar a.router-link-active {
    background-color: #2C3E50;
    color: #fff;
  }

</style>
