<template>
	<div class="wrap">
		<component :order='order' :is='currentView'></component>
	</div>
</template>
<script >
import {getRequest,errorInfo} from '../../common/js/common'
import {getOrderDetail} from '../../common/js/api'
import firstEval from './firstEval'
import addEval from './addEval'
import noEval from './noEval'
import {MessageBox} from  'element-ui'
	export default{
		data(){
			return {
				order: {},
				reqParams: null,
				currentView: ''
			}
		},
		components:{
			firstEval,addEval,noEval
		},
		methods:{
			orderDetail(){
				let _this = this ;
				let order_sn = 	_this.reqParams.order_sn;
	   			let params = {
	   				access_token: sessionStorage.access_token,
	   				order_sn: order_sn
	   			}
	   			getOrderDetail(params).then(res=>{
	   				let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.order = content.order;
						let state = this.order.order_state - 0;
						this.currentView = state === 4 ? "firstEval" : state ===5 ? 'addEval' : 'noEval' ;
					}
	   			})
	   		}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
				this.orderDetail();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1250px;
		margin: 0px auto;   
	}
</style>