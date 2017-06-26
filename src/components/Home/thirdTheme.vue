<template>
	<div class="theme">
	    <el-row v-if='theme.goods'>
			<el-col :span='12' class='make_left'>
				<dl>
					<dt style="width:270px;height: 270px;margin-bottom: 8px;">
						<img :src="theme.goods.goods[0].cover" width="100%" height="100%" @click='goodDetail(theme.goods.goods[0].goods_id)'>
					</dt>
					<dd>
						<div class="show_info" v-text='theme.goods.goods[0].name'></div>
	 					<div class="sell_info">
	 						<span>{{theme.goods.goods[0].shop_price|currency}}</span>
	 						<em>{{theme.goods.goods[0].sale_count}}人付款</em>
	 					</div>
					</dd>
					<dl class="goods_info">
						<dt>
							<img :src="theme.goods.goods[1].cover" @click='goodDetail(theme.goods.goods[1].goods_id)'>
						</dt>
						<dd>
							<div class="show_info" v-text='theme.goods.goods[1].name' style="min-height: 58px;"></div>
							<div class="sell_info">
								<span>{{theme.goods.goods[1].shop_price|currency}}</span><em>{{theme.goods.goods[1].sale_count}}人付款</em>
							</div>
						</dd>
					</dl>
				</dl>
			</el-col>
			<el-col :span='12' class='make_right'>
			<ul>
				<li v-for='(item,index) in theme.goods.goods' v-if='index>1'>
					<dl class="goods_info">
						<dt>
							<img :src="item.cover" @click='goodDetail(item.goods_id)'>
						</dt>
						<dd>
							<div class="show_info" v-text='item.name'></div>
							<div class="sell_info">
								<span>{{item.shop_price|currency}}</span><em>{{item.sale_count}}人付款</em>
							</div>
						</dd>
					</dl>
				</li>
			</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
	export default {
		filters: {
			currency
		},
		props: {
			theme: {
				type: Object,
				required: true ,
				default(){
					return {
						goods: null
					}
				}
			}
		},
		methods: {
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)
			}
		}
	}
</script>
<style lang='scss' scoped>
$border_list: #f0f0f0;
$primary:#c71724;
$text_color: #666;
	.theme{
		em{
			a{
				color: #fff;
			}
		}
		img{
			cursor: pointer;
		}
		.show_info{
			width: 100%;
			line-height: 18px;
			min-height: 36px;
			color: #333;
			overflow : hidden;
		  	text-overflow: ellipsis;
		  	display: -webkit-box;
		  	-webkit-line-clamp: 2;
		  	-webkit-box-orient: vertical;
		}
	.sell_info{
		overflow: hidden;
		padding: 8px 0px;
		span{
			float: left;
			color: $primary;
			font-size: 16px;
			font-weight: 600;
		}
		em{
			line-height: 20px;
			float: right;
			color: $text_color;
		}
	}
	.goods_preprice{
		color: $text_color;
		text-decoration: line-through;
	}
	.goods_info{
		width: 100%;
		height: 110px;
		overflow: hidden;
		padding: 10px;
		dt{
			float: left;
			width: 90px;
			height: 90px;
			img{
				width: 100%;
				height: 90px;
			}
		}
		dd{
			float: left;
			width: 164px;
			height: 90px;
			margin-left: 10px;
		}
	}
		.el-row{
			width: 100%;
			height: 498px;
			margin-top: 10px;
			.show_info{
				line-height: 18px;
			}
			.make_left{
				padding: 20px;
				height: 100%;
				border-top: 1px solid $border_list;
				border-left: 1px solid $border_list;
				border-bottom: 1px solid $border_list;
				.make_img{
					overflow: hidden;
					width: 100%;
					img{
						width: 100%;
					}
				}
				.goods_info{
					padding: 0px;
					padding-top: 20px;
					border-top: 1px solid $border_list;
				}
			}
			.make_right{
				border-left: 1px solid $border_list;
				border-right: 1px solid $border_list;
				border-bottom: 1px solid $border_list;
				ul{
					width: 100%;
					height: 498px;
					li{
						width: 100%;
						padding: 10px;
						height: 25%;
						border-top: 1px solid $border_list;
						.show_info{
							min-height: 58px;
						}
					}
				}
			}
		}
	}
</style>