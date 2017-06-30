<template>
	<div class="wrap">
		<div class="payType">
			<div class="title">
				选择付款方式
			</div>
			<ul>
				<li @click='typeIndex="1"' :class='{"isType":typeIndex==="1"}'>
					<img src="../../../static/commonImg/money.png" height="16" width="16" alt="余额支付">余额支付
					<img src="../../../static/commonImg/checked.png" height="16" width="16" v-show='typeIndex==="1"' class="checkImg">
				</li>
				<li @click='typeIndex="2"' :class='{"isType":typeIndex==="2"}'>
					<img src="../../../static/commonImg/alipay.png" height="16" width="16" alt="支付宝支付">支付宝支付
					<img src="../../../static/commonImg/checked.png" height="16" width="16" v-show='typeIndex==="2"' class="checkImg">
				</li>
				<li @click='typeIndex="3"' :class='{"isType":typeIndex==="3"}'>
					<img src="../../../static/commonImg/weixin.png" height="16" width="16" alt="微信支付">微信支付
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
				reqParams: null,
			}
		},
		methods:{
			payFn(){
				let _this = this ;
				_this.reqParams = getHashReq() ;
				let order_sn = 	_this.reqParams.order_sn;
				let  params = {
					access_token: getCookie('access_token'),
					type: _this.typeIndex,
					orders: order_sn
				}
				pay(params).then(res=>{
					let {errcode,message,content} = res ;
					let status = '';
					let count = "";
					if(errcode!==0) {
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		if (action==='confirm') {
					          			window.location.href = 'login.html';
					          		}
					          	}
						    });
	            		}else if(errcode=== -103){
	            			status = 2 ;
	            		}else{
	            			status = 1; 
	            		}
					}else{
						status = 0 ;
						count = content.count;
					}
					location.hash= `payResult?count=${count}&status=${status}` ;
				})
			}
			
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ddd;
	.wrap{
		width: 346px;
		margin: 100px auto;
		dl{
			padding-top: 30px;
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
				font-weight: 600;
				div{
					font-size: 14px;
					em{
						margin:0px auto; 
						font-size: 28px;
						color: $primary;
					}
				}
				.el-button{
					width: 160px;
					font-size: 20px;
				}
			}
		}
		.payType{
			width: 160px;
			text-align: center;
			margin: 0px auto;
			.title{
				font-size: 14px;
				font-weight: 600;
				color: $primary;
				margin-bottom: 50px;
			}
			ul{
				li{
					position: relative;
					height: 40px;
					line-height: 40px;
					font-size: 14px;
					cursor: pointer;
					border: 1px solid $border_color;
					margin-bottom: 22px;
				}
				.isType{
					border-color: $primary;
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
	}
</style>