<template>
	<div class="wrap">	
		<div class="title">
			您已选择：申请换货或维修
		</div>
		<el-form :model="form" label-width="90px" label-position='right' :rules='rules' ref='form' v-if='orderInfo.goods'>
	        <el-form-item label="售后原因" prop='reason'>
		        <el-input v-model="form.reason" style='width:200px;'></el-input>
		    </el-form-item>
		    <el-form-item label="售后说明" >
		        <el-input v-model="form.explain" type='textarea'></el-input>
		    </el-form-item>
		    <el-form-item label="上传凭证" prop='license'>
				<el-upload
				    action="http://shuaibo.zertone1.com/app/uploadAction/upload_mul_image"
				    :on-success='uploadSuccess'
				    :before-upload="beforeUpload"
				    :data="data"
				    list-type="picture"
				    :on-remove="handleRemove"
				    multiple>
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
import {getHashReq,errorInfo} from '../../common/js/common'
import {currency} from '../../common/js/filter'
import {refund} from '../../common/js/api'
import {MessageBox} from  'element-ui'
export default {
	data() {
		return {
			form:{
				reason: '',
				explain: '',
				license: 'license'
			},
			rules: {
	          reason: [
	            { required: true, message: '请填写售后原因', trigger: 'blur' }
	          ],
	          license: [
	          	{ required: true }
	          ]
	        },
	        data: {
	        	access_token: sessionStorage.access_token,
	        	cate: 'credentials'
	        },
	        fileList: [],
	        reqParams: null
		}
	},
	props:{
		orderInfo:{
			type: Object,
			required: true,
			default(){
				return {
					goods: null
				}
			}
		}
	},
	filters: {
		currency
	},
	methods:{
		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	let images = '';
	          	for(let i = 0;i<this.fileList.length ; i++){
	          		images += this.fileList[i].name + ',' ; 
	          	}
	          	if (images==='') {
	          		MessageBox.alert('请上传凭证', '提示', {
			          	confirmButtonText: '确定'
				    });
				    return;
	          	}
	          	images = images.slice(0,images.length-1);
	            let params = {
	            	access_token: sessionStorage.access_token, 
					order_sn: this.reqParams.order_sn,
					goods_id: this.orderInfo.goods.goods_id,
					option_id: this.orderInfo.goods.option_id,
					money: this.form.account + '' ,
					reason: this.form.reason,
					content: this.form.explain,
					images: images, 
					type: "3"
	            }
	            refund(params).then(res=>{
	            	let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
					            location.href= 'index.html'
					        }    
						});	   
					}
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
	    uploadSuccess(res,file,files){
	    	let {errcode,message,content} = res ;
			if(errcode!==0) {
				errorInfo(errcode,message) ;
			}else{
				let obj = {
		    		name: content[0].name,
		    		size: content[0].size,
		    		url: content[0].url	
	    		}
	    		this.fileList.push(obj);		   
			}
	    },
	    handleRemove(file, fileList) {
	        let _this = this ;
	        let size = file.size;
	        let list = _this.fileList;
	        for(let i= 0;i<list.length;i++){
	        	if (list[i].size === size) {
	        		_this.fileList.splice(i,1);
	        		return 
	        	}
	        	
	        }
	    },
	    handlePreview(file) {
	        console.log(file);
	    }
	},
	mounted(){
		this.$nextTick(()=>{
			let hash = location.hash.split("?")[0] ;
	      	let view = hash.slice(1) ;
		    this.reqParams = getHashReq();
		})
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
				margin-bottom: 20px;
				span{
					margin-left: 20px;
					color: $text_color;
				}
			}
		}
		.submitBtn{
			margin-left: 170px;
			.el-button{
				width: 100px;
			}
		}
	}
</style>