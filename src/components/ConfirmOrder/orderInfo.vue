<template>
	<div class="wrap" v-if='order'>
		<div class="order-info-box">
			<h4 class="title">
				<div class='border-c color-primary'>订单信息</div>
			</h4>
			<div class="order-detail">
				<el-row style='width:950px;'>
					<el-col :span='8'>订单编号：{{order.order_sn}}</el-col>
					<el-col :span='8'>下单时间：{{(order.date_add-0)*1000|dateStyle}}&nbsp;{{(order.date_add-0)*1000|timeStyle}}</el-col>
					<el-col :span='8'>
						{{order.shop_name}} <button class='border-c'><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
					</el-col>
				</el-row>
				<el-row>
					<div class="user-info">配送地址：{{order.province}}{{order.city}}{{order.district}}{{order.address}}</div>
					<div class="user-info" v-text='order.address_name'></div>
					<div class="user-info" v-text='order.address_phone'></div>
				</el-row>
				<el-row>
					买家留言：{{order.comment}}
				</el-row>
			</div>
			<div class="order-info">
				<div class="border-c f5-bg order-title">
					<div class="goods-col">宝贝</div>
					<div class="price-col">单价</div>
					<div class="num-col">数量</div>
					<div class="discount-col">优惠</div>
					<div class="pay-col">应付金额</div>
				</div>
				<ul class="order-info-list">
					<li class='border-c' v-for='(item,index) in order.goods' :key='index'>
					    <div class="goods-info">
					    	<dl class="goods-msg goods-col">
								<dt class="titleCol">
									<img :src="item.image">
								</dt>
								<dd>
									<div class="goods-name" v-text='item.name'></div>
									<div class="color-6 goods-type">
										<span style='margin-right:10px;'>规格:{{item.option_name}}</span>
										<span style='margin-right:10px;'>套餐:{{item.goods_type}}</span>
									</div>
								</dd>
							</dl>
							<div class="price-col">
								<dl class="v-middle" v-show='false' style="height: 20px;">
									<dt style="color:#666;text-decoration: line-through;">
										{{299.00|currency}}
									</dt>
									<dd>
										{{299.00|currency}}
									</dd>
								</dl>
								<dl class="v-middle" v-show='true' style="height: 20px;">
									<dd>
										{{item.price|currency}}
									</dd>
								</dl>
							</div>
							<div class="num-col">
								1
							</div>
							<div class="discount-col">
								<ul>
									<li>优惠券：{{order.coupon_amount}}</li>
									<li>积分抵：{{order.max_integration}}</li>
									<li>购物积分抵：{{order.max_shopping_coin}}</li>
								</ul>
							</div>
							<div class="pay-col">
								<dl>
									<dt class='color-primary'>{{(item.price*item.quantity)|currency}}</dt>
									<dd class='color-6'>含运费：{{order.express_amount|currency}}</dd>
								</dl>
							</div>
					    </div>
					</li>
				</ul>
			</div>
			<div class="total-acoount">
				<div>
					<strong>订单金额：</strong><i class='color-primary'>￥</i><em class='color-primary' v-text='order.order_amount'></em>
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
				let order_sn = 	this.reqParams.order_sn;
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
	.status{
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		margin-top:40px;
		margin-bottom: 24px;
	}
	.title{
		border-bottom: 1px solid #ddd;
		height: 40px;
		div{
			float: left;
			width: 106px;
			height: 40px;
			line-height: 40px;
			border-bottom: none;
			font-size: 18px;
			text-align: center;
		}
	}
	.order-detail{
		margin: 30px 0px 40px;
		.el-row{
			padding: 14px 0px; 
			font-size: 16px;
		}
		.el-col-8{
			button{
				font-size: 12px;
				border: 1px solid #ddd;
				border-radius: 10px;
				background-color: transparent;
			}
		}
		.user-info{
			float: left;
			margin-right: 100px;
		}
	}
	.order-info{
		.goods-col,.price-col,.num-col,.discount-col,.pay-col{
			float: left;
		}
		.goods-col{
			width: 350px;
		}
		.price-col{
			width: 220px;
			text-align: center;
		}
		.num-col{
			width: 264px;
			text-align: center;
		}
		.discount-col{
			width: 200px;
			text-align: center;
		}
		.pay-col{
			width: 174px;
			text-align: center;
		}
		.order-title{
			height: 40px;
			line-height: 40px;
			overflow: hidden;
			text-align: center;
			padding: 0px 20px;
		}
		.order-info-list{
			width: 100%;
			overflow: hidden;
			li{
				border-top: none;
				position: relative;
			}
			.goods-info{
				overflow: hidden;
				padding: 20px;
			} 
			.goods-msg{
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
				}
				.goods-name{
					line-height: 18px;
					margin-bottom: 14px;
				}
			}
			.price-col{
				height: 90px;
				position: relative;
				.v-middle{
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
			.num-col{
				line-height: 90px;
			}
			.discount-col{
				padding-top: 10px;
				ul{
					font-size: 14px;
					line-height: 24px;
					li{
						border: none;
					}
				}
			}
			.pay-col{
				padding-top: 24px;
				line-height: 20px;
				dt{
					font-size: 16px;
					font-weight: 600;
				}
				dd{
					font-size: 14px;
				}
			}
		}
	}
	.total-acoount{
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
			i{
				margin-left: 20px;
			}
			em{
				font-size: 28px;
				font-weight: 600;
			}
		}
	}
</style>