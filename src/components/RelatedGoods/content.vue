<template>	
	<div class="wrap">
		<v-nav :sellerInfo='sellerInfo'></v-nav>
		<div class="container">
			<div class="listWrap">
				<goods-list @sendSellerInfo='getSellerInfo'></goods-list>
			</div>
			<div class="slider">
				<recommended></recommended>
			</div>
		</div>
	</div>
</template>
<script>
import vNav from '../RelatedGoods/nav'
import goodsList from '../RelatedGoods/goodsList'
import recommended from './recommended'
	export default {
		data(){
			return {
				sellerInfo: {}
			}
		},
		components:{
			vNav,goodsList,recommended
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
				margin-left: 18px;
			}
			.listWrap{
				float: left;
				width: 1000px;
			}
		}
	}
</style>