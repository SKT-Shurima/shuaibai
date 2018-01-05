<template>
	<div class="wrap">
	<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip0")'>个人信息</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip01")'>修改头像</span></h4>
		<div>
			<div class="upload">
				<el-upload
				    class="avatar-uploader"
				    action="http://shuaibo.zertone1.com/app/uploadAction/upload_image"
				    :show-file-list="false"
				    :on-success="handleSuccess"
        			:before-upload="beforeUpload"
        			:data="form">
				    <el-button size='small' type='text'>
						<img src="../../../static/centerImg/upload.png" height="12" width="12">上传图片
					</el-button>
				</el-upload>
			</div>
			<div class="color-9 tips">
				仅支持JPG、PNG格式，且大小不能超过2MB
			</div>
			<div class="show-avater">
				<div class="default-avater">
					<img :src="userInfo.avater" v-if='userInfo.avater'>
					<img src="../../../static/centerImg/avaterDefault.jpg" height="250" width="250" v-else>
				</div>
				<dl class="big-avater">
					<dt>
						<img :src="userInfo.avater" v-if='userInfo.avater'>
						<img src="../../../static/centerImg/avaterBig.jpg" height="150" width="150" v-else>
					</dt>
					<dd class='color-6'>150px × 150px</dd>
				</dl>
				<dl class="small-avater">
					<dt>
						<img :src="userInfo.avater" v-if='userInfo.avater'>
						<img src="../../../static/centerImg/avaterSmall.jpg" height="50" width="50" v-else>
					</dt>
					<dd>
						50px × 50px
					</dd>
				</dl>
			</div>
		</div>
		<el-row style="padding-top: 20px;">
		    <el-col :span='12'>
		    	<el-button type='primary' size="small" @click='save'>保存</el-button>
		    	</el-col>
			<el-col :span='12'>
				 <el-button type='text' size="small" @click='changeView("vip0")'>取消</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import {changeAvater,changeUsername,changeBirthday,changeSex} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {Message} from  'element-ui'
 export  default{
 	data(){
 		return{
	        userInfo: {
	        	avater: ''
	        },
 			avater: '',
		    form: {
		    	cate : 'avater', 
		    	access_token: getCookie('access_token')
		    },
 		}
 	},
 	mixins: [userInfo],
 	methods:{
 		changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	      },
	    handleSuccess (res, file, fileList) {
	    	// 获取图片的url
	    	this.userInfo.avater = res.content.url;
	    	// 获取图片name
	    	this.avater = res.content.name ;
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
	    // 修改头像
	    save(){
	    	let paramAvater = {
	    		access_token: getCookie('access_token'),
	    		avater: this.avater
	    	}
	    	changeAvater(paramAvater).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
    			    errorInfo(errcode,message) ;
	    		}else{
	    			 Message.success({
			            message: '修改成功',
			            type: 'success'
			        });
	    		} 
	    	});
	    }
	},
 	created(){
 		this.$nextTick(()=>{
 			let access_token = getCookie('access_token') ;
 			if (!access_token) {
				location.href = "login.html";
			}
 		})
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
	.upload,.tips{
		width: 250px;
		text-align: center;
	}
	.upload{
		.el-button{
			width: 120px;
			color: #000;
			border: 1px solid #ccc;
			img{
				vertical-align: top;
				margin-right: 6px;
			}
		}
	}
	.tips{
		line-height: 56px;
		color: #999;
	}
	.show-avater{
		width: 680px;
		overflow: hidden;
		div,dl{
			float: left;
		}
		dd{
			height: 36px;
			line-height: 36px;
		}
	}
	.default-avater{
		width: 310px;
		height: 250px;
		padding-right: 60px;
		border-right: 1px solid #ccc;
		img{
			width: 250px;
			height: 250px;
		}
	}
	.big-avater{
		width: 270px;
		height: 250px;
		text-align: center;
		padding-top: 50px;
		img{
			width: 150px;
			height: 150px;
			border-radius: 50%;
		}
	}
	.small-avater{
		width: 90px;
		height: 250px;
		text-align: center;
		padding-top: 100px;
		img{
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
	.el-row{
		width: 250px;
		.el-button{
			width: 94px;
			border: 1px solid #ccc;
			color: #666;
		}
	}
</style>