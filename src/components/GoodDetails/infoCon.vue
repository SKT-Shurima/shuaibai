<template>
	<div class="wrap" v-if='goodsInfo'>
		<v-nav></v-nav>
		<div class="content" >
			<dl class="goodsInfo">
				<dt>
					<img :src="currentImg">
				</dt>
				<dd>
					<div class="leftBtn" @click='imgListIndex--;'><i class="el-icon-caret-left"></i></div>
					<div class="imgList">
						<ul>
							<li v-for='(item,index) in goodsInfo.goods.images' @click='imgListIndex=index;currentImg=item;' :class='{"isClick":imgListIndex===index}'> 
								<img :src="item">
							</li>
						</ul>
					</div>
					<div class="rightBtn" @click='imgListIndex++;'><i class="el-icon-caret-right"></i></div>
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
								￥<span style="font-size:30px;">{{salePrice*(numInput-0)}}</span>
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
						<el-row v-for='items in specs'>
							<el-col :span='4'>
								{{items.name}}
							</el-col>
							<el-col :span='20' class='chooseBtn'>
								<button :index='index' @click='items.select=index' :class='{"checkedBorder": items.select===index}' v-for='(item,index) in items.items'>{{item.name}}
								<img src="../../../static/commonImg/checked.png" height="12" width="12" v-show='items.select===index'>
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
							<el-button type='primary' >立即购买</el-button>
							<el-button type='text' @click='addShopCar'>加入购物车</el-button>
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
						<el-button type='text' size='small' @click='follow' :class='{"isView":goodsInfo.goods.is_seller_collection}'>
							<img src="../../../static/detailImg/viewStoreOn.png" v-show='!goodsInfo.goods.is_seller_collection'  height="14" width="14">
							<img src="../../../static/detailImg/viewStoreOff.png" v-show='goodsInfo.goods.is_seller_collection' height="14" width="14">
							{{goodsInfo.goods.is_seller_collection?'取消关注':'关注店铺'}}
						</el-button>
						<el-button type='text'  size='small' style='margin-left:0px;' @click='collection' :class='{"isView":goodsInfo.goods.is_collection}'>
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
	import { arrCity } from '../../common/js/city'
 	import {currency} from '../../common/js/filter'
 	import {getRequest,errorInfo} from '../../common/js/common'
 	import {goodsDetail,addCart,collectionGoods,addFollow,cancelFollow} from '../../common/js/api'
 	import {MessageBox,Message} from  'element-ui'
 	import vNav from '../StoreCommon/nav'
	export default{
		data(){
			return {
				goodsInfo: null, // 请求成功后的商品信息
				imgListIndex: 0, // 详细展示图列表索引 默认为0
				currentImg: "" , // 当前详情页的大图
				salePrice: 0, // 帅柏价
				version: '', 
				combo: '',
				cityArr: [{
		      		name: '',
		      		sub: [{
		      			name: '',
		      			sub: ''
		      		}]
		      	}],   // 省市区三级联动数组
		      	proIndex: 0, // 省份索引
		        cityIndex: 0, // 城市索引
		        areaIndex: 0, // 地区索引 
		        proName: '浙江', // 选择后的地区
		        cityName: '杭州',
		        addressBol: false, // 三级联动控制开关
		        params: '',  // 详情页获取数据的请求参数
		        numInput: 1, // 数量选择
		        option_id: "", // 规格id
		        stockNum: 0, // 库存
		        specs: null  // 类型
			}
		},
		filters: {
			currency
		},
		components: {
			vNav
		},
		watch: {
			//  监测当前展示图片
			imgListIndex(){
				let _this = this;
				if (_this.imgListIndex<0) {
					_this.imgListIndex = 0;
				}else if (_this.imgListIndex>_this.goodsInfo.goods.images.length-1) {
					_this.imgListIndex = _this.goodsInfo.goods.images.length-1 ;
				} 
				_this.currentImg = _this.goodsInfo.goods.images[_this.imgListIndex] ;
			},
			//  监测选中类型值的变化 更改库存信息
			specs: {
				handler(){
					let _this = this ;
					let arr = _this.specs;
					let specs= '';
					for(let i = 0;i<arr.length;i++){
						let index = arr[i].select ;
						if (typeof(index) === 'number') {
							specs += arr[i].items[index].id +"_";
						}
					}
					specs = specs.substr(0,specs.length-1);
					let options  = _this.goodsInfo.goods.options;
					for(let j = 0 ; j< options.length;j++){
						if (options[j].specs === specs) {
							_this.stockNum = options[j].stock ;
							_this.salePrice = options[j].sale_price ;
							_this.option_id = options[j].id ;
						}
					}
				},
				deep: true
			},
			 //  监测数量框的数据变化
			 numInput(){
			 	let _this = this ;
			 	let reg = /^\d+$/g;
			 	if (!reg.test(_this.numInput)) {
			 		_this.numInput = 1 ;
			 	}else if (_this.numInput-0>_this.stockNum-0) {
			 		_this.numInput = _this.stockNum;
			 	}
			 },
			 // 监测库存量的数据变化
			 stockNum(){
			 	let _this = this;
			 	if (_this.numInput-0>_this.stockNum-0) {
			 		_this.numInput = _this.stockNum;
			 	}
			 }
			},
		methods: {
			// 选择对应的城市地区
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
	        // 选择完毕
	        chooseOver(index) {
	            let _this = this ;
	            _this.areaIndex = index;
	            _this.proName = _this.cityArr[_this.proIndex].name;
	            _this.cityName = _this.cityArr[_this.proIndex].sub[_this.cityIndex].name;
	            if (_this.proName === _this.cityName) {
	            	_this.proName = _this.cityArr[_this.proIndex].sub[_this.cityIndex].name;
	           		_this.cityName = _this.cityArr[_this.proIndex].sub[_this.cityIndex].sub[_this.areaIndex].name;
	            }
	            _this.addressBol = false;
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
			},
			// 初始化
			init(){
				let _this = this ;
				_this.stockNum = _this.goodsInfo.goods.stock ;
				_this.specs = _this.goodsInfo.goods.specs;
				_this.salePrice = _this.goodsInfo.goods.shop_price;
				_this.currentImg = _this.goodsInfo.goods.cover;
			},
			// 添加购物车
			addShopCar(){
				let _this = this ;
				let params = {
				    access_token: sessionStorage.access_token,
					goods_id: _this.params.goods_id,
					option_id: _this.option_id,
					quantity: _this.numInput
				}
				addCart(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						Message.success({
				          message: '成功添加购物车',
				          type: 'success'
				        });
					}
				})
			},
			// 收藏、取消收藏
			collection(){
				let _this = this;
				let params = {
					access_token: sessionStorage.access_token,
					goods_id: _this.params.goods_id
				}
				collectionGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goodsInfo.goods.is_collection=!this.goodsInfo.goods.is_collection;
						console.log(content);
					}
				})
			},
			// 关注/取消关注
			follow(){
				let _this = this ;
				let fn ;
				if(_this.goodsInfo.goods.is_seller_collection){
					fn = cancelFollow;
				}else {
					fn = addFollow;
				}
				let params ={
					access_token: sessionStorage.access_token,
					seller_id: _this.goodsInfo.goods.seller_id
				}
				fn(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						console.log(content)
						this.goodsInfo.goods.is_seller_collection=!this.goodsInfo.goods.is_seller_collection
					}
				})
			}
		},
		created() {
			this.$nextTick(()=>{
	            this.cityArr = arrCity;
	        })
		},
		mounted(){
			this.$nextTick(()=>{
				this.params = getRequest();
				let params = {
					access_token : sessionStorage.access_token,
					goods_id: this.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goodsInfo = content ;
						// 初始化结构数据
						this.init();
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
					cursor: pointer;
					width: 20px;
					height: 60px;
					text-align: center;
					background-color: #f5f5f5;
					border-radius: 4px;
					i{
						line-height: 60px;
						color: #aaa;
					}
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
						border: 2px solid transparent;
						img{
							width: 58px;
							height: 58px;
						}
					}
					li:last-child{
						margin-right: 0px;
					}
					.isClick{
						border: 1px solid $primary;
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
      				overflow: hidden;
      				button{
      					float: left;
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