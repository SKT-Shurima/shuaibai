<template>	
	 <div class="recommend" style="margin-top:60px;">
	 	<div class="f5-bg color-6 title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">猜你喜欢</span>
	 		<strong @click='init'>换一组<img src="../../../static/commonImg/newGroup.png" height="14" width="14"></strong>
	 	</div>
	 	<ul class="you-love" v-if='loveList'>
	 		<li class="border-f0 info-list" v-for='item in loveList' @click='goodDetail(item.goods_id)'>
	 			<dl>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="ellipsis-2 sell-info" v-text='item.name'>
						</div>
						<div class="price-info">
							<span class="color-primary">{{item.shop_price|currency}}</span>
							<em class="color-9">{{item.sale_count}}人付款</em>
						</div>
					</dd>
				</dl>
	 		</li>
	 	</ul>
	 </div>
</template>
<script>
	import {currency} from '../../common/js/filter'
	import {getGuessLike} from '../../common/js/api'
	import {errorInfo} from '../../common/js/common'
	export default {
		data(){
			return {
				loveList: ''
			}
		},
		filters:{
			currency
		},
		methods: {
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			init(){
				let params = {
					category_id: 1
				};
				getGuessLike(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.loveList = content ;
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
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
	 }
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
	.you-love{
		width: 100%;
		margin-top: 14px;
		overflow: hidden;
	}
	.info-list{
		float: left;
		width: 209px;
		padding: 14px;
		cursor: pointer;
		margin-right: -1px;
		dt{
			width: 180px;
			height: 180px;
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
		.price-info{
			margin-top: 6px;
			span{
				font-size: 18px;
			}
			em{
				margin-top: 4px;
				float: right;
			}
		}
	}
</style>