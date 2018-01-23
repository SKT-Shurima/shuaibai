<template>
	<div class="wrap">
		<div class="pay-type">
			<div class="title">选择付款方式</div>
			<ul class="pay-list">
				<li @click='typeIndex="1"' :class='{"is-type":typeIndex==="1"}'>
					<img src="../../../static/commonImg/money.png" height="16" width="16" alt="余额支付" style="margin-right:10px;">余额支付
					<img src="../../../static/commonImg/checked.png" height="16" width="16" v-show='typeIndex==="1"' class="checkImg">
				</li>
				<li @click='typeIndex="4"' :class='{"is-type":typeIndex==="4"}'>
					<img src="../../../static/commonImg/alipay.png" height="16" width="16" alt="支付宝支付" style="margin-right:10px;">支付宝支付
					<img src="../../../static/commonImg/checked.png" height="16" width="16" v-show='typeIndex==="2"' class="checkImg">
				</li>
				<li @click='typeIndex="5"' :class='{"is-type":typeIndex==="5"}'>
					<img src="../../../static/commonImg/weixin.png" height="16" width="16" alt="微信支付" style="margin-right:10px;">微信支付
					<img src="../../../static/commonImg/checked.png" height="16" width="16" v-show='typeIndex==="3"' class="checkImg">
				</li>
			</ul>
			<div class="ensure">
				<el-button type='primary' @click='payFn'>确定</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import {pay} from '../../common/js/api'
import {MessageBox} from  'element-ui'
import {getHashReq,getCookie} from '../../common/js/common'
	export default {
		data(){
			return {
				typeIndex: '1',
				reqParams: {},
			}
		},
		methods:{
			payFn(){
				this.reqParams = getHashReq() ;
				let  params = {
					access_token: getCookie('access_token'),
					type: this.typeIndex,
					orders: this.reqParams.order_sn
				}
				pay(params).then(res=>{
					let {errcode,message,content} = res ;
					let status = "",count = "";
					if(errcode!==0) {
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		if (action==='confirm') {
					          			location.href = 'login.html';
					          		}
					          	}
						    });
	            		}else if(errcode=== -103){
	            			status = 2 ;
	            		}else{
	            			status = 1; 
	            		}
	            		location.hash= `payResult?status=${status}` ;
					}else{
						status = 0 ;
						count = content.amount;
						if (this.typeIndex==="1") {
							location.hash= `payResult?count=${count}&status=${status}` ;
						}
						if (this.typeIndex==='4') {
							document.write(content.html_text);
						}
						if (this.typeIndex==='5') {
							let code_url = content.code_url ;
							let order_number = content.order_number ;
							let count = content.count ;
							let order_sn = content.order_sn;
							code_url = code_url.split("?");
							code_url = code_url.join("&");
							location.replace(`confirmOrder.html#scode?code_url=${code_url}&order_number=${order_number}&count=${count}&order_sn=${order_sn}`);
						}
					}
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 346px;
		margin: 100px auto;
		.pay-type{
			width: 160px;
			text-align: center;
			margin: 0px auto;
		}
		.title{
			font-size: 14px;
			font-weight: 600;
			color: #c71724;
			margin-bottom: 50px;
		}
		.pay-list{
			li{
				position: relative;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				cursor: pointer;
				border: 1px solid #ddd;
				margin-bottom: 22px;
			}
			.is-type{
				border-color: #c71724;
			}
			.checkImg{
				position: absolute;
				right: 0px;
				bottom: 0px;
			}
		}
		.ensure{
			margin-top: 50px;
			.el-button{
				width: 100%;
				font-size: 20px;
			}
		}
	}
</style>