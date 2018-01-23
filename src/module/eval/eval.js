import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import {Row,Col,Button,Input,Rate,Upload} from  'element-ui'



Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Rate)
Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
