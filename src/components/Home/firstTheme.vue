<template>
	<div class="theme">
		<el-row v-if='showBol'>
			<el-col :span='12' class='snapup_left'>
				<dl>
					<dt style="width:270px;height:270px;">
						<img :src="theme.goods.goods[0].cover" width="100%" height="100%">
					</dt>
					<dd>
						<div class="show_info" style='margin-top:8px;' v-text='theme.goods.goods[0].name'
						></div>
	 					<div class="sell_info">
	 						<span>￥1.00</span>
	 						<em>{{theme.goods.goods[0].shop_price|currency}}</em>
	 					</div>
	 					<div class="snapup_btn_box" :class='theme.goods.goods[0].date_start*1000-nowTime >= 0?"start":theme.goods.goods[0].date_end*1000-nowTime >= 0?"end":"over"'>
	 						<div class="snapup_time" v-if='theme.goods.goods[0].date_start*1000-nowTime>=0'>
	 							<span>{{theme.goods.goods[0].date_start*1000-nowTime|countdown}}</span>
	 							<em>后开始</em>
	 						</div>
	 						<div class="snapup_time" v-else-if='theme.goods.goods[0].date_end*1000-nowTime>= 0'>
	 							<span>{{theme.goods.goods[0].date_end*1000-nowTime|countdown}}</span>
	 							<em>后结束</em>
	 						</div>
	 						<div class="snapup_time" v-else>
	 							<span>已结束</span>
	 						</div>
	 						<div class="snapup_btn">
	 							<el-button type='text' :disabled='theme.goods.goods[0].date_end*1000-nowTime<0' @click='goodDetail(theme.goods.goods[0].goods_id)'>立即抢购</el-button>
	 						</div>
	 					</div>
					</dd>
				</dl>
			</el-col>
			<el-col :span='12' class='snapup_right'>
			<!-- 主题 一元抢购 -->
				<ul>
					<li v-for='(item,index) in theme.goods.goods' v-if='index!==0'>
						<dl class="goods_info">
							<dt>
								<img :src="item.cover">
							</dt>
							<dd>
								<div class="show_info" v-text='item.name'></div>
								<div class="sell_info">
								<span>￥1.00</span>
								</div>
								<div class="goods_preprice">{{item.shop_price|currency}}</div>
							</dd>
						</dl>
						<dl class="start" v-if='item.date_start*1000-nowTime>=0'>
							<dt>
								<span>
								{{item.date_start*1000-nowTime|countdown}}
								</span>
								<em>
									后开始
								</em>
							</dt>
							<dd @click='goodDetail(item.goods_id)'>
								立即前往
							</dd>
						</dl>
						<dl class="end" v-else-if='theme.goods.goods[index].date_end*1000-nowTime>=0'>
							<dt>
								<span>
								{{theme.goods.goods[index].date_end*1000-nowTime|countdown}}
								</span>
								<em>
									后结束
								</em>
							</dt>
							<dd @click='goodDetail(item.goods_id)'>
								立即抢购
							</dd>
						</dl>
						<dl class="over" v-else>
							<dt>
								<span>
								   已结束
								</span>
							</dt>
							<dd @click='goodDetail(item.goods_id)'>
								立即抢购
							</dd>
						</dl>
					</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import {countdown,currency} from '../../common/js/filter'
	export default{
		data(){
			return {
				nowTime: 0,
				showBol: false
			}
		},
		props:{
			theme: {
				type: Object,
				required: true 
			}
		},
		watch:{
			theme: {
				handler(newVal,oldVal){
					this.showBol = true; 
				}
			}
		},
		filters: {
			currency,countdown
		},
		methods:{
			goodDetail(id){
				location.href = `goodDetail.html?goods_id=${id}` ;
			},
			init(){
				setInterval(()=>{
					this.nowTime = new Date().getTime();
				},1000)
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$start_bg: #00bf8b;
$end_bg: #f13f4c;
$over_bg: #aaa;
$btn_bg: #fff882;
$text_color: #666;
$border_list: #f0f0f0;
	.theme{
		.start{
			background-color: $start_bg;
		}
		.end{
			background-color: $end_bg;
		}
		.over{
			background-color: $over_bg;
		}
		.show_info{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
		  	-webkit-line-clamp: 2;
	  	 	-webkit-box-orient: vertical;
		}
		.el-row{
			width: 100%;
			height: 498px;
			margin-top: 10px;
			.snapup_left{
				padding: 18px;
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
						.show_info{
							height: 36px;
							line-height: 18px;
						}
						.sell_info{
							overflow: hidden;
							margin: 14px 0px;
							span{
								float: left;
								font-size: 18px;
								color: $primary;
							}
							em{
								float: right;
								font-size: 14px;
								text-decoration: line-through;
								color: $text_color;
							}
						}
	  					.snapup_btn_box{
	  						width: 100%;
	  						height: 100px;
	  						border-radius: 4px;
	  						padding: 10px;
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
						.goods_info{
							overflow: hidden;
							margin-bottom: 12px;
							dt{
								float: left;
								width: 90px;
								height: 90px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							dd{
								float: left;
								margin-left: 10px;
								.show_info{
									width: 100%;
									height: 36px;
									line-height: 18px;
								}
								.sell_info{
									margin: 4px 0px;
									font-size: 18px;
									color: $primary;
								}
								.goods_preprice{
									font-size: 14px;
									color: $text_color;
									text-decoration: line-through;
								}
							}
						}
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
</style>