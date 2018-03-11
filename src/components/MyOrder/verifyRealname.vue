<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip1")'>实名认证</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"  label-position='right'  v-if="vertifyState==='0'">
		    <el-form-item label="真实姓名" prop="name">
		        <el-input v-model="ruleForm.name" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="身份证号" prop="card">
		        <el-input v-model="ruleForm.card" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="银行卡号" prop="bank_card">
		        <el-input v-model="ruleForm.bank_card" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="开户支行" prop="branch">
		        <el-input v-model="ruleForm.branch" size='small'></el-input>
		    </el-form-item>
		    <el-form-item label="身份证人像面" prop="front_image">
		        <el-upload
					action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :on-success="idCardSuccess1"
					:before-upload='beforeUpload'
					:data='form1'
					:show-file-list="false"
					ref='idCard1'>
			    	<div>
						<img :src="front_image?front_image:' ../../../static/centerImg/addPic.png'" style='width:200px;height:120px;'>
						<span class="color-6" style="font-size: 12px">(2MB以内)</span>
					</div>
				</el-upload>
		    </el-form-item>
		    <el-form-item label="身份证国徽面" prop="behind_image">
		       <el-upload
					action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :on-success="idCardSuccess2"
					:before-upload="beforeUpload"
					:data='form2'
					:show-file-list="false"
					ref='idCard2'>
			    	<div>
						<img :src="behind_image?behind_image:' ../../../static/centerImg/addPic.png'" style='width:200px;height:120px;'>
						<span class="color-6" style="font-size: 12px">(2MB以内)</span>
					</div>
				</el-upload>
		    </el-form-item>
			<el-row>
				<el-col :span='16' :offset='8'>
					<el-button type="primary" @click="submitForm('ruleForm')" style='width:120px;'>提交认证</el-button>
				</el-col>
			</el-row>	  
		</el-form>
		<div v-else>
			<dl class='vertify-state'>
				<dt>
					<img :src="vertifyState==='1'?'../../../static/centerImg/vertifyWait.png':'../../../static/centerImg/vertifyComplete.png'">
				</dt>
				<dd class="color-3">
					{{vertifyState==='1'?'您已提交实名认证，请等待审核' :'您已经实名认证，可以购买实名商品'}}
				</dd>
			</dl>
		</div>
	</div>
</template>
<script >
import {verifyRealname,verifyRealnameState} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
	export default{
		data(){
		    var checkIdCard1 = (rule,value,callback) => {
		     	if (this.ruleForm.front_image == "") {
		     		callback(new Error('请上传身份证正面照'));
		     	}else {
		     		callback();
		     	} 
		     };
		     var checkIdCard2 = (rule,value,callback) => {
		     	if (this.ruleForm.behind_image == "") {
		     		callback(new Error('请上传身份证背面照'));
		     	}else {
		     		callback();
		     	} 
		     };
			return{
				vertifyState: '',
				ruleForm: {
		           	name: '',
					card: '',
					bank_card: '',
					branch: '',
					front_image: '',
		        	behind_image: ''
		        },
		        front_image: '',
		        behind_image: '',
		        rules: {
		        	name: [
			            { required: true, message: '请输入真实姓名', trigger: 'blur' }
			        ],
			        card: [
			            { required: true, message: '请输入身份证号', trigger: 'blur' }
			        ],
			        bank_card: [
			            { required: true, message: '请输入银行卡号', trigger: 'blur' }
			        ],
			       	branch: [
			            { required: true, message: '请输入开户支行', trigger: 'blur' }
			        ],
			        front_image: [
			        	{ required: true, validator: checkIdCard1, trigger: 'blur' }
			        ],
			        behind_image: [
			        	{ required: true, validator: checkIdCard2, trigger: 'blur' }
			        ]
		        },
		        form1: {
			    	cate : 'idCard1', 
			    	access_token: getCookie('access_token')
			    },
		        form2: {
			    	cate : 'idCard2', 
			    	access_token: getCookie('access_token')
			    }
			}
		},
		methods:{
			getVertifyState(){
	 			let params = {
	 				access_token: getCookie('access_token')
	 			}
	 			verifyRealnameState(params).then(res=>{
	        		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.vertifyState=content;
					}
	        	})
	 		},
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 location.hash = view ;
		    },
	    	beforeUpload (file) {
	      	    const isJPG = file.type === 'image/jpeg'||'image.png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		            Message.error('上传头像图片只能是 JPG / PNG格式!');
		        }
		        if (!isLt2M) {
		            Message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
	    	},
	    	idCardSuccess1 (res) {
		    	this.front_image = res.content.url;
		    	this.ruleForm.front_image = res.content.name ;
	    	},
	    	idCardSuccess2 (res) {
		    	this.behind_image = res.content.url;
		    	this.ruleForm.behind_image = res.content.name ;
	    	},
		    submitForm(formName) {
	    		this.$refs[formName].validate((valid) => {
		            if (valid) {
		                let {...params} = this.ruleForm;
		                params.access_token = getCookie('access_token');
			            verifyRealname(params).then(res=>{
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
	    	}
		},
		created(){
			this.$nextTick(()=>{
				this.getVertifyState();
			});
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		margin-left: 10px;
		h4{
			line-height: 40px;
			font-weight: 400;
			margin-bottom: 54px;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
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
	.vertify-state{
		margin-top: 120px;
		text-align: center;
		dt,dd{
			display: inline-block;
		}
		dt{
			width: 200px;
			height: 200px;
		}
		dd{
			font-size: 14px;
			margin-top: 18px;
		}
	}
</style>