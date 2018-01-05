<template>
	<!-- 热销排行 -->
	<div class="hot-sell">
		<div class="color-6 f5-bg title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">精品推荐</span>
	 	</div>
		<ul class='border-f0' v-if='hightGoods'>
			<li v-for='(item,index) in hightGoods' class="info-list" :key='index'>
				<dl  @click='goodDetail(item.goods_id)'>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="ellipsis-2 sell-info" v-text='item.name'></div>
						<div class="price-info">
							<span class='color-primary'>{{item.shop_price|currency}}</span>
							<em class='color-6'>{{item.sale_count}}人付款</em>
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
					keyword: this.reqParams.keyword ? this.reqParams.keyword : " ",
					category_id: this.reqParams.category_id?this.reqParams.category_id:""
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
	.info-list{
		dl{
			cursor: pointer;
		}
		dt{
			width: 198px;
			height: 198px;
			img{
				width: 100%;
				height: 100%; 
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
		}
		.sell-info{
			height: 36px;
			line-height: 18px;
			margin-top: 10px;
		}
		/*价格信息*/
		.price-info{
			margin-top: 6px;
			span{
				font-size: 18px;
				font-weight: 600;
			}
			em{
				margin-top: 4px;
				float: right;
			}
		}
	}
	/*热销*/
	.hot-sell{
		.title{
			width: 100%;
			height: 40px;
			padding: 10px;
			line-height: 20px;
			.icon{
				display: inline-block;
				width: 8px;
				height: 20px;
			}
			span{
				font-size: 16px;
				font-weight: 600;
			}
		}
		ul{
			width: 230px;
			margin-top: 10px;
		}
		li{
			width: 100%;
			height: 310px;
			padding: 15px;
			border-bottom: 1px solid #f0f0f0;
		}
		li:last-child{
			border-bottom: none; 
		}
	}
</style>