import Vue from 'vue'
import App from './App'

import {Row,Col,Pagination,Button,Input} from  '.1.2.9@element-ui'
import '.1.2.9@element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

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
