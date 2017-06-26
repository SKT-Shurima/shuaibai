<template>
	<div class="theme">
		<el-row v-if='theme.goods'>
			<el-col :span='12' class='snapup_left'>
				<dl>
					<dt style="width:270px;height:270px;">
						<img :src="theme.goods.goods[0].cover" width="100%" height="100%">
					</dt>
					<dd>
						<div class="show_info" v-text='theme.goods.goods[0].name' style='margin-top:8px;'></div>
	 					<div class="sell_info">
	 						<span>￥1.00</span>
	 						<em>{{theme[0].goods.goods[0].shop_price|currency}}</em>
	 					</div>
	 					<div class="snapup_btn_box" :class='theme.goods.goods[0].date_start*1000-nowTime >= 0?"start":theme.goods.goods[0].date_end*1000-nowTime >= 0?"end":"over"'>
	 						<div class="snapup_time" v-if='theme.goods.goods[0].date_start*1000-nowTime>=0'>
	 							<span>{{theme.goods.goods[0].date_start*1000-nowTime|timeStyle}}</span>
	 							<em>后开始</em>
	 						</div>
	 						<div class="snapup_time" v-else-if='theme.goods.goods[0].date_end*1000-nowTime>= 0'>
	 							<span>{{theme.goods.goods[0].date_end*1000-nowTime|timeStyle}}</span>
	 							<em>后结束</em>
	 						</div>
	 						<div class="snapup_time" v-else>
	 							<span>已结束</span>
	 						</div>
	 						<div class="snapup_btn">
	 							<el-button type='text' :disabled='theme.goods.goods[0].date_end*1000-nowTime<0'>立即抢购</el-button>
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
							<img :src="theme.goods.goods[1].cover">
						</dt>
						<dd>
							<div class="show_info" v-text='theme.goods.goods[1].name'></div>
							<div class="sell_info">
							<span>￥1.00</span>
							</div>
							<div class="goods_preprice">{{theme[0].goods.goods[1].shop_price|currency}}</div>
						</dd>
					</dl>
					<dl class="start" v-if='theme.goods.goods[0].date_start*1000-nowTime>=0'>
						<dt>
							<span>
							{{theme.goods.goods[1].date_start*1000-nowTime|timeStyle}}
							</span>
							<em>
								后开始
							</em>
						</dt>
						<dd>
							立即前往
						</dd>
					</dl>
					<dl class="end" v-else-if='theme.goods.goods[0].date_end*1000-nowTime>=0'>
						<dt>
							<span>
							{{theme.goods.goods[0].date_end*1000-nowTime|timeStyle}}
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
</template>
<script>
	export default{
		data(){
			return {
				nowTime: 0
			}
		},
		props:{
			theme: {
				type: Object,
				required: true ,
				default(){
					return {
						goods: null
					}
				}
			}
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id='${id}`)
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
</style>