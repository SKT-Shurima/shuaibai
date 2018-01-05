<template>
	<div class="wrap">
		<div class="pc-primary">
			<div class="weixin-pay-left">
				<div class="weixin-pay-top">
					<p>应付金额 : <span>{{reqParams.count}}元</span></p>
				</div>
				<div class="weixin-code" id="qrcode">
				</div>
				<div class="weixin-code-border-wrapper">
					<div class="weixin-code-border">
						<img src="../../../static/payImg/code-border.png" height="79" width="80">
					</div>
					<div class="weixin-code-word">
						<p>请使用微信"扫一扫"</p>
						<p>扫描二维码支付</p>
					</div>
				</div>
				<p class="weixin-other-pay-p" @click='goBack'>&lt选择其他支付方式</p>
			</div>
			<div class="weixin-pay-right">
				<img src="../../../static/payImg/weixin-phone.png" height="468" width="378">
			</div>
		</div>
	</div>
</template>
<script>
import QRCode from 'qrcodejs2'
import {getHashReq} from '../../common/js/common'
import {getOrderPayStatus} from '../../common/js/api' 
export default {
	data(){
		return {
			reqParams: {
				count: 0 
			}
		}
	},
	methods:{
		goBack(){
			let  order_sn = this.reqParams.order_sn ;
			location.replace(`confirmOrder.html#payfor?order_sn=${order_sn}`);
		},
		countStatus(){
			let order_sn = this.reqParams.order_number ;
			let params = {
				order_sn: order_sn
			}
			let timer = setInterval(()=>{
				getOrderPayStatus(params).then(res=>{
					let {errcode,message,content} =  res ;
					if (content===1) {
						let count = this.reqParams.count ;
						clearInterval(timer);
						location.replace(`confirmOrder.html#payResult?count=${count}&status=0`) ;
					}
				})
			},3000) ;
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.reqParams = getHashReq() ;
			var qrcode = new QRCode(document.getElementById("qrcode"), {
					width : 258,
					height : 258
				});
			let url = this.reqParams.code_url ;
			let pr = this.reqParams.pr;
			url = `${url}?pr=${pr}` ;
		    qrcode.makeCode(url);
		    setTimeout(()=>{
		    	this.countStatus();
		    },6000) ;
		})
	}
}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		.pc-primary{
			width: 1080px;
			margin: 60px auto 0px;
			overflow: hidden;
		}
		.weixin-pay-left{
		    float: left;
		    width: 50%;
		    height: 600px;
		    padding: 0 100px;
		}
		.weixin-pay-right{
			float: left;
		    width: 50%;
		    height: 600px;
		}
		.weixin-pay-top{
			p{
				font-size: 20px;
				margin-bottom: 20px;
				.ng-binding{
				    font-size: 20px;
				    font-weight: bold;
				    color: #fd4600;
				}
			}
		}
		.weixin-code{
		    border: 1px solid #ccc;
		    width: 300px;
		    height: 300px;
		    padding: 20px;
		}
		.weixin-code-border-wrapper{
		    overflow: hidden;
    		padding: 20px;
		}
		.weixin-code-border{
			float: left;
		}
		.weixin-code-word{
		    float: left;
		    margin-left: 20px;
		    color: #008cd6;
		    font-size: 20px;
		    padding: 2px;
		    p{
		    	margin-bottom: 20px
		    }
		}
		.weixin-other-pay-p{
		    font-size: 18px;
    		padding: 20px;
    		cursor: pointer;
		}
    }
</style>