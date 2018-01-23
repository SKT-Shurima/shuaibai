import Vue from 'vue'
import App from './App'
import "babel-polyfill";

import {Row,Col,Button} from  'element-ui'




Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
