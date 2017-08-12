<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view13")'>邮箱绑定</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view131")'>解绑</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='left'>
			<div class="reg_box">
				<el-form-item label="当前邮箱" style='padding-left: 17px;'>
			    	<span v-text='userInfo.email'></span>
				</el-form-item>
				<el-form-item label="邮箱验证码 " prop="code">
				    <el-input v-model="ruleForm.code" style='width:178px;'></el-input>
				    <el-button type='primary' style='float: right;width:102px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
				</el-form-item>
				  
			</div>
			<div style="width:500px;margin:50px 100px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.code)'>确认解绑</el-button>
			</div>	  
		</el-form>
	</div>
</template>
<script>
import {unbindEmail,sendCode} from '../../common/js/api'
import {userInfo} from '../../common/js/mixins'
import {MessageBox} from  'element-ui'
import {errorInfo,getCookie} from '../../common/js/common'
import {hex_md5} from '../../common/js/md5'
  export default {
    data() {
	      // 验证码验证
	    var checkCode = (rule, value, callback) => {
	    	if (value === '') {
	    		callback(new Error('请输入验证码'));
	    	} else {
	    		if (value !== this.ruleForm.code) {
		    		callback(new Error('请输入正确验证码'));
		    	} else {
		    		callback();
		    	}
	    	}
	    	
	    };
      return {
      	userInfo:{

      	},
        ruleForm: {
            email: '',
            code: '',
        },
        rules: {
          code: [
            { required: true, validator: checkCode, trigger: 'blur' }
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
	      	let _this = this ;
	      	let time = parseInt(new Date()/1000) +"";
	      	let sign = `content=ShuaiBo2017&param=${this.userInfo.email}&time=${time}&type=7`;
      		let params = {
	      		param: _this.userInfo.email,
	      		type: '7',
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
            	email: this.userInfo.email,
            	code: this.ruleForm.code
            };
            unbindEmail(params).then(res=>{
            	let {errcode,message} = res ;
            	if (errcode !== 0 ) {
            		errorInfo(errcode,message) ;
            	} else {
            		this.userInfo.email = "";
            		this.userInfo.has_email = false ;
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定',
			          	callback: action => {
				            this.$store.commit('switchView','view10');
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
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid $border_color;
			color: $text_color;
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