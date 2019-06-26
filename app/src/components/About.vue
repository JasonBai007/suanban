<template>
  <div class="about">
    <div class="wrap">
      <h1 class="animated fadeInUp">蒜瓣</h1>
      <h2 class="animated fadeInUp" style="animation-delay:0.1s">大蒜的蒜</h2>
      <h2 class="animated fadeInUp" style="animation-delay:0.2s">豆瓣的瓣</h2>
      <a href="https://github.com/JasonBai007" target="_blank">
        <i class="fa fa-github-square"></i>
      </a>
    </div>
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
  height: 100vh;
  text-align: center;
  letter-spacing: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrap {
  margin-top: -60px;
}
.about h1 {
  color:#34495E;
  margin-top: 0;
  margin-right: -4px;
}
.about h2 {
  margin: 0.5rem 0;
  font-size: 22px;
  font-weight: normal;
  letter-spacing: 15px;
  text-align: center;
  margin-right: -8px;
}
.about i {
  font-size: 40px;
  color: #1abc9c;
  margin-top: 20px;
}
</style>
