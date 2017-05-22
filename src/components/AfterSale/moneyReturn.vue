<template>
	<div class="wrap">	
		<div class="title">
			您已选择：申请退款
		</div>
		<el-form :model="form" label-width="74px" label-position='right'>
	        <el-form-item label="退款原因" prop='reason'>
		        <el-input v-model="form.reason" style='width:200px;'></el-input>
		    </el-form-item>
		    <el-form-item label="退款金额" prop='account'>
		        <el-input v-model="form.account" style='width:200px;'></el-input>
		        <span>最多{{179.00|currency}}</span>
		    </el-form-item>
		    <el-form-item label="退款说明">
		        <el-input v-model="form.explain" type='textarea'></el-input>
		    </el-form-item>
		    <el-form-item label="长传凭证">
		        <el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="fileList2"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		    </el-form-item>
		</el-form>
		<div class="submitBtn">
			 <el-button type="primary" @click="submitForm('form')" size='small'>提交申请</el-button>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
export default {
	data() {
		return {
			form: {
				reason: '',
				account: '',
				explain: ''
			},
			 rules: {
	          reason: [
	            { required: true, message: '请填写退款原因', trigger: 'blur' }
	          ],
	          account: [
	            { required: true, message: '请填写退款金额', trigger: 'blur' }
	          ]
	        },
	        fileList2: [
	        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
	        ]
		}
	},
	filters: {
		currency
	},
	methods:{
		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
	    handleRemove(file, fileList) {
	        console.log(file, fileList);
	    },
	    handlePreview(file) {
	        console.log(file);
	    }
	}
}
	
</script>
<style lang='scss' scoped>
$text_color: #666;
	.wrap{
		.title{
			font-size: 16px;
			font-weight: 600;
		}
		.el-form{
			width: 426px;
			margin-left: 80px;
			margin-top: 40px;
			.el-form-item{
				margin-bottom: 14px;
				span{
					color: $text_color;
				}
			}
		}
		.submitBtn{
			margin-left: 154px;
			.el-button{
				width: 100px;
			}
		}
	}
</style>