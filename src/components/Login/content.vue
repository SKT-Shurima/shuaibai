<template>
	<div class="wrap">
		<div class="bg">
			
		</div>
		<div class="content_layout">
			<div class="login_box">
				<dl class="border_input margin_bottom">
					<dt>
						<i>u</i>
					</dt>
					<dd>
						<input type="text" name="username" v-model='login_info.username'/>
					</dd>
				</dl>
				<dl class="border_input margin_bottom">
					<dt>
						<i>u</i>
					</dt>
					<dd>
						<input type="password" name="password" v-model='login_info.password'/>
					</dd>
				</dl>
				<div class="margin_bottom" style="overflow:hidden">
					<dl class="border_input" style="width:180px;float:left;">
						<dt>
							<i>u</i>
						</dt>
						<dd>
							<input type="password" name="password" v-model='login_info.password'/>
						</dd>
					</dl>
					<div class="vertify_box">
						
					</div>
				</div>
				<div class="select_box">
					<el-checkbox  v-model='remmerber'>记住密码</el-checkbox>
					<div style="float: right;">
						<a href="rePassword.html" style="color:#000;">忘记密码</a>
						<a href="reg.html" style="color: #f24450;margin-left:10px;">免费注册</a>
					</div>
				</div>
				<div class="login_btn">
					<el-button type='primary'>登录</el-button>
				</div>
				<div class="cooperation">
					<div class="title">
						<div class="slider"></div>
						<div class="title_text">使用合作账号登录</div>
						<div class="slider"></div>
					</div>
					<div class="icon">
						<img src="" alt="">
						<img src="" alt="">
						<img src="" alt="">
						<img src="" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				login_info: {
					username: '',
					password: '',
					verity_num: ''
				},
				remmerber: true
			}
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
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
		    background-repeat: no-repeat;
		    background-position: center center;
		    width: 100%;
		    height: 600px;
		    background-image: url(https://aecpm.alicdn.com/simba/img/TB1YpDwQVXXXXaPXVXXSutbFXXX.jpg);
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
			    right: 78px;
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
						line-height: 36px;
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
			    	background-color: red;
			    	border-radius: 4px;
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
						height: 18px;
						margin: 16px auto 0px;
						overflow: hidden;
						img{
							width: 18px;
							height: 18px;
							padding-left: 10px;
							padding-right: 10px;
							float: left;
						}
					}
				}	
		    }
		}
	}
</style>