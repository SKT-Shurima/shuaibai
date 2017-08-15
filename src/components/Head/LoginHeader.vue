<template>
	<div class="wrap">
		<div class="head_wrap">
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
					<li><a href="javascript:window.open('http://app.shuaibomall.net/shopadmin/login/index')">商家后台</a>|</li>
					<li><a href="javascript:window.open('myOrder.html#vip6')">投诉中心</a></li>
				</ul>
			</div>
		</div>
		<div class="head_con_wrap">
			<div class="head_con_box">
				<div class="logo">
					<a href="index.html">
						<img src="../../../static/headImg/logo.png" height="39" width="269">
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				serviceBol: false
			}
		}
	}
</script>

<style scoped lang='scss'>
$primary:#c71724;
$border_color: #ccc;
	.wrap{
		width: 100%;
		.head_wrap{
			width: 100%;
			height: 30px;
			line-height: 30px;
			background: #f7f7f7;
			border-bottom: #eee solid 1px;
			line-height: 30px;
			position: relative;
			z-index: 100;
			.head_box{
				width: 1250px;
				margin:0px auto;
			}

		}
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
	    	margin: 0px;
	    	li{
	    		float: left;
	    		color: #ccc;
	    		a{
	    			color: #000;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    		}
	    	}
	    }
		.head_con_wrap{
			width: 100%;
			.head_con_box{
				width: 1250px;
				height: 130px;
				margin: 0px auto;
				padding-top: 45px;
				padding-bottom: 45px;
				.logo{
					width: 270px;
					height: 40px;
					float: left;
					img{
						width: 100%;
					}
				}
			}
		}
	}
</style>