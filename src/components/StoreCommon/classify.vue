<template>
	<div class="wrap">
		<!-- 分类 -->
		<ul class="navList">
			<li><div class="title">查看全部分类</div></li>
			<li><div class="title">店铺热卖</div></li>
			<li><div class="title">掌柜推荐</div></li>
			<li v-for='(sellerItem,sellerIndex) in sellerCat'><div class="title">
				{{sellerItem.cat_name}} 
				<img src="../../../static/detailImg/close.png" height="14" width="14" v-show='sellerItem.bol' @click='sellerItem.bol=!sellerItem.bol'>
				<img src="../../../static/detailImg/open.png" height="14" width="14" v-show='!sellerItem.bol' @click='sellerItem.bol=!sellerItem.bol'>
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
				sIndex: null
			}
		},
		props:{
			sellerCat:{
				type: Array,
				required: true
			}
		},
		watch: {
			sellerCat:{
				handler(newVal,oldVal){
					let _this = this ;
					let catIndex  = _this.reqParams.catIndex ;
					if (catIndex) {
						let cat = catIndex.split(',') ;
						_this.fIndex = cat[0] -0 ;
						_this.sIndex = cat[1] -0 ;
						_this.sellerCat[_this.fIndex].bol = true ;
						let id = _this.sellerCat[_this.fIndex].child_category[_this.sIndex].seller_cat_id ;
						_this.$emit('getCat',id) ;
					}
				},
				deep: true
			}
		},
		methods:{
			sentCat(sellerIndex,index,id){
				let _this = this ;
				let catIndex =  `${sellerIndex},${index}` ;
				_this.fIndex= sellerIndex;
				_this.sIndex = index;
				location.href= `storeDetail.html?seller_id=2&catIndex=${catIndex}`
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
		.navList{
			width: 220px;
			margin-left: 10px;
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