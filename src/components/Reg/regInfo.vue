<template>
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
			  <el-form-item label="绑定邮箱" prop="email" style='margin-bottom:40px;'>
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<el-checkbox v-model='complete'>完善信息加入推荐人，没有可忽略</el-checkbox>
			  </el-form-item>
		</div>
		<div class="referees_box" v-show='complete'>
	  		<div class="title">推荐人会员号</div>
	  		<el-form-item label="推荐编号" prop="num">
			    <el-input v-model="ruleForm.num"></el-input>
			</el-form-item>
			<el-form-item label="安置编号" >
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
				      style='width:100%'>
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
		                      v-for="(item,index) in cityArr"
		                      :label="item.name"
		                      :value="index" :key='index'>
		                    </option>
		                 </select>
					</el-col>
					<el-col style='margin-left: 8px;'>
						<select v-model="ruleForm.city" @change='setOption("cityIndex",$event)'>
						<option value='' disabled selected style='display:none;'>市</option>
		                    <option
		                      v-for="(item2,index2) in cityArr[proIndex].sub"
		                      :label="item2.name"
		                      :value="index2" :key='index2'>
		                    </option>
		                 </select>
					</el-col>
					<el-col style='margin-left: 8px;'>
						<select v-model="ruleForm.xian" >
						<option value='' disabled selected style='display:none;'>区</option>
		                    <option
		                      v-for="(item3,index3) in cityArr[proIndex].sub[cityIndex].sub"
		                      :label="item3.name"
		                      :value="index3" :key='index3'>
		                    </option>
		                 </select>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="详细地址">
			    <el-input v-model="ruleForm.address"></el-input>
			</el-form-item>
		</div>
		<div style="width:500px;margin:50px auto;text-align:center;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;'>注册</el-button>
		</div>	  
	</el-form>
</template>
<script>
import { arrCity } from '../../common/js/city.js'
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
	     // 地区选择
	     var checkArea = (rule,value,callback) => {
	     	if (this.ruleForm.province === "") {
	     		callback(new Error('请选择省份或直辖市'));
	     	} else if (this.ruleForm.city === '') {
	     		callback(new Error('请选择地级市或地区'));
	     	} else {
	     		if (this.cityArr[this.proIndex].sub[this.cityIndex].sub) {
	     			if (this.ruleForm.xian === "") {
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
            confirm_passwd: "",
            email: '',
            papernumber: '',
	        num: '',
	        anzhinum: '',
	        name: '',
	        sex: '1',
	        birthday: '',
	        petname: '',
	        papernumber: '',
	        mobiletele: '',
	        province: '',
	        city: '',
	        xian: '',
	        address: ''
        },
        rules: {
          phone: [
            { required:true, validator: checkPhone, trigger: 'blur' }
          ],
          vertify_code: [
            { required: true, validator: checkCode, trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请设置密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          confirm_passwd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入推荐编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请输入出生日期', trigger: 'blur' }
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
    	setOption(type,event){
             if(type === 'proIndex'){
             	this.proIndex = event.target.selectedIndex -1;
                this.cityIndex = 0;
                this.areaIndex = 0;
            }
            if(type === 'cityIndex'){
            	this.cityIndex = event.target.selectedIndex -1;
                this.areaIndex = 0;
            }
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
    },
    created(){
        this.$nextTick(()=>{
            this.cityArr = arrCity;
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