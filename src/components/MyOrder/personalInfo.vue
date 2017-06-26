<template>
	<div class="wrap">
	<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip0")'>个人信息</span></h4>
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
			      @change='userInfo.birthday=userInfo.birthday'>
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
import {changeAvater,changeUsername,changeBirthday,changeSex} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
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
		    form: {
		    	cate : 'avater', 
		    	access_token: getCookie('access_token')
		    },
 		}
 	},
 	methods:{
 		changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	      },
	    // 修改用户名
	    editUserName(){
	    	let _this = this ;
	    	let paramsName = {
	    		access_token: getCookie('access_token'),
	    		nickname: _this.userInfo.nickname
	    	}
	    	changeUsername(paramsName).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			_this.userInfo.nickname = content ;
	    			sessionStorage.userInfo = JSON.stringify(_this.userInfo);
	    			_this.editBirthday();
	    		} 
	    	});
	    },
	    // 修改出生日期
	    editBirthday(){
	    	let _this = this ;
	    	let paramsBirth = {
	    		access_token: getCookie('access_token'),
	    		birthday: _this.userInfo.birthday-0
	    	}
	    	changeBirthday(paramsBirth).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			_this.userInfo.birthday = content ;
	    			sessionStorage.userInfo = JSON.stringify(_this.userInfo);
	    			_this.editSex();
	    		} 
	    	});
	    },
	    // 修改性别
	    editSex(){
	    	let _this = this ;
	    	let paramsSex = {
	    		access_token: getCookie('access_token'),
	    		type: _this.radio
	    	}
	    	changeSex(paramsSex).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
	    			errorInfo(errcode,message) ;
	    		}else{
	    			_this.userInfo.sex = content ;
	    			sessionStorage.userInfo = JSON.stringify(_this.userInfo);
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
	    	let _this = this ;
	    	if (_this.userInfo.nickname==='') {
	    		MessageBox.alert('请输入昵称', '提示', {
		          	confirmButtonText: '确定'
			    });
	    	}else if(_this.userInfo.birthday===''){
	    		MessageBox.alert('请选择您的出生日期', '提示', {
		          	confirmButtonText: '确定'
			    });
	    	}else {
	    		if (_this.avater) {
	    			_this.editAvatar();
	    		}else{
	    			_this.editUserName();
	    		}
	    	} 
	    }
	},
 	mounted(){
 		this.$nextTick(()=>{
 			if (sessionStorage.userInfo) {
				this.userInfo = JSON.parse(sessionStorage.userInfo);
				this.userInfo.birthday-=0;
				this.radio = this.userInfo.sex === ''?'0':this.userInfo.sex === '男'?'1':'2';
			}else{
			    location.href = "login.html";
			}
 		})
 	}
 	
 }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
.wrap{
	margin-left: 10px;
	h4{
		line-height: 40px;
		font-weight: 400;
		margin-bottom: 54px;
		border-bottom: 1px solid $border_color;
		color: $text_color;
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