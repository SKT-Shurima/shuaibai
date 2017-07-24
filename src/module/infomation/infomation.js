import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from '../../common/vuex/store.js'
import {Row,Col,Button,Pagination} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

Vue.use(Vuex)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Pagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
