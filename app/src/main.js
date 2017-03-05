import Vue from 'vue'
import App from './App'
import router from './router'
let VueResource = require('vue-resource');

Vue.use(VueResource);

Vue.config.productionTip = false

// import { Tabbar, TabItem} from 'mint-ui'
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
