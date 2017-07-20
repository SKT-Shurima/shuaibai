<template>
	<div class="wrap">
		<div class="bg" :style="{backgroundImage: `url(${adImage})`}">
			
		</div>
		<div class="content_layout">
			<a :href="adParams" class="cd"></a>
			<div class="login_box">
				<dl class="border_input margin_bottom">
					<dt>
						<img src="../../../static/loginImg/usname.jpg" height="16" width="14" alt="username">
					</dt>
					<dd>
						<input type="text" name="username" v-model='username'/>
					</dd>
				</dl>
				<dl class="border_input margin_bottom">
					<dt>
						<img src="../../../static/loginImg/pw.jpg" height="16" width="14" alt="password">
					</dt>
					<dd>
						<input type="password" name="passwd" v-model='passwd'/>
					</dd>
				</dl>
				<div style="overflow:hidden;padding-bottom: 30px;">
					<dl class="border_input" style="width:180px;float:left;">
						<dt>
							<img src="../../../static/loginImg/code.jpg" height="16" width="14" alt="verify_code">
						</dt>
						<dd>
							<input type="text" name="verify_code" v-model='verify_code' @keyup.enter='loginFn'/>
						</dd>
					</dl>
					<div class="vertify_box">
						<img :src="imgSrc">
						<el-button type='text' size='mini' @click='initToken'>看不清楚？换一张</el-button>
					</div>
				</div>
				<div class="select_box">
					<el-checkbox  v-model='remember'>记住密码</el-checkbox>
					<div style="float: right;">
						<a href="rePassword.html" style="color:#000;">忘记密码</a>
						<a href="reg.html" style="color: #f24450;margin-left:10px;">免费注册</a>
					</div>
				</div>
				<div class="login_btn">
					<el-button type='primary' @click='loginFn' :disabled='!(username&&passwd&&verify_code)'>登录</el-button>
				</div>
				<div class="cooperation">
					<div class="title">
						<div class="slider"></div>
						<div class="title_text">使用合作账号登录</div>
						<div class="slider"></div>
					</div>
					<div class="icon">
						<a href="https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=101408899&redirect_uri=http%3A%2F%2Fshuaibo.zertone1.com%2Fweb%2FcustomerAction%2FqqWebLogin">
							<img src='../../../static/loginImg/qq.png' height="20" width="20" alt="QQ">
						</a>
						<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx06db8000a8ef09e3&redirect_uri=http%3A%2F%2Fshuaibo.zertone1.com%2Fweb%2FcustomerAction%2FwebWeixinLogin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect 
"><img src="../../../static/loginImg/wexin.png" height="20" width="20" alt="wexin"></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {createToken,login,getLoginAd} from '../../common/js/api'
import {setCookie,getCookie,delCookie,errorInfo} from '../../common/js/common'
import {MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
export default {
	data(){
		return {
			username: '',
			passwd: '',
			verify_code: '',
			remember: true,
			token: '',
			imgSrc: "",
			adImage: "",
			adParams: ""
		}
	},
	methods:{
		loginFn(){
			let params = {
				oauth: 'Web',
				param: this.username,
				passwd: hex_md5(this.passwd),
				verify_code: this.verify_code,
				token: this.token
			};
			login(params).then(res=>{
				let {errcode,message,content} = res;
				if (errcode !== 0) {
					MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定'
			        });
				} else {
					//  判断是否记住密码
					let accountInfo ;
					if(this.remember){
						accountInfo = this.username + "&" + this.passwd;  
						setCookie('accountInfo',accountInfo,30*24);  
					}else {
						let hasUserInfo = getCookie('accountInfo');
						if (hasUserInfo) {
							delCookie('accountInfo');
						}
					}
					// 本地存储登录后返回信息
					if(sessionStorage.userInfo) {
						sessionStorage.removeItem('userInfo');
						delCookie('access_token');
					}
					setCookie('access_token',content.access_token,5);
					content  = JSON.stringify(content);
					sessionStorage.setItem('userInfo',content);
					var lastUrl =  document.referrer ;
					if (window.history.length>1&&lastUrl.indexOf("module")>=0) {
						window.history.go(-1);
					}else{
						location.href = 'index.html' ;
					}
				}
			})
		},
		// 看不清，点击之后换一张
		initToken(){
			createToken().then(res=>{
				let {errcode,message,content} = res;
				if (errcode !== 0) {

				} else {
					this.token = content.token;
					this.imgSrc = 'http://shuaibo.zertone1.com/web/customerAction/createVerify?token=' + this.token ;
				}
			})
		},
		initAd(){
			let params = {
				t: "5"
			}
			getLoginAd(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.adImage = content.ads[0].image ;
					let params = content.ads[0].action.params ;
					let query = "" ;
					if (params) {
						for(let i =0 ; i <params.length ; i++){
							let key = params[i].key ;
							let val  =params[i].value ;
							query += `${key}=${val}&` ;
						}
					}
					let url = content.ads[0].action.jump ;
					this.adParams = `${url}?${query}` ;
				}
			})
		}
		
	},
	mounted(){
		this.$nextTick(()=>{
			this.initToken();
			let accountInfo = getCookie('accountInfo');
			accountInfo = accountInfo.split("&");
			this.username = accountInfo[0];
			this.passwd = accountInfo[1];
			this.initAd();
		})
	}
}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
	.wrap{
		width: 100%;
		position: relative;
		margin-top: 4px; 
		.bg{
		    position: absolute;
		    z-index: 9;
		    top: 0;
		    left: 0;
		    background-size: cover;
		    background-position: center center;
		    width: 100%;
		    height: 600px;
		    min-width: 1250px;
		    background-repeat: no-repeat;
		}
		.content_layout{
		    width: 1200px;
		    margin: 0 auto;
		    overflow: hidden;
		    position: relative;
		    height: 600px;
		    z-index: 999;
		    .login_box{
	    	    position: absolute;
			    top: 70px;
			    right: 0px;
			    width: 372px;
			    height: 420px;
			    border-radius: 4px;
			    background-color: #fff;
			    padding-top: 38px;
			    padding-left: 36px;
			    padding-right: 36px;
			    padding-bottom: 30px;
			    .margin_bottom{
			    	margin-bottom: 20px;
			    }
			    .border_input{
			    	border-radius: 4px;
			    	border: 1px solid #ccc;
			    }
			    dl{
			    	width: 100%;
			    	height: 36px;
			    	position: relative;
			    	dt{
						width: 32px;
						height: 36px;
						text-align: center;
						line-height: 34px;
						position: absolute;
						left: 0px;
						top: 0px;
			    	}
			    	dd{
			    		width: 100%;
			    		height: 36px;
			    		position: absolute;
			    		padding-left: 32px;
			    		padding-right: 2px;
			    		top: 0px;
			    		left: 0px;
			    		input{
			    			border: none;
			    			width: 100%;
			    			height: 34px;
			    			outline: none;
			    		}
			    	}
			    }
			    .vertify_box{
			    	width: 108px;
			    	height: 36px;
			    	float: right;
			    	position: relative;
			    	img{
			    		width: 106px;
			    		height: 34px;
			    		border: 1px solid #ccc;
			    		border-radius: 4px;
			    	}
			    	.el-button{
			    		position: absolute;
			    		top: 36px;
			    		line-height: 20px;
			    	}
			    }
			    .select_box{
			    	width: 100%;
			    	height: 36px;
			    	line-height: 36px;
			    	font-size: 14px;
			    	overflow: hidden;
					.el-checkbox{
						float: left;
					}
			    }
				.login_btn{
					width: 100%;
					margin-top: 16px;
					margin-bottom: 40px;
					.el-button{
						width: 100%;
					}
				}
				.cooperation{
					width: 230px;
					margin: 0px auto;
					.title{
						width: 100%;
						height: 14px;
						color: #999;
						div{
							float: left;
						}
						.slider{
							width: 60px;
							height: 1px;
							margin-top: 6px; 
							background-color: #999;
						}
						.title_text{
							width: 110px;
							padding-left: 6px;
							padding-right: 6px;
						}
					}
					.icon{
						width: 152px;
						height: 20px;
						margin: 16px auto 0px;
						overflow: hidden;
						text-align: center;
						img{
							padding-left: 10px;
							padding-right: 10px;
							cursor: pointer;
						}
					}
				}	
		    }
		}
		.cd{
			display: block;
			position: absolute;
			top: 78px;
			left: 78px;
			width: 630px;
			height: 440px;
		}
	}
</style>