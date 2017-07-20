<template>
	<!-- 热销排行 -->
		<div class="hotSell">
		<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">精品推荐</span>
	 	</div>
			<ul v-if='hightGoods'>
				<li v-for='(item,index) in hightGoods' class="infoList" :key='item'>
					<dl  @click='goodDetail(item.goods_id)'>
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
import {getRequest,errorInfo} from '../../common/js/common'
import {getHighGoods} from '../../common/js/api'
	export default {
		data(){
			return {
				reqParams: null,
				hightGoods: null
			}
		},
		filters:{
			currency
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
				let params = {
					keyword: this.reqParams.keyword ? this.reqParams.keyword : " "
				}
				getHighGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.hightGoods = content;	
					}
				})
			})
		}
	}
</script>

<style lang='scss' scoped>
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
.infoList{
	dl{
		cursor: pointer;
		dt{
			width: 210px;
			height: 210px;
			img{
				width: 100%;
				height: 100%; 
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
			.sellInfo{
				height: 36px;
				line-height: 18px;
				font-weight: 600;
				margin-top: 10px;
			}
			/*价格信息*/
			.priceInfo{
				margin-top: 6px;
				span{
					font-size: 18px;
					font-weight: 600;
					color: $primary;
				}
				em{
					margin-top: 4px;
					float: right;
					color: #999;
				}
			}
		}	 
	}
}
	/*热销*/
	.hotSell{
		.title{
			width: 100%;
			height: 40px;
			padding: 10px;
			line-height: 20px;
			color: $text_color;
			background-color: $bg_title;
			.icon{
				display: inline-block;
				width: 8px;
				height: 20px;
				background-color: $primary;
			}
			span{
				font-size: 16px;
				font-weight: 600;
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
</style>