import Vue from 'vue'
import App from './App'
import "babel-polyfill";

import {Row,Col,Pagination,Button,Input,Carousel,CarouselItem} from  'element-ui'



Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
