<template>
  <div class="movie">
  <div class="loading" v-show="isLoading">加载中</div>
    <header>{{title}} 共 {{total}} 部 </header>
    <div class="m-wrap">
      <div v-for="m in arr">
        <a :href="m.alt">
          <img :src="m.images.small" alt="">
          <div class="right">
            <span class="m-title">{{m.title}}</span>
            <span class="m-star">{{m.rating.average}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movie',
  data () {
    return {
      isLoading: true,
      title:'热映影片',
      total:0,
      arr:[]
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http.jsonp(
        'https://api.douban.com/v2/movie/in_theaters',
        {city:108288}
      ).then(function (res) {
        this.isLoading = false;
        let data = res.body;
        this.title = data.title;
        this.arr = this.handleData( data.subjects );
      })
    },
    handleData(data) {
      var filterArr = [];
      data.forEach(function(v,i) {
        if( v.rating.average > 6 ) {
          filterArr.push(v)
        }
      })
      this.total = filterArr.length;
      return filterArr;
    }
  }
}
</script>

<style scoped>
.loading {
  position: absolute;
  top:0;
  bottom: 20px;
  left:0;
  right:0;
  background: #aaa;
}
.m-wrap {
  margin-top: 2rem;
}
.m-wrap div a {
  display: block;
  overflow: hidden;
  margin-bottom: 1rem;
}
.m-wrap div a img {
  display: inline-block;
  float: left;
}
</style>
