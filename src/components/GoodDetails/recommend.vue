<template>
	<div class="recommend">
	 	<div class="color-6 f5-bg title">
	 		<i class="primary-bg icon"></i>
	 		<span>店内推荐</span>
	 		<strong @click='init'>换一组<img src="../../../static/commonImg/newGroup.png" height="14" width="14"></strong>
	 	</div>
	 	<ul v-if='storeRecommend'>
	 		<li class="info-list" v-for='item in storeRecommend'>
	 			<dl @click='goodDetail(item.goods_id)'>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="ellipsis-2 sell-info">{{item.name}}</div>
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
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
		margin-top: 70px;
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
			border: {
				left:1px solid #f0f0f0;
				top:1px solid #f0f0f0;
			}
		}
		.info-list{
			width: 25%;
			height: 320px;
			float: left;
			padding: 15px;
			border: {
  				right:1px solid #f0f0f0;
  				bottom:1px solid #f0f0f0;
  			}
			dl{
				cursor: pointer;
			}
			dt{
				width: 216px;
				height: 216px;
			}
			img{
				width: 100%;
				height: 100%;
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
		.info-list:hover{
			border-color: #f0f0f0;
			box-shadow: 0 0 2px 2px #f0f0f0; 
		}
 	}
</style>