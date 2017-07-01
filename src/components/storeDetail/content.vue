<template>	
	<div class="wrap">
		<v-nav :shopHeader='shop_header'></v-nav>
		<div class="container">
			<div class="slider">
				<classify :sellerCat='seller_cat' @getCat='getCatId'></classify>
				<hot-sell></hot-sell>
			</div>
			<div class="listWrap">
				<goods-list :goods='goods' @getGoods='initGoods'></goods-list>
			</div>
		</div>
	</div>
</template>
<script>
import {getSellerInfo} from '../../common/js/api'
import {getRequest,errorInfo} from '../../common/js/common'
import vNav from '../StoreCommon/nav'
import hotSell from '../StoreCommon/hotSell'
import classify from '../StoreCommon/classify'
import goodsList from '../storeDetail/goodsList'
	export default {
		data(){
			return {
				reqParams: null,
				seller_cat: [],
				goods: {}, 
				shop_header: "",
				params: {
					seller_id: "",
					min_price: "",
					max_price: "",
					seller_cat_id: "", 
					is_recommend: "",
					sort: "",
					page: "1"
				}
			}
		},
		components:{
			vNav,hotSell,classify,goodsList
		},
		methods:{
			commonAPI(){
				getSellerInfo(this.params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods = content.goods ;
						if (!this.shop_header&!this.seller_cat.length) {
							this.shop_header = content.seller.shop_header ;
							let arr = content.seller_cat ;
							for(let i = 0 ;i<arr.length;i++){
								arr[i].bol = false ;
							}
							this.seller_cat = arr ;
						}
					}
				})
			},
			getCatId(id){
				let _this = this ;
				_this.params.seller_cat_id = id ;
				_this.commonAPI(); 
			},
			initGoods(params){
				let _this = this ;
				_this.params.min_price = params.min_price ;
				_this.params.max_price = params.max_price ;
				_this.params['sort'] =params['sort'] ;
				_this.params.page = params.page ;
				_this.commonAPI();
				
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
				this.params.seller_id = this.reqParams.seller_id ;
				this.commonAPI() ;
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		.container{
			width: 1250px;
			margin: 20px auto;
			overflow: hidden;
			.slider{
				float: left;
				width: 230px;
				margin-right: 18px;
			}
			.listWrap{
				float: left;
				width: 1000px;
			}
		}
	}
</style>