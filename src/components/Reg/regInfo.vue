<template>
<div>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='left'>
		<div class="reg_box">
			<div class="title">注册信息</div>
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
			  <el-form-item label="绑定邮箱" prop="email" style='margin-bottom:40px;' class='indent'>
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<el-checkbox v-model='complete'>完善信息加入推荐人，没有可忽略</el-checkbox>
			  </el-form-item>
		</div>
		<div class="referees_box" v-if='complete'>
	  		<div class="title">推荐人会员号</div>
	  		<el-form-item label="推荐编号" prop="userid">
			    <el-input v-model="ruleForm.userid"></el-input>
			</el-form-item>
			<el-form-item label="安置编号" class='indent'>
			    <el-input v-model="ruleForm.anzhibum"></el-input>
			</el-form-item>
			<div class="title">个人基本信息</div>
			<el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
			    <el-radio class="radio" v-model="ruleForm.sex" label="1">男</el-radio>
					<el-radio class="radio" v-model="ruleForm.sex" label="0">女</el-radio>
			</el-form-item>
			<el-form-item label="出生日期" prop="birthday">
			   	<el-date-picker
				      v-model="ruleForm.birthday"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions"
				      style='width:100%'
				      >
				</el-date-picker>
			</el-form-item>
			<el-form-item label="昵称" prop="petname">
			    <el-input v-model="ruleForm.petname"></el-input>
			</el-form-item>
			<el-form-item label="身份证号" prop="papernumber">
			    <el-input v-model="ruleForm.papernumber"></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="mobiletele">
			    <el-input v-model="ruleForm.mobiletele"></el-input>
			</el-form-item>
			<el-form-item label="地区" prop='area'>
				<el-row class="area">
					<el-col>
						<select v-model="ruleForm.province" @change='setOption("proIndex",$event)'>
						<option value='' disabled selected style='display:none;'>省</option>
		                    <option
		                      v-for="(item,index) in proArr"
		                      :label="item.name"
		                      :value="index" :key='index'>
		                    </option>
		                 </select>
					</el-col>
					<el-col style='margin-left: 8px;'>
						<select v-model="ruleForm.city" @change='setOption("cityIndex",$event)'>
						<option value='' disabled selected style='display:none;'>市</option>
		                    <option
		                      v-for="(item2,index2) in cityArr"
		                      :label="item2.name"
		                      :value="index2" :key='index2'>
		                    </option>
		                 </select>
					</el-col>
					<el-col style='margin-left: 8px;'>
						<select v-model="ruleForm.district" @change='setOption("areaIndex",$event)'>
						<option value='' disabled selected style='display:none;'>区</option>
		                    <option
		                      v-for="(item3,index3) in areaArr"
		                      :label="item3.name"
		                      :value="index3" :key='index3'>
		                    </option>
		                 </select>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="详细地址" class='indent'>
			    <el-input v-model="ruleForm.address"></el-input>
			</el-form-item>
		</div>
		<div class="regBtn">
			<el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;'>注册</el-button>
			<span class='hasAccount'>已有账号？<a href="login.html">请登录</a></span>
		</div>	  
	</el-form>
	<vmask></vmask>
	</div>
</template>
<script>
import {reg,sendCode,linkage} from '../../common/js/api'
import {MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
import {hex_sha1} from '../../common/js/sha1'
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
	     // 地区选择
	     var checkArea = (rule,value,callback) => {
	     	if (this.ruleForm.province === "") {
	     		callback(new Error('请选择省份或直辖市'));
	     	} else if (this.ruleForm.city === '') {
	     		callback(new Error('请选择地级市或地区'));
	     	} else {
	     		if (this.areaArr.length) {
	     			if (this.ruleForm.district === "") {
	     				callback(new Error('请选择地区'));
	     			} else {
	     				callback();
	     			}
	     		} else {
	     			callback();
	     		}
	     	} 
	     };
	     // 身份证验证
	     var check_papernumber = (rule,value,callback) => {
	     	if (value === "") {
	     		callback(new Error('请输入身份证号'));
	     	} else {
	     	    let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[\d|x|X]$/ ;
	     	    if (!reg.test(value)) {
	     	    	callback(new Error('请输入正确的身份证号'));
	     	    } else {
	     	    	callback();
	     	    }
	     	}
	     }
      return {
      	complete: false,
      	proArr: [],
      	cityArr: [],
      	areaArr: [],
      	proIndex: 0,
        cityIndex: 0,
        areaIndex: 0,
        ruleForm: {
            phone: '',
            verify_code: '',
            passwd: '',
            confirm_passwd: "",
            email: '',
            papernumber: '',
	        userid: '',
	        anzhinum: '',
	        name: '',
	        sex: '1',
	        birthday: '',
	        petname: '',
	        papernumber: '',
	        mobiletele: '',
	        province: '',
	        city: '',
	        district: '',
	        address: ''
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
          ],
          userid: [
            { required: true, message: '请输入推荐编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          sex: [
          	{ required: true }
          ],
          birthday: [
            {  type: 'date', required: true, message: '请输入出生日期', trigger: 'blur' }
          ],
          petname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          papernumber: [
            { required: true, validator: check_papernumber, trigger: 'blur' }
          ],
          mobiletele: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          area: [
            { required: true, validator: checkArea, trigger: 'blur' }
          ]
        },
         pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        time: -1 ,
        total_time: 60, 
        send_btn: '发送验证码',
        recommend: ''
      };
    },
    components:{
    	vmask
    },
    methods: {
    	getLinkage(mask,id){
    		let params = {
    			pid: id
    		}
    		linkage(params).then(res=>{
    			let {errcode,message,content} = res ;
            	if (errcode !== 0 ) {
            		errorInfo(errcode,message) ;
            	} else {
            		if (mask==='pro') {
            			this.proArr = content ;
            			this.cityArr= [];
            			this.areaArr = [];
            		}else if (mask==='city'){
            			this.cityArr = [] ;
            			this.cityArr = content; 
            		}else if (mask=== 'area'){
            			this.areaArr = [] ;
            			this.areaArr = content;
            		}
            	}
    		})
    	},
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
    	 setOption(type,event){
             if(type === 'proIndex'){
             	this.proIndex = event.target.selectedIndex-1;
                this.cityIndex = 0;
                this.areaIndex = 0;
                this.ruleForm.city = '';
	    		this.ruleForm.district= '';
	    		this.getLinkage('city',this.proArr[this.proIndex].zone_id);
            }
            if(type === 'cityIndex'){
            	this.cityIndex = event.target.selectedIndex-1;
                this.areaIndex = 0;
                this.ruleForm.district= '';
                this.getLinkage('area',this.cityArr[this.cityIndex].zone_id);
            }
            if(type === 'areaIndex'){
            	this.areaIndex = event.target.selectedIndex -1;
            }
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	oauth: 'Web',
            	phone: this.ruleForm.phone,
            	verify_code: this.ruleForm.verify_code,
            	passwd: hex_md5(hex_sha1(this.ruleForm.passwd)),
            	confirm_passwd: hex_md5(hex_sha1(this.ruleForm.confirm_passwd)),
            	email: this.ruleForm.email
            };
            // 获取推荐人信息
            if(this.complete) {
            	this.recommend = {
            		userid: this.ruleForm.userid,
					tuijian: '',
					anzhi: '',
					name: this.ruleForm.name,
					petname: this.ruleForm.petname, 
					loginpass: '',
					birthday: this.transDate(this.ruleForm.birthday),
					sex: this.ruleForm.sex -0, 
					mobiletele: this.ruleForm.mobiletele,
					country: '中国',
					province: this.proArr[this.proIndex].name,
					city: this.cityArr[this.cityIndex].name,
					xian: this.areaArr[this.areaIndex].name,
					address: this.ruleForm.address,
					papernumber: this.ruleForm.papernumber
            	};
            	params.recommend = this.recommend ;
            }
            reg(params).then(res=>{
            	let {errcode,message} = res ;
            	if (errcode !== 0 ) {
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定'
				    });
            	} else {
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
    },
    created(){
        this.$nextTick(()=>{
            this.getLinkage('pro');
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
    .indent{
    	text-indent: 15px;
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
	.regBtn{
		width:500px;
		margin:50px auto;
		padding-left:156px;
		.hasAccount{
			margin-left: 10px;
			a{
				color: $primary;
			}
		}
	}
</style>