<template>
	<div class="wrap">
		<dl v-show='false'>	
			<dt>
				<img src="">
			</dt>
			<dd>
				<div>支付失败，请重试</div>
				<div>您已成功付款<em>372.00</em>元</div>
				<div>您的余额不足，支付失败，请选择其他支付方式</div>
			</dd>
			<dd>
				<el-button type='primary'>查看订单</el-button>
				<el-button type='primary' style='margin-left: 20px;'>帅柏首页</el-button>
			</dd>
		</dl>
		<div class="payType">
			<div class="title">
				选择付款方式
			</div>
			<ul>
				<li>
					<img src="" alt="">余额支付
				</li>
				<li>
					<img src="" alt="">支付宝支付
				</li>
				<li>
					<img src="" alt="">微信支付
				</li>
			</ul>
			<div class="ensure">
				<el-button type='primary'>确定</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ddd;
	.wrap{
		width: 346px;
		margin: 100px auto;
		dl{
			padding-top: 30px;
			dt{
				width: 144px;
				height: 136px;
				margin: 0px auto 70px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			dd{
				width: 100%;
				text-align: center;
				margin-bottom: 56px;
				font-weight: 600;
				div{
					font-size: 14px;
					em{
						margin:0px auto; 
						font-size: 28px;
						color: $primary;
					}
				}
				.el-button{
					width: 160px;
					font-size: 20px;
				}
			}
		}
		.payType{
			width: 160px;
			text-align: center;
			margin: 0px auto;
			.title{
				font-size: 14px;
				font-weight: 600;
				color: $primary;
				margin-bottom: 50px;
			}
			ul{
				li{
					height: 40px;
					line-height: 40px;
					font-size: 14px;
					border: 1px solid $border_color;
					margin-bottom: 22px;
				}
			}
			.ensure{
				margin-top: 50px;
				.el-button{
					width: 100%;
					font-size: 20px;
					font-weight: 600;
				}
			}
		}
	}
</style>