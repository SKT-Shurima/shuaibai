<template>	
	<div class="wrap">
		<div class="status">
			<!-- 订单已关闭 -->
			<div class="close" v-show='false'>
				订单状态：订单已关闭
			</div>
			<!-- 订单已提交 -->
			<dl class="payfor" v-show='false'>
				<dt>
					订单状态：订单已提交。请在<em><img src="">23小时45分45秒</em>内完成付款，超时将自动取消订单
				</dt>
				<dd>
					<el-button type='primary'>立即付款</el-button>
					<a href="">取消订单</a>
				</dd>
			</dl>
			<!-- 待发货 -->
			<dl class="payfor" v-show='false'>
				<dt>
					订单状态：待发货
				</dt>
				<dd>
					<el-button type='primary'>催一催</el-button>
					<a href="">申请退款</a>
				</dd>
			</dl>
			<!-- 待收货 -->
			<dl class="payfor" v-show='false'>
				<dt>
					订单状态：待收货<em><img src="">23小时45分45秒</em>后自动确认收货
				</dt>
				<dd>
					<el-button type='primary'>确认收货</el-button>
					<a href="">申请退货</a>
				</dd>
			</dl>
			<!-- 交易成功 -->
			<dl class="payfor" v-show='false'>
				<dt>
					订单状态：交易成功<em><img src="">23小时45分45秒</em>后自动评价
				</dt>
				<dd>
					<el-button type='primary'>评价</el-button>
					<a href="">申请售后</a>
				</dd>
			</dl>
			<!-- 交易成功自动评价 -->
			<dl class="payfor" >
				<dt>
					订单状态：交易成功
					<div class="eval">
						<el-row>
							<el-col :span='4'>初次评价</el-col>
							<el-col :span='20'>东西还不错</el-col>
						</el-row>
						<ul>
							<li v-for='(item,index) in 5' :class='{"hasMarRight":(index+1)%5}'>
								<img src="">
							</li>
						</ul>
					</div>
				</dt>
				<dd>
					<el-button type='primary'>追加评价</el-button>
					<a href="">申请售后</a>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang='scss' scoped>
$primary:#c71724;
$text_color: #666;
	.wrap{
		width: 100%;
		.status{
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			margin-top:40px;
			margin-bottom: 26px;
			.payfor{
				dt{
					margin-bottom: 38px;
					em{
						color: $primary;
					}
					.eval{
						width: 380px;
						font-size: 12px;
						font-weight: 400;
						margin: 0px auto;
						.el-row{
							text-align: left;
							margin: 20px 0px;
							.el-col-4{
								color: $text_color;
							}
						}
						ul{
							width: 100%;
							overflow: hidden;
							li{
								float: left;
								width: 60px;
								height: 60px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.hasMarRight{
								margin-right: 20px;
							}
						}
					}
				}
				dd{
					.el-button{
						width:152px;
						font-size:18px;
						font-weight:600;
					}
					a{
						font-size: 14px;
						font-weight: 400;
						line-height: 40px;
						margin-left: 26px;
						color: #144ddf;
					}
				}
			}
		}
	}
</style>