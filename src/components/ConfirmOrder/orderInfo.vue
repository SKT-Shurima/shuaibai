<template>
	<div class="wrap">
		<div class="orderInfoBox">
			<h4>
				<div class="title">
					订单信息
				</div>
			</h4>
			<div class="orderDetails">
				<el-row style='width:950px;'>
					<el-col :span='8'>
						订单编号：1233543164
					</el-col>
					<el-col :span='8'>
						下单时间：204515611316
					</el-col>
					<el-col :span='8'>
						帅柏商城直营店 <button><img src="../../module/confirmOrder/images/qq.png" height="14" width="12">联系客服</button>
					</el-col>
				</el-row>
				<el-row>
					<div class="userInfo">配送地址：<span>浙江省</span><span>温州市</span><span>平阳县</span></div>
					<div class="userInfo">林发可</div>
					<div class="userInfo">110</div>
				</el-row>
				<el-row>
					买家留言：发可大神
				</el-row>
			</div>
			<div class="orderInfo">
				<div class="orderTitle">
					<div class="goodsCol">宝贝</div>
					<div class="priceCol">单价</div>
					<div class="numCol">数量</div>
					<div class="discountCol">优惠</div>
					<div class="payCol">应付金额</div>
				</div>
				<ul class="orderInfoList">
					<li>
					    <div class="goodsInfo">
					    	<dl class="goodsMsg goodsCol">
								<dt class="titleCol">
									<img src="">
								</dt>
								<dd>
									<div class="goodsName">
										买不买买不买买不买买不买买不买不买不买不买绑定手机号发布觉得不
									</div>
									<div class="goodsType">
										<span>规格:精装品</span>
										<span>套餐:套餐一</span>
									</div>
								</dd>
							</dl>
							<div class="priceCol">
								<dl class="vMiddle" v-show='false' style="height: 20px;">
									<dt style="color:#666;text-decoration: line-through;">
										{{299.00|currency}}
									</dt>
									<dd>
										{{299.00|currency}}
									</dd>
								</dl>
								<dl class="vMiddle" v-show='true' style="height: 20px;">
									<dd>
										{{299.00|currency}}
									</dd>
								</dl>
							</div>
							<div class="numCol">
								1
							</div>
							<div class="discountCol">
								<ul>
									<li>优惠券：121</li>
									<li>积分抵：120</li>
									<li>购物币抵：100</li>
								</ul>
							</div>
							<div class="payCol">
								<dl>
									<dt>{{179|currency}}</dt>
									<dd>含运费：{{12|currency}}</dd>
								</dl>
							</div>
					    </div>
					</li>
				</ul>
			</div>
			<div class="totalAcoount">
				<div>
					<strong>订单金额：</strong><i>￥</i><em>512.00</em>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{

			}
		},
		filters:{
			currency
		}
	}
</script>
<style lang='scss' scoped>
	$primary:#c71724;
	$text_color: #666;
	$border_color: #ddd;
	$bg_color: #f5f5f5;
	.wrap{
		width: 100%;
		.status{
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			margin-top:40px;
			margin-bottom: 24px;
		}
		h4{
			border-bottom: 1px solid $border_color;
			height: 40px;
			.title{
				float: left;
				width: 106px;
				height: 40px;
				line-height: 40px;
				border-top: 1px solid $border_color;
				border-right: 1px solid $border_color;
				border-left: 1px solid $border_color;
				border-bottom: 1px solid #fff;
				font-size: 18px;
				text-align: center;
				color: $primary;
			}
		}
		.orderDetails{
			margin: 30px 0px 40px;
			.el-row{
				padding: 14px 0px; 
				font-size: 16px;
				.el-col-8{
					button{
						font-size: 12px;
						border: 1px solid $border_color;
						border-radius: 10px;
						background-color: transparent;
					}
				}
				.userInfo{
					float: left;
					margin-right: 100px;
				}
			}
		}
		.orderInfo{
			.goodsCol,.priceCol,.numCol,.discountCol,.payCol{
					float: left;
				}
				.goodsCol{
					width: 350px;
				}
				.priceCol{
					width: 220px;
					text-align: center;
				}
				.numCol{
					width: 264px;
					text-align: center;
				}
				.discountCol{
					width: 200px;
					text-align: center;
				}
				.payCol{
					width: 174px;
					text-align: center;
				}
			.orderTitle{
				height: 40px;
				line-height: 40px;
				overflow: hidden;
				text-align: center;
				padding: 0px 20px;
				background-color: $bg_color;
				border: 1px solid $border_color;
			}
			.orderInfoList{
				width: 100%;
				overflow: hidden;
				li{
					border-left: 1px solid $border_color;
					border-right: 1px solid $border_color;
					border-bottom: 1px solid $border_color;
					position: relative;
					.goodsInfo{
						overflow: hidden;
						padding: 20px;
						.goodsMsg{
							float: left;
							width: 350px;
							overflow: hidden;
							dt{
								float: left;
								width: 90px;
								height: 90px;
								margin-right: 16px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							dd{
								float: left;
								width: 240px;
								.goodsName{
									line-height: 18px;
									margin-bottom: 14px;
								}
								.goodsType{
									color: $text_color;
									span{
										margin-right: 10px;
									}
								}
							}
						}
						.priceCol{
							height: 90px;
							position: relative;
							.vMiddle{
								position: absolute;
								top: 0px;
								bottom: 0px;
								right: 0px;
								left: 0px;
								height: 40px;
								display: inline-block;
								margin: auto;
								line-height: 18px;
								button{
									background-color: transparent;
									border: none;
									outline: none;
								}
							}
						}
						.numCol{
							line-height: 90px;
						}
						.discountCol{
							padding-top: 10px;
							ul{
								font-size: 14px;
								line-height: 24px;
								li{
									border: none;
								}
							}
						}
						.payCol{
							padding-top: 24px;
							line-height: 20px;
							dt{
								font-size: 16px;
								font-weight: 600;
								color: $primary;
							}
							dd{
								font-size: 14px;
								color: $text_color;
							}
						}
					}
				}
				
			}
		}
		.totalAcoount{
			overflow: hidden;
			margin-top: 30px;
			margin-bottom: 120px;
			div{
				float: right;
				padding-right: 40px;
				margin-bottom: 20px;
				strong{
					font-weight: 600;
				}
				span{
					margin-left: 20px;
				}
				i,em{
					color: $primary;
				}
				i{
					margin-left: 20px;
				}
				em{
					font-size: 28px;
					font-weight: 600;
				}
			}
		}
	}
</style>