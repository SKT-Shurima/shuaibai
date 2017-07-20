import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from '../../common/comfirmOrderVuex/store'
import {Row,Col,Button,Input,Dialog,Form,FormItem,Checkbox} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'
  

Vue.use(Vuex)  
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  
})

