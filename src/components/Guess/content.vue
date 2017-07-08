<template>	
	 <div class="recommend" style="margin-top:60px;">
	 	<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">猜你喜欢</span>
	 		<strong @click='init'>换一组<img src="../../../static/commonImg/newGroup.png" height="14" width="14"></strong>
	 	</div>
	 	<ul class="youLove" v-if= 'loveList'>
	 		<li class="infoList" v-for='item in loveList' @click='goodDetail(item.goods_id)'>
	 			<dl>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="sellInfo" v-text='item.name'>
						</div>
						<div class="priceInfo">
							<span>
								{{item.shop_price.toFixed(2)|currency}}
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
				location.href = `goodDetail.html?goods_id=${id}` ;
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
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
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
		.youLove{
			width: 100%;
			margin-top: 14px;
			overflow: hidden;
			.infoList{
				float: left;
				width: 209px;
				padding: 14px;
				cursor: pointer;
				margin-right: -1px;
				border: 1px solid #f0f0f0;
				dl{
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
						.sellInfo{
							height: 36px;
							line-height: 18px;
							font-weight: 600;
							margin-top: 10px;
						}
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
		}
 }
</style>