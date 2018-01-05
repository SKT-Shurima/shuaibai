<template>
	<div class="wrap">
		<div class="box">
			<special :special='special'></special>
			<div class="theme-box">
				<div class="theme">
					<div class="them_title">
						<div>精品优质店铺</div>
					</div>
					<ul class="store-list">
						<li class='border-f0' :class="{'margin-r': (index+1)%3}" v-for='(item,index) in seller'>
							<img :src="item.image" @click='storeDetail(item.seller_ic)'> 
						</li>
					</ul>
				</div>
				<div class="theme">
					<div class="them_title">
						<div>精品优质单品</div>
					</div>
					<ul class="single-list">
						<li class='border-f0' :class="{'margin-r': (index+1)%3}" v-for='(item,index) in goods'>
							<dl>
								<dt>
									<img :src="item.cover" @click='goodDetail(item.goods_id)'>
								</dt>
								<dd>
									<div class="price-info">
									 	<div class="price">
									 		<em>&yen;</em>
											<span v-text='item.shop_price/2'></span>
									 	</div>
									</div>
									<div class="origin-price">
										<div style="text-decoration: line-through;">{{item.shop_price|currency}}</div>
										<div>积分半价优惠</div>
									</div>
									<div class="begin" @click='goodDetail(item.goods_id)'>
										立即开抢
									</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import {getThematicActivities} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
import special from '../ThemeCommon/special'
import pagination from '../../components/Common/pagination'
	export default {
		data(){
			return {
				pagesize: 1,
				page:0,
				special: [],
				specialIndex: 0 ,
				seller: null,
				goods: null
			}
		},
		filters:{
			currency
		},
		components:{
			special,pagination
		},
		methods: {
			storeDetail(id){
				window.open(`storeDetail.html?seller_id=${id}`) ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				this.page = page ;
				this.initList();
			},
			initList(){
				let page = this.page + "" ;
				let params = {
					type: "5",
					page: page
				}
				getThematicActivities(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.special = content.special ;
						this.seller = content.seller ;
						this.goods = content.goods.goods ;
						this.pagesize  =content.goods.pagesize ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList();
			})
		}
  }
</script>
<style scoped lang='scss'>
	.wrap{
		width: 100%;
	}
	.box{
		width: 1210px;
		margin: 0px auto;
	}
	.theme-box{
		width: 100%;
	}
	.theme{
		width: 100%;
		margin-top: 18px;
	}
	.them_title{
		width: 100%;
		border-bottom: 2px solid #f24450;
		overflow: hidden;
		div{
			float: left;
			width: 180px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			font-size: 20px;
			text-align: center;
			border-top-right-radius: 8px;
			background-color: #f24450;
		}
	}
	.store-list{
		width: 100%;
		overflow: hidden;
		li{
			width: 400px;
			height: 200px;
			margin-top: 12px;
			float: left;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	.margin-r{
		margin-right: 5px;
	}
	.single-list{
		width: 100%;
		overflow: hidden;
		margin-bottom: 70px;
		li{
			width: 400px;
			height: 356px;
			margin-top: 12px;
			float: left;
		}
		dl{
			width: 396px;
		}
		dt{
			width: 100%;
			height: 294px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			width: 100%;
			height: 60px;
			background-color: #f61d4a;
		}
		.price-info,.origin-price{
			float: left;
			color: #fff;
			height: 40px;
			margin-top: 10px;
		}
		.price-info{
			padding-top: 6px;
			margin-left: 10px;
			em{
				font-size: 14px;
				vertical-align: baseline;
			}
			span{
				font-size: 28px;
			}
		}
		.origin-price{
			div{
				color: #ffd3d8;
				line-height: 20px;
				height: 20px;
				margin-left: 10px;
			}
		}
		.begin{
			float: right;
			width: 116px;
			line-height: 60px;
			font-size: 20px;
			text-align: center;
			margin-right: -1px;
			cursor: pointer;
			color: #f24450;
			background: url('../../../static/themeImg/mask.png') no-repeat;
		}
	}
</style>