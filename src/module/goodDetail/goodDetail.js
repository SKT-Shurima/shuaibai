import Vue from 'vue'
import App from './App'

import {Button,Row,Col,Rate,Dialog,Input,Pagination} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'


Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Rate)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Pagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
