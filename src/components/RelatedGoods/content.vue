<template>	
	<div class="wrap">
		<v-nav :sellerInfo='sellerInfo' @sendLevel='getLevel'></v-nav>
		<div class="container">
			<ul class="level" v-show='level'>
				<li v-for='(item,index) in level' @click='checkGoods(index,item.name)'>{{item.name}}&nbsp;></li>
			</ul>
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
import {getRequest} from '../../common/js/common'
import vNav from '../Head/nav'
import goodsList from '../RelatedGoods/goodsList'
import recommended from './recommended'
	export default {
		data(){
			return {
				sellerInfo: {},
				level: null
			}
		},
		components:{
			vNav,goodsList,recommended
		},
		methods:{
			checkGoods(index,name){
				let req = getRequest() ;
				let cat = req.cat.split(',');
				cat = cat.slice(0, index+1);
				cat = cat.join(',');
				location.href=`relatedGoods.html?cat=${cat}&keyword=${name}`;
	     	},
			getSellerInfo(info){
				let _this =this ;
				_this.sellerInfo = info;
			},
			getLevel(arr){
				let _this = this ;
				_this.level = arr;
			}
		},
		mounted(){
			this.$nextTick(()=>{
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.wrap{
		width: 100%;
		.container{
			width: 1250px;
			margin: 20px auto;
			overflow: hidden;
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
					color: $primary ;
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
		}
	}
</style>