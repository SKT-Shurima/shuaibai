<template>
	<div class="wrap">
		<el-row>
			<el-col :span='2' style='line-height:180px;'>头像</el-col>
			<el-col :span='6' :offset="1">
				<el-upload
				  class="avatar-uploader"
				  action="http://shuaibo.zertone1.com/web/userAction/changeAvater"
				  :headers='headers'
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="userInfo.avater" :src="userInfo.avater" class="avatar">
				  <i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='2' style='line-height:30px;'>用户名</el-col>
			<el-col :span='6' :offset="1">
				<el-input v-model='userInfo.nickname' size='small'></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='2' style='line-height:30px;'>出生日期</el-col>
			<el-col :span='6' :offset="1">
				<el-date-picker
			      v-model="userInfo.birthday"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions" size='small' style='width:100%'>
			    </el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='2' style='line-height:20px;'>性别</el-col>
			<el-col :span='6' :offset="1">
				<el-radio class="radio" v-model="radio" label="1">男</el-radio>
	  			<el-radio class="radio" v-model="radio" label="2">女</el-radio>
			</el-col>
		</el-row>
		<el-row style="padding-top: 20px;">
		    <el-col :span='2'>&nbsp;</el-col>
			<el-col :span='6'>
				 <el-button type='primary' size="small" @click='save'>保存</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import {getUserInfo} from '../../common/js/api.js'
 export  default{
 	data(){
 		return{
 			pickerOptions: {
	          disabledDate(time) {
	            return time.getTime() > Date.now();
	          }
	        },
	        userInfo: {
	        	avatar: '',
	        	nickname: '',
	        	birthday: 0,
	        	sex: ''
	        },
 			radio: '',
 			imageUrl: null,
 			headers: {}
 		}
 	},
 	methods:{
 		handleAvatarSuccess(res, file) {
	       this.imageUrl = URL.createObjectURL(file.raw);
	    },
	    beforeAvatarUpload(file) {
	    	this.getToken();
	        const isJPG = file.type === 'image/jpeg'||'image.png';
	        const isLt2M = file.size / 1024 / 1024 < 2;
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG / PNG格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
	    },
	    save(){

	    },
 		getToken(){
 			console.log(this.userInfo)
 			this.headers= {
 				'Content-Type': 'application/x-www-form-urlencoded',
 				'access_token' : sessionStorage.access_token 
 			}
 		},
 		getUserInfoFn(){
 			let params = {
 				access_token: this.userInfo.access_token
 			};
 			getUserInfo(params).then(res=>{
 				let {errcode,content} = res;
 				if (errcode===0) {
 				    sessionStorage.removeItem("userInfo");
 				    content = JSON.stringify(content);
 				    sessionStorage.setItem('userInfo',content);
 				    this.userInfo = JSON.parse(sessionStorage.userInfo);
 				    this.radio = this.userInfo.sex==="男"?"1":this.userInfo.sex==="女"?"2":"";
 				}
 			})
 		}
	},
 	mounted(){
 		this.$nextTick(()=>{
 			if (sessionStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(sessionStorage.userInfo);
				this.getUserInfoFn();
			}else{
				window.location.href = "login.html";
			}
 		})
 	}
 	
 }
</script>
<style lang='scss' scoped>
.wrap{
	margin-left: 10px;
		.el-row{
			margin-bottom: 20px;
			.avatarImg{
			width:178px;
			height:178px;
			border: 1px dashed #ddd;
			margin-left: 12px;
		 }
		}
	  .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	    border: 1px dashed #ddd;
	    margin-left: 12px;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
	.el-row{
		margin-bottom: 20px;
		.el-col-2{
			text-align: right;
		}
		.el-col-6{
			margin-left: 12px;
		}
		img{
			width: 120px;
			height: 120px;
		}
		.esc{
		    color: #000;
		    background-color: #fff;
		    border: 1px solid #ddd;
		}
		button{
		    width: 94px;
		}
	}
}
</style>