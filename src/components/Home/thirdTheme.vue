<template>
	<div class="theme" v-if='showBol'>
	    <el-row
			<el-col :span='12' class='border-f0 make-left'>
				<dl>
					<dt style="width:270px;height: 270px;margin-bottom: 8px;">
						<img :src="theme.goods.goods[0].cover" width="100%" height="100%" @click='goodDetail(theme.goods.goods[0].goods_id)'>
					</dt>
					<dd>
						<div class="ellipsis-3 color-3 show-info" v-text='theme.goods.goods[0].name'></div>
	 					<div class="sell-info">
	 						<span class="color-primary">{{theme.goods.goods[0].shop_price|currency}}</span>
	 						<em class="color-6">{{theme.goods.goods[0].sale_count}}人付款</em>
	 					</div>
					</dd>
					<dl class="goods-info" v-if='theme.goods.goods.length>1'>
						<dt>
							<img :src="theme.goods.goods[1].cover" @click='goodDetail(theme.goods.goods[1].goods_id)'>
						</dt>
						<dd>
							<div class="ellipsis-3 color-3 show-info" v-text='theme.goods.goods[1].name' style="height: 58px;"></div>
							<div class="sell-info">
								<span class="color-primary">{{theme.goods.goods[1].shop_price|currency}}</span>
								<em class="color-6">{{theme.goods.goods[1].sale_count}}人付款</em>
							</div>
						</dd>
					</dl>
				</dl>
			</el-col>
			<el-col :span='12' class='border-f0 make-right'>
			<ul>
				<li v-for='(item,index) in theme.goods.goods' v-if='index>1'>
					<dl class="goods-info">
						<dt>
							<img :src="item.cover" @click='goodDetail(item.goods_id)'>
						</dt>
						<dd>
							<div class="ellipsis-3 color-3 show-info" v-text='item.name'></div>
							<div class="sell-info">
								<span class="color-primary">{{item.shop_price|currency}}</span>
								<em class="color-6">{{item.sale_count}}人付款</em>
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
		data(){
			return {
				showBol: false
			}
		},
		filters: {
			currency
		},
		props: {
			theme: {
				type: Object,
				required: true 
			}
		},
		watch: {
			theme(newVal,oldVal){
				if (newVal.goods.goods.length) {
					this.showBol =  true;
				}
				
			}
		},
		methods: {
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		}
	}
</script>
<style lang='scss' scoped>
	.theme{
		height: 498px;
		margin-top: 10px;
		img{
			cursor: pointer;
		}
	}
	.show-info{
		width: 100%;
		line-height: 18px;
		height: 36px;
	}
	.sell-info{
		overflow: hidden;
		padding: 8px 0px;
		span{
			float: left;
			font-size: 16px;
			font-weight: 600;
		}
		em{
			line-height: 20px;
			float: right;
		}
	}
	.goods-info{
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
		height: 498px;
		margin-top: 10px;
		.show-info{
			line-height: 18px;
		}
	}
	.make-left{
		padding: 18px;
		height: 100%;
		border-right: none;
		.make-img{
			overflow: hidden;
			width: 100%;
			img{
				width: 100%;
			}
		}
		.goods-info{
			padding: 0px;
			padding-top: 20px;
			border-top: 1px solid #f0f0f0;
		}
	}
	.make-right{
		border-top: none;
		ul{
			height: 498px;
		}
		li{
			padding: 10px;
			height: 25%;
			border-top: 1px solid #f0f0f0;
			.show-info{
				height: 58px;
			}
		}
	}
</style>