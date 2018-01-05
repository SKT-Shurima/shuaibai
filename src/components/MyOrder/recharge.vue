<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip70")'>充值</span></h4>
		<el-row>
			<el-col :span='4'>
				充值金额
			</el-col>
			<el-col :span='19' :offset="1">
				<el-input size='small' style='width:200px;' type='text' v-model='account' @change='changeAccount'></el-input>&nbsp;元&nbsp;人民币
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				付款方式
			</el-col>
			<el-col :span='19' style='line-height:30px;' :offset='1'>
				<el-radio class="radio" v-model="radio" label="4"><span style='font-size:12px;'>支付宝支付</span></el-radio>
	  			<el-radio class="radio" v-model="radio" label="5"><span style='font-size:12px;'>微信支付</span></el-radio>
			</el-col>
		</el-row>
		<el-row style='margin-top: 30px;'>
			<el-col :span='19' :offset='5'>
				<el-button type='primary' size='small' style='width:94px;' @click='submitPay' :disabled='!(account-0)'>确认支付</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
import {recharge} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {Message,MessageBox} from  'element-ui'
	export default{
		data(){
			return{
				radio: "4",
				account: null
			}
		},
		methods:{
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	location.hash = view ;
		    },
		    changeAccount(){
				let  reg = /^\d+$/g ;
				// if (!reg.test(this.account)) {
				// 	this.account = "";
				// }
		    },
		    submitPay(){
		    	if (!(this.account-0)) {
		    		MessageBox.alert('请输入充值金额', '提示', {
			          	confirmButtonText: '确定'
				    });
				    return ;
		    	}
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		type: this.radio,
		    		account: this.account + '' 
		    	}
		    	recharge(params).then(res=>{
		    		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						if (this.radio==='4') {
							document.write(content.html_text);
						}
						if (this.radio==='5') {
							let  code_url = content.code_url ;
							let  order_number = content.order_number ;
							let count = this.account;
							code_url = code_url.split("?");
							code_url = code_url.join("&");
							location.replace(`myOrder.html#vip700?code_url=${code_url}&order_number=${order_number}&count=${count}`);
						}
					}
		    	}) 
		    }
		},
		mounted(){
			this.$nextTick(()=>{
				this.$emit('hasGuess',false);
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			margin-bottom: 46px;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.el-row{
			width: 420px;
			margin-bottom: 16px;
			padding-left: 30px;
			.el-col-4{
				text-align: center;
				line-height: 30px;
				font-size: 14px;
			}
		}
	}
</style>