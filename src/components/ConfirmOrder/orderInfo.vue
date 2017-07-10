<template>
	<div class="wrap" v-if='order'>
		<div class="orderInfoBox">
			<h4>
				<div class="title">
					订单信息
				</div>
			</h4>
			<div class="orderDetails">
				<el-row style='width:950px;'>
					<el-col :span='8'>
						订单编号：{{order.order_sn}}
					</el-col>
					<el-col :span='8'>
						下单时间：{{(order.date_add-0)*1000|dateStyle}}&nbsp;{{(order.date_add-0)*1000|timeStyle}}
					</el-col>
					<el-col :span='8'>
						{{order.shop_name}} <button><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
					</el-col>
				</el-row>
				<el-row>
					<div class="userInfo">配送地址：{{order.province}}{{order.city}}{{order.district}}{{order.address}}</div>
					<div class="userInfo" v-text='order.address_name'></div>
					<div class="userInfo" v-text='order.address_phone'></div>
				</el-row>
				<el-row>
					买家留言：{{order.comment}}
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
					<li v-for='(item,index) in order.goods' :key='item'>
					    <div class="goodsInfo">
					    	<dl class="goodsMsg goodsCol">
								<dt class="titleCol">
									<img :src="item.image">
								</dt>
								<dd>
									<div class="goodsName" v-text='item.name'></div>
									<div class="goodsType">
										<span>规格:{{item.option_name}}</span>
										<span>套餐:{{item.goods_type}}</span>
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
										{{item.price|currency}}
									</dd>
								</dl>
							</div>
							<div class="numCol">
								1
							</div>
							<div class="discountCol">
								<ul>
									<li>优惠券：{{order.coupon_amount}}</li>
									<li>积分抵：{{order.max_integration}}</li>
									<li>购物币抵：{{order.max_shopping_coin}}</li>
								</ul>
							</div>
							<div class="payCol">
								<dl>
									<dt>{{(item.price*item.quantity)|currency}}</dt>
									<dd>含运费：{{order.express_amount|currency}}</dd>
								</dl>
							</div>
					    </div>
					</li>
				</ul>
			</div>
			<div class="totalAcoount">
				<div>
					<strong>订单金额：</strong><i>￥</i><em v-text='order.order_amount'></em>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {currency,dateStyle,timeStyle} from '../../common/js/filter'
import {getOrderDetail} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
	export default{
		data(){
			return{
				order: null,
				reqParams:{}
			}
		},
		filters:{
			currency,dateStyle,timeStyle
		},
		methods: {
			orderDetail(){
	   			let _this = this ;
				let req = location.hash.split("?")[1];
				req = req.split('&')
				for(let i = 0 ;i<req.length;i++){
					let reqUnit = req[i].split('&');
					for(let j = 0; j<reqUnit.length;j++){
						let key = reqUnit[i].split('=')[0];
						let val = reqUnit[i].split('=')[1];
						this.reqParams[key] = val;
					}
				}
				let order_sn = 	_this.reqParams.order_sn;
	   			let params = {
	   				access_token: getCookie('access_token'),
	   				order_sn: order_sn
	   			}
	   			getOrderDetail(params).then(res=>{
	   				let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.order = content.order;
						this.$emit('getInfo',content);
					}
	   			})
	   		}
		},
		mounted(){
			this.$nextTick(()=>{
				this.orderDetail();
			})
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