<template>
	<div class="wrap">
		<!-- 分类 -->
		<ul class="navList">
			<li><div class="title" @click='checkStore'>查看全部分类</div></li>
			<li><div class="title"  @click='checkStore(true)'>店铺热卖</div></li>
			<li><div class="title"  @click='checkStore(true)'>掌柜推荐</div></li>
			<li v-for='(sellerItem,sellerIndex) in sellerCat'><div class="title" >
				<span v-text='sellerItem.cat_name' @click='checkCatId(sellerItem.seller_cat_id)'></span>
				<img src="../../../static/detailImg/close.png" height="14" width="14" v-show='sellerItem.bol&&sellerItem.child_category' @click='sellerItem.bol=!sellerItem.bol'>
				<img src="../../../static/detailImg/open.png" height="14" width="14" v-show='!sellerItem.bol&&sellerItem.child_category' @click='sellerItem.bol=!sellerItem.bol'>
			</div>
				<ul v-show='sellerItem.bol'>
					<li v-for='(item,index) in sellerItem.child_category' v-text='item.cat_name' @click='sentCat(sellerIndex,index)' :class='{"active":fIndex===sellerIndex&&sIndex===index}'></li>
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
						let _this = this ;
						let catIndex  = _this.reqParams.catIndex ;
						let catId = _this.reqParams.catId ;
						if (catIndex) {
							let cat = catIndex.split(',') ;
							_this.fIndex = cat[0] -0 ;
							_this.sIndex = cat[1] -0 ;
							_this.sellerCat[_this.fIndex].bol = true ;
							let id = _this.sellerCat[_this.fIndex].child_category[_this.sIndex].seller_cat_id ;
							_this.$emit('getCat',id) ;
						}
						if (catId) {
							_this.$emit('getCat',catId) ;
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
				let _this = this ;
				let catIndex =  `${sellerIndex},${index}` ;
				let sellerId = _this.sellerId ;
				_this.fIndex= sellerIndex;
				_this.sIndex = index;
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
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
	.wrap{
		width: 100%;
		margin-top: 0px;
		.navList{
			width: 220px;
			border-left: 1px solid $border_color;
			border-right: 1px solid $border_color;
			border-top: 1px solid $border_color;
			li{
				cursor: pointer;
			}
			.title{
				position: relative;
				background-color: $bg_title;
				padding-left: 16px;
				line-height: 40px;
				font-weight: 600;
				font-size: 14px;
				border-bottom: 1px solid $border_color;
				img{
					position: absolute;
					top: 0px;
					bottom: 0px;
					right: 10px;
					margin: auto;

				}
			}
			ul{
				border-bottom: 1px solid $border_color;
				li{
					color: $text_color;
					line-height: 36px;
					padding-left: 10px;
					font-weight: 400;
				}
				.active{
					color: $primary;
				}
			}
		}
	}
</style>