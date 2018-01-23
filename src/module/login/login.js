import Vue from 'vue'
import App from './App'
import "babel-polyfill";

import {Row,Col,Button,Input,Checkbox} from  'element-ui'



Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
