<template>	
	<div class="wrap">
		<v-nav :sellerInfo='sellerInfo' @sendLevel='getLevel'></v-nav>
		<div class="container">
			<ul class="level" v-show='level'>
				<li v-for='(item,index) in level' @click='checkGoods(index,item.category_id)'>{{item.name}}&nbsp;></li>
			</ul>
			<div class="listWrap">
				<goods-list @sendSellerInfo='getSellerInfo'></goods-list>
			</div>
			<div class="slider">
				<recommended></recommended>
			</div>
			<!-- 猜你喜欢 -->
		 	<you-love></you-love>
		</div>
	</div>
</template>
<script>
import {getRequest} from '../../common/js/common'
import vNav from '../Head/nav'
import goodsList from '../RelatedGoods/goodsList'
import youLove from '../../components/Guess/content'
import recommended from './recommended'
	export default {
		data(){
			return {
				sellerInfo: {},
				level: null
			}
		},
		components:{
			vNav,goodsList,recommended,youLove
		},
		methods:{
			checkGoods(index,id){
				let req = getRequest() ;
				let cat = req.cat.split(',');
				cat = cat.slice(0, index+1);
				cat = cat.join(',');
				location.href = `relatedGoods.html?cat=${cat}&category_id=${id}`;
	     	},
			getSellerInfo(info){
				this.sellerInfo = info;
			},
			getLevel(arr){
				this.level = arr;
			}
		}
	}
</script>
<style lang='scss' scoped>
	.container{
		width: 1250px;
		margin: 20px auto;
		overflow: hidden;
	}
	.level{
		overflow: hidden;
		line-height: 30px;
		margin-bottom: 10px;
		li{
			float: left;
			margin-left: 10px;
			cursor: pointer;
		}
		li:hover{
			color: #c71724 ;
		}
	}
	.slider{
		float: left;
		width: 230px;
		margin-left: 18px;
	}
	.listWrap{
		float: left;
		width: 1000px;
	}
</style>