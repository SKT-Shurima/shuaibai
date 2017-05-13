<template>
	<div class="wrap">
		<div class="container">
			<div class="sliderBox">
				<ul class="coupons">
					<li v-for='item in 3'>
						
					</li>
				</ul>
				<ul class="navList">
					<li><div class="title">查看全部分类</div></li>
					<li><div class="title">店铺热卖</div></li>
					<li><div class="title">掌柜推荐</div></li>
					<li><div class="title">护肤品</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li>
					<li><div class="title">护肤品</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li>
					<li><div class="title">护肤品</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li> 
				</ul> 
				<div class="hotSell">
					<div class="title">
						<div class="slider"></div>
						<div class="text">热销排行</div>
						<div class='slider'></div>
					</div>
					<ul>
						<li v-for='item in 3' class="infoList">
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd>
									<div class="sellInfo">
										9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
									</div>
									<div class="priceInfo">
										<span>
											{{168.00|currency}}
										</span>
										<em>
											{{2017}}人付款
										</em>
									</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
			<div class="contentBox">
				 <dl class="infoBox">
				 	<dt>
				 		<button @click='infoTabIndex=1' :class='{"infoTabChecked":infoTabIndex===1}' >商品详情</button>
				 		<button @click='infoTabIndex=2' :class='{"infoTabChecked":infoTabIndex===2}'>评价（{{1212}}）</button>
				 	</dt>
				 	<dd>
				 		<div class="detailsCon" v-show='infoTabIndex===1'>
				 			<div>
					 			产品参数
					 		</div>
					 		<ul class="productInfo">
					 			<li v-for='item in 10'>
					 				浙江省杭州市滨江区滨兴路建业路华盛达广场
					 			</li>
					 		</ul>
				 		</div>
				 		<div class="evalCon" v-show='infoTabIndex===2'>
				 			<div class="evalRate" style="text-align: center;">
				 				好评率
				 			</div>
				 			<div style="font-size:60px;font-weight:600;color:#c71724;" class="evalRate">
				 				90%
				 			</div>
				 			<div class="evalInfo">
				 				<el-row>
				 				   		<el-col :span='10'>
				 				   			商品评价（{{4.5}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="value5"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 				   <el-row>
				 				   		<el-col :span='10'>
				 				   			服务评价（{{4.5}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="value5"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 				   <el-row>
				 				   		<el-col :span='10'>
				 				   			物流评价（{{4.5}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="value5"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 			</div>
				 		</div>
				 	</dd>
				 </dl>
				 <div class="detailsList" v-show='infoTabIndex===1'>
				 	<ul class="storeImg">
					 	<li v-for='item in 5'>
					 		<img src="">
					 	</li>
					 </ul>
				 </div>
				 <div class="evalList" v-show='infoTabIndex===2'>
				 	<div class="title">
				 		<button :class='{"evalTabChecked":evalTabIndex===1}' @click='evalTabIndex=1'>全部评论</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===2}' @click='evalTabIndex=2'>好评（{{1081}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===3}' @click='evalTabIndex=3'>中评（{{96}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===4}' @click='evalTabIndex=4'>差评（{{24}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===5}' @click='evalTabIndex=5'>有图（{{296}}）</button>
				 	</div>
				 	<ul>
				 		<li v-for='item in 12'>
				 			<dl>
				 				<dt>
				 					<div class="avatar">
				 						<img src="">
				 					</div>
				 					<div>
				 						刘女士
				 					</div>
				 				</dt>
				 				<dd>
				 					<p>
				 						用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦用着感觉好好哦
				 					</p>
				 					<ul class="evalImgList">
				 						<li v-for='item in 3'>
				 							<img src="">
				 						</li>
				 					</ul>
				 					<div class="evalBigImg">
				 						<img src="">
				 					</div>
				 					<div class="evalMsg">
				 						<div class="time">
				 							<span>
					 							2017年1月1日  12:21
					 						</span>
					 						<strong>
					 							颜色分类：常规版/套餐一
					 						</strong>
					 					</div>
					 					<div class="more">
					 						<button>有用（{{12}}）</button>
					 						<button>回复（{{10}}）</button>
					 						<button>展开<i></i></button>
					 					</div>
				 					</div>
				 				</dd>
				 			</dl>
				 		</li>
				 	</ul>
				 </div>
				 <div class="recommend">
				 	<div class="title">
				 		<i class="icon"></i>
				 		<span>店内推荐</span>
				 		<strong>换一组<i></i></strong>
				 	</div>
				 	<ul>
				 		<li class="infoList" v-for='item in 12'>
				 			<dl>
								<dt>
									<img src="">
								</dt>
								<dd>
									<div class="sellInfo">
										9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
									</div>
									<div class="priceInfo">
										<span>
											{{168.00|currency}}
										</span>
										<em>
											{{2017}}人付款
										</em>
									</div>
								</dd>
							</dl>
				 		</li>
				 	</ul>
				 </div>         
			</div>
			 <div class="recommend" style="margin-top:60px;">
			 	<div class="title">
			 		<i class="icon"></i>
			 		<span>店内推荐</span>
			 		<strong>换一组<i></i></strong>
			 	</div>
			 	<ul class="youLove">
			 		<li class="infoList" v-for='item in 6'>
			 			<dl>
							<dt>
								<img src="">
							</dt>
							<dd>
								<div class="sellInfo">
									9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
								</div>
								<div class="priceInfo">
									<span>
										{{168.00|currency}}
									</span>
									<em>
										{{2017}}人付款
									</em>
								</div>
							</dd>
						</dl>
			 		</li>
			 	</ul>
			 </div>
		</div>
	</div>
</template>
<script>
	import {currency} from '../../common/js/filter.js'
	export default {
		data(){
			return {
				infoTabIndex: 1,
				evalTabIndex: 1
			}
		},
		filters:{
			currency
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
		margin-top: 70px;
		.container{
			width: 1250px;
			margin: 0px auto;
			overflow: hidden;
			.infoList{
				dl{
					dt{
						width: 210px;
						height: 210px;
						img{
							width: 100%;
							height: 100%; 
						}
					}
					dd{
						width: 100%;
						overflow: hidden;
						.sellInfo{
							line-height: 18px;
							font-weight: 600;
							margin-top: 10px;
						}
						.priceInfo{
							margin-top: 6px;
							span{
								font-size: 18px;
								font-weight: 600;
								color: $primary;
							}
							em{
								margin-top: 4px;
								float: right;
								color: #999;
							}
						}
					}	 
				}
			}
			.sliderBox{
				float: left; 
				width: 240px;
				margin-left: 10px;
				.coupons{
					width: 100%;
					padding-right: 20px;
					padding-bottom: 14px;
					li{
						width: 220px;
						height: 116px;
						margin-bottom: 10px;     
						background-color: #e7354d; 
					}
			}
			.navList{
				width: 220px;
				border-left: 1px solid $border_color;
				border-right: 1px solid $border_color;
				border-top: 1px solid $border_color;
				.title{
					background-color: $bg_title;
					padding-left: 16px;
					line-height: 40px;
					font-weight: 600;
					font-size: 14px;
					border-bottom: 1px solid $border_color;
				}
				ul{
					border-bottom: 1px solid $border_color;
					li{
						color: $text_color;
						line-height: 36px;
						padding-left: 10px;
						font-weight: 400;
					}
				}
			}
			.hotSell{
				.title {
					width: 192px;
					overflow: hidden;
					margin: 72px auto 12px;
					.slider,.text{
						float: left;
					}
					.slider{
						width: 46px;
						height: 1px;
						margin-top: 6px;
						background-color: $border_color;
					}
					.text{
						width: 100px;
						text-align: center;
						font-size: 16px;
						color: $text_color;
					}
				}
				ul{
					width: 240px;
					border: 1px solid $border_color;
					li{
						width: 100%;
						height: 310px;
						padding: 15px;
						border-bottom: 1px solid $border_color;
					}
					li:last-child{
						   border-bottom: none; 
					}
				}
			}
		}
	}
	.contentBox{
		width: 1000px;
		float: left;
		overflow: hidden;
		.infoBox{
			width: 100%;
			border: 1px solid $border_color;
			dt{
				line-height: 36px;
				border-bottom: 1px solid $border_color;
				background-color: $bg_title;
				button{
					width: 100px;
					height: 36px;
					text-align: center;
					color: $text_color;
					background-color: transparent;
					border: none;
					border: 1px solid transparent;
					outline: none;
				}
			   button:first-child{
			   		border-right: 1px solid $border_color;
			   }
				.infoTabChecked{
					color: $primary;
					background-color: #fff;
					border-right: 1px solid $border_color;
				}
			}
			dd{
				padding: 10px;
				.detailsCon{
					div{
						line-height: 24px;
						color: $text_color;
						font-weight: 600;
						padding-left: 12px;
						margin-bottom: 10px;
					}
					ul{
						width: 672px;
						padding-left: 12px;
						overflow: hidden;
						li {
							float: left;
							line-height: 30px;
							width: 210px;
							margin-right: 10px;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
				}
				.evalCon{
					overflow: hidden;
					.evalRate{
						float: left;
						width: 90px;
						height: 100px;
						line-height: 100px;
					}
					.evalInfo{
						float: left;
						width: 240px;
						padding: 10px 0px;
						margin-left: 90px;
						.el-row{
							line-height: 28px;
						}
					}
				}
			}
		}
		.detailsList{
			.storeImg{
				margin-top: 32px;
				li{
					width: 100%;
					height: 800px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.evalList{
			margin-top: 10px;
			.title{
				width: 100%;
				height: 34px;
				border-bottom: 1px solid $border_color;
				button{
					width: 100px;
					height: 32px;
					text-align: center;
					margin-top: 2px;
					border: none;
					outline: none;
					border-bottom: 2px solid transparent;
					background-color: transparent;
				}
				.evalTabChecked{
					color: $primary;
					border-bottom: 4px solid $primary;
				}
			}
			ul{
				li{
					padding: 26px 0px;
					dl{
						overflow: hidden;
						dt{
							float: left;
							width: 100px;
							text-align: center;
							line-height: 20px;
							.avatar{
								width: 50px;
								height: 50px;
								margin: 0px auto;
								img{
									width: 100%;
									height: 100%;
								}
							}
						}
						dd{
							float: left;
							width: 870px;
							p{
								font-size: 14px;
								line-height: 20px;
							}
							.evalImgList{
								margin: 18px 0px;
								padding-bottom: 10px;
								overflow: hidden;
								li{
									float: left;
									width: 40px;
									height: 40px;
									margin-right: 10px;
									padding: 0px;
									border: 2px solid transparent;
									img{
										width: 100%;
										height: 100%;
									}
								}
								.evalImgChecked{
									border:2 px solid $primary;
								}
							}
							.evalBigImg{
								width: 230px;
								height: 230px;
								border: 1px solid  $border_color;
								margin-bottom: 10px;
							}
							.evalMsg{
								overflow: hidden;
								color: $text_color;
								.time{
									float: left;
									strong{
										font-weight: 400;
									}
								}
								.more{
									float: right;
									button{
										width: 80px;
										color: #2c82d3;
										padding: 0px;
										background-color: transparent;
										outline: none;
										border: none;
									}
									button:last-child{
										color: $text_color;
									}
								}
							}
						}
					}
				}
			}
		}
		.recommend{
			margin-top: 70px;
			ul{
				width: 100%;
				overflow: hidden;
				.infoList{
					width: 25%;
					float: left;
					padding: 15px;
					dt{
						width: 216px;
						height: 216px;
					}
				}
			}
		}
	}
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
		.title{
			width: 100%;
			height: 40px;
			padding: 10px;
			line-height: 20px;
			color: $text_color;
			background-color: $bg_title;
			.icon{
				display: inline-block;
				width: 8px;
				height: 20px;
				background-color: $primary;
			}
			span{
				font-size: 16px;
				font-weight: 600;
			}
			strong{
				float: right;
				font-size: 14px;
			}
		}
		.youLove{
			width: 100%;
			overflow: hidden;
			.infoList{
				float: left;
				width: 208.33px;
				padding: 15px;
				dt{
					width: 180px;
					height: 180px;
				}
			}
		}
 }
} 
</style>