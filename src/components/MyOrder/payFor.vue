<template>
	<div class="wrap">
		<div class="box">
			<dl class="codeImg">
				<dt>
					<div id="qrcode"></div>
				</dt>
				<dd>
					<img src="../../../static/payImg/code-border.png" height="79" width="80">
					<span>
						扫描二维码支付
					</span>
				</dd>
			</dl>
			<div class="tips">
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
			reqParams: null,
			mask: false
		}
	},
	methods:{
		countStatus(){
			let _this = this ;
			let order_sn = _this.reqParams.order_number ;
			let params = {
				order_sn: order_sn
			}
			let  timer =  setInterval(()=>{
				let mask = this.mask;
				if (mask) {
					clearInterval(timer) ;
				}
				getOrderPayStatus(params).then(res=>{
					let {errcode,message,content} =  res ;
					if (this.content===1) {
						let count = _this.reqParams.count ;
						clearInterval(timer);
						location.replace(`myOrder.html#vip7`) ;
					}
				})
			},3000) ;

		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.reqParams = getHashReq() ;
			var qrcode = new QRCode(document.getElementById("qrcode"), {
					width : 200,
					height : 200
				});
			let url = this.reqParams.code_url ;
			let pr = this.reqParams.pr;
			url = `${url}?pr=${pr}` ;
		    qrcode.makeCode(url);
		    setTimeout(()=>{
		    	this.countStatus();
		    },6000) ;
		})
	},
	beforeDestroy(){
		this.mask = true ;
	}
}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		.box{
			width: 878px;
			margin: 100px auto;
			overflow: hidden;
			.codeImg{
				float: left;
				width: 500px;
				height: 468px;
				dd{
					span{
						line-height: 80px;
						font-size: 24px;
						margin-left: 20px;
					}
				}
			}
			#qrcode{
				width: 200px;
				height: 200px;
				margin-bottom: 40px;
			}
			.tips{
				float: right;
				width: 378px;
				height: 468px;
				background: url('../../../static/payImg/weixin-phone.png');
			}
		}
	}
</style>