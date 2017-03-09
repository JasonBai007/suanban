<template>
  <div class="loading"  v-show="isOpen">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props:['isOpen'],
  data () {
    return {
      isLoading: true
    }
  }
}
</script>

<style scoped>
.loading {
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background: rgba(255,255,255,0.6);
  display: flex;
  justify-content: center;
  align-items:center;
}
.spinner {
  width: 3rem;
  height: 3rem;
  background-color: #1ABC9C;
  opacity: 1;
  -webkit-animation: rotateplane 1.2s infinite ease-in-out;
  animation: rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
