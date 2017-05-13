<template>
	<div class="wrap">
		<div class="storeLogoWrap">
			<div class="storeLogoBox">
				<img src="">
			</div>
		</div>
		<v-nav></v-nav>
		<div class="content">
			<dl class="goodsInfo">
				<dt>
					<img src="">
				</dt>
				<dd>
					<div class="leftBtn"></div>
					<div class="imgList">
						<ul>
							<li v-for='item in 5'></li>
						</ul>
					</div>
					<div class="rightBtn"></div>
				</dd>
			</dl>
			<div class="shopInfo">
				<div class="title">
					韩束乳液满119减120韩束乳液满119减120韩束乳液满119减120韩束乳液满119减120韩束乳液满119减120韩束乳液满119减120
				</div>
				<dl  class="priceInfo">
					<dt class="price">
						<el-row>
							<el-col :span='4'>
								原价
							</el-col>
							<el-col :span='20' style='text-decoration: line-through'>
								{{399.00 |currency}}
							</el-col>
						</el-row>
						<div class="totalEval">
							<span>累计评价</span>
							<em>1925</em>
						</div>
						<el-row>
							<el-col :span='4' style='padding-top: 16px;'>
							     帅柏价
							</el-col>
							<el-col :span='20' style='color: #f24450;'>
								￥<span style="font-size:30px;">299.00</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								会员
							</el-col>
							<el-col :span='20'>
								<ul>
									<li>可使用&nbsp;{{0}}&nbsp;积分</li>
									<li>可使用&nbsp;{{0}}&nbsp;购物币</li>
									<li>可使用&nbsp;{{0}}&nbsp;PV</li>
								</ul>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								促销
							</el-col>
							<el-col :span='20'>
								满599减100
							</el-col>
						</el-row>
					</dt>
					<dd class="delivery">
						<el-row>
							<el-col :span='4'>
								配送至
							</el-col>
							<el-col :span='20'>
								<div class="addressInfo">
									<div @click='addressBol=true'>{{proName}}{{cityName}}<em></em></div>
									<div class="addressList" v-show='addressBol'>
										<ul>
											<li v-for="(item,index) in cityArr" v-text='item.name' @click='setOption("proIndex",index)' v-if='index!=0' :class='{"isChecked":proIndex===index}'></li>
										</ul>
										<ul v-show='proIndex'>
											<li v-for="(item2,index2) in cityArr[proIndex].sub" v-text='item2.name'  @click='setOption("cityIndex",index2)' v-if='index2!=0' :class='{"isChecked":cityIndex===index2}'></li>
										</ul>
										<ul v-show='cityIndex'>
											<li  v-for="(item3,index3) in cityArr[proIndex].sub[cityIndex].sub" v-text='item3.name'
											v-if='index3!=0' :class='{"isChecked":areaIndex===index3}' @click='chooseOver(index3)'></li>
										</ul>
									</div>
								</div>
								<div class="expressInfo">
									<span>快递</span>
									<em>免运费</em>
								</div>

							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								规格
							</el-col>
							<el-col :span='20' class='chooseBtn'>
								<button v-for='(item,index) in 2' :index='index' @click='version=index' :class='{"checkedBorder": version===index}'>常规版</button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								规格
							</el-col>
							<el-col :span='20' class='chooseBtn'>
								<button v-for='(item,index) in 2' :index='index' @click='combo=index' :class='{"checkedBorder": combo===index}'>套餐一</button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								数量
							</el-col>
							<el-col :span='20' class='chooseNum'>
								<button>减</button>
								<input type="text" name="">
								<button>加</button>
								<em style="line-height:28px;margin-left:10px;">件</em>
								<span style="line-height: 28px;margin-left: 20px;">(库存122件)</span>
							</el-col>
						</el-row>
						<div class='buyBtn'>
							<el-button type='primary'>立即购买</el-button>
							<el-button type='text'>加入购物车</el-button>
						</div>
					</dd>
					
				</dl>
			</div>
			<div class="storeInfo">
				<div class="title">
					<div class="titleContent">
						<div class="slider"></div>
						<div class="name">帅柏直营</div>
						<div class="slider"></div>
					</div>
				</div>
				<div class="storeContent">
					<div class="storeName">
						帅柏商城直营店
					</div>
					<div class="eval">
						<dl>
							<dt>商品</dt>
							<dd>4.5</dd>
						</dl>
						<dl>
							<dt>服务</dt>
							<dd>4.9</dd>
						</dl>
						<dl>
							<dt>物流</dt>
							<dd>4.1</dd>
						</dl>
					</div>
					<dl class="online">
						<dt>在线客服</dt>
						<dd>
							<img src="">
							客服天天
						</dd>
					</dl>
					<div class="collectBtn">
						<el-button type='text' size='small'>
							<img src="">
							收藏店铺
						</el-button>
						<el-button type='text' style='margin-left:10px;' size='small'>
							<img src="">
							收藏商品
						</el-button>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import { arrCity } from '../../common/js/city.js'
 	import {currency} from '../../common/js/filter.js'
 	import vNav from './nav.vue'
	export default{
		data(){
			return {
				version: '',
				combo: '',
				cityArr: [{
		      		name: '',
		      		sub: [{
		      			name: '',
		      			sub: ''
		      		}]
		      	}],
		      	proIndex: 0,
		        cityIndex: 0,
		        areaIndex: 0,
		        proName: '浙江',
		        cityName: '杭州',
		        addressBol: false
			}
		},
		filters: {
			currency
		},
		components: {
			vNav
		},
		methods: {
			setOption(type,index){
	             if(type === 'proIndex'){
	             	this.proIndex = index;
	                this.cityIndex = 0;
	                this.areaIndex = 0;
	            }
	            if(type === 'cityIndex'){
	            	this.cityIndex = index;
	                this.areaIndex = 0;
	            }
	        },
	        chooseOver(index) {
	            let _this = this ;
	            _this.areaIndex = index;
	            _this.proName = _this.cityArr[_this.proIndex].name;
	            _this.cityName = _this.cityArr[_this.proIndex].sub[_this.cityIndex].name;
	            _this.addressBol = false;
	        }
		},
		created() {
			this.$nextTick(()=>{
	            this.cityArr = arrCity;
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
$title_color: #333;
  .wrap{
      width: 100%;
      .storeLogoWrap{
      	width: 100%;
      	background-color: #f2f2f2;
      	.storeLogoBox{
      		width: 1250px;
      		margin: 0px auto;
      		img{
      			width: 100%;
      			height: 150px;
      		}
      	}
      }
      .content{
      	width: 1250px;
      	margin: 20px auto;
      	overflow: hidden;
      	.goodsInfo{
      		float: left;
			width: 420px;
			dt{
				width: 100%;
				img{
					width: 100%;
					height: 420px;
				}
			}
			dd{
				margin-top: 30px;
				overflow: hidden;
				.leftBtn,.rightBtn{
					float: left;
					width: 20px;
					height: 60px;
					background-color: #f5f5f5;
					border-radius: 4px;
				}
				.imgList{
					float: left;
					width: 356px;
					margin-left: 12px;
					margin-right: 12px;
					overflow: hidden;
					li{
						float: left;
						width: 60px;
						height: 60px;
						margin-right: 14px;
						img{
							width: 58px;
							height: 58px;
							border: 1px solid transparent;
						}
					}
					li:last-child{
						margin-right: 0px;
					}
				}
			}
      	}
      	.shopInfo{
      		float: left;
      		width: 570px;
      		margin: 0px 30px;
      		overflow: hidden;
      		.price{
      			overflow: hidden;
      			margin-bottom: 26px;
      			padding: 20px 30px 4px 16px;
      			background-color: #f9f9f9;
      			.totalEval{
      				width: 100px;
      				float: right;
      				span{
      					color: $text_color;
      				}
      				em{
      					font-size: 14px;
      					font-weight: 600;
      					color: $red_color;
      				}
      			}
      		}
      		.delivery{
      			.el-col-4{
      				line-height: 28px;
      			}
      			padding-left: 16px;
      		}
      		.el-row{
      			float: left;
      			width: 342px;
      			margin-bottom: 16px;
      			.el-col-4{
      				color: $text_color;
      			}
      			.el-col-20{
      				ul{
      					li{
	      					margin-bottom: 10px;
	      				}
      					li:last-child{
      						margin-bottom: 0px;
      					}
      				}
      				.addressInfo,.expressInfo{
      					float: left;
      					line-height: 28px;
      				}
      				.addressInfo {
      					position: relative;
      					cursor: pointer;
      					.addressList{
      						position: absolute;
      						top: 28px;
      						left: 0px;
      						z-index: 20;
      						width: 400px;
      						height: 228px;
      						overflow-y: scroll;
      						padding: 10px;
      						border:1px  solid $border_color;
      						background-color: #fff;
      						ul{
      							overflow: hidden;
      							border-bottom:1px dashed $border_color;
      							margin-bottom: 10px;
      							li{
      								float: left;
      								margin-right: 10px;
      								line-height: 20px;
      							}
      							.isChecked{
      								color: $red_color;
      							}
      						}
      						ul:last-child{
      							border-bottom: none;
      						}
      					}
      				}
      				.expressInfo{
      					margin-left: 30px;
      					span{
      						color: $text_color;
      					}
      					em{
      						margin-left: 10px;
      					}
      				}
      				button{
      					height: 28px;
      					text-align: center;
      					outline: none;
      					background-color: transparent;
      					border: 1px solid $border_color;
      				}
      			}
      			.chooseBtn{
      				button{
      					padding: 0px 20px;
      					line-height: 26px;
      					margin-right: 10px;
      				}
      				.checkedBorder{
      					border:2px solid $primary;
      				}
      			}
      			.chooseNum{
      				padding-left: 1px;
				     button{
				     	width: 28px;
				     	text-align: center;
				     	margin-left: -1px;
				     	float: left;
				     }
				     input{
				     	float: left;
				     	width: 50px;
				     	height: 28px;
				     	margin-left:-1px;
				     }
      				}
      		}
      		.title{
      			margin-top: -6px;
      			font-size: 16px;
      			font-weight: 600;
      			line-height: 28px;
      			color: #333;
      			margin-bottom: 10px;
      		}
      		.buyBtn{
      			float: left;
      			margin-top: 40px;
      			margin-left: 58px;         
      			.el-button{
      				width: 160px;
      				height: 40px;
      				margin-right: 10px;
      				border: 1px solid $primary;
      			}
      		}
      	}
      	.storeInfo{
      		float: left;
      		width: 200px;
      		height: 340px;
      		border: 1px solid $border_color;
      		.title{
      			width: 198px;
      			height: 40px;
      			padding-top: 10px;
      			overflow: hidden;
      			background: -webkit-linear-gradient(top,#cd2b2d,#cd4b2a) ;
      			.titleContent{
      				width: 156px;
      				margin: 0px auto;
      				.slider{
	      				float: left;
	      				width: 28px;
	      				height: 1px;
	      			    margin-top: 10px;
	      				background-color: #fff;
	      			}
	      			.name{
	      				float: left;
	      				width: 100px;
	      				padding: 0px 10px;
	      				text-align: center;
	      				color: #fff;
	      				font-size: 20px;
	      			}
      			}
      		}
      		.storeContent{
      			width: 198px;
      			padding: 0px 10px;
      			.storeName{
      				height: 56px;
      				line-height: 56px;
      				font-size: 16px;
      				text-align: center;
      				border-bottom: 1px solid $border_color;
      			}
      			.eval{
      				padding: 16px 0px;
      				text-align: center;
      				overflow: hidden;
      				border-bottom: 1px solid $border_color;
      				dl{
      					float: left;
      					width: 33.33%;
      					border-right: 1px solid $border_color;
      					dt{
      						font-size: 14px;
	      					color: $text_color;
	      					margin-bottom: 14px;
	      				}
	      				dd{
	      					font-size: 16px;
	      					color: $red_color;
	      				}
      				}
      				dl:last-child{
      					border-right: none;
      				}
      			}
      			.online{
      				padding: 8px 0px 24px;
      				text-align: center;
      				border-bottom: 1px solid $border_color;
      				dt{
      					height: 40px;
      					line-height: 40px;
      				}
      				dd{
      					width: 80px;
      					height: 24px;
      					line-height: 24px;
      					margin: 0px auto; 
      					border-radius: 12px;
      					background-color: #38b8fc;
      					color: #fff;
      				}
      			}
      			.collectBtn{
      				margin-top: 24px;
      				text-align: center;
      				.el-button{
      					border: 1px solid $red_color;
      					padding: 6px 10px;
      				}
      			}
      		}
      		
      	} 
      }
  	
  }
</style>