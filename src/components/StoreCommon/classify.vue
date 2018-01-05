<template>
	<div class="wrap">
		<!-- 分类 -->
		<ul class="border-c nav-list">
			<li><div class="f5-bg title" @click='checkStore'>查看全部分类</div></li>
			<li><div class="f5-bg title"  @click='checkStore(true)'>店铺热卖</div></li>
			<li><div class="f5-bg title"  @click='checkStore(true)'>掌柜推荐</div></li>
			<li v-for='(sellerItem,sellerIndex) in sellerCat'>
				<div class="f5-bg title" >
					<span v-text='sellerItem.cat_name' @click='checkCatId(sellerItem.seller_cat_id)'></span>
					<img src="../../../static/detailImg/close.png" height="14" width="14" v-show='sellerItem.bol&&sellerItem.child_category' @click='sellerItem.bol=!sellerItem.bol'>
					<img src="../../../static/detailImg/open.png" height="14" width="14" v-show='!sellerItem.bol&&sellerItem.child_category' @click='sellerItem.bol=!sellerItem.bol'>
				</div>
				<ul class='cate-list' v-show='sellerItem.bol'>
					<li v-for='(item,index) in sellerItem.child_category' v-text='item.cat_name' @click='sentCat(sellerIndex,index)' class='color-6' :class='{"color-primary":fIndex===sellerIndex&&sIndex===index}'></li>
				</ul>
			</li>
		</ul> 
	</div>
</template>
<script>
import {getRequest} from '../../common/js/common'
	export default{
		data() {
			return {
				reqParams: null,
				fIndex: null,
				sIndex: null,
				once: true
			}
		},
		props:{
			sellerCat:{
				type: Array,
				required: true
			},
			sellerId:{
				type: String
			}
		},
		watch: {
			sellerCat:{
				handler(newVal,oldVal){
					let once = this.once ;
					if (once) {
						let catIndex  = this.reqParams.catIndex ;
						let catId = this.reqParams.catId ;
						if (catIndex) {
							let cat = catIndex.split(',') ;
							this.fIndex = cat[0] -0 ;
							this.sIndex = cat[1] -0 ;
							this.sellerCat[this.fIndex].bol = true ;
							let id = this.sellerCat[this.fIndex].child_category[this.sIndex].seller_cat_id ;
							this.$emit('getCat',id) ;
						}
						if (catId) {
							this.$emit('getCat',catId) ;
						}
					}
					this.once = false ;
				},
				deep: true
			}
		},
		methods:{
			checkStore(mask){
	     		let id = this.sellerId ;
	     		if (true) {
	     			window.open(`storeDetail.html?seller_id=${id}&is_recommend=1`) ;
	     		}else{
	     			window.open(`storeDetail.html?seller_id=${id}`) ;
	     		}
	     		
	     	},
			sentCat(sellerIndex,index,id){
				let catIndex =  `${sellerIndex},${index}` ;
				let sellerId = this.sellerId ;
				this.fIndex= sellerIndex;
				this.sIndex = index;
				window.open(`storeDetail.html?seller_id=${sellerId}&catIndex=${catIndex}`);
			},
			checkCatId(catId){
				let id = this.sellerId ;
				window.open(`storeDetail.html?seller_id=${id}&catId=${catId}`);
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		margin-top: 0px;
	}
	.nav-list{
		width: 220px;
		border-bottom: none;
		li{
			cursor: pointer;
		}
	}
	.title{
		position: relative;
		padding-left: 16px;
		line-height: 40px;
		font-weight: 600;
		font-size: 14px;
		border-bottom: 1px solid #ccc;
		img{
			position: absolute;
			top: 0px;
			bottom: 0px;
			right: 10px;
			margin: auto;
		}
	}
	.cate-list{
		border-bottom: 1px solid #ccc;
		li{
			line-height: 36px;
			padding-left: 10px;
			font-weight: 400;
		}
	}
</style>