<template>
	<div class="wrap">
		<h4 class="color-6"><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip10")'>设置支付密码</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='left'>
		<div class="reg_box">
			  <el-form-item label="手机号码" style='padding-left: 17px;'>
			    	<span v-text='userInfo.real_phone'></span>
			  </el-form-item>
			  <el-form-item label="短信验证码" prop="verify_code">
			    <el-input v-model="ruleForm.verify_code" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
			  </el-form-item>
			  <el-form-item label="设置密码" prop="passwd">
			    <el-input v-model="ruleForm.passwd" type="password"></el-input>
			  </el-form-item>
		</div>
		<div style="width:300px;margin:50px 100px;">
			<el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.verify_code&&ruleForm.passwd)'>保存</el-button>
		</div>	  
	</el-form>
	</div>
</template>
<script>
import {setPayPasswd,sendCode} from '../../common/js/api'
import {errorInfo,getCookie,delCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
import {userInfo} from '../../common/js/mixins'
import {hex_md5} from '../../common/js/md5'

  export default {
    data() {
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
      return {
      	userInfo: {},
        ruleForm: {
            verify_code: '',
            passwd: '',
        },
        rules: {
          verify_code: [
            { required: true,  message: '请输入验证码', trigger: 'blur' }
          ],
          passwd: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ]
        },
        time: -1 ,
        total_time: 60, 
        send_btn: '发送验证码'
      };
    },
    mixins: [userInfo],
    methods: {
    	send_code(){
	      	let time = parseInt(new Date()/1000) +"";
	      	let sign = `content=ShuaiBo2017&param=${this.userInfo.real_phone}&time=${time}&type=10`;
      		let params = {
	      		param: this.userInfo.real_phone,
	      		type: '10',
	      		time: time,
	      		sign: hex_md5(sign)
	      	};
	      	sendCode(params).then( res=>{
	      		let {errcode,message} = res ;
	      		if (errcode !== 0) {
	      		    errorInfo(errcode,message) ;
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
	      	});
	    },
	    changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	    },
      	submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            let params = {
	            	access_token: getCookie('access_token'),
	            	phone: this.userInfo.real_phone,
	            	verify_code: this.ruleForm.verify_code,
	            	password: hex_md5(this.ruleForm.passwd),
	            };
	            setPayPasswd(params).then(res=>{
	            	let {errcode,message} = res ;
	            	if (errcode !== 0 ) {
	            		errorInfo(errcode,message) ;
	            	} else {
	            		MessageBox.alert('设置成功', '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
					            window.location.reload();
					        }
					    });
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
	.wrap{
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.el-form{
			width: 400px;
			margin-top: 40px;
		}
	}
</style>