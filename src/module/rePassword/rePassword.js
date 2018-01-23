import Vue from 'vue'
import App from './App'
import "babel-polyfill";

import {Row,Col,Button,Input,Form,FormItem,Checkbox,Radio,DatePicker,Select,Option} from  'element-ui'



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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
