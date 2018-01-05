<template>
	<div class="wrap">
		<dl>	
			<dt>
				<img src="../../../static/orderImg/paySuccess.png" height="153" width="153" v-if='reqParams.status=="0"'>
				<img src="../../../static/orderImg/payFail.png" v-else>
			</dt>
			<dd style="font-weight: 600 ;">
				<div v-show='reqParams.status=="0"'>您已成功付款&nbsp;<em class='color-primary' v-text='reqParams.count'></em>&nbsp;元</div>
				<div v-show='reqParams.status=="1"'>支付失败，请重试</div>
				<div v-show='reqParams.status=="2"'>您的余额不足，支付失败，请选择其他支付方式</div>
			</dd>
			<dd>
				<el-button type='primary' @click='checkOrder'>查看订单</el-button>
				<el-button type='primary' style='margin-left: 20px;' @click='backHome'>帅柏首页</el-button>
			</dd>
		</dl>
	</div>
</template>
<script>
import {getHashReq} from '../../common/js/common'
import {getOrderPayStatus} from '../../common/js/api'
	export default {
		data(){
			return {
				reqParams: {}
			}
		},
		methods:{
			checkOrder(){
				location.href = "myOrder.html#view10" ;
			},
			backHome(){
				location.href = 'index.html'
			}
		},
		created(){
			this.$nextTick(()=>{
				this.reqParams = getHashReq() ;
				let  out_trade_no = this.reqParams.out_trade_no ;
				if (out_trade_no) {
					let params = {
						order_sn: out_trade_no
					}
					getOrderPayStatus().then(res=>{
						let {content} = res;
						let count = this.reqParams.total_amount ;
 						location.replace(`confirmOrder.html#payResult?count=${count}&status=${content}`) ;
					})
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 346px;
		margin: 100px auto;
		dl{
			padding-top: 30px;
		}
		dt{
			width: 154px;
			height: 154px;
			margin: 0px auto 70px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		dd{
			width: 100%;
			text-align: center;
			margin-bottom: 56px;
		}
		div{
			font-size: 14px;
		}
		em{
			margin:0px auto; 
			font-size: 28px;
		}
		.el-button{
			width: 160px;
			font-size: 20px;
		}
	}
</style>