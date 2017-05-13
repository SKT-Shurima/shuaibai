import Vue from 'vue'
import App from './App'

import {Row,Col,Button,Input,Form,FormItem,Checkbox,Radio,DatePicker,Select,Option} from  '.1.2.9@element-ui'

import '.1.2.9@element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
// Vue.use(MessageBox)
// console.log(MessageBox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
