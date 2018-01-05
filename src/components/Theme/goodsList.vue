<template>
	<ul class="wrap">
		<li v-for='item in goods' class="info-list">
			<dl @click='goodDetail(item.goods_id)'>
				<dt>
					<img :src="item.cover" >
				</dt>
				<dd>
					<div class="ellipsis-2 sell-info" v-text='item.name'></div>
					<div class="price-info">
						<span class='color-primary'>{{item.shop_price|currency}}</span>
						<em class='color-9'>{{item.sale_count}}人付款</em>
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
	.wrap{
		overflow: hidden;
		margin-top: 20px;
		border: {
			left:1px solid #f0f0f0;
			top:1px solid #f0f0f0;
		}
		.info-list{
			float: left;
			width: 25%;
			padding: 20px;
			border: {
  				right:1px solid #f0f0f0;
  				bottom:1px solid #f0f0f0;
  			}
			dl{
				cursor: pointer;
			}
		}
		.info-list:hover{
			border-color: #f0f0f0;
			box-shadow: 0 0 2px 2px #f0f0f0; 
		}
	}
</style>