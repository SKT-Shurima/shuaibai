<template>
	<div class="wrap">
		<h4 class="title">商家入驻</h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"  label-position='right'>
			<div class="color-primary add-info">公司信息</div>
		    <el-form-item label="合伙人编号">
		      	<el-input v-model="ruleForm.num" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="公司名称" prop="companyName">
		        <el-input v-model="ruleForm.companyName" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="所在地区" prop='area'>
					<el-row class="area">
						<el-col >
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
		    <el-form-item label="公司详细地址" prop="address">
		        <el-input v-model="ruleForm.address" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="公司电话" prop="companyTel">
		        <el-input v-model="ruleForm.companyTel" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="营业执照" prop="companyTel">
		        <el-upload
					class="upload-demo"
					action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :on-success="licenseSuccess"
				    :before-upload='licenseBeforeUpload'
					:file-list="licenseList"
					:on-remove="licenseRemove"
					:data='licenseForm'
					list-type="picture"
					ref='license'>
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row>
		    	<el-col :span='8' style='line-height:230px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="../../../static/centerImg/licence.png" width="160" height="230"></el-col>
		    </el-row>
		    <div class="color-primary add-info">
				联系信息
			</div>
			<el-form-item label="姓名" prop='contactName'>
		      	<el-input v-model="ruleForm.contactName" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="联系电话" prop="contactTel">
		        <el-input v-model="ruleForm.contactTel" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="QQ或微信">
		      	<el-input v-model="ruleForm.contactType" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="店铺名称" prop="storeName">
		        <el-input v-model="ruleForm.storeName" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="身份证国徽面" prop="companyTel">
		        <el-upload
					class="upload-demo"
					action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :on-success="idCardSuccess1"
					:before-upload='idCardBeforeUpload1'
					:file-list="fileList1"
					:on-remove="idCardRemove1"
					:data='form1'
					list-type="picture"
					ref='idCard1'>
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row style="margin-bottom:20px;">
		    	<el-col :span='8' style='line-height:102px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="../../../static/centerImg/idCard1.png" width="160" height="102"></el-col>
		    </el-row>
		    <el-form-item label="身份证个人面" prop="companyTel">
		       <el-upload
					class="upload-demo"
					action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :on-success="idCardSuccess2"
					:before-upload='idCardBeforeUpload2'
					:file-list="fileList2"
					:on-remove="idCardRemove2"
					:data='form2'
					list-type="picture"
					ref='idCard2'>
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row>
		    	<el-col :span='8' style='line-height:102px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="../../../static/centerImg/idCard2.png" width="160" height="102"></el-col>
		    </el-row>
		    <el-form-item style='padding-top: 30px;'>
		  	    <el-checkbox v-model='complete'>我已阅读并同意<a :href="url" target="_blank" style="color:#0058b2;">《帅柏商城商家入驻协议》</a></el-checkbox>
		    </el-form-item>
			<el-row>
				<el-col :span='16' :offset='8'>
					<el-button type="primary" @click="submitForm('ruleForm')" style='width:120px;'>提交申请</el-button>
				</el-col>
			</el-row>	  
		</el-form>
	</div>
</template>
<script >
import {shopJoin,linkage,commission} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
	export default{
		data(){
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
		     // 营业执照
		     var checkLicense = (rule,value,callback) => {
		     	if (this.licenseList[0].name === "") {
		     		callback(new Error('请上传营业执照'));
		     	}else {
		     		callback();
		     	} 
		     };
		     var checkIdCard1 = (rule,value,callback) => {
		     	if (this.fileList1[0].name === "") {
		     		callback(new Error('请上传身份证背面照'));
		     	}else {
		     		callback();
		     	} 
		     };
		      var checkIdCard2 = (rule,value,callback) => {
		     	if (this.fileList2[0].name === "") {
		     		callback(new Error('请上传身份证正面照'));
		     	}else {
		     		callback();
		     	} 
		     };
			return{
				haveRead: true,
				proIndex: 0,
		        cityIndex: 0,
		        areaIndex: 0,
		      	proArr: [],
		      	cityArr: [],
		      	areaArr: [],
		      	addressList: null,
		      	complete: true,
				ruleForm: {
		            num: '',
		            companyName: '',
		            province: '',
			        city: '',
			        district: '',
		            address: '',
		            companyTel: "",
		            license: '',
		            contactName: '',
			        contactTel: '',
			        contactType: '',
			        storeName: '',
			        IdCardFrontage: '',
			        IdCardBack: ''
		        },
		        rules: {
		        	companyName: [
			            { required: true, message: '请输入公司名称', trigger: 'blur' }
			        ],
			        area: [
			            { required: true, validator: checkArea, trigger: 'blur' }
			        ],
			        address: [
			        	{ required: true, message: '请输入公司地址', trigger: 'blur' }
			        ],
			        companyTel: [
			        	{ required: true, message: '请输入公司电话', trigger: 'blur' }
			        ],
			        license: [
			        	{ required: true, validator: checkLicense, trigger: 'blur' }
			        ],
			        contactName: [
			        	{ required: true, message: '请输入联系人姓名', trigger: 'blur' }
			        ],
			        contactTel: [
			        	{ required: true, message: '请输入联系电话', trigger: 'blur' }
			        ],
			        storeName: [
			        	{ required: true, message: '请输入店铺名称', trigger: 'blur' }
			        ],
			        IdCardFrontage: [
			        	{ required: true, validator: checkIdCard1, trigger: 'blur' }
			        ],
			        IdCardBack: [
			        	{ required: true, validator: checkIdCard1, trigger: 'blur' }
			        ]
		        },
		        licenseForm: {
			    	cate : 'license', 
			    	access_token: getCookie('access_token')
			    },
		        licenseList: [],
		         form1: {
			    	cate : 'idCard1', 
			    	access_token: getCookie('access_token')
			    },
		         fileList1: [],
		         form2: {
			    	cate : 'idCard2', 
			    	access_token: getCookie('access_token')
			    },
		         fileList2: [],
		         url: ""
			}
		},
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 location.hash = view ;
		    },
			licenseBeforeUpload(){
				let len = this.$refs.license.uploadFiles.length;
				if (len>1) {
		    		this.$refs.license.uploadFiles.splice(0,1);
		    	}
			},
			licenseRemove(file, fileList) {
		        this.licenseList = new Array ;
		    },
			licenseSuccess (res, file, fileList) {
	    		this.licenseList[0] = new Object ;
		    	// 获取图片的name
		    	this.licenseList[0].name = res.content.name;
		    	// 获取图片url
		    	this.licenseList[0].url = res.content.url;
		    	// 获取图片size
		    	this.licenseList[0].url = res.content.size; 
	    	},
	    	idCardBeforeUpload1(){
				let len = this.$refs.idCard1.uploadFiles.length;
				if (len>1) {
		    		this.$refs.idCard1.uploadFiles.splice(0,1);
		    	}
			},
			idCardRemove1(file, fileList) {
		        this.fileList1 = new Array ;
		    },
	    	idCardSuccess1 (res, file, fileList) {
		    	this.fileList1[0] = new Object ;
		    	// 获取图片的name
		    	this.fileList1[0].name = res.content.name;
		    	// 获取图片url
		    	this.fileList1[0].url = res.content.url;
	    	},
	    	idCardBeforeUpload2(){
				let len = this.$refs.idCard2.uploadFiles.length;
				if (len>1) {
		    		this.$refs.idCard2.uploadFiles.splice(0,1);
		    	}
			},
			idCardRemove2(file, fileList) {
		        this.fileList2 = new Array ;
		    },
	    	idCardSuccess2 (res, file, fileList) {
		    	this.fileList2[0] = new Object ;
		    	// 获取图片的name
		    	this.fileList2[0].name = res.content.name;
		    	// 获取图片url
		    	this.fileList2[0].url = res.content.url;
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
		    submitForm(formName) {
		    	if (this.complete) {
		    		this.$refs[formName].validate((valid) => {
			            if (valid) {
			                let params = {
								access_token: getCookie('access_token'),
								company: this.ruleForm.companyName,
								province: this.proArr[this.proIndex].name,
				            	city: this.cityArr[this.cityIndex].name,
				            	district: this.areaArr[this.areaIndex].name,
								address: this.ruleForm.address,
								licence: this.licenseList.length?this.licenseList[0].name:"",
								name: this.ruleForm.contactName,	
								phone: this.ruleForm.contactTel,	
								shop_name: this.ruleForm.storeName,
								wx_qq: this.contactType,	
								card_f: this.fileList1.length?this.fileList1[0].name:"",	
								card_b: this.fileList2.length?this.fileList2[0].name:""
				            }
				            shopJoin(params).then(res=>{
				            	let {errcode,message,content} = res ;
				            	if (errcode !== 0 ) {
				            		errorInfo(errcode,message) ;
				            	} else {
				            		Message.success({
							            message: '添加成功',
							            type: 'success'
							        });
							        setTimeout(()=>{
							        	window.location.reload();
							        },3000);
			            		}
				            })
			            } else {
				            console.log('error submit!!');
				            return false;
			            }
			        });
		    	}else {
		    		MessageBox.alert('请阅读并同意《帅柏商城商家入驻协议》', '提示', {
			          	confirmButtonText: '确定'
				    });
		    	}
		    }
		},
		created(){
			this.$nextTick(()=>{
				this.$emit('hasGuess',false);
				let params = {
					access_token: getCookie('access_token')
				}
				commission(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						if (content.errcode=== -100) {
							this.url = content.url ;
						}
						if (content.errcode=== -101) {
							this.changeView("vip800?status=101");
						}
						if (content.errcode=== -102) {
							this.changeView("vip800?status=102");
						}
						if (content.errcode===-103) {
							this.changeView("vip800?status=103");
						}
					}
				})
				this.getLinkage('pro');
			})
			
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1080px;
	}
	.title{
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		margin-bottom: 30px;
		border-bottom: 1px solid #ccc;
	}
	.add-info{
		height: 58px;
		line-height: 58px;
		font-weight: 600;
		font-size: 14px;
	}
	.el-form{
		width: 420px;
		.el-row{
			width: 300px;
		}
		.el-col-8{
			padding-right: 12px;
			color: #666;
			text-align: right;
		}
	}
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
</style>