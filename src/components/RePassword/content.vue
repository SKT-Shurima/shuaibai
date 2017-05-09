<template>
	<div class="wrap">
		<div class="bg">
			<div class="content_layout">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='left'>
					<div class="reg_box">
						<div class="title">注册信息</div>
						  <el-form-item label="手机号码" prop="phone">
						    <el-input v-model="ruleForm.phone"></el-input>
						  </el-form-item>
						  <el-form-item label="短信验证码" prop="vertify_code">
						    <el-input v-model="ruleForm.vertify_code" style='width:178px;'></el-input>
						    <el-button type='primary' style='float: right;width:102px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
						  </el-form-item>
						  <el-form-item label="设置密码" prop="passwd">
						    <el-input v-model="ruleForm.passwd" type="password"></el-input>
						  </el-form-item>
						  <el-form-item label="确认密码" prop="confirm_passwd">
						    <el-input v-model="ruleForm.confirm_passwd" type='password'></el-input>
						  </el-form-item>
					</div>
					<div style="width:500px;margin:50px auto;padding-left:154px;">
						    <el-button type="primary" @click="submitForm('ruleForm')" style='width:214px;'  :disabled='!(ruleForm.phone!=""&&ruleForm.vertify_code!=""&&ruleForm.passwd!=""&&ruleForm.confirm_passwd!="")'>重置密码并重新登录</el-button>
					</div>	  
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
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
	    		if (value !== this.ruleForm.vertify_code) {
		    		callback(new Error('请输入正确验证码'));
		    	} else {
		    		callback();
		    	}
	    	}
	    	
	    };
	    // 密码验证
        var validatePass = (rule, value, callback) => {
	          if (this.ruleForm.confirm_passwd !== '') {
	            this.$refs.ruleForm.validateField('confirm_passwd');
	          } else {
	          	 callback();
	          }
	      };
	      // 确认密码验证
	     var validatePass2 = (rule, value, callback) => {
	      if (value !== this.ruleForm.passwd) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	     };
      return {
      	complete: false,
      	cityArr: [{
      		name: '',
      		sub: [{
      			name: '',
      			sub: ''
      		}]
      	}],
      	proIndex: 0,
        cityIndex: 0,
        areaIndex: 0,
        ruleForm: {
            phone: '',
            vertify_code: '',
            passwd: '',
            confirm_passwd: ""
        },
        rules: {
          phone: [
            { required:true, validator: checkPhone, trigger: 'blur' }
          ],
          vertify_code: [
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
        total_time: 5, 
        send_btn: '发送验证码'
      };
    },
    methods: {
      send_code(){
      	let _this = this ;
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
.wrap{
		width: 100%;
		margin-top: 4px; 
		.bg{
		    width: 100%;
		    overflow: hidden;
		    background-color: #f9f9f9;
		    .content_layout{
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
			    .reg_box{
			    	width: 390px;
			    	margin: 0px auto;
			    	padding-top: 40px;
			    	color: #000;
			    }
			}
		}
}
 
</style>