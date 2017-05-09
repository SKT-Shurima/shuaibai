<template>
	<div class="wrap">
		<div class="head_wrap">
			<div class="head_box">
				<dl class="h_left">
					<dt>
						<i></i>
						<span>手机帅柏</span>
					</dt>
					<dd>
						<i></i>
						<span>收藏帅柏</span>
					</dd>
				</dl>
				<ul class="h_right">
					<li><a href="login.html">登录</a>|</li>
					<li><a href="reg.html">注册</a>|</li>
					<li><a href="">我的订单<i></i></a>|</li>
					<li><a href="">我的收藏<i></i></a>|</li>
					<li><a href="">商家后台</a>|</li>
					<li><a href="">客户服务<i></i></a></li>
				</ul>
			</div>
		</div>
		<div class="head_con_wrap">
			<div class="head_con_box">
				<div class="logo">
					<img src="../../../static/headImg/logo.png" height="39" width="269">
				</div>
				<div class="search_box">
					<div class="search_form">
						<form id="searchForm" name="searchForm" method="get" action="">
							<input type="text" name="keywords"  autocomplete="off" id="key" accesskey="s" class="search_text">
							<input type="submit"  class="search_but" value="搜索">
	                    </form>
					</div>
					<ul class="hot_words">
						<li>热门搜索</li>
						<li>热门搜索</li>
						<li>热门搜索</li>
						<li>热门搜索</li>
						<li>热门搜索</li>
					</ul>
				</div>
				 <div class="shopping_cart">
				 	<img src="">
					我的购物车
				 </div> 
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped lang='scss'>
$primary:#c71724;
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
			z-index: 90;
			.head_box{
				width: 1250px;
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
			    		}
			    	}
			    }
			}

		}
		.head_con_wrap{
			width: 100%;
			.head_con_box{
				width: 1250px;
				height: 104px;
				margin: 0px auto;
				.logo{
					width: 270px;
					margin-top: 32px;
					float: left;
					img{
						width: 100%;
					}
				}
				.search_box{
					width: 520px;
					float: left;
					margin-top: 32px;
					margin-left: 120px;
					.search_form{
						    border: 3px solid #e4393c;
						    height: 44px;
						    width: 496px;
						.search_text{
							background-color: #fff;
							background-position: 0 -360px;
							background-repeat: repeat-x;
							color: #999;
						 	font-family: arial,"宋体";
							font-size: 14px;
							padding: 5px;
							width: 406px;
							height: 38px;
							line-height: 38px;
							border: none;
							outline: none;
						}
						.search_but{
							background: none repeat scroll 0 0 #e4393c;
						    color: #fff;
						    font-size: 14px;
						    font-weight: 700;
						    width: 78px;
						    height: 38px;
						    border: none;
						    margin: 0px;
						}
					}
					.hot_words{
						margin: 0px;
						padding: 6px 0px;
						overflow: hidden;
						li{
							float: left;
							padding-left: 10px;
							cursor: pointer;
						}
					}
				}
				.shopping_cart{
					width: 150px;
					height: 36px;
					line-height: 36px;
					margin-top: 32px;
					color: $primary;
					text-align: center;
					float: right;
					border: 1px  solid $primary;
				}
			}
		}
	}
</style>