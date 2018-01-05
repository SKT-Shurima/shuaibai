<template>
	<div class="wrap">
		<div class="f9-bg bg">
			<div class="content-layout">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='left'>
					<div class="reg-box">
						<div class="title">注册信息</div>
						  <el-form-item label="手机号码" prop="phone">
						    <el-input v-model="ruleForm.phone"></el-input>
						  </el-form-item>
						  <el-form-item label="短信验证码" prop="verify">
						    <el-input v-model="ruleForm.verify" style='width:178px;'></el-input>
						    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
						  </el-form-item>
						  <el-form-item label="设置新密码" prop="passwd">
						    <el-input v-model="ruleForm.passwd" type="password"></el-input>
						  </el-form-item>
						  <el-form-item label="确认新密码" prop="confirm_passwd">
						    <el-input v-model="ruleForm.confirm_passwd" type='password'></el-input>
						  </el-form-item>
					</div>
					<div style="width:500px;margin:50px auto;padding-left:154px;">
						    <el-button type="primary" @click="submitForm('ruleForm')" style='width:214px;'  :disabled='!(ruleForm.phone!=""&&ruleForm.verify!=""&&ruleForm.passwd!=""&&ruleForm.confirm_passwd!="")'>重置密码并重新登录</el-button>
					</div>	  
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import {resetPasswd,sendCode} from '../../common/js/api' 
	import {MessageBox} from  'element-ui'
	import {hex_md5} from '../../common/js/md5'
	import {errorInfo,delCookie} from '../../common/js/common'
 	export default {
    	data() {
	    	// 手机验证
	    	 var checkPhone = (rule, value, callback) => {
	    	 	if (value === ''){
	    	 		callback(new Error('请输入手机号'));
	    	 	} else {
	    	 		let reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/ ;
			        if ( !reg.test(value)) {
			          callback(new Error('请输入正确手机号'));
			        } else{
			        	callback();
			        }
	    	 	}
		      };
		      // 验证码验证
		    var checkCode = (rule, value, callback) => {
		    	if (value === '') {
		    		callback(new Error('请输入验证码'));
		    	} else {
		    		if (value !== this.ruleForm.verify) {
			    		callback(new Error('请输入正确验证码'));
			    	} else {
			    		callback();
			    	}
		    	}
		    	
		    };
		    // 密码验证
	        var validatePass = (rule, value, callback) => {
				if (value === '') {
		          callback(new Error('请输入密码'));
		        } else if(value.length<6){
		        	callback(new Error('密码长度至少六位'));
		        }else{
		        	callback();
		        }
		      };
		      // 确认密码验证
		     var validatePass2 = (rule, value, callback) => {
		       if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.passwd) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		     };
		      return {
		      	complete: false,
		      	proIndex: 0,
		        cityIndex: 0,
		        areaIndex: 0,
		        ruleForm: {
		            phone: '',
		            verify: '',
		            passwd: '',
		            confirm_passwd: ""
		        },
		    	rules: {
		          	phone: [
		            	{ required:true, validator: checkPhone, trigger: 'blur' }
		          	],
		          	verify: [
		            	{ required: true, validator: checkCode, trigger: 'blur' }
		          	],
		          	passwd: [
		            	{required: true, validator: validatePass, trigger: 'blur' }
		          	],
		          	confirm_passwd: [
		            	{ required: true, validator: validatePass2, trigger: 'blur' }
		          	]
		        },
		        time: -1 ,
		        total_time: 60, 
		        send_btn: '发送验证码'
		    };
    	},
    	methods: {
	        send_code(){
		      	if (this.ruleForm.phone === '') {
		      		MessageBox.alert('请输入手机号', '提示', {
			          confirmButtonText: '确定'
			        });
		      	} else {
		      		let time = parseInt(new Date()/1000) +"";
	      			let sign = `content=ShuaiBo2017&param=${this.ruleForm.phone}&time=${time}&type=1`;
		      		let params = {
			      		param: this.ruleForm.phone,
			      		type: '1',
			      		time: time,
			      		sign: hex_md5(sign)
			      	};
			      	sendCode(params).then( res=>{
			      		let {errcode,message} = res ;
			      		if (errcode !== 0) {
			      		    MessageBox.alert(message, '提示', {
					          confirmButtonText: '确定'
						    });
			      		} else {
			      			this.time = this.total_time ;
			      			let timer = setInterval(()=>{
					      		this.time--;
					      		this.send_btn = this.time + 's后重新发送';
					      		if (this.time < 0) {
					      			this.time = -1;
					      			this.send_btn = '发送验证码';
					      			clearInterval(timer);
					      		}
					      	},1000)
			      		}
			      	})
		      	}
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
			            let params = {
			            	param: this.ruleForm.phone,
			            	verify: this.ruleForm.verify,
			            	passwd: this.ruleForm.passwd,
			            	confirm_passwd: this.ruleForm.confirm_passwd
			            };
			            resetPasswd(params).then(res=>{
			            	let {errcode,message} = res;
			            	if (errcode !== 0) {
			            		errorInfo(errcode,message);
			            	} else {
								MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
							            location.href = 'login.html' ;
							        }
							    });
			            	}
			            })
		          	}
		        });
		    }
    	}
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		margin-top: 4px;
	} 
	.bg{
	    width: 100%;
	    overflow: hidden;
	}
    .content-layout{
	    width: 900px;
	    height: 600px;
	    margin: 28px auto;
	    overflow: hidden;
	    box-shadow: 0px 2px 4px 2px #dfdfdf;
	   .title{
			font-size: 20px;
			color: #f24450;
			text-align: center;
			font-weight: 600;
			margin-bottom: 30px;
		}
	    .reg-box{
	    	width: 390px;
	    	margin: 0px auto;
	    	padding-top: 40px;
	    	color: #000;
	    }
	}
</style>