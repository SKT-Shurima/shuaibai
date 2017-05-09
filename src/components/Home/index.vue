<template>
	<div class="wrap">
		<div class="nav_wrap">
			<nav class="nav_box">
				<a href="javascript:void(0)">全部商品分类</a>
				<a href="integral.html">积分半价</a>
				<a href="">购物币专区</a>
				<a href="">百城万店</a>
				<a href="">
					世尊印
				</a>
			</nav>
		</div>
		<div class="con_wrap">
		<div class="con_box">
			<ul class="con_list">
				<li>居家百货</li>
				<li>食品特产</li>
				<li>世尊生活</li>
				<li>滋补保健</li>
				<li>个护美妆</li>
				<li>成人用品</li>
				<li>茶油生鲜</li>
				<li>男女服饰</li>
				<li>手机数码</li>
				<li>腕表首饰</li>
			</ul>
			<dl class="slide_show">
				<dt>
					<img src='' alt="">
				</dt>
				<dd>
					<div class="left_btn"></div>
					<div class="cont">
						<img src="" alt="">
						<img src="" alt="">
						<img src="" alt="">
						<img src="" alt="">
					</div>
					<div class="right_btn"></div>
				</dd>
			</dl>
			<div class="status">
				<div class="info_box">
					<dl>
						<dt>
							<img src="">
						</dt>
						<dd>
							<span>Hi,您好！</span>
						</dd>
					</dl>
					<div class="btnBox" v-if='true'>
						<div>
							<el-button type='text' size='small'>登录</el-button>
						</div>
						<div>
							<el-button type='text' size='small'>注册新用户</el-button>
						</div>
					</div>
					<div class="info" v-if='false'>
						<el-row class='info_money'>
							<el-col :span='8'>
								<div class="info_num">
									200.00
								</div>
								<div>
									余额
								</div>
							</el-col>
							<el-col :span='8'>
								<div class="info_num">
									107
								</div>
								<div>
									购物币
								</div>
							</el-col>
							<el-col :span='8'>
								<div class="info_num">
									3000.0
								</div>
								<div>
								    积分
								</div>
							</el-col>
						</el-row>
						<el-row class='info_order'>
							<div class="info_title">
								<span>
									<i></i>
									我的订单
								</span>
								<em>
								    售后
									<i></i>
								</em>
							</div>
							<el-row class='order_menu'>
								<el-col :span='6'>
									待付款
									<i>{{10 | num_filter}}</i>
								</el-col>
								<el-col :span='6'>
									待发货
									<i>1</i>
								</el-col>
								<el-col :span='6'>
									待收货
									<i>1</i>
								</el-col>
								<el-col :span='6'>
									待评价
									<i>1</i>
								</el-col>
							</el-row>
						</el-row>
					</div>
				</div>
				<div class="pre_msg">
					<div class="info_title">
						<span>
							<i></i>
							优惠快讯
						</span>
						<em>
							更多
							<i></i>
						</em>
					</div>
					<ul class="msg_list">
						<li>伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶</li>
						<li>伊利牛奶</li>
						<li>伊利牛奶</li>
					</ul>
				</div>
				<div class="recharge">
					<div class="recharge_title">
						<div @click='recharge_bol=true' :class='{"border_top":recharge_bol}'>话费充值</div>
						<div @click=
						'recharge_bol=false' :class='{"border_top":!recharge_bol}'> 流量充值</div>
					</div>
					<el-row>
						<el-col :span='4'>号码</el-col>
						<el-col :span='20'>
							<el-input v-model='recharge_val' size='mini'></el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='4'>数额</el-col>
						<el-col :span='10'>
							<el-select v-model="value" placeholder="请选择" size='mini'>
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='4'>售价</el-col>
						<el-col :span='8'>
							<span>{{47.88|currency}}</span>
						</el-col>
						<div class="top_up">立即充值</div>
					</el-row>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import {num_filter,currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{
			   userInfo:{
			   		name: '',
			   		avatar:''
			   },
			   recharge_bol: true,
			   recharge_val: '',
			   options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
        		value: ''
			}
		},
		filters:{
			num_filter,
			currency
		},
		methods:{
			clickme(){
				alert(12)
			}
		}
	}
</script>

<style scoped lang='scss'>
$primary:#c71724;
$theme: #d63d3f;
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		margin-top: 32px;
		.nav_wrap{
			width: 100%;
			height: 40px;
			background-color: #c81623;
			.nav_box{
				width: 1250px;
				margin: 0px auto;
				a{
					display: inline-block;
					width: 120px;
					font-size: 14px;
					font-weight: bolder;
					line-height: 40px;
					text-align: center;
					color: #fff;
				}
				a:first-child{
					background-color: #cd2a2c;
					width: 150px;
				}
			}
		}
		.con_wrap{
			width: 100%;
			background-color: $theme;
			.con_box{
				width: 1250px;
				margin: 0px auto;
				overflow: hidden;
				.con_list{
					width: 150px;
					background-color: #c81623;
					color: #fff;
					text-align: center;
					float: left;
					li{
						width: 100%;
						height: 50px;
						line-height: 50px;
						font-size: 14px;
						font-weight: bolder;
						cursor: pointer;
					}
					li:hover{
						background-color: #fff;
						color: #c81623;
					}
				}
				.slide_show{
					width: 850px;
					height: 390px;
					float: left;
					dt{
						img{
							width: 100%;
							height: 390px;
						}
					}
					dd{
						width: 100%;
						height: 110px;
						overflow: hidden;
						position: relative;
						.cont{
							width: 100%;
							img{
								width: 25%;
								height: 110px;
								float: left;
							}
						}
						.left_btn,.right_btn{
							width: 24px;
							height: 60px;
							border-radius: 4px;
							background-color: rgba(0,0,0,.3);
							margin-top: 25px;
							color: #fff;
							position: absolute;
							top: 0px;
							bottom: 0px;
							margin-top: auto;
							margin-bottom: auto;
							z-index: 10;
						}
						.left_btn{
							left: 4px;
						}
						.right_btn{
							right: 4px;
						}
					}
				}
				.status{
					width: 250px;
					height: 500px;
					padding-left: 16px;
					padding-right: 16px;
					float: left;
					color: #000;
					background-color: #fff;
					.info_box{
						width: 100%;
						height: 254px;
						dl{
							width: 100%;
							height: 130px;
							padding-top: 22px;
							padding-bottom: 10px;
							dt{
								width: 70px;
								margin: 0px auto;
								img{
									width: 70px;
									height: 70px;
									border-radius: 50%;
								}
							}
							dd{
								width: 100%;
								text-align: center;
								font-size: 14px;
								margin-top: 10px;
							}
						}
						.btnBox{
							width: 100%;
							height: 124px;
							text-align: center;
							background-color: #f2f2f2;
							padding-top: 12px;
							padding-bottom: 24px;
							div{
								margin-top: 14px;
								.el-button{
									width: 130px;
									border: 1px solid $primary;
								}
							}
						}
						.info{
							width: 100%;
							height: 124px;
							.info_money{
								width: 100%;
								height: 44px;
								padding-bottom: 10px;
								border-bottom: 1px solid $border_color;
								text-align: center;
								.info_num{
									color: $primary;
								}
							}
						    .info_order{
								width: 100%;
								.order_menu{
									width: 100%;
									height: 32px;
									i{
										display: inline-block;
										width: 12px;
										height: 12px;
										border-radius: 50%;
										vertical-align: middle;
										text-align: center;
										color: #fff;
										background-color: $primary;
									}
								} 
							}
						}
					}
				}
				.pre_msg{
					width: 100%;
					height: 116px;
					.msg_list{
						li{
							color: $text_color;
							line-height: 20px;
							overflow: hidden; 
			                white-space: nowrap;
			                text-overflow: ellipsis;
			                -o-text-overflow: ellipsis;
						}
					}
				}
				.info_title{
					width: 100%;
					height: 48px;
					line-height: 48px;
					span{
						float: left;
						font-weight: 600;
					}
					em{
						float: right;
						color: $text_color;
					}
				}
				.recharge{
					width: 100%;
					height: 130px;
					.recharge_title{
						width: 100%;
						div{
							display: inline-block;
							width: 48%;
							text-align: center;
							height: 26px;
							line-height: 26px;
							cursor: pointer;
						}
					}
					.border_top{
						border-top: 2px solid $primary;
					}
					.el-row{
						width: 100%;
						height: 32px;
						line-height: 32px;
						.el-col-8{
							color: $primary;
						}
						.top_up{
							width: 76px;
							height: 24px;
							line-height: 24px;
							text-align: center;
							float: right;
							border-radius: 12px;
							background-color: $primary;
							color: #fff;
							margin-top: 4px;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>