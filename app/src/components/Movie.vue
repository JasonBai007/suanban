<template>
  <div class="movie">
    <loading :isOpen="isOpen"></loading>
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
import loading from './Loading'
export default {
  name: 'movie',
  data () {
    return {
      isOpen: true,
      title:'热映影片',
      total:0,
      arr:[]
    }
  },
  mounted() {
    this.loadData();
  },
  components: {loading},
  methods: {
    loadData() {
      this.$http.jsonp(
        'https://api.douban.com/v2/movie/in_theaters',
        {city:108288}
      ).then(function (res) {
        this.isOpen = false;
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
