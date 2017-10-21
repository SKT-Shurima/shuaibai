<template>
	<div class="wrap" v-if='goods'>
		<v-nav :shopHeader='shop_header'></v-nav>
		<div class="container" >
			<dl class="goodsInfo">
				<dt>
					<!-- <img :src="currentImg"> -->
					<magnifying-glass :currentImg='currentImg'></magnifying-glass>
				</dt>
				<dd>
					<div class="imgList">
						<ul>
							<li v-for='(item,index) in goods.images' @click='imgListIndex=index;currentImg=item;' :class='{"isClick":imgListIndex===index}'> 
								<img :src="item">
							</li>
						</ul>
					</div>
				</dd>
			</dl>
			<div class="shopInfo">
				<div class="title">
					{{goods.name}}
				</div>
				<!-- 一元抢购 -->
				<div class='special' v-if='special' :class='payBol===false&&addBol===true?"start":payBol&&addBol?"end":"over"'>
					<img src="../../../static/detailImg/snapup.png" height="32" width="109">
					<span v-show='special.date_start*1000>nowTime'>此商品<i>{{(special.date_start*1000-nowTime)|countdown}}</i>后开始抢购，请提前加入购物车！</span>
					<span v-show='special.date_start*1000<=nowTime&&special.date_end*1000>=nowTime'>此商品正在参加抢购，<i>{{(special.date_end*1000-nowTime)|countdown}}</i>后结束，请尽快购买！</span>
					<span v-show='special.date_end*1000<nowTime'>本次抢购已结束，期待下次！</span>
				</div>
				<dl  class="priceInfo">
					<dt class="price">
						<el-row>
							<el-col :span='4'>
								原价
							</el-col>
							<el-col :span='20' style='text-decoration: line-through'>
								{{goods.market_price|currency}}
							</el-col>
						</el-row>
						<div class="totalEval">
							<span>累计评价</span>
							<em>{{goods.comment.total}}</em>
						</div>
						<el-row>
							<el-col :span='4' style='padding-top: 16px;'>
							     帅柏价
							</el-col>
							<el-col :span='20' style='color: #f24450;'>
								￥<span style="font-size:30px;">{{(salePrice-0).toFixed(2)}}</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>
								会员
							</el-col>
							<el-col :span='20'>
								<ul>
									<li>可使用&nbsp;{{goods.max_integration}}&nbsp;积分</li>
									<li>可使用&nbsp;{{goods.max_shopping_coin}}&nbsp;会员积分</li>
									<li>可使用&nbsp;{{goods.pv}}&nbsp;PV</li>
								</ul>
							</el-col>
						</el-row>
						<el-row v-if='full.length'>
							<el-col :span='4'>
								促销
							</el-col>
							<el-col :span='20'>
								<span  class="full">满&nbsp;减</span>满&nbsp;{{full[0].limit}}&nbsp;减&nbsp;{{full[0].amount}}
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
										<ul v-if='provinceArr'>
											<li v-for="(proItem,index) in provinceArr" v-text='proItem.name' @click='getAddress(proItem.zone_id,"pro",index)'  :class='{"isChecked":proIndex===index}'></li>
										</ul>
										<ul v-if='cityArr'>
											<li v-for="(cityItem,index) in cityArr" v-text='cityItem.name'  @click='getAddress(cityItem.zone_id,"city",index)'  :class='{"isChecked":cityIndex===index}'></li>
										</ul>
										<ul v-if='areaArr'>
											<li  v-for="(areaItem,index) in areaArr" v-text='areaItem.name'
											 :class='{"isChecked":areaIndex===index}' @click='chooseOver(index)'></li>
										</ul>
									</div>
								</div>
								<div class="expressInfo">
									<span>快递</span>
									<em> {{express_fee-0?"￥"+express_fee:"免运费"}}</em>
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
							<el-button type='primary' :disabled='!payBol' @click='settlement'>立即购买</el-button>
							<el-button type='text' @click='addShopCar' :disabled='!addBol'>加入购物车</el-button>
						</div>
					</dd>
				</dl>
			</div>
			<!-- 验证弹框 -->
			<el-dialog title="实名认证" :visible.sync="verifyBol">
				<el-form ref="verifyForm" :model="verifyForm" :rules="verifyRules" label-width="100px">
				  	<el-form-item label="姓名" prop='name'>
				    	<el-input v-model="verifyForm.name"></el-input>
				  	</el-form-item>
				  	<el-form-item label="电话" prop='phone'>
				    	<el-input v-model="verifyForm.phone"></el-input>
				  	</el-form-item>
				  	<el-form-item label="交易商账号" prop='trade_num'>
				    	<el-input v-model="verifyForm.trade_num" placeholder="请输入交易商账号,没有填无"></el-input>
				  	</el-form-item>
				  	<el-form-item label="详细地址" prop='address'>
				    	<el-input v-model="verifyForm.address"></el-input>
				  	</el-form-item>
				</el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="verifyBol = false">返 回</el-button>
			    <el-button type="primary" @click="verify('verifyForm')">确 定</el-button>
			  </div>
			</el-dialog>
			<store-info :goods='goods'></store-info>
		</div>
	</div>
</template>

<script>
 	import {currency,countdown} from '../../common/js/filter'
 	import {getRequest,errorInfo,getCookie} from '../../common/js/common'
 	import {linkage,goodsDetail,getExpressFees,addCart,buy,authentication,check_real_customer} from '../../common/js/api'
 	import {MessageBox,Message} from  'element-ui'
 	import magnifyingGlass from './magnifyingGlass'
 	import storeInfo from './storeInfo'
 	import vNav from '../StoreCommon/nav'
	export default{
		data(){
			// 交易商账号验证
    		var check_trad_num = (rule, value, callback) => {
    			if (value==='无') {
    				callback();
    			}else if (value === ''){
	    	 		callback(new Error('请输入交易商账号,没有填无'));
	    	 	} else {
	    	 		let reg = /^079\d{9}$/ ;
			        if ( !reg.test(value)) {
			          	callback(new Error('请输入正确交易商账号'));
			        } else{
			        	callback();
			        }
	    	 	}
		      };
			return {
				shop_header: "",
				special: null, // 特殊商品 如一元抢购
				nowTime: 0., //  计时器
				payBol: true, // 立即购买开关开关
				addBol: true, //  加入购物车开关
				goods: null, // 请求成功后的商品信息
				full: null, // 满减
				imgListIndex: 0, 
				currentImg: "" , // 当前详情页的大图
				salePrice: 0, // 帅柏价
				version: '', 
				combo: '',
				provinceArr: null,
				cityArr: null,
				areaArr: null, // 省市区三级联动数组
		      	proIndex: 0, // 省份索引
		        cityIndex: 0, // 城市索引
		        areaIndex: 0, // 地区索引 
		        proName: '浙江省', // 选择后的地区
		        cityName: '杭州市',
		        addressBol: false, // 三级联动控制开关
		        express_fee: "",//运费
		        params: '',  // 详情页获取数据的请求参数
		        numInput: 1, // 数量选择
		        option_id: "", // 规格id
		        stockNum: 0, // 库存
		        specs: null,  // 类型
		        verify_origin: '',
		        check_real_customer_bol: false,
		        verifyBol: false, // 实名认证弹框
		        verifyForm: {
		        	name: '',
		        	phone: "",
		        	trade_num: "",
		        	address: ''
		        },
		        verifyRules: {
		          	name: [
		            	{ required: true, message: '请输入活动名称', trigger: 'blur' }
		          	],
		          	phone: [
		          		{ required: true, message: '请输入电话号码', trigger: 'blur' }
		          	],
		          	trade_num: [
		          		{ required: true, validator: check_trad_num, trigger: 'blur' }
		          	],
		          	address: [
		          		{ required: true, message: '请输入详细地址', trigger: 'blur' }
		          	]
		        }
			}
		},
		filters: {
			currency,countdown
		},
		components: {
			vNav,storeInfo,magnifyingGlass
		},
		watch: {
			//  监测当前展示图片
			imgListIndex(){
				let _this = this;
				if (_this.imgListIndex<0) {
					_this.imgListIndex = 0;
				}else if (_this.imgListIndex>_this.goods.images.length-1) {
					_this.imgListIndex = _this.goods.images.length-1 ;
				} 
				_this.currentImg = _this.goods.images[_this.imgListIndex] ;
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
					let options  = _this.goods.options;
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
			// 获取省市区
			getAddress(id,mask,index){
				let _this = this ;
				let params = {
					pid: id?id:""
				}
				linkage(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						switch (mask) {
							case 'pro':
								_this.cityArr = null ;
								_this.areaArr = null ;
								_this.proIndex = index ;
								_this.cityIndex = 0 ;
								_this.cityArr  = content ;
							break;
							case 'city': 
								_this.areaArr = null
								_this.cityIndex = index;
								_this.areaIndex = 0 ;
								_this.areaArr = content ;
							break;
							default:
								_this.provinceArr = content ;
							break;
						}
					}
				})
			},
	        // 选择完毕
	        chooseOver(index) {
	            this.areaIndex = index;
	            this.proName = this.provinceArr[this.proIndex].name ;
	            this.cityName = this.cityArr[this.cityIndex].name;
	            if (this.proName === this.cityName) {
	            	this.proName = this.cityArr[this.cityIndex].name;
	           		this.cityName = this.areaArr[this.areaIndex].name;
	            }
	            let shops = [{
            		seller_id: this.goods.seller_id ,
            		goods: [{
            			goods_id: this.goods.goods_id,
						option_id: this.option_id ,
						quantity: this.numInput+"",
            		}]
            	}];
            	shops =  JSON.stringify(shops);
	            let params = {
	            	province_id: this.provinceArr[this.proIndex].zone_id-0,
	            	shops: shops
	            }
	            getExpressFees(params).then(res=>{
	            	let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.express_fee = content[0].express_fee ;
						this.addressBol = false;
					}
	            })
	        },
			changeNum(mask){
				if (mask) {
					this.numInput++;
					if (this.numInput>this.stockNum) {
							this.numInput = this.stockNum;
					}
				}else {
					this.numInput-- ;
					if (this.numInput<1) {
						this.numInput=1;
					}
				}
			},
			// 初始化
			init(){
				this.stockNum = this.goods.stock ;
				this.specs = this.goods.specs;
				this.salePrice = this.goods.shop_price;
				this.currentImg = this.goods.cover;
			},
			verify(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
			            let params = {
			            	access_token: getCookie('access_token'),
			            	name: this.verifyForm.name,
			            	phone: this.verifyForm.phone,
			            	trade_num: this.verifyForm.trade_num,
			            	address: this.verifyForm.address
			            };
			            authentication(params).then(res=>{
			            	let {errcode,message} = res ;
			            	if (errcode !== 0 ) {
			            		MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
			            	} else {
			            		this.check_real_customer_bol=true;
			            		if (this.verify_origin===0) {
			            			this.settlement();
			            		}else{
			            			this.addShopCar();
			            		}
			            	}
			            });
			        }
		        });
		    },
			// 立即购买
			settlement(){
				let _this = this ;
				if (this.goods.is_verify==="1"&&!this.check_real_customer_bol) {
					this.verifyBol = true;
					this.verify_origin = 0;
					return false;
				}
				if (_this.goods.options.length&&!_this.option_id) {
					MessageBox.alert("请选择商品规格", '提示', {
			          	confirmButtonText: '确定'
				    });
				    return ;
				}
			 	let params = {
			 		access_token: getCookie('access_token'),
			 		data: [{
			 			seller_id: _this.goods.seller_id,
			 			goods: [{
		 					goods_id: _this.params.goods_id,
							option_id: _this.option_id,
							quantity: _this.numInput
		 				}]
			 		}]
			 	}
			 	params.data = JSON.stringify(params.data);
			 	buy(params).then(res=>{
			 		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						location.href =  `confirmOrder.html#submitOrder?id=${content}` ;
					}
			 	})
			},
			// 添加购物车
			addShopCar(){
				let _this = this ;
				if (this.goods.is_verify==="1"&&!this.check_real_customer_bol) {
					this.verifyBol = true;
					this.verify_origin = 1;
					return false;
				}
				if (_this.goods.options.length&&!_this.option_id) {
					MessageBox.alert("请选择商品规格", '提示', {
			          	confirmButtonText: '确定',
			          	type: 'warning'
				    });
				    return ;
				}
				let params = {
				    access_token: getCookie('access_token'),
					goods_id: _this.params.goods_id,
					option_id: _this.option_id,
					quantity: _this.numInput
				}
				addCart(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.$store.commit('switchShopCar');
						MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定',
				          	type: 'success'
					    });
					}
				})
			},
			initTime(){
				let _this = this ;
				let  {date_start,date_end}  =  _this.special
				date_end*=1000;
				date_start*=1000;
				setInterval(()=>{
					this.nowTime = new Date().getTime() ;
					date_start-this.nowTime>0?(this.payBol= false):date_end-this.nowTime>0?(this.payBol=true):(this.payBol=false,this.addBol=false) ;
				},1000)
			}
		},
		created() {
			this.$nextTick(()=>{
	            this.getAddress();
	        })
		},
		mounted(){
			this.$nextTick(()=>{
				this.params = getRequest();
				let params = {
					access_token: getCookie('access_token'),
					goods_id: this.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods = content.goods ;
						this.special =  content.special;
						if(this.special){
							this.initTime();
						}
						this.full = content.full ;
						let  shop_header = {
							shop_header: content.goods.shop_header,
							seller_id: content.goods.seller_id
						}
						this.shop_header = shop_header ;
						// 初始化结构数据
						this.init();
						if (this.goods.is_verify==="1") {
							let checkParams = {
								access_token: getCookie('access_token')
							}
							check_real_customer(checkParams).then(res=>{
								let {errcode,message} = res ;
								if (errcode===0) {
									this.check_real_customer_bol = true;
								}
							})
						}
					}
				});
			})
		}
	}
</script>

<style lang='scss' scoped>
$border_color: #ccc;
$border_list: #f0f0f0;
$primary:#c71724;
$text_color: #666;
$time_color: #fff336 ;
$red_color: #f24450;
$btn_bg: #fff882;
$start_bg: #00bf8b;
$end_bg: #f13f4c;
$over_bg: #aaa;
$title_color: #333;
  .wrap{
      width: 100%;
      .container{
      	width: 1250px;
      	height: 500px;
      	margin: 20px auto;
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
				.imgList{
					float: left;
					width: 400px;
					margin-left: 12px;
					margin-right: 12px;
					overflow: hidden;
					li{
						float: left;
						width: 80px;
						height: 80px;
						margin-right: 14px;
						border: 2px solid transparent;
						img{
							width: 78px;
							height: 78px;
							cursor: pointer;
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
      		.start{
				background: $start_bg;
			}
			.end{
				background-color: $end_bg;
			    }
  			.over{
  				background-color: $over_bg;
  			}
      		.special{
      			width: 100%;
      			height: 60px;
      			padding: 14px 22px;
      			span{
      				margin-left: 20px;
      				vertical-align: -8px;
      				font-size: 14px;
      				color: #fff;
      				i{
      					margin: 0px 6px; 
      					color: $time_color;
      				}
      			}	
      		}
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
      						height: 194px;
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
      }
  }
</style>