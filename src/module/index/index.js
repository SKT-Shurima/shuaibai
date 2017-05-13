import Vue from 'vue'
import App from './App'

import {Button,Row,Col,Input,Select,Option,Carousel,CarouselItem} from  '.1.2.9@element-ui'
import '.1.2.9@element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'


Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
