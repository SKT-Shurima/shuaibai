<template>
	<div class="wrap">
		<div class="update_box">
			<el-row class="title">
		 		<el-col :span='7'>
		 			<div class="slider"></div>
		 		</el-col>
		 		<el-col :span='8' :offset='1'>
		 			<div class="text">
		 				<img src="">
		 				每日上新
		 			</div>
		 		</el-col>
		 		<el-col :span='7' :offset='1'>
		 			<div class="slider"></div>
		 		</el-col>
		 	</el-row>
		 	<el-row class='update_list'>
		 		<el-col :span='4' v-for='item in 6'>
		 			<dl>
		 				<dt>
		 					<img src="">
		 				</dt>
		 				<dd>
		 					<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
		 					<div class="sell_info">
		 						<span>{{168.00|currency}}</span>
		 						<em>2017人付款</em>
		 					</div>
		 				</dd>
		 			</dl>
		 		</el-col>
		 	</el-row>
		</div>
		<div class="theme_box">
				<div class="theme_0">
					<div class="title">
						<span>
							<img src="">
							一元抢购
						</span>
						<em>
							<a href="snap.html">更多精品好货<i></i></a>
						</em>
					</div>
					<el-row>
						<el-col :span='12' class='snapup_left'>
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd>
									<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
				 					<div class="sell_info">
				 						<span>{{168.00|currency}}</span>
				 						<em>{{1288.00 | currency }}</em>
				 					</div>
				 					<div class="snapup_btn_box">
				 						<div class="snapup_time">
				 							<span>12:02:23</span>
				 							<em>后结束</em>
				 						</div>
				 						<div class="snapup_btn">
				 							立即抢购
				 						</div>
				 					</div>
								</dd>
							</dl>
						</el-col>
						<el-col :span='12' class='snapup_right'>
						<ul>
							<li v-for='item in 3'>
								<dl class="goods_info">
									<dt>
										<img src="">
									</dt>
									<dd>
										<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
										<div class="sell_info">
										<span>{{1.00|currency}}</span>
										</div>
										<div class="goods_preprice">{{128.0|currency}}</div>
									</dd>
								</dl>
								<dl class="start">
									<dt>
										<span>
										08:08:08
										</span>
										<em>
											后开始
										</em>
									</dt>
									<dd>
										立即前往
									</dd>
								</dl>
								<dl class="end" v-show='false'>
									<dt>
										<span>
										08:08:08
										</span>
										<em>
											后结束
										</em>
									</dt>
									<dd>
										立即抢购
									</dd>
								</dl>
							</li>
						</ul>
						</el-col>
					</el-row>
				</div>
				<div class="theme_1">
					<div class="title">
						<span>
							<img src="">
							舌尖美食
						</span>
						<em>
							<a href="food.html">
								中国美食聚汇<i></i>
							</a>
						</em>
					</div>
					<ul>
						<li v-for='item in 6'>
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd class="show_info">
									我会像奥德修斯一样朝着心中的方向哪怕众神会在彼
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="theme_2">
					<div class="title">
						<span>
							<img src="">
							中国智造
						</span>
						<em>
							<a href="smart.html">好货中国造<i></i></a>
						</em>
					</div>
				    <el-row>
						<el-col :span='12' class='make_left'>
							<dl>
								<dt class="make_img">
									<img src="">
								</dt>
								<dd>
									<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
				 					<div class="sell_info">
				 						<span>{{168.00|currency}}</span>
				 						<em>200人付款</em>
				 					</div>
								</dd>
								<dl class="goods_info">
									<dt>
										<img src="">
									</dt>
									<dd>
										<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
										<div class="sell_info">
										<span>{{1.00|currency}}</span>
										</div>
										<div class="goods_preprice">{{128.0|currency}}</div>
									</dd>
								</dl>
							</dl>
						</el-col>
						<el-col :span='12' class='make_right'>
						<ul>
							<li v-for='item in 4'>
								<dl class="goods_info">
									<dt>
										<img src="">
									</dt>
									<dd>
										<div class="show_info">我会像奥德修斯一样朝着心中的方向哪怕众神会在彼</div>
										<div class="sell_info">
											<span>
												{{1.00|currency}}
											</span>
										</div>
										<div class="goods_preprice">{{128.0|currency}}</div>
									</dd>
								</dl>
							</li>
						</ul>
						</el-col>
					</el-row>
				</div>
				<div class="theme_3">
					<div class="title">
						<span>
							<img src="">
							家居百货
						</span>
						<em>
							<a href="household.html">帅柏品质生活<i></i></a>
						</em>
					</div>
					<ul>
						<li v-for='item in 6'>
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd class="show_info">
									我会像奥德修斯一样朝着心中的方向哪怕众神会在彼
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
	export default{
		data(){
			return {

			}
		},
		filters: {
			currency
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
  .wrap{
  	width: 1250px;
  	margin: 20px auto 0px;
  	.show_info{
		width: 100%;
		padding-top: 8px;
		padding-bottom: 8px;
		line-height: 20px;
		font-size: 14px;
		color: #333;
		overflow : hidden;
	  	text-overflow: ellipsis;
	  	display: -webkit-box;
	  	-webkit-line-clamp: 2;
	  	-webkit-box-orient: vertical;
	}
	.sell_info{
		overflow: hidden;
		span{
			float: left;
			color: $primary;
			font-size: 16px;
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
	  		width: 348px;
	  		height: 24px;
	  		margin: 0px auto;
	  		.el-col-7{
	  			.slider{
	  				width: 100%;
	  				height: 1px;
	  				margin-top: 14px;
	  				background-color: $border_color;
	  			}
	  			
	  		}
	  		.el-col-8{
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
	  		.el-col-4{
	  			border-top: 1px solid $border_list;
	  			border-left: 1px solid $border_list;
	  			border-bottom: 1px solid $border_list;
	  			dl{
	  				padding: 12px;
	  				dt{
						width: 100%;
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
			.title{
				background: -webkit-linear-gradient(left,#f13f4c,#f65661) ;
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
		  						background-color: $red_color;
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
		  							border-radius: 16px;
		  							margin: 0px auto;
		  							font-size: 16px;
		  							background-color: $btn_bg;
		  							color: $primary;
		  							text-align: center;
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
							.start{
								background-color: $start_bg;
							}
							.end{
								background-color: $end_bg;
							}
						}
					}
				}
			}
		}
		.theme_1{
			.title{
				background: -webkit-linear-gradient(left,#ff7f0c,#ff9f22) ;
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
						dt{
							width: 100%;
							img{
								width: 100%;
							}
						}
						dd{

						}
					}
				}
			}
		}
		.theme_2{
			.title{
				background: -webkit-linear-gradient(left,#0d7bd8,#309afe) ;
			}
			.el-row{
				width: 100%;
				height: 498px;
				margin-top: 10px;
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
						}
					}
				}
			}
		}
		.theme_3{
			.title{
				background: -webkit-linear-gradient(left,#01b556,#23cd56) ;
			}
		}
	}
  	
  }
</style>