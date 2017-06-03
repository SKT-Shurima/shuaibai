<template>
	<div class="wrap">
		<div class="title">
			
		</div>
		<div class="container">
			<dl class="box">
				<dt class="infoCol conTitle">商品信息</dt>
				<dd class="conCol conTitle">售后申请</dd>
			</dl>
			<dl class="box">
				<dt class="infoCol" style="min-height: 600px;">
					<dl class="goodsInfo">
						<dt>
							<img src="">
						</dt>
						<dd class="name">
							好饿好饿好饿好饿好饿好饿好饿好饿好饿好饿好饿好饿好饿好饿
						</dd>
						<dd class="type">
							<span>规格：精装品</span>
							<em>套餐：套餐一</em>
						</dd>
					</dl>
					<div class="storeInfo">
						<div class="storeName">
							<span>帅柏商城直营店</span>
							<button><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
						</div>
						<ul>
							<li>
								<el-row>
									<el-col :span='8'>单价：</el-col>
									<el-col :span='16'>{{199|currency}}<em>×1</em></el-col>
								</el-row>
								<el-row>
									<el-col :span='8'>小计：</el-col>
									<el-col :span='16'><strong>{{199|currency}}</strong></el-col>
								</el-row>
							</li>
						</ul>
					</div>
					<ul class="orderInfo">
						<li>
							<el-row>
								<el-col :span='8'>订单号：</el-col>
								<el-col :span='16'><span>1216551</span></el-col>
							</el-row>
						</li>
						<li>
							<el-row>
								<el-col :span='8'>运费：</el-col>
								<el-col :span='16'>{{165|currency}}</el-col>
							</el-row>
						</li>
						<li>
							<el-row>
								<el-col :span='8'>总优惠：</el-col>
								<el-col :span='16'>-{{165|currency}}</el-col>
							</el-row>
						</li>
						<li>
							<el-row>
								<el-col :span='8'>合计：</el-col>
								<el-col :span='16'><strong>1216551</strong></el-col>
							</el-row>
						</li>
						<li>
							<el-row>
								<el-col :span='8'>成交时间：</el-col>
								<el-col :span='16'>2017-01-01 12：:00</el-col>
							</el-row>
						</li>
					</ul>
				</dt>
				<dd class="conCol" style="min-height: 600px;">
					<keep-alive>
						<component :is='currentView'></component>
					</keep-alive>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
import seller from './seller'
import moneyReturn from './moneyReturn'
import goodsReturn from './goodsReturn'
export default {
	data() {
		return {
			currentView:"view1"
		}
	},
	filters: {
		currency
	},
	components:{
		"view0": seller,
		"view1": moneyReturn,
		"view2": goodsReturn
	}
}
	
</script>
<style lang='scss' scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			width: 100%;
			height: 60px;
			background-color: $primary;
		}
		.container{
			margin-top: 6px;
			margin-bottom: 400px;
			.box{
				overflow: hidden;
				.infoCol.conTitle,.conCol.conTitle{
					height: 54px;
					font-size: 14px;
					font-weight: 600;
					color: $primary;
					border: none;
				}
				.infoCol,.conCol{
					float: left;
					border: 1px solid $border_color;
				}
				.infoCol{
					width: 240px;
					padding: 20px;
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
				.conCol{
					width: 1010px;
					padding: 20px 30px;
					margin-left: -1px;
				}
			}
		}
	}
</style>