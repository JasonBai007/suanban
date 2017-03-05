import Vue from 'vue'
import App from './App'
import router from './router'
// import { Tabbar, TabItem} from 'mint-ui'

Vue.config.productionTip = false

// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
