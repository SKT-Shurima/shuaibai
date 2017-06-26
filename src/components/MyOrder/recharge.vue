<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip70")'>充值</span></h4>
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
				<el-radio class="radio" v-model="radio" label="2"><span style='font-size:12px;'>支付宝支付</span></el-radio>
	  			<el-radio class="radio" v-model="radio" label="3"><span style='font-size:12px;'>微信支付</span></el-radio>
			</el-col>
		</el-row>
		<el-row style='margin-top: 30px;'>
			<el-col :span='19' :offset='5'>
				<el-button type='primary' size='small' style='width:94px;' @click='submitPay'>确认支付</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
import {recharge} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {Message} from  'element-ui'
	export default{
		data(){
			return{
				radio: "2",
				account: null
			}
		},
		methods:{
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	location.hash = view ;
		    },
		    changeAccount(){
		    	let _this = this ;
				let  reg = /^\d+$/g ;
				if (!reg.test(_this.account)) {
					_this.account = "";
				}
		    },
		    submitPay(){
		    	let _this = this;
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		type: _this.radio,
		    		account: _this.account + '' 
		    	}
		    	recharge(params).then(res=>{
		    		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						 Message.success({
				          message: '充值成功',
				          type: 'success'
				        }); 
						 _this.account = "" ;
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
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
$bg_color: #e84848;
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			margin-bottom: 46px;
			border-bottom: 1px solid $border_color;
			color: $text_color;
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