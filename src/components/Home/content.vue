<template>
	<div class="wrap">
		<div class="update-box">
			<el-row class="theme-title">
		 		<el-col :span='6' :offset='1'>
		 			<div class="slider"></div>
		 		</el-col>
		 		<el-col :span='10'>
		 			<div class="text">
		 				<a :href="'specialActivities.html?title='+newGoods.nav_title" style='color:#656565;'>
		 					<img src="../../../static/indexImg/newDay.png" height="24" width="24">
		 					{{newGoods.nav_title}}
		 				</a>
		 			</div>
		 		</el-col>
		 		<el-col :span='6' :offset='1'>
		 			<div class="slider"></div>
		 		</el-col>
		 	</el-row>
		 	<el-row class='update-list' v-if='newGoods'>
		 		<el-col :span='4' v-for='item in newGoods.goods' >
		 			<dl>
		 				<dt>
		 					<img :src="item.cover" @click='goodDetail(item.goods_id)'>
		 				</dt>
		 				<dd>
		 					<div class="color-3 ellipsis-2 show-info" v-text='item.name'></div>
		 					<div class="sell-info">
		 						<span class="color-primary">{{item.shop_price|currency}}</span>
		 						<em>{{item.sale_count}}人付款</em>
		 					</div>
		 				</dd>
		 			</dl>
		 		</el-col>
		 	</el-row>
		</div>
		<ul class="theme-box">
			<!-- 一元抢购 -->
			<li v-if='firstTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${firstTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%" @click='jump(firstTheme.img.jump)'></div>
				<first-theme :theme='firstTheme'></first-theme>
			</li>
			<!-- 舌尖美食 -->
			<li style="margin-left:26px;" v-if='secondTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${secondTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;"  @click='jump(secondTheme.img.jump)'></div>
				<second-theme :theme='secondTheme'></second-theme>
			</li>
			<!-- 中国智造 -->
			<li v-if='thirdTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${thirdTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%"  @click='jump(thirdTheme.img.jump)'></div>
				<third-theme :theme='thirdTheme'></third-theme>
			</li>
			<!-- 家居百货 -->
			<li style="margin-left:26px;" v-if='fourthTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${fourthTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;" @click='jump(fourthTheme.img.jump)'></div>
				<second-theme :theme='fourthTheme'></second-theme>
			</li>
			<!-- 奖励商品 -->
			<li v-if='fifthTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${fifthTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;"  @click='jump(fifthTheme.img.jump)'></div>
				<second-theme :theme='fifthTheme'></second-theme>
			</li>
			<!-- 积分购买 -->
			<li style="margin-left:26px;" v-if='sixthTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${sixthTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;"  @click='jump(sixthTheme.img.jump)'></div>
				<second-theme :theme='sixthTheme'></second-theme>
			</li>
			<!-- 鸿府购买 -->
			<li v-if='seventhTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${seventhTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;"  @click='jump(seventhTheme.img.jump)'></div>
				<second-theme :theme='seventhTheme'></second-theme>
			</li>
			<!-- 线下提货 -->
			<li style="margin-left:26px;" v-if='eightTheme.img.img_web'>
				<div class="title" :style='{backgroundImage: `url(${eightTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;" @click='jump(eightTheme.img.jump)'></div>
				<second-theme :theme='eightTheme'></second-theme>
			</li>
		</ul>
		<recommend></recommend>
	</div>
</template>
<script>
import 'common/css/themeTitle.scss'
	import {getNewGoods,getActivity} from "../../common/js/api"
 	import {currency,timeStyle,dateStyle} from '../../common/js/filter'
 	import {errorInfo} from '../../common/js/common'
 	import firstTheme from './firstTheme'
 	import secondTheme from './secondTheme'
 	import thirdTheme from './thirdTheme'
 	import recommend from './recommend'
	export default{
		data(){
			return {
				newGoods: {},
				firstTheme: {
					img: {}
				},
				secondTheme: {
					img: {}
				},
				thirdTheme: {
					img: {}
				},
				fourthTheme : {
					img: {}
				},
				fifthTheme : {
					img: {}
				},
				sixthTheme : {
					img: {}
				},
				seventhTheme : {
					img: {}
				},
				eightTheme : {
					img: {}
				},
			}
		},
		filters: {
			currency,
			dateStyle,
			timeStyle
		},
		components:{
			firstTheme,secondTheme,thirdTheme,recommend
		},
		methods: {
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			jump(address){
				window.open(`${address}`) ;
			},
			getTheme() {
				getActivity().then(res=>{
					var empty = {
						img: {}
					}
					this.firstTheme = res[0]?res[0]:empty;
					this.secondTheme = res[1]?res[1]:empty;
					this.thirdTheme = res[2]?res[2]:empty;
					this.fourthTheme = res[3]?res[3]:empty;
					this.fifthTheme = res[4]?res[4]:empty;
					this.sixthTheme = res[5]?res[5]:empty;
					this.seventhTheme = res[6]?res[6]:empty;
					this.eightTheme = res[7]?res[7]:empty;
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let params = {
					t: 5
				}
				getNewGoods(params).then(res=>{
					let { errcode ,message,content} = res ;
					if(errcode !== 0 ){
						errorInfo(errcode,message);
					}else{
						this.newGoods = content;
					}
				});
				this.getTheme();
			})
		}
	}
</script>

<style lang='scss' scoped>
  .wrap{
  	width: 1250px;
  	margin: 20px auto 0px;
  	.show-info{
		width: 100%;
		line-height: 18px;
		height: 36px;
		margin: 6px 0px;
	  	-webkit-box-orient: vertical !important;
	}
	.sell-info{
		overflow: hidden;
		padding: 8px 0px;
		span{
			float: left;
			font-size: 16px;
			font-weight: 600;
		}
		em{
			line-height: 20px;
			float: right;
			color: #666;
		}
	}
	.goods-info{
		width: 100%;
		height: 110px;
		overflow: hidden;
		padding: 10px;
		dt{
			width: 90px;
			height: 90px;
			float: left;
			img{
				width: 100%;
				height: 90px;
			}
		}
		dd{
			width: 168px;
			height: 90px;
			margin-left: 6px;
			float: left;
		}
	}
  	.update-box{
  		width: 1242px;
  		margin: 0px auto;
  	}
  	.update-list{
  		width: 100%;
  		margin-top: 10px;
  		.el-col-4{
  			border-top: 1px solid #f0f0f0;
  			border-left: 1px solid #f0f0f0;
  			border-bottom: 1px solid #f0f0f0;
  			dl{
  				padding: 12px;
  			}
  			dt{
				width: 180px;
				height: 180px;
				img{
					width: 100%;
					cursor: pointer;
				}
			}
  		}
  		.el-col-4:last-child{
  			border-right: 1px solid #f0f0f0;
  		}
  	}
	.theme-box{
		width: 100%;
		overflow: hidden;
		li{
			float: left;
			width: 612px;
			height: 548px;
			margin-top: 22px;
		}
		.title{
			width: 100%;
			height: 40px;
			line-height: 40px;
			overflow: hidden;
			padding-left: 22px;
			padding-right: 16px;
			color: #fff;
			cursor: pointer;
			span{
				float: left;
				font-size: 20px;
			}
			em{
				float: right;
				cursor: pointer;
			}
		}
	}
  }
</style>