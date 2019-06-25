<template>
  <div class="event">
    <loading :isOpen="isOpen"></loading>
    <header>
      <select v-model="selected" @change="changeCity">
        <option v-for="city in cityList" :value="city.id">{{city.name}}</option>
      </select>
      <select v-model="selDate" @change="changeDate">
        <option value="week">近一周</option>
        <option value="today">今天</option>
        <option value="tomorrow">明天</option>
        <option value="weekend">周末</option>
        <option value="future">全部</option>
      </select>&nbsp;&nbsp;
      <select v-model="selType" @change="changeType">
        <option value="all">全部</option>
        <option value="music">音乐</option>
        <option value="film">电影</option>
        <option value="drama">戏剧</option>
        <option value="commonweal">公益</option>
        <option value="salon">讲座</option>
        <option value="exhibition">展览</option>
        <option value="party">聚会</option>
        <option value="sports">运动</option>
        <option value="travel">旅行</option>
        <option value="others">其它</option>
      </select>&nbsp;&nbsp;
      <select v-model="selFee" @change="changeFree">
        <option value="free">免费</option>
        <option value="all">全部</option>
      </select>&nbsp;&nbsp;
      共 {{total}} 个
    </header>
    <div class="m-wrap">
      <div v-for="event in arr">
        <a :href="event.url">
          <img :src="event.image">
          <div class="right">
            <span class="m-title">
              {{event.title}}{{'【'+event.category_name+'】'}}
            </span><br/>
            <span class="rt"><strong>开始：</strong>{{event.begin_time}}</span><br/>
            <span class="rt"><strong>结束：</strong>{{event.end_time}}</span><br/>
            <span class="rt"><strong>地点：</strong>{{event.address}}</span><br/>
            <span class="rt"><strong>费用：</strong><span  :class="{'free-event': selFee === 'all' && event.fee_str === '免费'}">{{event.fee_str}}</span>
            </span><br/>
            <span class="rt"><strong>参加：</strong>{{event.participant_count}}人</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './Loading'
export default {
  name: 'event',
  components: {loading},
  data () {
    return {
      isOpen: true,
      total:0,
      arr:[],
      cityList:[],
      selected:localStorage.city || 108288,
      selDate: localStorage.dateType || 'week',
      selType: localStorage.typeType || 'all',
      selFee: localStorage.feeType || 'free'
    }
  },
  mounted() {
    this.loadCityList();
    this.loadData(this.selected,this.selDate,this.selType);
  },
  methods: {
    loadCityList() {
      this.$http.jsonp('https://api.douban.com/v2/loc/list',{params:{count:48}}).then(function(res) {
        this.cityList = res.body.locs;
      })
    },
    loadData(cityId,day_type,type) {
      this.isOpen = true;
      this.$http.jsonp(
        'https://api.douban.com/v2/event/list',
        {
          params:{
            count:60,
            loc:cityId,
            day_type:day_type,
            type: type
          }
        }
      ).then(function (res) {
        let data = res.body;
        this.arr = this.handleData( data.events,this.selFee );
        this.total = this.arr.length;
        this.isOpen = false;
      })
    },
    handleData(data,isFee) {
      if (isFee === 'free') {
        var filterData = [];
        filterData = data.filter(function(v,i,arr) {
          return v.fee_str === '免费'
        })
        filterData.sort(function(a,b) {
          return b.participant_count - a.participant_count;
        })
        return filterData;
      } else {
        return data;
      }
    },
    changeCity() {
      this.loadData(this.selected,this.selDate,this.selType);
      localStorage.city = this.selected;
    },
    changeDate() {
      this.loadData(this.selected,this.selDate,this.selType);
      localStorage.dateType = this.selDate;
    },
    changeType() {
      this.loadData(this.selected,this.selDate,this.selType);
      localStorage.typeType = this.selType;
    },
    changeFree() {
      this.loadData(this.selected,this.selDate,this.selType);
      localStorage.feeType = this.selFee;
    }
  }
}
</script>

<style scoped>
.event {
  overflow: hidden;
}
header {
  text-align: center;
  background: #34495E;
  color: #fff;
  letter-spacing: 1px;
  position: fixed;
  width: 100%;
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
h5 {
  margin:0;
}
.m-wrap div a {
  display: block;
  overflow: hidden;
  padding: 3% 3% 3% 0;
  text-decoration: none;
  border-bottom: 1px solid #BDC3C7;
  background: #ECF0F1;

}
.m-wrap div a img {
  display: inline-block;
  float: left;
  margin:0 3%;
  width: 30%;
}
.m-wrap div .right {
  color: #2C3E50;
  display: inline-block;
  width: 60%;
}
.high {
  color:#FF4949;
}
.low {
  color: #13CE66;
}
.right .rt {
  font-size: 0.9rem;
}
.m-title {
  font-size: 1rem;
  font-weight: 600;
  word-break: break-all;
  margin-bottom: 0.4rem;
  display: inline-block;
}
.free-event {
  color:#1ABC9C;
}
</style>
