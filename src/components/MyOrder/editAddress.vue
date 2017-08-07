<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view100")'>我的收货地址</span>&nbsp;<i>&gt;</i>&nbsp;<span>修改收货地址</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='right'>
			<div class="reg_box">
				<div class="title">新增收货地址</div>
				<el-form-item label="所在地区" prop='area'>
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
						<el-col style='margin-left: 14px;'>
							<select v-model="ruleForm.city" @change='setOption("cityIndex",$event)'>
							<option value='' disabled selected style='display:none;'>市</option>
			                    <option
			                      v-for="(item2,index2) in cityArr"
			                      :label="item2.name"
			                      :value="index2" :key='index2'>
			                    </option>
			                 </select>
						</el-col>
						<el-col style='margin-left: 14px;'>
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
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.province!==""&&ruleForm.city!==""&&ruleForm.address&&ruleForm.name&&ruleForm.phone)' >保存</el-button>
			</div>	  
		</el-form>
		<div class="addressList" v-if='addressList'>
			<div class="title" style="margin-bottom:20px;">
				已经保存了{{addressList.length}}条地址，还可以保存{{20-addressList.length}}条地址
			</div>
			<ul v-if='addressList'>
				<li v-for= '(item,index) in addressList' :class='{"isDefault":item.status==="1"}' :key='item'>
					<dl>
						<dt>
							<span v-text='item.name'>
							</span>
							<strong v-text='item.phone'>
							</strong>
							<em v-show='item.status==="1"'>
								默认地址
							</em>
						</dt>
						<dd class="addressInfo">
						    {{item.province===item.city?item.province:item.province+item.city}}{{item.district}}{{item.address}}
						</dd>
						<dd>
							<em>
								邮编：{{item.postcode}}
							</em>
							<strong>
								电话：{{item.phone}}
							</strong>
							<span class="edit">
								<el-button type='text' size='mini'>
									修改
								</el-button>
								<i style='color:#ccc;'>|</i>
								<el-button type='text' size='mini' @click='removeAddress(item.address_id)'>
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
import {getOneAddress,saveAddress,defaultAddress,linkage} from '../../common/js/api'
import {errorInfo,getHashReq,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {MessageBox,Message} from  'element-ui'
  export default {
    data() {
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
      	reqParams: null,
      	userInfo: '',
      	setDefault: true,
      	proIndex: 0,
        cityIndex: 0,
        areaIndex: 0,
      	proArr: [],
      	cityArr: [],
      	areaArr: [],
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
        total_time: 60, 
        send_btn: '发送验证码'
      };
    },
    mixins: [userInfo],
    methods: {
    	getOneAddressAPI(){
    		let _this =  this ;
    		let params = {
    			access_token: getCookie('access_token'),
    			address_id: _this.reqParams.address_id
    		}
    		getOneAddress(params).then(res=>{
    			let {errcode,message,content} = res ;
	      		if (errcode !== 0) {
	      		   errorInfo(errcode,message) ;
	      		} else {
	      			// 格式省市区
	      			this.initLevel(content);
	        		this.ruleForm.name = content.name;
	        		this.ruleForm.phone= content.phone;
	        		this.ruleForm.address= content.address;
	        		this.ruleForm.postcode = content.postcode;
	        	    this.ruleForm.tel = content.tel;
	        	    this.setDefault = content.status==='1' ;
	      		}
    		})
    	},
    	initLevel(content){
    		let _this = this ;
    		let proArr = _this.proArr ;
    		for(let i = 0 ; i<proArr.length;i++ ){
    			if (proArr[i].name===content.province) {
    				_this.ruleForm.province = i ;
    				let proParams = {
		    			pid: proArr[i].zone_id
		    		}
		    		linkage(proParams).then(proRes=>{
		    			let  proErrcode = proRes.errcode ;
		    			let  proMsg =  proRes.message ;
		    			let  proCon = proRes.content ;
		            	if (proErrcode !== 0 ) {
		            		errorInfo(proErrcode,proMsg) ;
		            	} else {
		            		_this.cityArr = proCon ;
		            		let cityArr = _this.cityArr ;
		    				for(let j = 0 ;j<cityArr.length;j++){
		    					if (cityArr[j].name===content.city) {
		    						_this.ruleForm.city = j ;
		    						let cityParams = {
						    			pid: cityArr[j].zone_id
						    		}
						    		linkage(cityParams).then(cityRes=>{
						    			let  cityErrcode = cityRes.errcode ;
						    			let  cityMsg =  cityRes.message ;
						    			let  cityCon = cityRes.content ;
						            	if (cityErrcode !== 0 ) {
						            		errorInfo(cityErrcode,cityMsg) ;
						            	} else {
						            		_this.areaArr = cityCon ;
						            		let districtArr = _this.areaArr ;
						    				for(let k = 0 ;k<districtArr.length;k++){
						    					if (districtArr[k].name===content.district) {
						    						_this.ruleForm.district = k ;
						    					}
						    				}
						            	}
						    		})
		    					}
		    				}
		            	}
		    		})
    			}
    		}
    	},
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
      		let params = {
	      		param: _this.ruleForm.phone,
	      		type: '8'
	      	};
	      	sendCode(params).then( res=>{
	      		let {errcode,message} = res ;
	      		if (errcode !== 0) {
	      		   errorInfo(errcode,message) ;
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
	            	access_token: getCookie('access_token') ,
	            	address_id: this.reqParams.address_id,
	            	province: this.proArr[this.proIndex].name,
	            	city: this.cityArr[this.cityIndex].name,
	            	district: this.areaArr[this.areaIndex].name,
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
	            		errorInfo(errcode,message) ;
	            	} else {
	            		  Message.success({
					          message: '修改地址成功',
					          type: 'success'
					        });
	            		  // 初始化表单信息
	            		  this.getLinkage('pro');
	            		  this.ruleForm.province = '';
	            		  this.ruleForm.city = '';
	            		  this.ruleForm.district = '';
	            		  this.ruleForm.name = '';
	            		  this.ruleForm.phone='';
	            		  this.ruleForm.address='';
	            		  this.ruleForm.postcode ='';
	            	      this.ruleForm.tel ='';

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
    },
    mounted(){
    	this.$nextTick(()=>{
    		let access_token = getCookie('access_token');
        	if (access_token) {
				this.reqParams = getHashReq();
				this.getOneAddressAPI();
			}else{
				location.href = "login.html";
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