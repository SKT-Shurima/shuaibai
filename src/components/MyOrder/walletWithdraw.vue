<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip74")'>钱包</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip741")'>提现</span></h4>
		<div class="box">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='right'>
				<el-form-item label="提现金额" prop="amount">
				    <el-input v-model="ruleForm.amount"></el-input>
				    <em class='color-primary'>手续费：{{(ruleForm.amount*ratio).toFixed(2)}}元</em>
				</el-form-item>
				<el-form-item label="发票">
					<dl>
						<dt>
							<el-radio class="radio" v-model="invoiceType" label="1">无发票（系统将扣除相应的手续费）</el-radio>
						</dt>
						<dt>
							<el-radio class="radio" v-model="invoiceType" label="2">有发票（请参照示例图片抬头和信用代码信息上传发票图片）</el-radio>
						</dt>
						<dd class='invoice-info' v-show='invoiceType=="2"'>
							<div class='eg-img'>
								<img src="../../../static/centerImg/invoice.png" height="60" width="60">
								<span @click='maskBol=true;'>示例图片点击放大</span>
							</div>
							<div>
								<el-upload
									action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
									:on-success='uploadSuccess'
									:before-upload="beforeUpload"
									:show-file-list='false'
									:data="form"
									>
									<img v-if='!invoiceUrl' src="../../../static/evalImg/add.png" height="60" width="60">
									<img v-else :src="invoiceUrl" height="60" width="60">
								</el-upload>
							</div>
						</dd>
					</dl>
				</el-form-item>
				<el-form-item label="提现类型" prop="type">
				    <el-radio class="radio" v-model="ruleForm.type" label="1">银行卡</el-radio>
  					<el-radio class="radio" v-model="ruleForm.type" label="2">支付宝</el-radio>
				</el-form-item>
				<el-form-item label="账号" prop="account">
				    <el-input v-model="ruleForm.account"></el-input>
				</el-form-item> 
				<el-form-item label="真实姓名" prop="realname">
				    <el-input v-model="ruleForm.realname"></el-input>
				</el-form-item>
				<el-form-item label="开户支行" v-show='ruleForm.type==="1"'>
				    <el-input v-model="ruleForm.subbranch"></el-input>
				</el-form-item>     
			</el-form>
		</div>
		<el-row>
			<el-col :span='19' :offset='5' style='color:#666;'>
				当前可提现金额{{((userInfo.reward_amount-0)+(userInfo.transfer_amount-0))|currency}}
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
		<div class='mask' @click='maskBol=false;' v-show='maskBol'>
			<div class='mask-con'>
				<img src="../../../static/centerImg/invoice.png">
			</div>
		</div>
	</div>
</template>
<script >
import {currency} from '../../common/js/filter'
import {errorInfo,getCookie} from '../../common/js/common' 
import {userInfo} from '../../common/js/mixins'
import {Message,MessageBox} from  'element-ui'
import {yuebaoWithdraw,withdrawServiceFee} from '../../common/js/api'
	export default{
		data(){
			 var checkamount = (rule, value, callback) => {
    	 	if (value === ''){
    	 		callback(new Error('请输入提现金额'));
    	 	} else  {
    	 		this.userInfo.reward_amount-=0;
				this.userInfo.transfer_amount-=0;
    	 		let amount = this.userInfo.reward_amount+this.userInfo.transfer_amount;
    	 		if ((value-0)>amount) {
    	 			callback(new Error('超出可提现的金额'));
    	 		}else{
    	 			callback();
    	 		}
    	 	}
	      };
			return {
				withdrawAll: false,
				userInfo: {
					reward_amount: "",
					transfer_amount: ""
				},
				ruleForm: {
		            amount: '',
		            type: '1',
		            realname: '',
		            subbranch: "",
		            account: ""
		        },
		        rules: {
			        amount: [
			            { required:true,  validator: checkamount, trigger: 'blur' }
			        ],
			        account: [
			        	{ required:true, message: '请输入银行卡/支付宝账号', trigger: 'blur' }
			        ],
			        realname: [
			            { required: true, message: '请输入真实姓名', trigger: 'blur' }
			        ]
		        },
		        invoiceType: '1',
		        invoiceUrl: '',
		        invoice: '',
		        form: {
			    	cate: 'invoice', 
			    	access_token: getCookie('access_token')
			    },
			    maskBol: false,
			    ratio: 0
			}
		},
		filters:{
			currency
		},
		watch:{
			withdrawAll: {
				handler(){
					if (this.withdrawAll) {
						this.userInfo.reward_amount-=0;
						this.userInfo.transfer_amount-=0;
						this.ruleForm.amount = this.userInfo.reward_amount+this.userInfo.transfer_amount;
					}else{
						this.ruleForm.amount= "";
					}
				}
			}
		},
		mixins: [userInfo],
		methods:{
			beforeUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          	Message.error('上传图片只能是 JPG 格式!');
		        }else if (!isLt2M) {
		          	Message.error('上传图片大小不能超过 2MB!');
		        }else{
		        	return isJPG && isLt2M;
		        }
	        },
			uploadSuccess(res,file,fileList){
				let {errcode,message,content} = res ;
				if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					this.invoiceUrl = content.url;
					this.invoice = content.name;
				}
			},
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	location.hash = view ;
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		            let params = {
		            	access_token: getCookie('access_token'),
						type: this.ruleForm.type,
						account: this.ruleForm.account,
						realname: this.ruleForm.realname,
						subbranch: this.ruleForm.subbranch,
						amount: this.ruleForm.amount
		            };
		            if (this.invoiceType=="2") {
		            	if (!this.invoice) {
		            		MessageBox.alert('请上传发票图片', '提示', {
					          	confirmButtonText: '确定'
						    });
						   	return false;
		            	}else{
		            		params.invoice = this.invoice;
		            	}
		            }
		            yuebaoWithdraw(params).then(res=>{
		            	let {errcode,message,content} = res;
		        		if (errcode !== 0) {
		        			errorInfo(errcode,message) ;
		        		}else {
		        			Message.success({
					          message: message,
					          type: 'success'
					        });
					        this.ruleForm = {
					            amount: '',
					            type: '1',
					            realname: '',
					            subbranch: "",
					            account: ""
					        }
					        this.invoiceUrl = '';
		        			this.invoice = '';
		        		}
		            })
		        });
		      }
		},
		created(){
			this.$nextTick(()=>{
				withdrawServiceFee({}).then(res=>{
					let {errcode,message,content} = res;
	        		if (errcode !== 0) {
	        			errorInfo(errcode,message) ;
	        		}else {
	        			this.ratio = content;
	        		}
				})
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
		.box{
			width: 500px;
		}
		.el-form-item{
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
	.invoice-info{
		overflow: hidden;
	}
	.invoice-info>div{
		float: left;
		margin-top: 10px;
		margin-right: 10px;
		width: 60px;
		height: 60px;
	}
	.eg-img{
		position: relative;
		span{
			display: inline-block;
			position: absolute;
			top: 0px;
			left: 0px;
			width: 52px;
			height: 48px;
			line-height: 24px;
			padding: 6px 4px;
			font-size: 12px;
			color: #fff;
			background-color: rgba(0,0,0,.5);
		}
	}
	.mask{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: rgba(0,0,0,.5);
		.mask-con{
			width: 600px;
			position: absolute;
			top: 15%;
			left: 0px;
		    right: 0px;
		    margin: auto;
			img{
				width: 100%;
			}
		}
	}
</style>