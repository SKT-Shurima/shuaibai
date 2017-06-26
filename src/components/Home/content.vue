<template>
	<div class="wrap">
		<div class="update_box">
			<el-row class="title">
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
		 			<dl  @click='detail(item)'>
		 				<dt>
		 					<img :src="item.cover">
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
		<div class="theme_box" v-if='theme'>
				<div class="theme_0">
					<div class="title" :style='{background: `url(${theme[0].img.img})`}'></div>
					<el-row>
						<el-col :span='12' class='snapup_left'>
							<dl>
								<dt style="width:270px;height:270px;">
									<img :src="theme[0].goods.goods[0].cover" width="100%" height="100%">
								</dt>
								<dd>
									<div class="show_info" v-text='theme[0].goods.goods[0].name' style='margin-top:8px;'></div>
				 					<div class="sell_info">
				 						<span>￥1.00</span>
				 						<em>{{theme[0].goods.goods[0].shop_price|currency}}</em>
				 					</div>
				 					<div class="snapup_btn_box" :class='theme[0].goods.goods[0].date_start*1000-nowTime >= 0?"start":theme[0].goods.goods[0].date_end*1000-nowTime >= 0?"end":"over"'>
				 						<div class="snapup_time" v-if='theme[0].goods.goods[0].date_start*1000-nowTime>=0'>
				 							<span>{{theme[0].goods.goods[0].date_start*1000-nowTime|timeStyle}}</span>
				 							<em>后开始</em>
				 						</div>
				 						<div class="snapup_time" v-else-if='theme[0].goods.goods[0].date_end*1000-nowTime>= 0'>
				 							<span>{{theme[0].goods.goods[0].date_end*1000-nowTime|timeStyle}}</span>
				 							<em>后结束</em>
				 						</div>
				 						<div class="snapup_time" v-else>
				 							<span>已结束</span>
				 						</div>
				 						<div class="snapup_btn">
				 							<el-button type='text' :disabled='theme[0].goods.goods[0].date_end*1000-nowTime<0'>立即抢购</el-button>
				 						</div>
				 					</div>
								</dd>
							</dl>
						</el-col>
						<el-col :span='12' class='snapup_right'>
						<!-- 主题 一元抢购 -->
						<ul>
							<li v-for='item in 3'>
								<dl class="goods_info">
									<dt>
										<img :src="theme[0].goods.goods[1].cover">
									</dt>
									<dd>
										<div class="show_info" v-text='theme[0].goods.goods[1].name'></div>
										<div class="sell_info">
										<span>￥1.00</span>
										</div>
										<div class="goods_preprice">{{theme[0].goods.goods[1].shop_price|currency}}</div>
									</dd>
								</dl>
								<dl class="start" v-if='theme[0].goods.goods[0].date_start*1000-nowTime>=0'>
									<dt>
										<span>
										{{theme[0].goods.goods[1].date_start*1000-nowTime|timeStyle}}
										</span>
										<em>
											后开始
										</em>
									</dt>
									<dd>
										立即前往
									</dd>
								</dl>
								<dl class="end" v-else-if='theme[0].goods.goods[0].date_end*1000-nowTime>=0'>
									<dt>
										<span>
										{{theme[0].goods.goods[0].date_end*1000-nowTime|timeStyle}}
										</span>
										<em>
											后结束
										</em>
									</dt>
									<dd>
										立即抢购
									</dd>
								</dl>
								<dl class="over" v-else>
									<dt>
										<span>
										   已结束
										</span>
									</dt>
									<dd disabled>
										立即抢购
									</dd>
								</dl>
							</li>
						</ul>
						</el-col>
					</el-row>
				</div>
				<div class="theme_1">
					<div class="title" :style='{background: `url(${theme[1].img.img})`}'></div>
					<ul>
						<li v-for='item in theme[1].goods.goods'>
							<dl>
								<dt>
									<img :src="item.cover">
								</dt>
								<dd class="show_info" v-text='item.name'>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="theme_2">
					<div class="title" :style='{background: `url(${theme[2].img.img})`}'></div>
				    <el-row>
						<el-col :span='12' class='make_left'>
							<dl>
								<dt style="width:270px;height: 270px;margin-bottom: 8px;">
									<img :src="theme[2].goods.goods[0].cover" width="100%" height="100%">
								</dt>
								<dd>
									<div class="show_info" v-text='theme[2].goods.goods[0].name'></div>
				 					<div class="sell_info">
				 						<span>{{theme[2].goods.goods[0].shop_price|currency}}</span>
				 						<em>{{theme[2].goods.goods[0].sale_count}}人付款</em>
				 					</div>
								</dd>
								<dl class="goods_info">
									<dt>
										<img :src="theme[2].goods.goods[1].cover">
									</dt>
									<dd>
										<div class="show_info" v-text='theme[2].goods.goods[1].name' style="min-height: 58px;"></div>
										<div class="sell_info">
											<span>{{theme[2].goods.goods[1].shop_price|currency}}</span><em>{{theme[2].goods.goods[1].sale_count}}人付款</em>
										</div>
									</dd>
								</dl>
							</dl>
						</el-col>
						<el-col :span='12' class='make_right'>
						<ul>
							<li v-for='(item,index) in theme[2].goods.goods' v-if='index>1'>
								<dl class="goods_info">
									<dt>
										<img :src="item.cover">
									</dt>
									<dd>
										<div class="show_info" v-text='item.name'></div>
										<div class="sell_info">
											<span>{{item.shop_price|currency}}</span><em>{{item.sale_count}}人付款</em>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						</el-col>
					</el-row>
				</div>
				<div class="theme_3">
					<div class="title" :style='{background: `url(${theme[3].img.img})`}'>
					</div>
					<ul>
						<li v-for='item in theme[3].goods.goods'>
							<dl>
								<dt>
									<img :src="item.cover">
								</dt>
								<dd class="show_info" v-text='item.name'></dd>
							</dl>
						</li>
					</ul>
				</div>
		</div>
	</div>
</template>

<script>
	import {getNewGoods,getActivity} from "../../common/js/api"
 	import {currency,timeStyle,dateStyle} from '../../common/js/filter'
 	import {errorInfo} from '../../common/js/common'
	export default{
		data(){
			return {
				newGoods: null,
				classArr: null,
				theme: null,
				nowTime: 0
			}
		},
		filters: {
			currency,
			dateStyle,
			timeStyle
		},
		methods: {
			detail(){
				location.href = 'detail.html';
			},
			getTheme() {
				getActivity().then(res=>{
					this.theme = res;
				})
			},
			init(){
				setInterval(()=>{
					this.nowTime = new Date().getTime();
				},1000)
			}
		},
		mounted(){
			this.$nextTick(()=>{
				getNewGoods().then(res=>{
					let { errcode ,message,content} = res ;
					if(errcode !== 0 ){
						errorInfo(errcode,message);
					}else{
						this.newGoods = content;
					}
				});
				this.getTheme();
				this.init();
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
$btn_bg: #fff882;
$start_bg: #00bf8b;
$end_bg: #f13f4c;
$over_bg: #aaa;
  .wrap{
  	width: 1250px;
  	margin: 20px auto 0px;
  	.show_info{
		width: 100%;
		line-height: 18px;
		min-height: 36px;
		color: #333;
		overflow : hidden;
	  	text-overflow: ellipsis;
	  	display: -webkit-box;
	  	-webkit-line-clamp: 2;
	  	-webkit-box-orient: vertical;
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
  		.title{
	  		width: 352px;
	  		height: 24px;
	  		margin: 0px auto;
	  		overflow: hidden;
	  		.el-col-7{
	  			float: left;
	  			.slider{
	  				width: 100%;
	  				height: 1px;
	  				margin-top: 14px;
	  				background-color: $border_color;
	  			}
	  			
	  		}
	  		.el-col-10{
	  			float: left;
	  			text-align: center;
	  			.text{
	  				color: #656565;
	  				font-size: 20px;
	  				font-weight: 600;
	  				img{
		  				width: 24px;
		  				height: 24px;
		  				vertical-align: top;
		  			}
	  			}
	  		}
	  	}
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
		.theme_0,.theme_1,.theme_2,.theme_3{
			width: 612px;
			float: left;
			margin-top: 22px;
			em{
				a{
					color: #fff;
				}
			}
		}
		.title{
				width: 100%;
				height: 40px;
				line-height: 40px;
				overflow: hidden;
				padding-left: 22px;
				padding-right: 16px;
				color: #fff;
				span{
					float: left;
					font-size: 20px;
				}
				em{
					float: right;
					cursor: pointer;
				}
			}
		.theme_0{
			.start{
				background-color: $start_bg;
			}
			.end{
				background-color: $end_bg;
			}
			.over{
				background-color: $over_bg;
			}
			.el-row{
				width: 100%;
				height: 498px;
				margin-top: 10px;
				.snapup_left{
					padding: 20px;
					height: 498px;
					border-left: 1px solid $border_list;
					border-top: 1px solid $border_list;
					border-bottom: 1px solid $border_list;
					dl{
						width: 100%;
						dt,dd{
							width: 100%;
						}
						dt{
							img{
								width: 100%;
							}
						}
						dd{
		  					.snapup_btn_box{
		  						width: 100%;
		  						height: 100px;
		  						border-radius: 4px;
		  						padding: 10px;
		  						margin-top: 16px;
		  		 				.snapup_time{
		  							height: 42px;
		  							padding-top: 8px;
		  							padding-bottom: 14px;
		  							text-align: center;
		  							color: #fff;
		  							span{
		  								font-size: 28px;
		  							}
		  							em{
		  								vertical-align: baseline;
		  							}
		  						}
		  						.snapup_btn{
		  							width: 100%;
		  							height: 32px;
		  							line-height: 32px;
		  							margin: 4px auto;
		  							font-size: 16px;
		  							font-weight: 600;
		  							text-align: center;
		  							.el-button{
		  								width: 120px;
		  								height: 32px;
		  								border-radius: 16px;
		  								background-color: $btn_bg;
		  							}
		  						}
		  					}
						}
						
					}
				}
				.snapup_right{
					border-top: 1px solid $border_list;
					border-left: 1px solid $border_list;
					border-right: 1px solid $border_list;
					ul{
						width: 100%;
						height: 498px;
						li{
							width: 100%;
							padding: 10px;
							border-bottom: 1px solid $border_list;
							height: 166px;
							.start,.end{
								width: 100%;
								height: 40px;
								padding-left: 14px;
								padding-right: 14px;
								padding-top: 7px;
								padding-bottom: 7px;
								overflow: hidden;
								dt{
									float: left;
									color: #fff;
									span{
										font-size: 16px;
										line-height: 28px;
										font-weight: 600;
									}
									em{
										margin-left: 4px;
										vertical-align: 2px;
									}
								}
								dd{
									float: right;
									width: 76px;
									height: 26px;
									line-height: 26px;
									border-radius: 13px;
									background-color: $btn_bg;
									color: $primary;
									text-align: center;
									cursor: pointer;
								}
							}
						}
					}
				}
			}
		}
		.theme_1,.theme_3{
			margin-left: 26px;
			ul{
				margin-top: 10px;
				overflow: hidden;
				border-top: 1px solid $border_list;
				border-left: 1px solid $border_list;
				li{
					width: 202px;
					height: 249px;
					float: left;
					border-right: 1px solid $border_list;
					border-bottom: 1px solid $border_list;
					dl{
						width: 100%;
						padding: 10px;
						dt{
							width: 180px;
							height: 180px;
							img{
								width: 100%;
								height: 100%;
							}
						}
						dd{
							margin-top: 8px;
							line-height: 18px;
						}
					}
				}
			}
		}
		.theme_2{
			.el-row{
				width: 100%;
				height: 498px;
				margin-top: 10px;
				.show_info{
					line-height: 18px;
				}
				.make_left{
					padding: 20px;
					height: 100%;
					border-top: 1px solid $border_list;
					border-left: 1px solid $border_list;
					border-bottom: 1px solid $border_list;
					.make_img{
						overflow: hidden;
						width: 100%;
						img{
							width: 100%;
						}
					}
					.goods_info{
						padding: 0px;
						padding-top: 20px;
						border-top: 1px solid $border_list;
					}
				}
				.make_right{
					border-left: 1px solid $border_list;
					border-right: 1px solid $border_list;
					border-bottom: 1px solid $border_list;
					ul{
						width: 100%;
						height: 498px;
						li{
							width: 100%;
							padding: 10px;
							height: 25%;
							border-top: 1px solid $border_list;
							.show_info{
								min-height: 58px;
							}
						}
					}
				}
			}
		}
	}
  	
  }
</style>