<template>
<div>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='left'>
		<div class="reg-box">
			<div class="title">注册信息</div>
			  <el-form-item label="手机号码" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="短信验证码" prop="verify_code">
			    <el-input v-model="ruleForm.verify_code" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
			  </el-form-item>
			  <el-form-item label="设置密码" prop="passwd">
			    <el-input v-model="ruleForm.passwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="confirm_passwd">
			    <el-input v-model="ruleForm.confirm_passwd" type='password'></el-input>
			  </el-form-item>
			  <el-form-item label="绑定邮箱" prop="email" class='indent'>
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item label="推荐编号" style='margin-bottom:40px;' class='indent'>
			    <el-input v-model="ruleForm.share_code"></el-input>
			</el-form-item>
		</div>
		<div class="reg-btn">
			<el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;'>注册</el-button>
			<span style="margin-left:10px;">已有账号？<a class='color-primary' href="login.html">请登录</a></span>
		</div>	  
	</el-form>
	<vmask></vmask>
	</div>
</template>
<script>
import {setCookie} from '../../common/js/common'
import {reg,sendCode,linkage} from '../../common/js/api'
import {MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
import vmask from './mask'
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
	    		if (value !== this.ruleForm.verify_code) {
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
        ruleForm: {
            phone: '',
            verify_code: '',
            passwd: '',
            confirm_passwd: "",
            email: '',
            share_code: '',
        },
        rules: {
          phone: [
            { required:true, validator: checkPhone, trigger: 'blur' }
          ],
          verify_code: [
            { required: true, validator: checkCode, trigger: 'blur' }
          ],
          passwd: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          confirm_passwd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
          ]
        },
        time: -1 ,
        total_time: 60, 
        send_btn: '发送验证码'
      };
    },
    components:{
    	vmask
    },
    methods: {
    	send_code(){
	      	if (this.ruleForm.phone === '') {
	      		MessageBox.alert('请输入手机号', '提示', {
		          confirmButtonText: '确定'
		        });
	      	} else {
	      		let time = parseInt(new Date()/1000) +"";
	      		let sign = `content=ShuaiBo2017&param=${this.ruleForm.phone}&time=${time}&type=0`;
	      		let params = {
		      		param: this.ruleForm.phone,
		      		type: '0',
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
	      transDate(time){
	      	var newDate = new Date(time);
		    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
		    m = trans(m);
		    d = trans(d);
		    function trans (val){
		      		if (val < 10) {
		      			val = "0" + val ;
		      		}
		      		return val ;
		      };
		       return y +'-' + m + "-" + d ;
	      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	oauth: 'Web',
            	phone: this.ruleForm.phone,
            	verify_code: this.ruleForm.verify_code,
            	passwd: this.ruleForm.passwd,
            	confirm_passwd: this.ruleForm.confirm_passwd,
            	email: this.ruleForm.email,
            	share_code: this.ruleForm.share_code
            };
            reg(params).then(res=>{
            	let {errcode,content,message} = res ;
            	if (errcode !== 0 ) {
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定'
				    });
            	} else {
            		setCookie('access_token',content.access_token,2);
            		// 注册成功之后判断是否已经绑定了邮箱
            		if (this.ruleForm.email) {
            			this.$emit('regSuccess',1) ;
            		} else {
            			this.$emit('regSuccess',0) ;
            		}
            	}
            })
          } else {
            MessageBox.alert('请完成必填信息', '提示', {
		          confirmButtonText: '确定'
		        });
            return false;
          }
        });
      }
    }
  }
</script>
<style lang='scss' scoped>
 	.title{
		font-size: 20px;
		color: #f24450;
		text-align: center;
		font-weight: 600;
		margin-bottom: 30px;
	}
    .reg-box{
    	width: 400px;
    	margin: 0px auto;
    	padding-top: 40px;
    	color: #000;
    }
    .indent{
    	text-indent: 15px;
    }
    .referees-box{
		width: 500px;
		margin: 0px auto;
    	padding-top: 40px;
    	padding-bottom: 40px;
    	padding-left: 56px;
    	padding-right: 56px;
    	color: #000;
		border: 1px solid #f24450;
	}
	.reg-btn{
		width:500px;
		margin:50px auto;
		padding-left:156px;
	}
</style>