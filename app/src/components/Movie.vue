<template>
  <div class="movie">
    <loading :isOpen="isOpen"></loading>
    <header>{{title}} 共 {{total}} 部 </header>
    <div class="m-wrap">
      <div v-for="m in arr">
        <a :href="m.alt">
          <img :src="m.images.medium" alt="">
          <div class="right">
            <h3 class="m-title">{{m.title}}</h3>
            <span :class="{'high' : m.rating.average >= 8, 'low':m.rating.average <= 6}">{{m.rating.average}}</span>
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
        if( v.rating.average > 5 ) {
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
header {
  text-align: center;
  padding: 1rem 0;
  background: #34495E;
  color: #fff;
}
.m-wrap {
  margin-bottom: 2rem;
}
.m-wrap div a {
  display: block;
  overflow: hidden;
  padding: 1rem 1rem 1rem 0;
  text-decoration: none;
  border-bottom: 1px solid #BDC3C7;
  background: #ECF0F1;
}
.m-wrap div a img {
  display: inline-block;
  float: left;
  margin:0 2rem;
}
.m-wrap div .right {
  color: #2C3E50;
}
.high {
  color:#FF4949;
}
.low {
  color: #13CE66;
}
.right span {
  font-size: 1.4rem;
}
</style>
