<template>
	<div class="head_box">
		<dl class="h_left">
			<dt>
				<img src="../../../static/headImg/sbPhone.png" height="14" width="14">
				<span>手机帅柏</span>
			</dt>
			<dd>
				<img src="../../../static/headImg/sbCollection.png" height="14" width="14">
				<span>收藏帅柏</span>
			</dd>
		</dl>
		<ul class="h_right">
			<li v-show='!userInfo.nickname'><a href="login.html">登录</a>|</li>
			<li v-show='!userInfo.nickname'><a href="reg.html">注册</a>|</li>
			<li v-show='userInfo.nickname'><a href="javascript:void(0)" style='color:#c71724;'>Hi,{{userInfo.nickname}}</a>|</li>
			<li><a href="myOrder.html">我的订单</a>|</li>
			<li><a href="">我的收藏<img src="../../../static/headImg/down.png" height="7" width="10"></a>|</li>
			<li><a href="">商家后台</a>|</li>
			<li><a href="">客户服务<img src="../../../static/headImg/down.png" height="7" width="10"></a></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				userInfo: {
					nickname: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }]
			}
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
	.head_box{
		width: 100%;
		margin:0px auto;
	    overflow: hidden;
	    .h_left{
	    	float: left;
	    	overflow: hidden;
	    	dt,dd{
	    		float: left;
	    		overflow: hidden;
	    	}
	    	dd{
	    		margin-left: 16px;
	    	}
	    }
	    .h_right{
	    	float: right;
	    	overflow: hidden;
	    	margin: 0px;
	    	li{
	    		float: left;
	    		color: #ccc;
	    		a{
	    			color: #000;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    			img{
	    				margin-left: 4px;
	    				margin-bottom: 4px;
	    			}
	    		}
	    	}
	    }
	}
</style>