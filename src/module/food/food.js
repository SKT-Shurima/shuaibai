import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import {Row,Col,Pagination,Button,Input} from  'element-ui'



Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
