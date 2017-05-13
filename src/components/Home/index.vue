<template>
	<div class="wrap">
		<div class="nav_wrap">
			<nav class="nav_box">
				<a href="javascript:void(0)">全部商品分类</a>
				<a href="integral.html">积分半价</a>
				<a href="">购物币专区</a>
				<a href="">百城万店</a>
			</nav>
		</div>
		<div class="con_wrap">
		<div class="con_box">
			<ul class="con_list" @mouseenter='listBol=true'>
				<li v-for='(item,index) in category' :key='item' v-text='item.name' @mouseenter='thislist(index)'></li>
			</ul>
			<div class="content" >
			<!-- v-show='listBol' @mouseleave='listBol=false' -->
				<div class="detail_list">
					<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2'>
						<el-col :span='4'>
						    <span v-text='item2.name'></span>
						    <em>></em>
						</el-col>
						<el-col :span='16' :offset="1">
							<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3' v-text='item3.name'></span>
						</el-col>
					</el-row>
				</div>
				<div class="img_box">
					 <ul class="small_img">
					 	<li v-for='(j,index) in 4' :class='{"margin_left":index%2}'>
					 		<img src="">
					 	</li>
					 </ul>
					 <ul class="big_img">
					 	<li v-for= '(k,index) in 2'>
					 		<img src="">
					 	</li>
					 </ul>

				</div>
			</div>
			<dl class="slide_show">
				<dt>
					<el-carousel height="390px">
				      <el-carousel-item v-for="item in banners" :key="item">
				        <img :src="item.image">
				      </el-carousel-item>
				    </el-carousel>
				</dt>
				<dd>
					<div class="left_btn"></div>   
					<div class="cont">
						<img :src="item.image" alt="" v-for='item in banners' :key='item'>
					</div>
					<div class="right_btn"></div>
				</dd>
			</dl>
			<div class="status">
				<div class="info_box">
					<dl>
						<dt>
							<img :src="userInfo.avater">
						</dt>
						<dd>
							<span>Hi,您好！{{userInfo.nickname}}</span>
						</dd>
					</dl>
					<div class="btnBox" v-if='!hasUser'>
						<div>
							<a href="login.html">
								<el-button type='text' size='small'>登录</el-button>
							</a>
						</div>
						<div>
							<a href="reg.html">
								<el-button type='text' size='small'>注册新用户</el-button>
							</a>
						</div>
					</div>
					<div class="info" v-if='hasUser'>
						<el-row class='info_money'>
							<el-col :span='8'>
								<div class="info_num" v-text='userInfo.account'>
								</div>
								<div>
									余额
								</div>
							</el-col>
							<el-col :span='8'>
								<div class="info_num" v-text='userInfo.shopping_coin'>
								</div>
								<div>
									购物币
								</div>
							</el-col>
							<el-col :span='8'>
								<div class="info_num" v-text='userInfo.integration'>
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
import {getHomePage,getCategory} from '../../common/js/api.js'
import {num_filter,currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{
			   listBol: false,
			   userInfo:{
			   		nickname: '',
			   		avater:'',
			   		account: '',
			   		integration: '',
			   		shopping_coin: ''
			   },
			   banners: [],
			   category: [{name:''}],
			   fIndex: 0,
			   sIndex: 0,
			   recharge_bol: true,
			   recharge_val: '',
			   options: [{
		          value: '额度1',
		          label: '10.00'
		        }, {
		          value: '额度2',
		          label: '20.00'
		        }, {
		          value: '额度3',
		          label: '30.00'
		        }, {
		          value: '额度4',
		          label: '40.00'
		        }, {
		          value: '额度5',
		          label: '50.00'
		        }],
        		value: '',
        		hasUser: false
			}
		},
		filters:{
			num_filter,
			currency
		},
		methods:{
			thislist(index){
				this.fIndex = index;
				console.log(this.category[this.fIndex].child_category);
			},
			homePage(){
				let params = {
					t: '5-web',
					postion: '0'
				};
				getHomePage(params).then(res=>{
					let {content} = res;
					this.banners = content.banners ;
 				});
			},
			categoryList(){
				getCategory().then(res=>{
					let {errcode,content} = res ;
					if (errcode === 0 ) {
						this.category = content;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
				this.homePage();
				this.categoryList();
			})
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
			.con_box{
				width: 1250px;
				margin: 0px auto;
				overflow: hidden;
				position: relative;
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
				.content{
					position: absolute;
					top: 0px;
					left: 150px;
					width: 850px;
					height: 500px;
					overflow: hidden;
					background-color: #fff;
					z-index: 99;
					.detail_list{
						width: 600px;
						height: 500px;
						overflow-y: auto;
						overflow-x: hidden;
						padding-left: 20px;
						padding-top: 28px;
						float: left;
						.el-row{
							margin-bottom: 22px;
							.el-col-4{
								span{
									display: inline-block;
									width: 72px;
									text-align-last: justify;
								}
								em{
									margin-left: 6px;
								}
								
							}
							.el-col-16{
								overflow: hidden;
								padding-left: 6px;
								padding-bottom: 10px;
								border-bottom:  1px dashed #dcdcdc;
								span{
									float: left;
									margin-right: 16px;
									margin-bottom: 20px;
								}
							}
						}
					}
					.img_box{
						float: left;
						width: 250px;
						height: 500px;
						padding: 10px;
						background-color: #f2f2f2;
						img{
							width: 100%;
							height: 110px;
						}
						.small_img{
							border-bottom: 1px solid $border_color;
							overflow: hidden;
							li{
								float: left;
								width: 110px;
								margin-bottom: 10px;
								
							}
							.margin_left{
								margin-left: 10px;
							}
						}
						.big_img{
							width: 100%;
							li{
								width: 100%;
							    margin-top: 10px;
							}
						}
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