<template>	
	<div class="wrap">
		<v-nav :shopHeader='shop_header'></v-nav>
		<div class="container">
			<div class="slider">
				<store-info></store-info>
				<classify :sellerCat='seller_cat' @getCat='getCatId' :seller-id='seller_id' style='margin-top: 40px;'></classify>
				<hot-sell></hot-sell>
			</div>
			<div class="list-wrap">
				<goods-list :goods='goods' @getGoods='initGoods'></goods-list>
			</div>
		</div>
	</div>
</template>
<script>
import {getSellerInfo} from '../../common/js/api'
import {getRequest,errorInfo} from '../../common/js/common'
import vNav from '../StoreCommon/nav'
import storeInfo  from '../StoreCommon/storeInfo'
import hotSell from '../StoreCommon/hotSell'
import classify from '../StoreCommon/classify'
import goodsList from '../storeDetail/goodsList'
	export default {
		data(){
			return {
				reqParams: null,
				seller_cat: [],
				seller_id: '',
				goods: {}, 
				shop_header: {},
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
			vNav,storeInfo,hotSell,classify,goodsList
		},
		methods:{
			commonAPI(){
				let params = this.params ;
				getSellerInfo(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods = content.goods ;
						if (this.shop_header) {
							this.shop_header = content.seller ;
						}
						if (!this.seller_cat.length) {
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
				this.params.seller_cat_id = id ;
				this.commonAPI(); 
			},
			initGoods(params){
				this.params.min_price = params.min_price ;
				this.params.max_price = params.max_price ;
				this.params['sort'] =params['sort'] ;
				this.params.page = params.page ;
				this.commonAPI();
				
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
				this.params.seller_id = this.reqParams.seller_id ;
				this.seller_id = this.reqParams.seller_id ;
				let is_recommend = this.reqParams.is_recommend ;
				if (is_recommend) {
					this.params.is_recommend = is_recommend
				}
				this.commonAPI() ;
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
	}
	.container{
		width: 1250px;
		margin: 20px auto;
		overflow: hidden;
	}
	.slider{
		float: left;
		width: 230px;
		margin-right: 18px;
	}
	.list-wrap{
		float: left;
		width: 1000px;
	}
</style>