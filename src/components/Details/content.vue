<template>
	<div class="wrap" v-if='goodsInfo'>
		<div class="storeLogoWrap">
			<div class="storeLogoBox">
				<img :src="goodsInfo.goods.shop_logo">
			</div>
		</div>
		<v-nav></v-nav>
		<div class="content" >
			<dl class="goodsInfo">
				<dt>
					<img :src="goodsInfo.goods.cover">
				</dt>
				<dd>
					<div class="leftBtn"></div>
					<div class="imgList">
						<ul>
							<li v-for='item in goodsInfo.goods.images'>
								<img :src="item">
							</li>
						</ul>
					</div>
					<div class="rightBtn"></div>
				</dd>
			</dl>
			<div class="shopInfo">
				<div class="title">
					{{goodsInfo.goods.name}}
				</div>
				<dl  class="priceInfo">
					<dt class="price">
						<el-row>
							<el-col :span='4'>
								原价
							</el-col>
							<el-col :span='20' style='text-decoration: line-through'>
								{{goodsInfo.goods.market_price |currency}}
							</el-col>
						</el-row>
						<div class="totalEval">
							<span>累计评价</span>
							<em>{{goodsInfo.goods.sale_count}}</em>
						</div>
						<el-row>
							<el-col :span='4' style='padding-top: 16px;'>
							     帅柏价
							</el-col>
							<el-col :span='20' style='color: #f24450;'>
								￥<span style="font-size:30px;">{{goodsInfo.goods.shop_price}}</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								会员
							</el-col>
							<el-col :span='20'>
								<ul>
									<li>可使用&nbsp;{{goodsInfo.goods.max_integration}}&nbsp;积分</li>
									<li>可使用&nbsp;{{goodsInfo.goods.max_shopping_coin}}&nbsp;购物币</li>
									<li>可使用&nbsp;{{goodsInfo.goods.pv}}&nbsp;PV</li>
								</ul>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								促销
							</el-col>
							<el-col :span='20'>
								<span  class="full">满&nbsp;减</span>满&nbsp;{{goodsInfo.full[0].limit}}&nbsp;减&nbsp;{{goodsInfo.full[0].amount}}
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
						<el-row v-for='items in goodsInfo.goods.specs'>
							<el-col :span='4'>
								{{items.name}}
							</el-col>
							<el-col :span='20' class='chooseBtn'>
								<button :index='index' @click='items.select=index' :class='{"checkedBorder": items.select===index}' v-for='(item,index) in items.items'>{{item.name}}
								<img src="../../../static/detailImg/checked.png" height="16" width="16" v-show='items.select===index'>
								</button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								数量
							</el-col>
							<el-col :span='20' class='chooseNum'>
								<button @click='changeNum(0)'><i class="el-icon-minus"></i></button>
									<input type="text" name="" v-model='numInput'>
								<button @click='changeNum(1)'><i class="el-icon-plus"></i></button>
								<em style="line-height:28px;margin-left:10px;">件</em>
								<span style="line-height: 28px;margin-left: 20px;">(库存{{stockNum}}件)</span>
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
						<div class="name">{{goodsInfo.goods.shop_name}}</div>
						<div class="slider"></div>
					</div>
				</div>
				<div class="storeContent">
					<div class="storeName">
						{{goodsInfo.goods.name}}
					</div>
					<div class="eval">
						<dl>
							<dt>商品</dt>
							<dd>{{goodsInfo.goods.comment.goods_comment}}</dd>
						</dl>
						<dl>
							<dt>服务</dt>
							<dd>{{goodsInfo.goods.comment.service_comment}}</dd>
						</dl>
						<dl>
							<dt>物流</dt>
							<dd>{{goodsInfo.goods.comment.logistics_comment}}</dd>
						</dl>
					</div>
					<dl class="online">
						<dt>在线客服</dt>
						<dd>
							<img src ="../../../static/commonImg/qq.png" height="14" width="12">
							客服天天
						</dd>
					</dl>
					<div class="collectBtn">
						<el-button type='text' size='small' @click='goodsInfo.goods.is_seller_collection=!goodsInfo.goods.is_seller_collection' :class='{"isView":goodsInfo.goods.is_seller_collection}'>
							<img src="../../../static/detailImg/viewStoreOn.png" v-show='!goodsInfo.goods.is_seller_collection'  height="14" width="14">
							<img src="../../../static/detailImg/viewStoreOff.png" v-show='goodsInfo.goods.is_seller_collection' height="14" width="14">
							{{goodsInfo.goods.is_seller_collection?'取消关注':'关注店铺'}}
						</el-button>
						<el-button type='text'  size='small' style='margin-left:0px;' @click='goodsInfo.goods.is_collection=!goodsInfo.goods.is_collection' :class='{"isView":goodsInfo.goods.is_collection}'>
							<img src="../../../static/detailImg/colGoodOn.png" v-show='!goodsInfo.goods.is_collection' height="14" width="14">
							<img src="../../../static/detailImg/colGoodOff.png" v-show='goodsInfo.goods.is_collection' height="14" width="14">
							{{goodsInfo.goods.is_collection?'取消收藏':'收藏商品'}}
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
 	import {goodsDetail} from '../../common/js/api.js'
 	import vNav from './nav.vue'
	export default{
		data(){
			return {
				goodsInfo: null,
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
		        addressBol: false,
		        params: '',
		        numInput: 1,
		        stockNum: 0
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
	        },
	        getRequest() {
			 var url = location.search; //获取url中"?"符后的字串
			 var theRequest = new Object();
			 if (url.indexOf("?") != -1) {
			  let  str = url.substr(1);
			  let strs = str.split("&");
			  for(var i = 0; i < strs.length; i ++) {
			   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			  }
			 }
			 return theRequest;
			},
			changeNum(mask){
				let _this = this ;
				if (mask) {
					_this.numInput++;
					if (_this.numInput>_this.stockNum) {
							_this.numInput = _this.stockNum;
					}
				}else {
					_this.numInput-- ;
					if (_this.numInput<1) {
						_this.numInput=1;
					}
				}
			}
		},
		created() {
			this.$nextTick(()=>{
	            this.cityArr = arrCity;
	        })
		},
		mounted(){
			this.$nextTick(()=>{
				this.params = this.getRequest();
				let params = {
					access_token : sessionStorage.access_token,
					goods_id: this.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		window.location.href = 'login.html';
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else {
						this.goodsInfo = content ;
						this.stockNum = this.goodsInfo.goods.stock ;
					}
				})
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
      			.full{
      				width: 40px;
      				padding: 3px 6px;
      				text-align: center;	
      				border: 1px solid $primary;
      				border-radius: 2px;
      				margin-right: 16px;
      				color: $primary;
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
      					position: relative;
      					img{
      						position: absolute;
      						right: 0px;
      						bottom: 0px;
      					}
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
				     	text-align: center;
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
      					padding: 6px;
      				}
      				.isView{
      					color: #666;
      				}
      			}
      		}
      		
      	} 
      }
  	
  }
</style>