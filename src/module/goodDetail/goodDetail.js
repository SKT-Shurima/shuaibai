import Vue from 'vue'
import App from './App'

import Vuex from 'vuex'
import store from '../../common/vuex/store.js'
import {Button,Row,Col,Rate,Dialog,Input,Pagination} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

Vue.use(Vuex)
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
  store,
  template: '<App/>',
  components: { App }
})
