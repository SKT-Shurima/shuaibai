<template>
	<div class="wrap">	
		<div class="title">
			您已选择：修改退货申请
		</div>
		<el-form :model="form" label-width="90px" label-position='right' :rules='rules' ref='form' v-if='orderInfo.goods'>
	        <el-form-item label="退货原因" prop='reason'>
		        <el-input v-model="form.reason" style='width:200px;'></el-input>
		    </el-form-item>
		    <el-form-item label="退货金额" prop='account'>
		    	<el-input v-model="form.account" style='width:200px;'></el-input>
		        <span class="color-6">最多{{orderInfo.goods.price|currency}}</span>
		    </el-form-item>
		    <el-form-item label="退货说明" >
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
		<div class="submit-btn">
			 <el-button type="primary" @click="submitForm('form')" size='small'>提交申请</el-button>
		</div>
	</div>
</template>
<script>
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {currency} from '../../common/js/filter'
import {changeRefund,supportDetail} from '../../common/js/api'
import {MessageBox} from  'element-ui'
export default {
	data() {
		var checkAccount = (rule,value,callback) => {
	     	if (this.form.account-0 > this.orderInfo.goods.price-0) {
	     		callback(new Error('超出最大退货金额'));
	     	}else if(this.form.account===''){
	     		callback(new Error('请输入退货金额'));
	     	}else{
	     		callback();
	     	} 
	     };
		return {
			form:{
				reason: '',
				account: "",
				explain: '',
				license: 'license'
			},
			rules: {
	          reason: [
	            { required: true, message: '请填写退货原因', trigger: 'blur' }
	          ],
	          account: [
	            { required: true, validator: checkAccount, trigger: 'blur' }
	          ],
	          license: [
	          	{ required: true }
	          ]
	        },
	        data: {
	        	access_token: getCookie('access_token'),
	        	cate: 'editsGoodsReturnImgs'
	        },
	        fileList: [],
	        reqParams: null,
	        orderInfo:{goods:null},
	        refundInfo: null
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
	            	access_token: getCookie('access_token'), 
					refund_sn: this.reqParams.refund_sn,
					money: this.form.account + '' ,
					reason: this.form.reason,
					content: this.form.explain,
					images: images, 
					type: "2"
	            }
	            changeRefund(params).then(res=>{
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
	        let size = file.size;
	        let list = this.fileList;
	        for(let i= 0;i<list.length;i++){
	        	if (list[i].size === size) {
	        		this.fileList.splice(i,1);
	        		return ;
	        	}
	        }
	    },
	    handlePreview(file) {
	        console.log(file);
	    },
	    init(){
	    	let params = {
		    	access_token: getCookie('access_token'),
		    	refund_sn: this.reqParams.refund_sn
		    }
		    supportDetail(params).then(res=>{
		    	let {errcode,message,content} = res ;
				if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					this.orderInfo.goods = content.goods;
					this.refundInfo = content ;
				}
		    })
	    }
	},
	mounted(){
		this.$nextTick(()=>{
			let hash = location.hash.split("?")[0] ;
	      	let view = hash.slice(1) ;
		    this.reqParams = getHashReq();
		    this.init(); 
		})
	} 
}
	
</script>
<style lang='scss' scoped>
	.wrap{
		.title{
			font-size: 16px;
			font-weight: 600;
		}
		.el-form{
			width: 426px;
			margin-left: 80px;
			margin-top: 40px;
		}
		.el-form-item{
			margin-bottom: 20px;
			span{
				margin-left: 20px;
				color: #666;
			}
		}
		.submit-btn{
			margin-left: 170px;
			.el-button{
				width: 100px;
			}
		}
	}
</style>