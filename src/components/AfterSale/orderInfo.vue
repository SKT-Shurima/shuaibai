<template>
	<div class="wrap">
		<div class="box" v-if='orderInfo.goods'>
			<dl class="goodsInfo">
				<dt>
					<img :src="orderInfo.goods.image">
				</dt>
				<dd class="name" v-text='orderInfo.goods.name'></dd>
				<dd class="type">
					<span>规格：{{orderInfo.goods.option_name}}</span>
					<em>套餐：{{orderInfo.goods.goods_type}}</em>
				</dd>
			</dl>
			<div class="storeInfo">
				<div class="storeName">
					<span v-text='orderInfo.shop_name'></span>
					<button><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
				</div>
				<ul>
					<li>
						<el-row>
							<el-col :span='8'>单价：</el-col>
							<el-col :span='16'>{{orderInfo.goods.price|currency}} × {{orderInfo.goods.quantity}}<em>×1</em></el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>小计：</el-col>
							<el-col :span='16'><strong>{{orderInfo.goods.price*orderInfo.goods.quantity|currency}}</strong></el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<ul class="orderInfo">
				<li>
					<el-row>
						<el-col :span='8'>订单号：</el-col>
						<el-col :span='16'><span v-text='orderInfo.order_sn'></span></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>运费：</el-col>
						<el-col :span='16'>{{orderInfo.express_amount|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>总优惠：</el-col>
						<el-col :span='16'>-{{0|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>合计：</el-col>
						<el-col :span='16'><strong>{{orderInfo.goods.price*orderInfo.goods.quantity|currency}}</strong></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>成交时间：</el-col>
						<el-col :span='16'>{{date_pay*1000|dateStyle}}&nbsp;{{date_pay*1000|timeStyle}}</el-col>
					</el-row>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {currency,dateStyle,timeStyle} from '../../common/js/filter'
import {getOrderDetail} from '../../common/js/api'
import {MessageBox} from  'element-ui'
	export default {
		data(){
			return {
			}
		},
		props:{
			orderInfo:{
				type: Object,
				required : true ,
				default(){
					return{
						goods: null
					}
				}
			}
		},
		filters:{
			currency,dateStyle,timeStyle
		},
		mounted(){
			this.$nextTick(()=>{
				
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
	.wrap{
		.goodsInfo{
			padding-bottom: 10px;
			border-bottom: 1px solid $border_color;
			dt{
				width: 200px;
				height: 200px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.name{
				margin: 8px 0px;
				line-height: 18px;
			}
			.type{
				overflow: hidden;
				line-height: 20px;
				color: $text_color;
				span{
					float: left;
				}
				em{
					float: right;
				}
			}
		}
		.el-row{
			margin-top: 16px;
			.el-col-8{
				color: $text_color;
			}
			.el-col-16{
				strong{
					font-size: 14px;
					font-weight: 600;
					color: $primary;
				}
				span{
					color: #0080ca;
				}
			}
		}
		.storeInfo{
			padding-bottom: 20px;
			border-bottom: 1px solid $border_color;
			.storeName{
				margin-top: 20px;
				span{
					line-height: 20px;
				}
				button{
					outline: none;
					border-radius: 10px;
					border: 1px solid $border_color;
					background-color: transparent;
				}
			}
		}
	}
</style>