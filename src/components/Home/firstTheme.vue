<template>
	<div class="theme" v-if='showBol'>
		<el-row>
			<el-col :span='12' class='border-f0 snapup-l'>
				<dl>
					<dt style="width:270px;height:270px;">
						<img :src="theme.goods.goods[0].cover" width="100%" height="100%">
					</dt>
					<dd>
						<div class="ellipsis-2 show-info" style='margin-top:8px;' v-text='theme.goods.goods[0].name'></div>
	 					<div class="color-primary sell-info">
	 						<span class="color-primary">￥1.00</span>
	 						<em class="color-6">{{theme.goods.goods[0].shop_price|currency}}</em>
	 					</div>
	 					<div class="snapup-btn-box" :class='theme.goods.goods[0].date_start*1000-nowTime >= 0?"start-bg":theme.goods.goods[0].date_end*1000-nowTime >= 0?"end-bg":"over-bg"'>
		 					<dl v-if='theme.goods.goods[0].date_start*1000-nowTime>=0'>
		 						<dt class="snapup-time">
		 							<span>{{theme.goods.goods[0].date_start*1000-nowTime|countdown}}</span>
		 							<em>后开始</em>
		 						</dt>
		 						<dd class="snapup-btn">
		 							<el-button type='text'  @click='goodDetail(theme.goods.goods[0].goods_id)'>立即前往</el-button>
		 						</dd>
	 						</dl>
	 						<dl v-else-if='theme.goods.goods[0].date_end*1000-nowTime>= 0'>
	 							<dt class="snapup-time">
		 							<span>{{theme.goods.goods[0].date_end*1000-nowTime|countdown}}</span>
		 							<em>后结束</em>
		 						</dt>
		 						<dd class="snapup-btn">
		 							<el-button type='text'  @click='goodDetail(theme.goods.goods[0].goods_id)'>立即抢购</el-button>
		 						</dd>
	 						</dl>
	 						<dl v-else>
	 							<dt class="snapup-time">
		 							<span>已结束</span>
		 						</dt>
		 						<dd class="snapup-btn">
		 							<el-button type='text'  @click='goodDetail(theme.goods.goods[0].goods_id)'>立即查看</el-button>
		 						</dd>
	 						</dl>
 						</div>
					</dd>
				</dl>
			</el-col>
			<el-col :span='12' class='border-f0 snapup-right'>
			<!-- 主题 一元抢购 -->
				<ul>
					<li v-for='(item,index) in theme.goods.goods' v-if='index!==0'>
						<dl class="goods-info">
							<dt>
								<img :src="item.cover">
							</dt>
							<dd>
								<div class="ellipsis-2 show-info" v-text='item.name'></div>
								<div class="sell-info">
									<span class="color-primary">￥1.00</span>
								</div>
								<div class="color-6 goods-preprice">{{item.shop_price|currency}}</div>
							</dd>
						</dl>
						<dl class="start" v-if='item.date_start*1000-nowTime>=0'>
							<dt>
								<span>{{item.date_start*1000-nowTime|countdown}}</span>
								<em>后开始</em>
							</dt>
							<dd  class="color-primary" @click='goodDetail(item.goods_id)'>
								立即前往
							</dd>
						</dl>
						<dl class="end" v-else-if='theme.goods.goods[index].date_end*1000-nowTime>=0'>
							<dt>
								<span>{{theme.goods.goods[index].date_end*1000-nowTime|countdown}}</span>
								<em>后结束</em>
							</dt>
							<dd class="color-primary" @click='goodDetail(item.goods_id)'>
								立即抢购
							</dd>
						</dl>
						<dl class="over-bg over" v-else>
							<dt>
								<span>已结束</span>
							</dt>
							<dd class="color-primary" @click='goodDetail(item.goods_id)'>立即查看</dd>
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
		watch: {
			theme(newVal,oldVal) {
				this.showBol = true;
			}
		},
		filters: {
			currency,countdown
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
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
	.theme{
		height: 498px;
	}
	.el-row{
		width: 100%;
		height: 498px;
		margin-top: 10px;
	}
	.snapup-l{
		padding: 18px;
		height: 498px;
		border-right: none;
		dt{
			img{
				width: 100%;
			}
		}
		.show-info{
			height: 36px;
			line-height: 18px;
		}
		.sell-info{
			overflow: hidden;
			margin: 14px 0px;
			span{
				float: left;
				font-size: 18px;
			}
			em{
				float: right;
				font-size: 14px;
				text-decoration: line-through;
			}
		}
		.snapup-btn-box{
			width: 100%;
			height: 100px;
			border-radius: 4px;
			padding: 10px;
		}
		.snapup-time{
			height: 42px;
			padding-top: 8px;
			padding-bottom: 14px;
			text-align: center;
			color: #fff;
			span{
				font-size: 24px;
			}
			em{
				vertical-align: baseline;
			}
		}
		.snapup-btn{
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
				background-color: #fff882;
			}
		}
	}
	.snapup-right{
		border-bottom: none;
		ul{
			width: 100%;
			height: 498px;
		}
		li{
			width: 100%;
			padding: 10px;
			border-bottom: 1px solid #f0f0f0;
			height: 166px;
		}
	}
	.goods-info{
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
			width: 182px;
			.show-info{
				width: 100%;
				height: 36px;
				line-height: 18px;
			}
			.sell-info{
				margin: 4px 0px;
				font-size: 18px;
			}
			.goods-preprice{
				font-size: 14px;
				text-decoration: line-through;
			}
		}
	}
	.start,.end,.over{
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
			background-color: #fff882;
			text-align: center;
			cursor: pointer;
		}
	}
</style>