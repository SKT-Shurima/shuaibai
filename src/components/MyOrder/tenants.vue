<template>
	<div class="wrap">
		<h4 class="title">
			商家入驻
		</h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"  label-position='right'>
			<div class="addInfo">
				公司信息
			</div>
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
					action=""
				    :on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="fileList"
					list-type="picture">
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row>
		    	<el-col :span='8' style='line-height:230px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="" width="160" height="230"></el-col>
		    </el-row>
		    <div class="addInfo">
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
					action=""
				    :on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="fileList"
					list-type="picture">
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row>
		    	<el-col :span='8' style='line-height:102px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="" width="160" height="102"></el-col>
		    </el-row>
		    <el-form-item label="身份证个人面" prop="companyTel">
		        <el-upload
					class="upload-demo"
					action=""
				    :on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="fileList"
					list-type="picture">
			    <el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
		    </el-form-item>
		    <el-row>
		    	<el-col :span='8' style='line-height:102px;'>示例图片</el-col>
		    	<el-col :span='16'><img src="" width="160" height="102"></el-col>
		    </el-row>
		    <el-form-item style='padding-top: 30px;'>
		  	    <el-checkbox v-model='complete'>我已阅读并同意<a href="" style="color:#0058b2;">《帅柏商城商家入驻协议》</a></el-checkbox>
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
import {shopJoin,linkage} from '../../common/js/api'
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
			return{
				haveRead: true,
				proIndex: 0,
		        cityIndex: 0,
		        areaIndex: 0,
		      	proArr: [],
		      	cityArr: [],
		      	areaArr: [],
		      	addressList: null,
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
			        	{ required: true, message: '选择营业执照文件', trigger: 'blur' }
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
			        	{ required: true, message: '请上传身份证个人面', trigger: 'blur' }
			        ],
			        IdCardBack: [
			        	{ required: true, message: '请上传身份证国徽面', trigger: 'blur' }
			        ]
		        },
		        fileList: [
		        {name: 'food.jpeg', 
		         url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		methods:{
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
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
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		             let params = {
						access_token: sessionStorage.access_token,
						company: _this.ruleForm.companyName,
						province: "",
						city: "",
						district: "",
						address: "",
						licence: "",
						name: "",	
						phone: "",	
						shop_nam: "",
						wx_qq: "",	
						card_f:"",	
						card_b: ""
		             }
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
		},
		created(){
			this.$nextTick(()=>{
				this.$emit('hasGuess',false);
				this.getLinkage('pro');
			})
			
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
$bg_color: #e84848;
	.wrap{
		width: 1080px;
		.title{
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-bottom: 30px;
			border-bottom: 1px solid $border_color;
		}
		.addInfo{
			height: 58px;
			line-height: 58px;
			font-weight: 600;
			font-size: 14px;
			color: $primary;
		}
		.el-form{
			width: 420px;
			.el-row{
				width: 300px;
				.el-col-8{
					padding-right: 12px;
					color: $text_color;
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
		}
	}
</style>