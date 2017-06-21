<template>	
	<div class="wrap">
		<v-nav :sellerInfo='sellerInfo'></v-nav>
		<div class="container">
			<div class="listWrap">
				<goods-list @sendSellerInfo='getSellerInfo'></goods-list>
			</div>
			<div class="slider">

			</div>
		</div>
		

	</div>
</template>
<script>
import vNav from '../StoreCommon/nav'
import goodsList from '../RelatedGoods/goodsList'
	export default {
		data(){
			return {
				sellerInfo: {}
			}
		},
		components:{
			vNav,goodsList
		},
		methods:{
			getSellerInfo(info){
				let _this =this ;
				_this.sellerInfo = info;
			}
		},
		mounted(){
			this.$nextTick(()=>{
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