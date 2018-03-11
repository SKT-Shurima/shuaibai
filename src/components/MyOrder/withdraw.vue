<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip9")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip91")'>提现</span></h4>
		<div class="box">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='right'>
				<el-form-item label="提现金额" prop="money">
				    <el-input v-model="ruleForm.money"></el-input>
				</el-form-item>
				<el-form-item label="提现类型" prop="pay_type">
				    <el-radio class="radio" v-model="ruleForm.pay_type" label="1">银行卡</el-radio>
  					<el-radio class="radio" v-model="ruleForm.pay_type" label="2">支付宝</el-radio>
				</el-form-item>
				<el-form-item label="账号" prop="account">
				    <el-input v-model="ruleForm.account"></el-input>
				</el-form-item> 
				<el-form-item label="真实姓名" prop="realname">
				    <el-input v-model="ruleForm.realname"></el-input>
				</el-form-item>
				<el-form-item label="开户支行" v-show='ruleForm.pay_type==="1"'>
				    <el-input v-model="ruleForm.subbranch"></el-input>
				</el-form-item>     
			</el-form>
		</div>
		<el-row>
			<el-col :span='19' :offset='5' style='color:#666;'>
				当前可提现金额{{userInfo.account|currency}}
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='19' :offset='5'>
				<el-checkbox size='small' v-model='withdrawAll'>全部提现</el-checkbox>
			</el-col>
		</el-row>
		<el-row style='margin-top: 30px;'>
			<el-col :span='19' :offset='5'>
				<el-button type='primary' size='small' style='width:94px;' @click="submitForm('ruleForm')">确认提现</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
import {currency} from '../../common/js/filter'
import {errorInfo,getCookie} from '../../common/js/common' 
import {userInfo} from '../../common/js/mixins'
import {Message} from  'element-ui'
import {withdraw} from '../../common/js/api'
	export default{
		data(){
			 var checkMoney = (rule, value, callback) => {
    	 	if (value === ''){
    	 		callback(new Error('请输入提现金额'));
    	 	} else  {
    	 		let account = this.userInfo.account ;
    	 		if ((value-0)>account) {
    	 			callback(new Error('超出可提现的金额'));
    	 		}else{
    	 			callback();
    	 		}
    	 	}
	      };
			return {
				withdrawAll: false,
				userInfo: {
					account: ""
				},
				ruleForm: {
		            money: '',
		            pay_type: '1',
		            realname: '',
		            subbranch: "",
		            account: ""
		        },
		        rules: {
			        money: [
			            { required:true,  validator: checkMoney, trigger: 'blur' }
			        ],
			        account: [
			        	{ required:true, message: '请输入银行卡/支付宝账号', trigger: 'blur' }
			        ],
			        realname: [
			            { required: true, message: '请输入真实姓名', trigger: 'blur' }
			        ]
		        },
			}
		},
		filters:{
			currency
		},
		watch:{
			withdrawAll: {
				handler(){
					if (this.withdrawAll) {
						this.ruleForm.money = this.userInfo.account ;
					}else{
						this.ruleForm.money= "";
					}
				}
			}
		},
		mixins: [userInfo],
		methods:{
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	location.hash = view ;
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		            let params = {
		            	access_token: getCookie('access_token'),
						pay_type: this.ruleForm.pay_type,
						account: this.ruleForm.account,
						realname: this.ruleForm.realname,
						subbranch: this.ruleForm.subbranch,
						money: this.ruleForm.money,
						type: "1"
		            };
		            withdraw(params).then(res=>{
		            	let {errcode,message,content} = res;
		        		if (errcode !== 0) {
		        			errorInfo(errcode,message) ;
		        		}else {
		        			Message.success({
					          message: message,
					          type: 'success'
					        });
					        this.ruleForm = {
					            money: '',
					            pay_type: '1',
					            realname: '',
					            subbranch: "",
					            account: ""
					        }
		        		}
		            })
		        });
		      }
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
		.box{
			width: 420px;
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