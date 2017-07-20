<template>
	<div class="recommend">
	 	<div class="title">
	 		<i class="icon"></i>
	 		<span>店内推荐</span>
	 		<strong @click='init'>换一组<img src="../../../static/commonImg/newGroup.png" height="14" width="14"></strong>
	 	</div>
	 	<ul v-if='storeRecommend'>
	 		<li class="infoList" v-for='item in storeRecommend'>
	 			<dl @click='goodDetail(item.goods_id)'>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="sellInfo">
							{{item.name}}
						</div>
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
import 'common/css/goodsList.scss'
import {getRecommend} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
import {currency} from '../../common/js/filter'
	export default {
		data(){
			return {
				storeRecommend: null,
			}
		},
		props:{
			seller_id: {
				type: String,
				required: true
			}
		},
		filters:{
			currency
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)  ;
			},
			init(){
				let params ={
					seller_id: this.seller_id
				}
				getRecommend(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.storeRecommend = content ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$primary:#c71724;
$bg_title: #f5f5f5;
$border_color: #f0f0f0; 
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
		margin-top: 70px;
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
				vertical-align: 4px;
			}
			strong{
				float: right;
				font-size: 14px;
				cursor: pointer;
			}
			img{
				vertical-align: -2px;
				margin-left: 10px;
			}
		}
		ul{
			width: 100%;
			overflow: hidden;
			margin-top: 10px;
			.infoList{
				width: 25%;
				height: 320px;
				float: left;
				padding: 15px;
				border: 1px solid transparent;
				dl{
					cursor: pointer;
				}
				dt{
					width: 216px;
					height: 216px;
				}
			}
			.infoList:hover{
				border-color: $border_color;
				box-shadow: 0 0 2px 2px $border_color; 
			}
		}
		.youLove{
			width: 100%;
			overflow: hidden;
		}
 }

</style>