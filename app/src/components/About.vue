<template>
  <div class="about">
    <h1 class="animated fadeInUp">蒜瓣</h1>
    <h2 class="animated flipInX">大蒜的蒜</h2>
    <h2 class="animated flipInX">豆瓣的瓣</h2>
    <a href="https://github.com/JasonBai007" target="_blank">
      <i class="fa fa-github-square"></i>
    </a>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.min.css";
import "animate.css/animate.min.css";
export default {
  name: "about",
  data() {
    return {};
  }
};
</script>

<style scoped>
.about {
  text-align: center;
  letter-spacing: 0.5rem;
  margin-top: 20vh;
}
.about h1 {
  margin-top: 8rem;
}
.about h2 {
  margin: 0.5rem 0;
}
.about i {
  font-size: 4rem;
  color: #1abc9c;
  margin-top: 2rem;
}
</style>
