<template>
	<ul class="wrap">
		<li v-for='item in goods' class="infoList">
			<dl @click='goodDetail(item.goods_id)'>
				<dt>
					<img :src="item.cover" >
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
import 'common/css/goodsList.scss'
	export default {
		props: {
			goods: {
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
$border_color: #f0f0f0;
	.wrap{
		overflow: hidden;
		margin-top: 20px;
		border: {
			left:1px solid $border_color;
			top:1px solid $border_color;
		}
		.infoList{
			float: left;
			width: 25%;
			padding: 20px;
			border: {
  				right:1px solid $border_color;
  				bottom:1px solid $border_color;
  			}
			dl{
				cursor: pointer;
			}
		}
		.infoList:hover{
			border-color: $border_color;
			box-shadow: 0 0 2px 2px $border_color; 
		}
	}
</style>