import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import Vuex from 'vuex'
import store from '../../common/vuex/store.js'
import {Button,Row,Col,Rate,Dialog,Input,Pagination,Form,FormItem} from  'element-ui'

Vue.use(Vuex)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Rate)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
