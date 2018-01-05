<template>	
	<div class="wrap" v-if='bol'>
		<div class="status">
			<!-- 订单已关闭 -->
			<div class="close" v-show='payTime<0&&orderInfo.order.order_state==="6"'>
				订单状态：订单已关闭
			</div>
			<!-- 订单已提交 -->
			<dl class="pay-for" v-show='payTime>=0&&orderInfo.order.order_state==="1"'>
				<dt>
					订单状态：订单已提交。请在<em class='color-primary'><img src="../../../static/orderImg/clock.png" height="30" width="30">{{payTime|timeStyleCh}}</em>内完成付款，超时将自动取消订单
				</dt>
				<dd>
					<el-button type='primary' @click='payfor'>立即付款</el-button>
					<a @click='cancel' style="cursor: pointer;">取消订单</a>
				</dd>
			</dl>
			<!-- 待发货 -->
			<dl class="pay-for" v-show='orderInfo.order.order_state==="2"'>
				<dt>
					订单状态：待发货
				</dt>
				<dd>
					<el-button type='primary' @click='urged'>催一催</el-button>
					<a href="myOrder.html#view10">查看订单</a>
				</dd>
			</dl>
			<!-- 待收货 -->
			<dl class="pay-for" v-show='orderInfo.order.order_state==="3"'>
				<dt>
					订单状态：待收货<em class='color-primary'><img src="../../../static/orderImg/clock.png" height="30" width="30">{{deliveryTime|timeStyleCh}}</em>后自动确认收货
				</dt>
				<dd>
					<el-button type='primary' @click='confirmGet'>确认收货</el-button>
					<a href="myOrder.html#view10">查看订单</a>
				</dd>
			</dl>
			<!-- 交易成功 -->
			<dl class="pay-for" v-show='orderInfo.order.order_state==="4"'>
				<dt>
					订单状态：交易成功<em class='color-primary'><img src="../../../static/orderImg/clock.png" height="30" width="30">{{evalTime|timeStyleCh}}</em>后自动评价
				</dt>
				<dd>
					<el-button type='primary' @click='evaluate'>评价</el-button>
					<a href="myOrder.html#view10">查看订单</a>
				</dd>
			</dl>
			<!-- 交易成功自动评价 -->
			<dl class="pay-for" v-show='orderInfo.order.order_state==="5"'>
				<dt>
					订单状态：交易成功
					<div class="eval">
						<el-row>
							<el-col :span='4' class='color-6'>初次评价</el-col>
							<el-col :span='20'>东西还不错</el-col>
						</el-row>
						<ul>
							<li v-for='(item,index) in 5' :class='{"margin-r":(index+1)%5}'>
								<img src="">
							</li>
						</ul>
					</div>
				</dt>
				<dd>
					<el-button type='primary'>追加评价</el-button>
					<a href="myOrder.html#view10">查看订单</a>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {timeStyleCh} from '../../common/js/filter'
import {buy,cancelOrder,orderRemind,delivery} from '../../common/js/api'
import {MessageBox,Message} from  'element-ui'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
	export default {
	   data(){
	   	  return {
	   	      bol: false, 
	   	  	  payTime: -1,
	   	  	  deliveryTime: -1,
	   	  	  evalTime: -1,
	   	  	  reqParams: null
	   	  }
	   },
	   props:{
	    	orderInfo: {
	    		type: Object,
	    		required: true
	    	}
	    },
	   watch: {
	   	  orderInfo :{
	   	  	handler(newVal,oldVal){
	   	  		this.bol = true;
	   	  		this.reqParams = getHashReq() ;
	   	  		let state = newVal.order.order_state;
	   	  		switch (state){
	   	  			case "1":
		   	  			this.payTime = newVal.order.date_end ;
		   	  			this.payTimer();
	   	  			break;
	   	  			case "3":
		   	  			this.deliveryTime = newVal.order.date_received - parseInt(new Date().getTime()/1000);
		   	  			this.deliveryTimer();
	   	  			break;
	   	  			case "4":
		   	  			this.evalTime = newVal.order.date_finish - parseInt(new Date().getTime()/1000);
		   	  			this.evalTimer();
	   	  			break;
	   	  			default:
	   	  			break;
	   	  		}
	   	  	}
	   	  }
	   }, 
	   filters: {
	   		timeStyleCh
	   },
	   methods: {
	   		// 待付款时间
	   		payTimer(){
	   			let  timer = setInterval(()=>{
	   				if(this.payTime>=0){
	   					this.payTime--;
	   				}else{
	   					clearInterval(timer);
	   				}
	   			},1000)
	   		},
	   		// 待收货时间
	   		deliveryTimer(){
	   			let timer = setInterval(()=>{
	   				if(this.deliveryTime>=0){
	   					this.deliveryTime--;
	   				}else{
	   					clearInterval(timer);
	   				}
	   			},1000)
	   		},
	   		// 待评价时间
	   		evalTimer(){
	   			let timer = setInterval(()=>{
	   				if(this.evalTime>=0){
	   					this.evalTime--;
	   				}else{
	   					clearInterval(timer);
	   				}
	   			},1000)
	   		},
	   		//  立即付款
	   		payfor(){
	   			let order_sn = this.reqParams.order_sn ;
	   			location.href=`confirmOrder.html#payfor?order_sn=${order_sn}`;
	   		},
	   		// 催一催
	   		urged(){
	   			let order_sn = this.reqParams.order_sn ;
	   			let params = {
	   				access_token: getCookie('access_token'),
	   				order_sn: order_sn
	   			}
	   			orderRemind(params).then(res=>{
	   				let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						Message.success({
				          message: message,
				          type: 'success'
				        });
					}
	   			})
	   		},
	   		applyRefund(){

	   		},
	   		// 取消订单
	   		cancel(){
	   	 		let msg  = '是否取消订单?'
	   	 		this.commonAPI(msg,cancelOrder);
	   	 	},
	   		// 确认收货
	   	 	confirmGet(){
	   	 		let msg  = '确定收货之前确定是否已经收货?'
	   	 		this.commonAPI(msg,delivery);
	   	 	},
	   		commonAPI(msg,api){
	   	 		let order_sn = this.reqParams.order_sn ;
	   	 		MessageBox.confirm(msg, '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params = {
		   	 			access_token: getCookie('access_token'),
		   	 			order_sn: order_sn
		   	 		}
		   	 		api(params).then(res=>{
		   	 			let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							location.reload();
						}
		   	 		})
		        }).catch(() => {
		                   
		        });
	   	 	},
	   	 	evaluate(){
	   	 		let order_sn = this.reqParams.order_sn ;
	   	 		location.href = `eval.html?order_sn=${order_sn}` ;
	   	 	}
	   }
	}
</script>
<style lang='scss' scoped>
	.status{
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		margin-top:40px;
		margin-bottom: 26px;
	}
	.pay-for{
		dt{
			margin-bottom: 38px;
			img{
				vertical-align: -6px;
			}
		}
		.eval{
			width: 380px;
			font-size: 12px;
			font-weight: 400;
			margin: 0px auto;
			.el-row{
				text-align: left;
				margin: 20px 0px;
			}
			ul{
				width: 100%;
				overflow: hidden;
			}
			li{
				float: left;
				width: 60px;
				height: 60px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.margin-r{
				margin-right: 20px;
			}
		}
		dd{
			.el-button{
				width:152px;
				font-size:18px;
				font-weight: 400;
			}
			a{
				font-size: 14px;
				font-weight: 400;
				line-height: 40px;
				margin-left: 26px;
				color: #144ddf;
			}
		}
	}
</style>