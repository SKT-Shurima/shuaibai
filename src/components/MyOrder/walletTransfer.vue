<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip9")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip94")'>钱包</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip942")'>转账</span></h4>
		<ul class="type-list">
			<li><el-radio class="radio" v-model="radio" label="1">正常余额转账到转账金额</el-radio></li>
			<li><el-radio class="radio" v-model="radio" label="2">转账金额转账到正常余额</el-radio></li>
			<li><el-radio class="radio" v-model="radio" label="0">转账给他人</el-radio></li>
		</ul>
		<el-row>
			<el-col :span='4'>
				转账目标用户
			</el-col>
			<el-col :span='19' :offset="1">
				<el-input size='small' style='width:200px;' type='text' v-model='user' :disabled="radio!=0"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				转账金额
			</el-col>
			<el-col :span='19' :offset="1">
				<el-input size='small' style='width:200px;' type='text' v-model='amount'></el-input>
			</el-col>
		</el-row><el-row>
			<el-col :span='4'>
				转账密码
			</el-col>
			<el-col :span='19' :offset="1">
				<el-input size='small' style='width:200px;' type='password' v-model='transfer_pass'></el-input>
			</el-col>
		</el-row>
		<el-row style='margin-top: 30px;'>
			<el-col :span='19' :offset='5'>
				<el-button type='primary' size='small' style='width:94px;' @click='transfer' :disabled="!(amount&&transfer_pass&&(radio!='0'||(radio=='0'&&user)))">转账</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
import {yuebaoTransfer,yuebaoTransferIn,verifyTransfer} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {Message,MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
	export default{
		data(){
			return{
				radio: "4",
				user: '',
				amount: '',
				transfer_pass: '',
				radio: '1'
			}
		},
		methods:{
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	location.hash = view ;
		    },
		    transfer(){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		transfer_pass: hex_md5(this.transfer_pass)
		    	}
		    	verifyTransfer(params).then(res=>{
		    		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.radio==='0'?this.transfer2():this.transfer3();
					}
		    	}) 
		    },
		   	transfer2(){
		   		let params = {
		    		access_token: getCookie('access_token'),
		    		amount: this.amount,
		    		user: this.user
		    	}
		    	yuebaoTransfer(params).then(res=>{
		    		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						Message.success({
				          message: message,
				          type: 'success'
				        });
				        this.user = '';
						this.amount = '';
						this.transfer_pass = '';
					}
		    	}) 
		   	},
		   	transfer3(){
		   		let params = {
		    		access_token: getCookie('access_token'),
		    		amount: this.amount,
		    		type: this.radio
		    	}
		    	yuebaoTransferIn(params).then(res=>{
		    		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						Message.success({
				          message: message,
				          type: 'success'
				        });
						this.amount = '';
						this.transfer_pass = '';
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
			margin-bottom: 30px;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.el-row{
			width: 550px;
			margin-bottom: 16px;
			padding-left: 30px;
			.el-col-4{
				text-align: center;
				line-height: 30px;
				font-size: 14px;
			}
		}
	}
	.type-list{
		padding-left: 32px;
		margin-bottom: 12px;
		li{
			margin-bottom: 6px;
		}
	}
</style>