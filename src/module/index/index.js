import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import {Button,Row,Col,Input,Select,Option,Carousel,CarouselItem,Radio,Dialog} from  'element-ui'; 


Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Radio)
Vue.use(Dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
