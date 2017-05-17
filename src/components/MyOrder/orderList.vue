<template>
	<div class="wrap">
		<div class="shopInfoHead">
			<el-row>
				<el-col :span='9'>商品信息</el-col>
				<el-col :span='2'>单价</el-col>
				<el-col :span='2'>数量</el-col>
				<el-col :span='2'>售后</el-col>
				<el-col :span='3'>付款信息</el-col>
				<el-col :span='3'>交易状态</el-col>
				<el-col :span='3'>交易操作</el-col>
			</el-row>
		</div>
		<div class="shopInfoList">
			<div class="title">
				<el-row>
					<el-col :span='9'>
						<em style='margin-left:24px;font-weight: 600;'>2017-01-01</em>
						<span style='margin-left:26px'>订单号：{{20170516}}</span>
					</el-col>
					<el-col :span='10'>
						<span>帅柏</span>
						<button>
							<img src="../../module/myOrder/images/qq.png" height="14" width="12">联系客服
						</button>
					</el-col>
				</el-row>
			</div>
			<div class="list">
				<div class='listContent'>
				 	<div class="goodsListBox">
				 		<div v-for='item in 5' class="goodsList">
					 		<dl class="goodsMsg">
								<dt>
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
							<dl style='line-height:18px;' class='goodsPrice'>
								<dt style="color:#666;text-decoration: line-through;margin-top: 24px;">
									{{299.00|currency}}
								</dt>
								<dd>
									{{299.00|currency}}
								</dd>
							</dl>
							<div style='padding-top:30px;' class="goodsPrice">
								1
							</div>
							<div style='padding-top:30px;' class="goodsPrice">
								申请售后
							</div>
						</div>
				 	</div>
					<div class="goodsInfo" :style="{height:130*5+'px'}" :class='{"multiple":true}'>
						<el-row>
							<el-col :span='8'>
								<div style="line-height:26px;font-size:14px;font-weight:600;">{{179.00|currency}}</div>
								<div style="color:#666;">含运费:{{0.00|currency}}</div>
								<div style='color:#666;'>优惠券:{{20.00|currency}}</div>
							</el-col>
							<el-col :span='8' style='line-height:20px;'>
								<div>物流运输中</div>
								<div>订单详情</div>
								<div>查看物流</div>
							</el-col>
							<el-col :span='8' style='padding-top: 16px;'>
								<el-button size='small' type='text'>确认收货</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import {currency} from '../../common/js/filter.js'
	export default {
		filters: {
			currency
		},
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      }
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
		.shopInfoHead{
			line-height: 40px;
			text-align: center;
			margin: 30px 0px 20px;
			border: 1px solid $border_color;
			background-color: $bg_color;
			.el-col-2{
				text-align: left;
			}
		}
		.shopInfoList{
			border: 1px solid $border_color;
			.title{
				line-height: 40px;
				border-bottom: 1px solid $border_color;
				background-color: $bg_color;
				.el-col-10{
					button{
						border: 1px solid $border_color;
						border-radius: 8px;
						background-color: #fff;
						img{
							margin-right: 4px;
						}
					}
				}
			}
			.list{
				.listContent{
					overflow: hidden;
					.goodsListBox{
						width: 674px;
						float: left;
						overflow: hidden;
						.goodsList{
							float: left;
							padding: 20px 0px 20px 20px;
							overflow: hidden;
							border-top: 1px solid $border_color;
							margin-top: -1px;
							.goodsMsg{
								float: left;
								width: 384px;
								overflow: hidden;
								dt{
									float: left;
									width: 90px;
									height: 90px;
									img{
										width: 100%;
										height: 100%;
									}
								}
								dd{
									float: left;
									width: 240px;
									margin-left: 18px;
									.goodsName{
										line-height: 18px;
										margin-bottom: 18px;
									}
									.goodsType{
										color: $text_color;
										span{
											margin-right: 10px;
										}
									}
								}
							}
							.goodsPrice{
								float: left;
								width: 90px;
							}
						}
					}
					.goodsInfo{
						float: left;
						width: 404px;
						height: 100%;
						position: relative;
						.el-row{
							width: 100%;
							height: 60px;
							position: absolute;
							right: 0px;
							top: 0px;
							bottom: 0px;
							margin: auto;
							text-align: center;
							.el-button{
								padding: 6px;
								color: #000;
								border: 1px solid $border_color;
							}
						}
					}
					.multiple{
						border-left: 1px solid $border_color;
					}
				}
			}
		}
	}
</style>