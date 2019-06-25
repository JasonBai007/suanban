<template>
  <div class="movie">
    <loading :isOpen="isOpen"></loading>
    <header>
      <select v-model="selected" @change="changeCity">
        <option v-for="city in cityList" :value="city.id">{{city.name}}</option>
      </select>
      <select v-model="mType" @change="changeType">
        <option value="in_theaters">正在上映</option>
        <option value="coming_soon">即将上映</option>
      </select>
      &nbsp;&nbsp;共{{total}}部
    </header>
    <div class="m-wrap">
      <div v-for="m in arr">
        <a :href="m.alt">
          <img :src="m.images.medium" alt>
          <div class="right">
            <h3 class="m-title">{{m.title}}</h3>
            <p>
              豆瓣评分：
              <span v-if="m.rating.average === 0">-</span>
              <strong v-if="m.rating.average !== 0">{{m.rating.average}}</strong>
            </p>
            <p>上映日期：{{m.mainland_pubdate}}</p>
            <p>影片类型：{{m.genres | getStr}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "./Loading";
export default {
  name: "movie",
  components: { loading },
  data() {
    return {
      isOpen: true,
      total: 0,
      arr: [],
      cityList: [],
      selected: localStorage.city || 108288,
      mType: localStorage.mType || "in_theaters"
    };
  },
  mounted() {
    this.loadCityList();
    this.loadData(this.selected, this.mType);
  },
  methods: {
    // 获取城市列表，目前还是用豆瓣官方的API，代理API容易挂
    loadCityList() {
      this.$http
        .jsonp(`https://api.douban.com/v2/loc/list`, { params: { count: 48 } })
        .then(function(res) {
          this.cityList = res.body.locs;
        });
    },
    // 获取电影列表数据，这个只能用代理API了
    loadData(cityId, type) {
      this.isOpen = true;
      this.$http
        .jsonp(`${this.$proxyUrl}/v2/movie/${type}`, {
          params: {
            city: cityId,
            count: 100
          }
        })
        .then(function(res) {
          let data = res.body;
          this.arr = this.handleData(data.subjects, type);
          this.isOpen = false;
        });
    },
    handleData(data, type) {
      var filterArr = [];
      if (type === "in_theaters") {
        filterArr = data.sort(function(a, b) {
          return b.rating.average - a.rating.average;
        });
      } else {
        filterArr = data;
      }
      this.total = filterArr.length;
      return filterArr;
    },
    changeCity() {
      this.loadData(this.selected, this.mType);
      localStorage.city = this.selected;
    },
    changeType() {
      this.loadData(this.selected, this.mType);
      localStorage.mType = this.mType;
    }
  },
  filters: {
    getStr(arr) {
      return arr.join("|");
    }
  }
};
</script>

<style scoped>
.movie {
  overflow: hidden;
}
header {
  text-align: center;
  background: #34495e;
  color: #fff;
  letter-spacing: 1px;
  position: fixed;
  width: 100%;
}
select {
  appearance: none;
  -webkit-appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  outline: none；;
}
.m-wrap div a {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 1rem 1rem 1rem 0;
  text-decoration: none;
  border-bottom: 1px solid #bdc3c7;
  background: #ecf0f1;
}
.m-wrap div a img {
  margin: 0 1rem;
  width: 34%;
}
.m-wrap div .right {
  color: #2c3e50;
  text-align: center;
  flex-grow: 1;
}
h3 {
  margin-top: -10px;
  font-size: 16px;
}
p {
  font-size: 14px;
  margin: 2px 0;
  text-align: left;
  padding-left: 12%;
}
</style>
