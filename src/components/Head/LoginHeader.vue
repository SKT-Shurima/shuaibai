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
					<li><a href="http://shuaibo.zertone1.com/shopadmin">商家后台</a>|</li>
					<li class="service">
						<div class="title" @mouseenter='serviceBol=true' @mouseleave='serviceBol=false'>客户服务<img src="../../../static/headImg/down.png" height="7" width="10" class="downImg" style='cursor:pointer;' :class='{"transDownImg":serviceBol}'></div>
						<ul class="serviceList" @mouseenter='serviceBol=true' @mouseleave='serviceBol=false' v-show='serviceBol'>
							<!-- <li>售前服务</li>
							<li>售后服务</li> -->
							<li><a href="myOrder.html#vip6">投诉中心</a></li>
						</ul>
					</li>
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
			z-index: 99999999;
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
	    	.downImg{
    			margin-left: 4px;
				margin-bottom: 4px;
				transition: all .3s ;
    		}
    		.transDownImg{
				transform: rotateZ(180deg);
    		}
    		.service{
    			.title{
	    			display: inline-block;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    			color: #000;
	    		}
    		}
	    	.service{
	    		position: relative;
	    		.serviceList{
	    			position: absolute;
	    			left: 0px;
	    			top: 30px;
	    			border: 1px solid $border_color;
	    			padding: 0px 14px;
	    			background-color: #fff;
	    			li{
	    				height: 30px;
	    				line-height: 30px;
	    				color: #000;
	    				cursor: pointer;
	    			}
	    			li:hover{
	    				color: $primary;
	    			}
	    			a{
	    				padding: 0px;
	    			}
	    			a:hover{
	    				color: $primary;
	    			}
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