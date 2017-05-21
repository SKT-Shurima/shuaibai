<template>
	<div class="wrap">
		<h4 class="title">
			投诉
		</h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"  label-position='right'>
			<div class="addInfo">
				填写投诉信息
			</div>
		    <el-form-item label="合伙人编号">
		      	<el-input v-model="ruleForm.num" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="公司名称" prop="companyName">
		        <el-input v-model="ruleForm.companyName" size='small'></el-input>
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
	export default{
		data(){
			return{
				haveRead: true,
				ruleForm: {
		            num: '',
		            companyName: '',
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
		      }
		},
		mounted(){
			this.$emit('hasGuess',false);
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
				width: 360px;
				margin-bottom: 22px;
				.el-col-8{
					padding-right: 12px;
					color: $text_color;
					text-align: right;
				}
			}
		}
	}
</style>