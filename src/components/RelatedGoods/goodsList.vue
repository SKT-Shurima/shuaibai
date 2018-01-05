<template>
	<div class="wrap">
		<ul class="opera">
			<li style="width:100px;cursor:pointer;" :class='{"is-click":tabIndex===1}' @click='sortType("all")'>综合排序</li>
			<li style="width: 90px;cursor:pointer;" :class='{"is-click":tabIndex===2}' @click='sortType("sale_count")'>
				销量 
				<img src="../../../static/detailImg/sort1.png" height="14" width="14" v-if='tabIndex!==2'>
				<img src="../../../static/detailImg/sort2.png" height="14" width="14" v-else>
			</li>
			<li style="width: 100px;cursor:pointer;" :class='{"is-click":tabIndex===3}' @click='sortType("comments_count")'>
				评论数 
				<img src="../../../static/detailImg/sort1.png" height="14" width="14" v-if='tabIndex!==3'>
				<img src="../../../static/detailImg/sort2.png" height="14" width="14" v-else>
			</li>
			<li style="width:90px;cursor:pointer;" :class='{"is-click":priceIndex>0}' @click='sortType("shop_price")'>
				价格 
				<img src="../../../static/detailImg/sortdown.png" height="14" width="14" v-if='priceIndex===2'>
				<img src="../../../static/detailImg/soreup.png" height="14" width="14" v-else-if='priceIndex===1'>
				<img src="../../../static/detailImg/sortDefault.png" height="14" width="14" v-else>
			</li>
			<li style="width:110px;cursor:pointer;" :class='{"is-click":timeIndex>0}' @click='sortType("date_on_sale")'>
				上架时间 
				<img src="../../../static/detailImg/sortdown.png" height="14" width="14" v-if='timeIndex===2'>
				<img src="../../../static/detailImg/soreup.png" height="14" width="14" v-else-if='timeIndex===1'>
				<img src="../../../static/detailImg/sortDefault.png" height="14" width="14" v-else>
			</li>
			<li style="width:436px;">
				<div class="page">
					{{params.page}}/{{pagesize}}
				</div>
			</li>
			<li class="left-btn">
				<el-button :disabled='params.page-0===1' type='text' size='small' @click='page(1)'>
					<img src="../../../static/detailImg/right.png" height="10" width="7">
				</el-button>
			</li>
			<li class="right-btn">
				<el-button :disabled='params.page-0 === pagesize-0' type='text' size='small' @click='page(0)'>
					<img src="../../../static/detailImg/right.png" height="10" width="7">
				</el-button>
			</li>
		</ul>
		<ul class="goodsList" v-if='goods.length>0'>
			<li v-for='(item,index) in goods' class="info-list">
				<dl @click='goodDetail(item.goods_id)'>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd>
						<div class="ellipsis-2 sell-info" v-text='item.name'></div>
						<div class="price-info">
							<span class='color-primary'>
								{{item.shop_price|currency}}
							</span>
							<em class='color-9'>
								{{item.sale_count}}人付款
							</em>
						</div>
					</dd>
				</dl>
			</li>
		</ul>
		<div v-else class="no-result">
			没有找到相关的宝贝
		</div>
		<pagination :pagesize='pagesize' @changePage='changePage' ref='pagination'></pagination>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import {getRequest,errorInfo} from '../../common/js/common'
import {goodsList} from '../../common/js/api'
import pagination from '../Common/pagination'
	export default {
		data(){
			return {
				reqParams: {
					keyword: ""
				},
				tabIndex: 1,
				priceIndex: 0,
				timeIndex: 0,
				pagesize: 1 ,// 总页数
				params: {
					page: "1",
					keyword:'',
					category_id:'',
					sort: ""
				},
				goods: []
			}
		},
		filters:{
			currency
		},
		components:{
			pagination
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				this.params.page = page + "" ;
				this.initList();
			},
			page(mask){
				this.$refs.pagination.changePage(mask);
			},
			sortType(mask){
				switch (mask) {
					case 'all': 
						this.tabIndex = 1;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ; 
					break ;
					case 'sale_count': 
						this.tabIndex = 2;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ; 
						this.params['sort'] = mask+" desc";
					break ;
					case 'comments_count':
						this.tabIndex = 3;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ;  
						this.params['sort'] = mask+" desc";
					break ;
					case 'shop_price':
						this.tabIndex = null ;
						this.timeIndex = 0 ;
						this.priceIndex++;
						this.priceIndex = this.priceIndex > 2 ? 1 : this.priceIndex ;
						mask += this.priceIndex === 1? ' asc' : this.priceIndex===2 ? ' desc' : '' ; 
						this.params['sort'] = mask;
					break ;
					case 'date_on_sale': 
						this.tabIndex = null ;
						this.priceIndex = 0 ;
						this.timeIndex++ ; 
						this.timeIndex = this.timeIndex > 2 ?1 : this.timeIndex ;
						mask += this.timeIndex === 1 ? ' asc': this.timeIndex === 2 ?' desc' :"" ;
						this.params['sort'] = mask;
					break ;
				}
				this.initList();
			},
			initList(){
				goodsList(this.params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods = content.goods_list ;
						this.pagesize = content.pagesize ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
				this.params.keyword = this.reqParams.keyword?this.reqParams.keyword:"" ;
				this.params.category_id  = this.reqParams.category_id?this.reqParams.category_id:"" ;
				this.initList();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.opera{
		overflow: hidden;
		border: 1px solid #ccc;
		li{
			float: left;
			text-align: center;
			height: 36px;
			line-height: 36px;
			color: #666;
			border-right: 1px solid #ccc;
			background-color: #f5f5f5;
		}
		li:last-child{
			border: none;
		}
		.is-click{
			color: #c71724;
			background-color: #fff;
		}
		.page{
			float: right;
			margin-right: 10px;
		}
		.left-btn,.right-btn{
			width: 36px;
			cursor:pointer;
			.el-button{
				width: 100%;
			}
		}
		.left-btn{
			img{
				transform: rotateZ(180deg);
			}
		}
	}
	.goods-list{
		width: 1001px;
		margin-top: 20px;
		overflow: hidden;
		border: {
			left:1px solid #f0f0f0;
			top:1px solid #f0f0f0;
		}
	}
	.info-list{
		float: left;
		width: 250px;
		height: 330px;
		padding: 14px;
		cursor: pointer;
		border: {
				right:1px solid #f0f0f0;
				bottom:1px solid #f0f0f0;
			} 
		dl{
			cursor: pointer;
		}
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
	.no-result{
		margin-top: 20px;
		color: #c71724;
	}
</style>