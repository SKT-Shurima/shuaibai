<template>
	<div class="wrap">
		<ul class="opera">
			<li style="width:100px;" :class='{"isclick":tabIndex===1}' @click='sortType("all")'>综合排序</li>
			<li style="width: 90px;" :class='{"isclick":tabIndex===2}' @click='sortType("sale_count")'>
				销量 
				<img src="../../../static/detailImg/sort1.png" height="14" width="14" v-if='tabIndex!==2'>
				<img src="../../../static/detailImg/sort2.png" height="14" width="14" v-else>
			</li>
			<li style="width: 100px;" :class='{"isclick":tabIndex===3}' @click='sortType("praise_rate")'>
				好评度 
				<img src="../../../static/detailImg/sort1.png" height="14" width="14" v-if='tabIndex!==3'>
				<img src="../../../static/detailImg/sort2.png" height="14" width="14" v-else>
			</li>
			<li style="width:90px;" :class='{"isclick":priceIndex>0}' @click='sortType("shop_price")'>
				价格 
				<img src="../../../static/detailImg/sortdown.png" height="14" width="14" v-if='priceIndex===2'>
				<img src="../../../static/detailImg/soreup.png" height="14" width="14" v-else-if='priceIndex===1'>
				<img src="../../../static/detailImg/sortDefault.png" height="14" width="14" v-else>
			</li>
			<li style="width:110px;" @click='sortType("date_on_sale")'>
				上架时间 
				<img src="../../../static/detailImg/sortdown.png" height="14" width="14" v-if='timeIndex===2'>
				<img src="../../../static/detailImg/soreup.png" height="14" width="14" v-else-if='timeIndex===1'>
				<img src="../../../static/detailImg/sortDefault.png" height="14" width="14" v-else>
			</li>
			<li class="search">
				<dl class="priceRange">
					<dt>
						<input type="" name="" v-model='params.min_price'>
						<span>￥</span>
					</dt>
					<dd>到</dd>
					<dt>
						<input type="" name="" v-model='params.max_price'>
						<span>￥</span>
					</dt>
				</dl>
				<div class="searchBtn">
					<el-button size='mini' type='primary'@click='sortType'>搜索</el-button>
				</div>
				<div class="page">
					{{params.page}}/{{goods.pagesize}}
				</div>
			</li>
			<li class="leftBtn">
				<el-button :disabled='params.page-0===1' type='text' size='small' @click='page(0)'>
					<img src="../../../static/detailImg/right.png" height="10" width="7">
				</el-button>
			</li>
			<li class="rightBtn">
				<el-button :disabled='params.page-0 === pagesize-0' type='text' size='small' @click='page(1)'>
					<img src="../../../static/detailImg/right.png" height="10" width="7">
				</el-button>
			</li>
		</ul>
		<ul class="goodsList" v-if='goods.seller_goods'>
			<li v-for='(item,index) in goods.seller_goods' class="infoList" >
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
		<pagination :pagesize='goods.pagesize' @changePage='changePage' ref='pagination'></pagination>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import pagination from '../Common/pagination'
	export default {
		data(){
			return {
				tabIndex: 1,
				priceIndex: 0,
				timeIndex: 0,
				params: {
					min_price: "",
					max_price: "",
					sort:"",
					page:"1"
				},
			}
		},
		props:{
			goods: {
				type: Object,
				required: true,
				default(){
					return {
						seller_goods: null
					}
				} 
			}
		},
		filters:{
			currency
		},
		components:{
			pagination
		},
		methods:{
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.params.page = page + "" ;
				_this.$emit('getGoods',_this.params);
			},
			page(mask){
				let _this = this;
				_this.$refs.pagination.changePage(mask);
			},
			sortType(mask){
				let _this = this ;
				switch (mask) {
					case 'all': 
						_this.tabIndex = 1;
						_this.priceIndex = 0 ;
						_this.timeIndex = 0 ; 
					break ;
					case 'sale_count': 
						_this.tabIndex = 2;
						_this.priceIndex = 0 ;
						_this.timeIndex = 0 ; 
						_this.params['sort'] = mask+" desc";
					break ;
					case 'praise_rate':
						_this.tabIndex = 3;
						_this.priceIndex = 0 ;
						_this.timeIndex = 0 ;  
						_this.params['sort'] = mask+" desc";
					break ;
					case 'shop_price':
						_this.tabIndex = null ;
						_this.timeIndex = 0 ;
						_this.priceIndex++;
						_this.priceIndex = _this.priceIndex > 2 ? 1 : _this.priceIndex ;
						mask += _this.priceIndex === 1? ' asc' : _this.priceIndex===2 ? ' desc' : '' ;  
						_this.params['sort'] = mask;
					break ;
					case 'date_on_sale': 
						_this.tabIndex = null ;
						_this.priceIndex = 0 ;
						_this.timeIndex++;
						_this.timeIndex = _this.timeIndex > 2 ?1 : _this.timeIndex ;
						mask += _this.timeIndex === 1 ? ' asc': _this.timeIndex === 2 ?' desc' :"" ; 
						_this.params['sort'] = mask;
					break ;
				}
				_this.$emit('getGoods',_this.params);
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		}
	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$border_color: #f0f0f0;
$primary:#c71724;
$bg_color: #f5f5f5;
	.wrap{
		width: 100%;
		.opera{
			overflow: hidden;
			border: 1px solid #ccc;
			li{
				float: left;
				text-align: center;
				height: 36px;
				line-height: 36px;
				cursor: pointer;
				color: $text_color;
				border-right: 1px solid #ccc;
				background-color: $bg_color;
			}
			li:last-child{
				border: none;
			}
			.isclick{
				color: $primary;
				background-color: #fff;
			}
			.search{
				width: 436px;
				overflow: hidden;
				.priceRange,.searchBtn{
					float: left;
				}
				.priceRange{
					float: left;
					padding-left: 18px;
					dt,dd{
						float: left;
						overflow: hidden;
						margin-right: 12px;
					}
					dt{
						position: relative;
						width: 58px;
						height: 24px;
						margin-top: 6px;
						input{
							position: absolute;
							top: 0px;
							left: 0px;
							display: inline-block;
							width: 58px;
							height: 24px;
							line-height: 24px;
							padding-left: 20px;
						}
						span{
							position: absolute;
							top: 0px;
							left: 0px;
							line-height: 24px;
							margin-left: 6px;
						}
					}
				}
				.searchBtn{
					.el-button{
						width: 40px;
					}
				}
				.page{
					float: right;
					margin-right: 10px;
				}
			}
			.leftBtn,.rightBtn{
				width: 36px;
				.el-button{
					width: 100%;
				}
			}
			.leftBtn{
				img{
					transform: rotateZ(180deg);
				}
			}
		}
		.goodsList{
			width: 1002px;
			margin-top: 20px;
			overflow: hidden;
			.infoList{
				float: left;
				width: 250px;
				height: 330px;
				padding: 14px;
				border: 1px solid transparent; 
				dl{
					cursor: pointer;
					dt{
						width: 220px;
						height: 220px;
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
							margin-top: 10px;
							overflow: hidden;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    -webkit-line-clamp: 2;
						    -webkit-box-orient: vertical;
						}
						/*价格信息*/
						.priceInfo{
							margin-top: 6px;
							span{
								font-size: 18px;
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
			.infoList:hover{
				border-color: $border_color;
				box-shadow: 0 0 2px 2px $border_color; 
			}
		}
	}
</style>