<template>
	<div class="wrap">
		<div class="update_box">
			<el-row class="themeTitle">
		 		<el-col :span='7'>
		 			<div class="slider"></div>
		 		</el-col>
		 		<el-col :span='10'>
		 			<div class="text">
		 				<img src="../../../static/indexImg/newDay.png" height="24" width="24">
		 				每日上新
		 			</div>
		 		</el-col>
		 		<el-col :span='7'>
		 			<div class="slider"></div>
		 		</el-col>
		 	</el-row>
		 	<el-row class='update_list' v-if='newGoods'>
		 		<el-col :span='4' v-for='item in newGoods.goods' >
		 			<dl>
		 				<dt>
		 					<img :src="item.cover" @click='goodDetail(item.goods_id)'>
		 				</dt>
		 				<dd>
		 					<div class="show_info" v-text='item.name'></div>
		 					<div class="sell_info">
		 						<span>{{item.shop_price|currency}}</span>
		 						<em>{{item.sale_count}}人付款</em>
		 					</div>
		 				</dd>
		 			</dl>
		 		</el-col>
		 	</el-row>
		</div>
		<ul class="theme_box">
			<li>
				<div class="title" :style='{backgroundImage: `url(${firstTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%" v-if='firstTheme.img' @click='jump("snap",1)'></div>
				<first-theme :theme='firstTheme'></first-theme>
			</li>
			<li style="margin-left:26px;">
				<div class="title" :style='{backgroundImage: `url(${secondTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;"  v-if='secondTheme.img' @click='jump("food",2)'></div>
				<second-theme :theme='secondTheme'></second-theme>
			</li>
			<li>
				<div class="title" :style='{backgroundImage: `url(${thirdTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%"  v-if='thirdTheme.img' @click='jump("smart",3)'></div>
				<third-theme :theme='thirdTheme'></third-theme>
			</li>
			<li style="margin-left:26px;">
				<div class="title" :style='{backgroundImage: `url(${fourthTheme.img.img_web})`}' style="background-repeat: no-repeat;background-size: 100% 100%;" v-if='fourthTheme.img' @click='jump("household",4)'></div>
				<second-theme :theme='fourthTheme'></second-theme>
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
				newGoods: null,
				classArr: null,
				firstTheme: {
					img: null
				},
				secondTheme: {
					img: null
				},
				thirdTheme: {
					img: null
				},
				fourthTheme : {
					img: null
				}
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
				location.href = `goodDetail.html?goods_id=${id}` ;
			},
			jump(address,type){
				location.href = `${address}.html?type=${type}` ;
			},
			getTheme() {
				getActivity().then(res=>{
					this.firstTheme = res[0] ;
					this.secondTheme= res[1] ;
					this.thirdTheme= res[2] ;
					this.fourthTheme = res[3] ;
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
$border_color: #ccc;
$border_list: #f0f0f0;
$primary:#c71724;
$text_color: #666;
$red_color: #f24450;
  .wrap{
  	width: 1250px;
  	margin: 20px auto 0px;
  	.show_info{
		width: 100%;
		line-height: 18px;
		height: 36px;
		margin: 6px 0px;
		color: #333;
		display: -webkit-box;
		overflow : hidden;
	  	text-overflow: ellipsis;
	  	-webkit-line-clamp: 2;
	  	-webkit-box-orient: vertical !important;
	  	-moz-box-orient: vertical ;
	}
	.sell_info{
		overflow: hidden;
		padding: 8px 0px;
		span{
			float: left;
			color: $primary;
			font-size: 16px;
			font-weight: 600;
		}
		em{
			line-height: 20px;
			float: right;
			color: $text_color;
		}
	}
	.goods_preprice{
		color: $text_color;
		text-decoration: line-through;
	}
	.goods_info{
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
  	.update_box{
  		width: 1242px;
  		margin: 0px auto;
	  	.update_list{
	  		width: 100%;
	  		margin-top: 10px;
	  		.el-col-4{
	  			border-top: 1px solid $border_list;
	  			border-left: 1px solid $border_list;
	  			border-bottom: 1px solid $border_list;
	  			dl{
	  				padding: 12px;
	  				dt{
						width: 180px;
						height: 180px;
						img{
							width: 100%;
							cursor: pointer;
						}
	  				}
	  			}
	  		}
	  		.el-col-4:last-child{
	  			border-right: 1px solid $border_list;
	  		}
	  	}
  	}
	.theme_box{
		width: 100%;
		overflow: hidden;
		li{
			float: left;
			width: 612px;
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