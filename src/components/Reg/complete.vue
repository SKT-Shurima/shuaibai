<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='left'>
		<div class="reg_box">
			<div class="title">请完善登录信息</div>
			  <el-form-item label="手机号码" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="短信验证码" prop="verify_code">
			    <el-input v-model="ruleForm.verify_code" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:102px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
			  </el-form-item>
			  <el-form-item label="设置密码" prop="passwd">
			    <el-input v-model="ruleForm.passwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="confirm_passwd">
			    <el-input v-model="ruleForm.confirm_passwd" type='password'></el-input>
			  </el-form-item>
		</div>
		<div style="width:500px;margin:50px auto;text-align:center;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;'>确认</el-button>
		</div>	  
	</el-form>
</template>
<script>
import {perInfomation,sendCode} from '../../common/js/api'
import {getHashReq} from '../../common/js/common'
import {MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
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
	        } else {
	          if (this.ruleForm.confirm_passwd !== '') {
	            this.$refs.ruleForm.validateField('confirm_passwd');
	          }
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
            confirm_passwd: ""
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
          ]
        },
        time: -1 ,
        total_time: 5, 
        send_btn: '发送验证码',
        recommend: '',
        reqParams: null
      };
    },
    methods: {
    	send_code(){
	      	let _this = this ;
	      	if (_this.ruleForm.phone === '') {
	      		MessageBox.alert('请输入手机号', '提示', {
		          confirmButtonText: '确定'
		        });
	      	} else {
	      		let params = {
		      		param: _this.ruleForm.phone,
		      		type: '0'
		      	};
		      	sendCode(params).then( res=>{
		      		let {errcode,message} = res ;
		      		if (errcode !== 0) {
		      		    MessageBox.alert(message, '提示', {
				          confirmButtonText: '确定'
					    });
		      		} else {
		      			_this.time = _this.total_time ;
		      			let timer = setInterval(()=>{
				      		_this.time--;
				      		_this.send_btn = _this.time + 's后重新发送';
				      		if (_this.time < 0) {
				      			_this.time = -1;
				      			_this.send_btn = '发送验证码';
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
          	let wx_web_openid = this.reqParams.wx_web_openid ;
            let params = {
            	oauth: wx_web_openid?'WeixinWeb':'QqWeb',
            	wx_web_openid: this.reqParams.wx_web_openid,
            	wx_unionid: this.reqParams.wx_unionid,
            	phone: this.ruleForm.phone,
            	verify_code: this.ruleForm.verify_code,
            	passwd: hex_md5(this.ruleForm.passwd),
            	confirm_passwd: hex_md5(this.ruleForm.confirm_passwd)
            };
            perInfomation(params).then(res=>{
            	let {errcode,message,content} = res ;
            	if (errcode !== 0 ) {
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定'
				    });
            	} else {
            		let userInfo = content ; 
            		let access_token= content.access_token ;
            		userInfo = JSON.stringify(userInfo);
            		sessionStorage.userInfo = userInfo ;
            		location.href = 'index.html' ;
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
    },
    mounted(){
    	this.$nextTick(()=>{
    		this.reqParams = getHashReq() ;
    	})
    }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
 .title{
		font-size: 20px;
		color: #f24450;
		text-align: center;
		font-weight: 600;
		margin-bottom: 30px;
	}
    .reg_box{
    	width: 390px;
    	margin: 0px auto;
    	padding-top: 40px;
    	color: #000;
    }
    .referees_box{
		width: 500px;
		margin: 0px auto;
    	padding-top: 40px;
    	padding-bottom: 40px;
    	padding-left: 56px;
    	padding-right: 56px;
    	color: #000;
		border: 1px solid $red_color;
		.area{
			overflow: hidden;
			.el-col{
				float: left;
				width: 90px;
			    select{
			    	background-color: #fff;
				    background-image: none;
				    border-radius: 4px;
				    border: 1px solid rgb(217, 193, 191);
				    box-sizing: border-box;
				    color: rgb(61, 33, 31);
				    display: block;
				    font-size: inherit;
				    height: 36px;
				    line-height: 1;
				    outline: none;
				    padding: 3px 10px;
				    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				    width: 100%;
			    }
			}
		}
	}
</style>