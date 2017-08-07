import Vue from 'vue'
import App from './App'

import {Row,Col,Button} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'


Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
