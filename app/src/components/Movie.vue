<template>
  <div class="movie">
    <loading :isOpen="isOpen"></loading>
    <header>
      正在上映的5分以上的电影 -
      <select v-model="selected" @change="changeCity">
        <option v-for="city in cityList" :value="city.id">{{city.name}}</option>
      </select>
      共{{total}}部
    </header>
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
  components: {loading},
  data () {
    return {
      isOpen: true,
      total:0,
      arr:[],
      cityList:[],
      selected:localStorage.city || 108288
    }
  },
  mounted() {
    this.loadCityList();
    this.loadData(this.selected);
  },
  methods: {
    loadCityList() {
      this.$http.jsonp('https://api.douban.com/v2/loc/list',{params:{count:60}}).then(function(res) {
        this.cityList = res.body.locs;
      })
    },
    loadData(cityId) {
      this.isOpen = true;
      this.$http.jsonp(
        'https://api.douban.com/v2/movie/in_theaters',
        {
          params:{
            city:cityId,
            count:40
          }
        }
      ).then(function (res) {
        let data = res.body;
        this.arr = this.handleData( data.subjects );
        this.isOpen = false;
      })
    },
    handleData(data) {
      var filterArr = [];
      filterArr = data.filter(function(v,i,arr) {
        return v.rating.average > 5
      })
      filterArr.sort(function(a,b) {
        return b.rating.average - a.rating.average
      })
      this.total = filterArr.length;
      return filterArr;
    },
    changeCity() {
      this.loadData(this.selected);
      localStorage.city = this.selected;
    }
  }
}
</script>

<style scoped>
.movie {
  overflow: hidden;
}
header {
  text-align: center;
  padding: 1rem 0;
  background: #34495E;
  color: #fff;
  letter-spacing: 1px;
  position: fixed;
  width:100%;
}
select {
  appearance:none;
  -webkit-appearance:none;
  -webkit-appearance: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  outline:none；
}
.m-wrap {
  margin: 3.3rem 0;
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
