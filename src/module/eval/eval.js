import Vue from 'vue'
import App from './App'

import {Row,Col,Button,Input,Rate,Upload} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

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
