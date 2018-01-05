<template>
	<div class="wrap">
	<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip0")'>个人信息</span></h4>
		<el-row>
			<el-col :span='2' style='line-height:180px;'>头像</el-col>
			<el-col :span='6' :offset="1" @click='changeView("vip01")'>
				<img v-if="userInfo.avater" :src="userInfo.avater" class="avater" @click='changeView("vip01")'>
				<img v-else src="../../../static/centerImg/noAvater.png" class="avater" @click='changeView("vip01")'>
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
			      :picker-options="pickerOptions" size='small' style='width:100%'
			      @change='changBirthday'>
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
		<el-row>
			<el-col :span='2' style='line-height:30px;'>邀请码</el-col>
			<el-col :span='6' :offset="1">
				<input class='el-input__inner' style="height: 30px;" readonly v-model='shareCode' id='bar'></input>
			</el-col>
			<el-col :span='6' :offset='1'>
				<em style="line-height:30px;cursor: pointer;color: #42a0dd;" data-clipboard-action="copy" data-clipboard-target="#bar" class='copy'>复制</em>
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
import {changeAvater,changeUsername,changeBirthday,changeSex,share_code} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {MessageBox} from  'element-ui'
import Clipboard from 'clipboard';
 export  default{
 	data(){
 		return{
 			pickerOptions: {
	          disabledDate(time) {
	            return time.getTime() > Date.now();
	          }
	        },
	        userInfo: {
	        	avater: '',
	        	nickname: '',
	        	birthday: 0,
	        	sex: ''
	        },
 			radio: '',
 			avater: '',
 			birthday: "",
		    form: {
		    	cate : 'avater', 
		    	access_token: getCookie('access_token')
		    },
		    shareCode: ''
 		}
 	},
 	watch: {
 		userInfo: {
 			handler(){
				let bir = this.userInfo.birthday ;
				bir = parseInt(bir/1000) + "" ;
				let len = bir.length ;
				this.userInfo.birthday = len===10?this.userInfo.birthday:this.userInfo.birthday*1000;
				this.radio = this.userInfo.sex === ''?'0':this.userInfo.sex === '男'?'1':'2';
				this.birthday = this.userInfo.birthday ;
 			},
 			// deep: true
 		}
 	},
 	mixins: [userInfo], 
 	methods:{
 		getShareCode(){
 			let params = {
	    		access_token: getCookie('access_token')
	    	}
	    	share_code(params).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			this.shareCode = content;
	    		} 
	    	});
 		},
 		changBirthday(){
 			let birthday = this.userInfo.birthday;
 			if (typeof birthday === 'object') {
 				this.birthday = this.userInfo.birthday.getTime();
 			}
 		},
 		changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	      },
	    // 修改用户名
	    editUserName(){
	    	let paramsName = {
	    		access_token: getCookie('access_token'),
	    		nickname: this.userInfo.nickname
	    	}
	    	changeUsername(paramsName).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			this.userInfo.nickname = content ;
	    			this.editBirthday();
	    		} 
	    	});
	    },
	    // 修改出生日期
	    editBirthday(){
	    	let paramsBirth = {
	    		access_token: getCookie('access_token'),
	    		birthday: parseInt(this.birthday/1000)
	    	}
	    	changeBirthday(paramsBirth).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			this.userInfo.birthday = content ;
	    			this.editSex();
	    		} 
	    	});
	    },
	    // 修改性别
	    editSex(){
	    	let paramsSex = {
	    		access_token: getCookie('access_token'),
	    		type: this.radio
	    	}
	    	changeSex(paramsSex).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			this.userInfo.sex = content ;
	    			MessageBox.alert('信息保存成功', '提示', {
			          	confirmButtonText: '确定',
			          	type: 'success',
			          	callback: action => {
				           location.reload();
				        }
				    });
	    		} 
	    	})
	    },
	    save(){
	    	if (this.userInfo.nickname==='') {
	    		MessageBox.alert('请输入昵称', '提示', {
		          	confirmButtonText: '确定'
			    });
	    	}else if(this.userInfo.birthday===''){
	    		MessageBox.alert('请选择您的出生日期', '提示', {
		          	confirmButtonText: '确定'
			    });
	    	}else {
	    		if (this.avater) {
	    			this.editAvatar();
	    		}else{
	    			this.editUserName();
	    		}
	    	} 
	    }
	},
 	created(){
 		this.$nextTick(()=>{
 			let access_token = getCookie('access_token');
 			if (!access_token) {
 				location.href = "login.html";
 			}
 			this.getShareCode();

		    var clipboard = new Clipboard('.copy');

		    clipboard.on('success', function(e) {
		        console.log(e);
		    });

		    clipboard.on('error', function(e) {
		        console.log(e);
		    });
    
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
	.el-row{
		margin-bottom: 20px;
		.avater{
			width:178px;
			height:178px;
			cursor: pointer;
			border: 1px dashed #ddd;
			margin-left: 12px;
		}
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
		button{
		    width: 94px;
		}
	}
}
</style>