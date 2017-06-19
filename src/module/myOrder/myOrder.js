import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store.js'
import {Button,Row,Col,Form,FormItem,Input,Checkbox,Upload,Radio,DatePicker,Select,Option,Pagination,Dialog} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

Vue.use(Vuex)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Dialog)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
