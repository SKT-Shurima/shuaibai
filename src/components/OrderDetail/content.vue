<template id='container'>
	<div class="wrap">
		<div class="title">
			<ul>
				<li v-for='(item,index) in listTitle' v-text='item.name' :class='{"isTab":currentIndex===index}' :style='{zIndex:index*10,left: (340-16)*index + "px"}'></li>
			</ul>
		</div>
		<div>
		<keep-alive>
			<component :is='currentView'></component>
		</keep-alive>			
		</div>
	</div>
</template>
<script>
import successSubmit from '../OrderStatus/successSubmit'
import waitShipments from '../OrderStatus/waitShipments'
import confirmGet from '../OrderStatus/confirmGet'
import evaluation from '../OrderStatus/evaluation'
import tradeOver from '../OrderStatus/tradeOver'
import {getOrderDetail} from '../../common/js/api'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
window.onpopstate = function() {  
       location.reload() ;
 }; 
	export default{
		 data(){
			return {
				currentIndex: "",
				listTitle: [
					{name:'1.提交订单'},
					{name:'2.付款'},
					{name:'3.卖家发货'},
					{name:'4.确认收货'}
				],
				orderInfo: null,
				reqParams: null
			}
		},
		components:{
			successSubmit,
			waitShipments,
			confirmGet,
			evaluation,
			tradeOver
		},
		computed: {
		  	currentView () {
		      return this.$store.state.view;
		    }
		},
		methods: {
			init(){
				let _this = this ;
				let hash = location.hash.split("?")[0] ;
				_this.reqParams = getHashReq() ;
				let order_sn = 	_this.reqParams.order_sn;
				if (order_sn) {
					let params = {
						access_token: getCookie('access_token'),
						order_sn: order_sn
					}
					getOrderDetail(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							let state = content.order.order_state;
							let view = '';
							if (hash) {
								view = hash.slice(1) ;
								this.$store.commit('switchView',view);
							}else{
								
							}
							switch (state){
								case '1': 
									this.currentIndex = 0;
									if (view!=='successSubmit') {
										location.hash = `successSubmit?order_sn=${order_sn}`
									}
								break;
								case '2': 
									this.currentIndex = 1;
									if (view!=='waitShipments') {
										location.hash = `waitShipments?order_sn=${order_sn}`
									}
								break;
								case '3': 
									this.currentIndex = 2;
									if (view!=='confirmGet') {
										location.hash = `confirmGet?order_sn=${order_sn}`
									}
								break;
								case '4': 
									this.currentIndex = 3;
									if (view!=='evaluation') {
										location.hash = `evaluation?order_sn=${order_sn}`
									}
								break;
								case '5': 
									this.currentIndex = 3;
									if (view!=='tradeOver') {
										location.hash = `tradeOver?order_sn=${order_sn}`
									}
								break;
							}
						}
					})
				}else{
					location.href='myOrder.html#view10'
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			position: relative;
			width: 100%;
			height: 60px;
			overflow: hidden;
			color: #000;
			ul{
				position: absolute;
				top: 0px;
				transform: translateX(-22px);
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				font-weight: 600;
				text-align: center;
				li{
					position: absolute;
					top: 0px;
					width: 340px;
					text-align: center;
					background: url('../../../static/commonImg/progressNone.png')  100% 100% ;
					background-size: 100% 100%;
				}
				li:last-child{
					text-align: left;
					text-indent: 96px;
				}
				.isTab{
					color: #fff;
					background: url('../../../static/commonImg/progressThis.png')  100% 100%;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>