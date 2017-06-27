<template>
	<ul class="wrap">
		<li v-for='item in goodsList' class="infoList">
			<dl>
				<dt>
					<img :src="item.cover" @click='goodDetail(item.goods_id)'>
				</dt>
				<dd>
					<div class="sellInfo" v-text='item.name'></div>
					<div class="priceInfo">
						<span>
							{{item.shop_price|currency}}
						</span>
						<em>
							{{item.sale_count}}人付款
						</em>
					</div>
				</dd>
			</dl>
		</li>
	</ul>
</template>
<script>
import {currency} from '../../common/js/filter'
	export default {
		props: {
			goodsList: {
				type: Array,
				required: true
			}
		},
		filters: {
			currency
		},
		methods: {
			goodDetail(id){
		   		window.open(`goodDetail.html?goods_id=${id}`) ;
		   	}
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
	.wrap{
		overflow: hidden;
		margin-top: 20px;
		border-left: 1px solid $border_color ;
		border-top: 1px solid $border_color;
		.infoList{
			float: left;
			width: 250px;
			height: 330px;
			padding: 20px;
			border: 1px solid $border_color;
			margin-left: -1px;
			margin-top: -1px;
		}
	}
</style>