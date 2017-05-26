<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view100")'>我的收货地址</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='right'>
			<div class="reg_box">
				<div class="title">新增收货地址</div>
				<el-form-item label="所在地区" prop='area'>
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
						<el-col style='margin-left: 14px;'>
							<select v-model="ruleForm.city" @change='setOption("cityIndex",$event)'>
							<option value='' disabled selected style='display:none;'>市</option>
			                    <option
			                      v-for="(item2,index2) in cityArr[proIndex].sub"
			                      :label="item2.name"
			                      :value="index2" :key='index2'>
			                    </option>
			                 </select>
						</el-col>
						<el-col style='margin-left: 14px;'>
							<select v-model="ruleForm.district" @change='setOption("areaIndex",$event)'>
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
				<el-form-item label="详细地址" prop='address'>
				    <el-input v-model="ruleForm.address" type='textarea' :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请您如实填写详细收货地址，如街道、小区名、所在楼层、门派号码等"></el-input>
				</el-form-item>
				<el-form-item label="邮政编码">
				    <el-input v-model="ruleForm.postcode" size='small'></el-input>
				</el-form-item>
				<el-form-item label="收货人姓名" prop='name'>
				    <el-input v-model="ruleForm.name" size='small'></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop='phone'>
				    <el-input v-model="ruleForm.phone" size='small'></el-input>
				</el-form-item>
				<el-form-item label="固定电话">
				    <el-input v-model="ruleForm.tel" size='small'></el-input>
				</el-form-item>
				<el-form-item>
				  	<el-checkbox v-model='setDefault'>设为默认收货地址</el-checkbox>
				</el-form-item>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.province&&ruleForm.city&&ruleForm.address&&ruleForm.name&&ruleForm.phone)'>保存</el-button>
			</div>	  
		</el-form>
		<div class="addressList">
			<div class="title" style="margin-bottom:20px;">
				已经保存了{{addressList.length}}条地址，还可以保存{{20-addressList.length}}条地址
			</div>
			<ul>
				<li v-for= '(item,index) in addressList' :class='{"isDefault":addressList.status==="1"}' :key='item'>
					<dl>
						<dt>
							<span v-text='addressList.name'>
							</span>
							<strong v-text='addressList.phone'>
							</strong>
							<em v-show='addressList.status==="1"'>
								默认地址
							</em>
						</dt>
						<dd class="addressInfo">
							{{addressList.province}}{{addressList.city}}{{addressList.district}}{{addressList.address}}
						</dd>
						<dd>
							<em>
								邮编：{{addressList.postcode}}
							</em>
							<strong>
								电话：{{addressList.phone}}
							</strong>
							<span class="edit">
								<el-button type='text' size='mini'>
									修改
								</el-button>
								<i style='color:#ccc;'>|</i>
								<el-button type='text' size='mini'>
									删除
								</el-button>
							</span>
						</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { arrCity } from '../../common/js/city.js'
import {saveAddress,getAddress,delAddress,defaultAddress} from '../../common/js/api.js'
import {MessageBox} from  'element-ui'
  export default {
    data() {
    	// 地区选择
	     var checkArea = (rule,value,callback) => {
	     	if (this.ruleForm.province === "") {
	     		callback(new Error('请选择省份或直辖市'));
	     	} else if (this.ruleForm.city === '') {
	     		callback(new Error('请选择地级市或地区'));
	     	} else {
	     		if (this.cityArr[this.proIndex].sub[this.cityIndex].sub) {
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
	     // 手机验证
    	 var checkPhone = (rule, value, callback) => {
    	 	if (value === ''){
    	 		callback(new Error('请输入手机号'));
    	 	} else {
    	 		let reg = /^1[3|4|5|7|8][0-9]\d{8}$/ ;
		        if ( !reg.test(value)) {
		          callback(new Error('请输入正确手机号'));
		        } else{
		        	callback();
		        }
    	 	}
	      };
      return {
      	userInfo: '',
      	setDefault: true,
      	proIndex: 0,
        cityIndex: 0,
        areaIndex: 0,
      	cityArr: [{
      		name: '',
      		sub: [{
      			name: '',
      			sub: ''
      		}]
      	}],
       	ruleForm: {
	        province: '',
	        city: '',
	        district: '',
	        name: '',
	        phone: '',
	        address: '',
	        postcode: '',
	        tel: ''
        },
        rules: {
          area: [
            { required: true, validator: checkArea, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' }
          ],
          phone: [
            { required:true, validator: checkPhone, trigger: 'blur' }
          ]
        },
        time: -1 ,
        total_time: 5, 
        send_btn: '发送验证码',
        addressList: {
        	name: '',
        	phone: '',
        	province: '',
        	city: '',
        	district: '',
        	address: '',
        	postcode: '',
        	tel: '',
        	status: '',
        	length: 0
        }
      };
    },
    methods: {
    	send_code(){
	      	let _this = this ;
      		let params = {
	      		param: _this.ruleForm.phone,
	      		type: '8'
	      	};
	      	sendCode(params).then( res=>{
	      		let {errcode,message} = res ;
	      		if (errcode !== 0) {
	      		    if (errcode === 99) {
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
				          		window.location.href = 'login.html';
				          	}
					    });
            		}else{
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定'
					    });
            		}
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
	      	 sessionStorage.currentView = view ;
	    },
	    setOption(type,event){
             if(type === 'proIndex'){
             	this.proIndex = event.target.selectedIndex-1;
                this.cityIndex = 0;
                this.areaIndex = 0;
                this.ruleForm.city = '';
	    		this.ruleForm.district= '';
            }
            if(type === 'cityIndex'){
            	this.cityIndex = event.target.selectedIndex-1;
                this.areaIndex = 0;
                this.ruleForm.district= '';
            }
            if(type === 'areaIndex'){
            	this.areaIndex = event.target.selectedIndex -1;
            }
        },
      	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	access_token: this.userInfo.access_token,
            	access_id: '',
            	province: this.cityArr[this.proIndex].name,
            	city: this.cityArr[this.proIndex].sub[this.cityIndex].name,
            	district: this.cityArr[this.proIndex].sub[this.cityIndex].sub?this.cityArr[this.proIndex].sub[this.cityIndex].sub[this.areaIndex].name:" ",
            	name: this.ruleForm.name,
            	phone: this.ruleForm.phone,
            	status:this.setDefault?"1":"0",
            	address: this.ruleForm.address,
            	postcode: this.ruleForm.postcode,
            	tel: this.ruleForm.tel
            };
            saveAddress(params).then(res=>{
            	let {errcode,message} = res ;
            	if (errcode !== 0 ) {
            		if (errcode === 99) {
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
				          		window.location.href = 'login.html';
				          	}
					    });
            		}else{
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定'
					    });
            		}
            	} else {
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定',
			          	callback: action => {
				            this.$store.commit('switchView','view10');
				            sessionStorage.currentView = 'view10';
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
      },
      getAddressList(){
      	 let params = {
      	 	access_token: this.userInfo.access_token
      	 };
      	 getAddress(params).then(res=>{
      	 	let {errcode,content} = res;
      	 	if (errcode===0) {
      	 		this.addressList = content;
      	 	}
      	 })
      }
    },
    created(){
        this.$nextTick(()=>{
        	if (sessionStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(sessionStorage.userInfo);
				this.cityArr = arrCity;
				this.getAddressList();
			}else{
				window.location.href = "login.html";
			}
        })
    }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
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
		.title{
			font-size: 14px;
			font-weight: 600;
			line-height: 20px;
			margin-bottom: 10px;
			color: $primary;
		}
		.el-form{
			width: 400px;
			margin-top: 40px;
			.area{
				overflow: hidden;
				padding-top: 4px;
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
					    height: 30px;
					    line-height: 1;
					    outline: none;
					    padding: 3px 10px;
					    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
					    width: 100%;
				    }
				}
			}
			.el-form-item{
				margin-bottom: 16px;
			}
		}
		.addressList{
			ul{
				overflow: hidden;
				li{
					float: left;
					width: 490px;
					padding: 20px;
					margin-right: 14px;
					margin-bottom: 16px;
					border: 1px solid $border_color;
					dl{
						dt{
							font-size: 14px;
							font-weight: 600;
							em{
								float: right;
								color: $primary;
							}
						}
						.addressInfo{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							padding: 10px 0px;
						}
						dd{
							.edit{
								float: right;
								.el-button{
									color: #0049b7;
								}
							}
						}
					}
				}
				.isDefault{
					border: 1px solid $primary;
				}
			}
		}
	}
</style>