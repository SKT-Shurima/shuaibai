<template>
	<!-- 热销排行 -->
		<div class="hotSell">
			<div class="title">
				<div class="slider"></div>
				<div class="text">热销排行</div>
				<div class='slider'></div>
			</div>
			<ul v-if='hotList'>
				<li v-for='item in hotList' class="infoList">
					<dl @click='goodDetail(item.goods_id)'>
						<dt>
							<img :src="item.cover">
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
		</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import {goodsDetail,getHotGoods} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
	export default {
		data(){
			return {
				hotList: null
			}
		},
		filters:{
			currency
		},
		props:{
			sellerId:{
				type: String
			}		
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let params = {
					seller_id: this.sellerId-0
				}
				getHotGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.hotList = content;	
					}
				})
			})
		}
	}
</script>

<style lang='scss' scoped>
$text_color: #666;
$border_color: #f0f0f0;
$primary:#c71724;
	/*热销*/
	.hotSell{
		.title {
			width: 192px;
			overflow: hidden;
			margin: 72px auto 12px;
			.slider,.text{
				float: left;
			}
			.slider{
				width: 46px;
				height: 1px;
				margin-top: 12px;
				background-color: #ccc;
			}
			.text{
				width: 100px;
				text-align: center;
				font-size: 16px;
				color: $text_color;
			}
		}
		ul{
			width: 240px;
			border: 1px solid $border_color;
			li{
				width: 100%;
				height: 310px;
				padding: 15px;
				border-bottom: 1px solid $border_color;
			}
			li:last-child{
				   border-bottom: none; 
			}
		}
	}
	.infoList{
		dl{
			cursor: pointer;
		}
		dt{
			width: 210px;
			height: 210px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer; 
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
			.sellInfo{
				height: 36px;
				line-height: 18px;
				margin-top: 10px;
			}
			/*价格信息*/
			.priceInfo{
				margin-top: 6px;
				span{
					font-size: 18px;
					color: #c71724;
				}
				em{
					margin-top: 4px;
					float: right;
					color: #999;
				}
			}
		}
	}
</style>