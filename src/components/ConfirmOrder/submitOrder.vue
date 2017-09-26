<template>
	<div class="wrap" v-if='orderInfo'>
		<h4>
			选择收货地址
		</h4>
		<ul class="addressList" v-if='addressList.length'>
			<li v-for= '(item,index) in addressList' :class='{"isAddress":addressIndex===index}' :key='index' @click='initExpressFee(index)' v-if='index<entries'>
				<dl>
					<dt>
						<span v-text='item.name'>
						</span>
						<strong v-text='item.phone'>
						</strong>
						<em v-show='item.status==="1"'>
							默认地址
						</em>
					</dt>
					<dd class="addressInfo">
						{{item.province}}{{item.city}}{{item.district}}{{item.address}}
					</dd>
					<dd>
						<em>
							邮编：{{item.postcode}}
						</em>
						<strong>
							电话：{{item.phone}}
						</strong>
						<el-button type='text' size='mini' @click='setDefault(item.address_id)' class='setDefault' v-show='item.status!=="1"'>
							设置为默认地址
						</el-button>
					</dd>
				</dl>
				<div class="icon" v-show='addressIndex===index'>
					<img src="../../../static/commonImg/checked.png" height="32" width="32">
				</div>
			</li>
		</ul>
		<div v-else  style="color:#c71724">
			您暂无设置收货地址，请选择“使用新地址”，并填写收货地址！
		</div>
		<div class="opera">
			<el-button type='text' size='small' @click='entries=entries===4?addressList.length:4'>{{entries<=4?"显示全部地址":"显示部分地址"}}</el-button>
			<el-button type='text' size='small' @click='addressView'>管理收货地址</el-button>
			<el-button type='text' size='small' style='border:1px solid #ccc;' @click='addressBol=true'>使用新地址</el-button>
		</div>
		<add-address :addressBol='addressBol' @close='addressBol=false' @initList='initList'></add-address>
		<h4>
			订单信息
		</h4>
		<div class="orderInfo" v-for='(shopItem,shopIndex) in orderInfo.shop' :key='shopIndex'>
			<div class="shopTitle" v-text='shopItem.shopName'></div>
			<div class="orderTitle">
				<div class="infoCol">商品信息</div>
				<div class="priceCol">单价</div>
				<div class="numCol">数量</div>
				<div class="totalCol">小计</div>
			</div>
			<ul class="orderInfoList">
				<li v-for='(item,index) in shopItem.goods' :key='item.goods_id'>
				    <div class="goodsInfo">
				    	<dl class="goodsMsg infoCol">
							<dt class="titleCol">
								<img :src="item.cover">
							</dt>
							<dd>
								<div class="goodsName" v-text='item.goods_name'></div>
								<div class="goodsType">
									<span>规格:{{item.option_name}}</span>
								</div>
							</dd>
						</dl>
						<div class="priceCol">
							<!-- <dl class="vMiddle" v-show='false' style="height: 20px;">
								<dt style="color:#666;text-decoration: line-through;">
									{{|currency}}
								</dt>
								<dd>
									{{299.00|currency}}
								</dd>
							</dl> -->
							<dl class="vMiddle" v-show='true' style="height: 20px;">
								<dd>
									{{item.price|currency}}
								</dd>
							</dl>
						</div>
						<div style='padding-top:16px;' class="numCol">
							<div class="numBtn">
								<button @click='editGoods(shopItem.seller_id,item,-1)'><i class="el-icon-minus"></i></button>
								<input type="text" name="" v-model='item.quantity' @change='editGoods(item,0)'>
								<button @click='editGoods(shopItem.seller_id,item,1)'><i class="el-icon-plus"></i></button>
							</div>
						</div>
						<div class="totalCol totalAmount">
							{{(item.quantity*item.price)|currency}}
						</div>
				    </div>
				</li>
			</ul>
			<div class="settleInfo">
				<div class="msgBox">
					<el-row>
						<el-col :span='3'>给卖家留言</el-col>
						<el-col :span='21'>
							<el-input
							  type="textarea"
							  v-model='shop[shopIndex].remark'
							  :autosize="{ minRows: 2, maxRows: 4}"
							  placeholder="请输入内容"
							  ></el-input>
						</el-col>
					</el-row>
				</div>
				<ul class="discountBox">
					<li class="discountRow">
						<span>运费</span>
						<strong>{{shop[shopIndex].express_fee|currency}}</strong>
					</li>
					<li  class="discountRow">
						<span>
							<img src="../../../static/orderImg/nocheck.png" height="20" width="20" v-show='!shop[shopIndex].coupon' @click='chooseCoupon(shopIndex)'>
							<img src="../../../static/orderImg/checked.png" height="20" width="20" v-show='shop[shopIndex].coupon' @click='shop[shopIndex].coupon = false; shop[shopIndex].coupon_index= "" ;'>
							<em>使用优惠券</em>
							<select v-model="shop[shopIndex].coupon_index" placeholder="请选择" class='select' @change='countTotalFee' v-show='shop[shopIndex].coupon'>
							    <option
							      v-for="(couponItem,couponIndex) in shop[shopIndex].couponsList"
							      :key="couponItem.coupon_id"
							      :value='couponIndex'
							      >满{{couponItem.limit}}减{{couponItem.amount}}
							    </option>
							</select>
						</span>
						<strong>
							-{{shop[shopIndex].coupon_index+""?shop[storeIndex].couponsList[shop[storeIndex].coupon_index].amount:0|currency}}
						</strong>
					</li>
					<li v-show='orderInfo.customer.shopping_coin-0>=shopItem.max_shopping_coin-0&&shopItem.max_shopping_coin-0'>
						<div  class="discountRow">
						    <span>
								<em class="raido" @click='shop[shopIndex].radio=shop[shopIndex].radio==="2"?"0":"2";storeIndex=shopIndex;'>
									<i v-show='shop[shopIndex].radio==="2"'></i>
								</em>
								购物币抵扣
						    </span>
							<strong>
								-{{shop[shopIndex].radio==="2"?(orderInfo.customer.shopping_coin-0)>(shopItem.max_shopping_coin-0)?shopItem.max_shopping_coin:orderInfo.customer.shopping_coin:0|currency}}
							</strong>
						</div>
						<div class="discountInfo">
							您剩余购物币{{orderInfo.customer.shopping_coin}}，当前店铺最多可用{{shopItem.max_shopping_coin}}
						</div>
					</li>
					<li v-show='orderInfo.customer.integration-0>=shopItem.max_integration-0&&shopItem.max_integration-0'>
						<div  class="discountRow">
						    <span>
								<em class="raido" @click='shop[shopIndex].radio=shop[shopIndex].radio==="1"?"0":"1";storeIndex=shopIndex;'>
									<i v-show='shop[shopIndex].radio==="1"'></i>
								</em>
								积分抵扣
						    </span>
							<strong>
								-{{shop[shopIndex].radio==='1'?(orderInfo.customer.integration-0)>(shopItem.max_integration-0)?shopItem.max_integration:orderInfo.customer.integration:0|currency}}
							</strong>
						</div>
						<div  class="discountInfo">
							您剩余积分{{orderInfo.customer.integration}}，当前店铺最多可用{{shopItem.max_integration}}
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="payWrap" v-if='addressList.length'>
			<div class="payBox">
				<el-row style='padding: 36px 40px;'>
					<div style="overflow:hidden;">
						<span v-if='orderInfo.full' class="full">满{{orderInfo.full.limit}}减{{orderInfo.full.amount}}</span>
					</div>
					<div>
						<strong>实付款：</strong><i>￥</i><em>{{(total_fee-0).toFixed(2)}}</em>
					</div>
					
				</el-row>
				<!-- <el-row>
					<strong>收货地：</strong><span>{{addressList[addressIndex].province}}{{addressList[addressIndex].city}}{{addressList[addressIndex].district}}{{addressList[addressIndex].address}}}</span>
				</el-row>
				<el-row>
					<strong>收货人：</strong><span v-text='addressList[addressIndex].name'></span><span v-text='addressList[addressIndex].postcode'></span>
				</el-row> -->
				<el-row style='padding: 12px 30px;'>
					<el-button type='primary' style='width:190px;height: 50px;font-size:20px;' @click='submitOrder'>
						提交订单
					</el-button>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
import {buy,buy_bal,getAddress,getExpressFee,generate,orderCoupons,defaultAddress} from '../../common/js/api'
import {currency} from '../../common/js/filter'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
import addAddress from './addAddress'
	export default{
		data(){
			return {
				addressList: [],
				orderInfo: {shop:[]},
				addressIndex: "",
				entries: 4,
				goodsList: null,
				shop: [],
				storeIndex: '',
				reqParams: null,
				addressBol: false,
				couponsList: [],
				total_fee: "0"
			} 
		},
		filters:{
			currency
		},
		components:{
			addAddress
		},
		watch:{
			shop:{
				handler(newVal,oldVal){
					this.countTotalFee();
 				},
 				deep: true
			}
		},
		methods:{
			addressView(){
				window.open("myOrder.html#view100");
			},
			// 设置默地址
			setDefault(id){
				let params = {
					access_token: getCookie('access_token'),
					address_id: id
				}
				defaultAddress(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						MessageBox.alert('设置成功', '提示', {
				          	confirmButtonText: '确定',
				          	type:"success",
				          	callback: action => {
				          		this.initList();
				          	}
					    });
					}
				})
			},
			initList(mask){
				this.addressBol=false;
		      	let params = {
		      	 	access_token: getCookie('access_token')
		       };
		      	getAddress(params).then(res=>{
		      	 	let {errcode,message,content} = res;
		      	 	if (errcode!==0) {
		      	 		errorInfo(errcode,message) ;
		      	 	}else{
		      	 		if (content.length===0) {
		      	 			MessageBox.alert('您暂无设置收货地址，请在“选择收货地址”中选择“使用新地址”，并填写收货地址', '提示', {
					          	confirmButtonText: '确定'
						    });
						    return false;
		      	 		}
		      	 		this.addressList = content;
		      	 		let index = 0 ;
		      	 		for(let i = 0;i<this.addressList.length;i++){
		      	 			if (this.addressList[i].status === '1') {
		      	 				if (typeof mask === "boolean") {
		      	 					this.addressIndex = mask?0:1 ;
		      	 				}else{
		      	 					this.addressIndex = i ;
		      	 				}
		      	 			}else{
		      	 				index++;
		      	 			}
		      	 		}
		      	 		if (index===this.addressList.length) {
		      	 			this.addressIndex = 0 ;
		      	 		}
		      	 		this.initExpressFee();
		      	 	}
		       })
		    },
		    initExpressFee(){
		    	if (!this.addressList.length) {
		    		return false;
		    	}
		    	let id = this.addressList[this.addressIndex].address_id ;
		    	let params = {
		    		address_id: id
		    	}
		    	let shops = [] ;
		    	let shopArr = this.orderInfo.shop ;
		    	for(let i = 0 ; i< shopArr.length;i++){
		    		let  shopObj = {
			    		seller_id: shopArr[i].seller_id,
			    		goods: []
		    		}
		    		let goodArr = shopArr[i].goods ;
		    		for( let j = 0;j < goodArr.length;j++){
		    			let goodObj = {
							goods_id: goodArr[j].goods_id,
							option_id: goodArr[j].option_id,
							quantity: goodArr[j].quantity + ''
						}
						shopObj.goods.push(goodObj);
		    		}
		    		shops.push(shopObj);
		    		shops = JSON.stringify(shops);
			    	params.shops = shops ;
			    	getExpressFee(params).then(res=>{
			    		let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							for(let m = 0 ; m< content.length; m++){
								let seller_id = content[m].seller_id ;
								for(let n = 0 ;n<shopArr.length;n++){
									if (seller_id===shopArr[n].seller_id) {
										this.shop[n].express_fee = content[m].express_fee ;
									}
								}
							}
							this.countTotalFee();
						}
			    	}) 
		 		}
		    },
		    initGoodsInfo(){
		    	let params = {
			 		access_token: getCookie('access_token'),
			 		data: new Array
			 	}
			 	let shop = this.orderInfo.shop ;
			 	for(let i = 0 ;i < shop.length;i++){
			 		let sellerObj = {
			 			seller_id: shop[i].seller_id,
			 			goods: new Array 
			 		};
			 		let goods = shop[i].goods ;
			 		for(let j = 0 ; j< goods.length;j++){
		 				let goodObj = {
							goods_id: goods[j].goods_id,
							option_id: goods[j].option_id,
							quantity: goods[j].quantity + ''
		 				}
		 				sellerObj.goods.push(goodObj);
			 		}
			 		params.data.push(sellerObj);
			 	}
		 		params.data = JSON.stringify(params.data);
			 	buy(params).then(res=>{
			 		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.getGoodsInfo(content);
					}
			 	})
		    },
		    getGoodsInfo(id){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		id: id
		    	}
		    	buy_bal(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.orderInfo = content ;
						this.initOrderInfo();
						this.countTotalFee();
					}
		    	})
		    },
		    initOrderInfo(){
		    	let  shopArr = this.orderInfo.shop ;
		    	let arr = [] ;
		    	for(let i = 0 ; i < shopArr.length; i++) {
		    		let  obj = {
		    			coupon: false,
		    			coupon_index: "",
		    			couponsList: "",
		    			limit: "0",
		    			radio: "0",
		    			express_fee: '0',
		    			total_fee: "0",
		    			remark: ""
		    		}
		    		arr.push(obj);
		    	}
		    	this.shop = arr ;
		    	this.initExpressFee();
		    	this.countTotalFee();
		    },
		    countTotalFee(){
		    	let shopping_coin = this.orderInfo.customer.shopping_coin-0  ;
				let integration = this.orderInfo.customer.integration-0 ;
				let arr = this.shop ;
				let shop = this.orderInfo.shop;
				let total_amount = this.orderInfo.total_amount ;
				let countPrice = 0 ;
				let goodsPrice = 0 ;
				for(let i = 0 ; i< shop.length; i++){
					// 计算商品价
					let good = shop[i].goods ;
					for(let j = 0 ; j < good.length;j++){
						goodsPrice += good[j].price*good[j].quantity ;
					}
					// 减免优惠券
					if (arr[i].coupon&&arr[i].coupon_index+"") {
						countPrice += (arr[i].couponsList[arr[i].coupon_index].amount-0) ;
					}
					// 减免购物币
					if (arr[i].radio==="2") {
						if (shopping_coin<0) {
							MessageBox.alert('超出用户最大购物币量', '提示', {
					          	confirmButtonText: '确定'
						    });
						    this.shop[this.storeIndex].radio = "0" ;
						}else{
							countPrice += shopping_coin>(shop[i].max_shopping_coin-0)?(shop[i].max_shopping_coin-0):shopping_coin ;
						}
						shopping_coin -= shop[i].max_shopping_coin;
					}
					// 减免积分
					if (arr[i].radio==="1") {
						if (integration<0) {
							MessageBox.alert('超出用户最大积分量', '提示', {
					          	confirmButtonText: '确定'
						    });
						    this.shop[this.storeIndex].radio = "0" ;
						}else{
							countPrice += integration>(shop[i].max_integration-0)? (shop[i].max_integration-0):integration;
						}
						integration -= shop[i].max_integration;
					}
					countPrice -= (arr[i].express_fee-0) ;
				}
				let full = this.orderInfo.full ;
				if (full) {
					total_amount >= (full.limit-0)?(countPrice+=(full.amount-0)): "" ;
				}
				this.total_fee = (goodsPrice - countPrice)>0?(goodsPrice - countPrice):0 ;
		    },
		    editGoods(seller_id,item,mask){
		    	if(mask>0){
		    		item.quantity++;
		    	}else if(mask<0){
		    		item.quantity--;
		    	}else {
		    		let reg = /^\d+$/g; 
		    		if (!reg.test(item.quantity)) {
		    			item.quantity = "1" ;
		    		}
		    	}
		    	item.quantity = item.quantity-0>item.stock-0?itwm.stock:item.quantity-0<1?"1":item.quantity ;
		    	this.initGoodsInfo() ;
		    },
		    // 选择优惠券
		    chooseCoupon(index){
		    	this.storeIndex = index ;
		    	let params = {
		    		access_token: getCookie('access_token')
		    	}
		    	let  goods = [] ;
		    	let arr = this.orderInfo.shop[index].goods;
		    	for(let i = 0 ;i < arr.length;i++){
		    		let obj = {
		    			goods_id: arr[i].goods_id,
		    			quantity: arr[i].quantity,
		    			option_id: arr[i].option_id
		    		}
		    		goods.push(obj);
		    	}
		    	params.goods = JSON.stringify(goods);
		    	orderCoupons(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.couponsList = content ;
						this.shop[index].couponsList = content ;
						if (!content.length) {
							MessageBox.alert('您尚未满足使用优惠券的条件', '提示', {
					          	confirmButtonText: '确定'
						    });
						}else{
							this.shop[index].coupon = true;
						}
					}
		    	})
		    },
		    // 获取优惠券id
		    getIndex(index){
		    	this.shop[this.storeIndex].coupon_index = index ;
		    	this.addressBol = false ;
		    	this.shop[this.storeIndex].coupon = true ; 
		    },
		    submitOrder(){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		address_id: this.addressList[this.addressIndex].address_id
		    	}
		    	let  data = []
		    	let shopArr = this.orderInfo.shop ;
		    	for(let i = 0 ; i< shopArr.length;i++){
		    		let coupon_id = "";
		    		if (typeof this.shop[i].coupon_index==="number") {
		    			coupon_id = this.shop[i].couponsList[this.shop[i].coupon_index].coupon_id ;
		    		}
		    		let  shopObj = {
			    		remark: this.shop[i].remark,
			    		seller_id: shopArr[i].seller_id,
			    		use_type: this.shop[i].radio,
			    		coupon: coupon_id,
			    		goods: []
		    		}
		    		let goodArr = shopArr[i].goods ;
		    		for( let j = 0;j < goodArr.length;j++){
		    			let goodObj = {
		 					cart_id: goodArr[j].cart_id,
							goods_id: goodArr[j].goods_id,
							option_id: goodArr[j].option_id,
							quantity: goodArr[j].quantity + ''
						}
						shopObj.goods.push(goodObj);
		    		}
		    		data.push(shopObj); 
		 		}
		    	data = JSON.stringify(data);
		    	params.data = data ;
		    	generate(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						let order_snArr =content.order_sn ;
						let order_sn = "" ;
						for(let k = 0 ; k <order_snArr.length;k++){
							order_sn+=order_snArr[k] +",";
						}
						order_sn = order_sn.slice(0,order_sn.length-1) ;
						location.hash = `payfor?order_sn=${content.order_sn}` ;
					}
		    	})
		    }
		},
		mounted(){
	        this.$nextTick(()=>{
        		this.initList();
				this.reqParams = getHashReq() ;
				let id = this.reqParams.id ;
        		this.getGoodsInfo(id);
	        })
	    }
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$primary:#c71724;
$text_color: #999;
$bg_color: #f9fcff;
	.wrap{
		width: 100%;
		h4{
			margin: 12px 0px;
			height: 40px;
			line-height: 40px;
			color: $primary;
		}
		.addressList{
			overflow: hidden;
			width: 1012px;
			li{
				position: relative;
				float: left;
				width: 490px;
				padding: 20px;
				margin-right: 14px;
				margin-bottom: 16px;
				cursor: pointer;
				border: 1px solid $border_color;
				dl{
					dt{
						font-size: 14px;
						font-weight: 600;
						em{
							float: right;
							color: $primary;
						}
					}
					.addressInfo{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						padding: 10px 0px;
					}
					dd{
						.edit{
							float: right;
							.el-button{
								color: #0049b7;
							}
						}
					}
					.setDefault{
						float: right;
					}
				}
				.icon{
				    position: absolute;
				    bottom: 0px;
				    right: 0px;
				}
			}
			.icon{
				
			}
			.isAddress{
				border: 1px solid $primary;
			}
		}
		.opera{
			margin-top: 8px;
			margin-bottom: 42px;
			.el-button{
				margin-right: 20px;
				padding: 6px 10px;
				color: #333;
			}
		}
		.orderInfo{
			margin-bottom: 10px;
			.shopTitle{
				font-size: 14px;
				margin: 10px 0px;
			}
			.infoCol,.priceCol,.numCol,.totalCol{
					float: left;
				}
				.infoCol{
					width: 390px;
					margin-right: 168px;
				}
				.priceCol{
					width: 80px;
					text-align: center;
				}
				.numCol{
					width: 430px;
					text-align: center;
				}
				.totalCol{
					width: 140px;
					text-align: center;
				}
			.orderTitle{
				height: 40px;
				line-height: 40px;
				overflow: hidden;
				text-align: center;
				padding: 0px 20px;
				background-color: $bg_color;
				border: 1px solid $border_color;
			}
			.orderInfoList{
				width: 100%;
				overflow: hidden;
				li{
					border-left: 1px solid $border_color;
					border-right: 1px solid $border_color;
					border-bottom: 1px solid $border_color;
					position: relative;
					.goodsInfo{
						overflow: hidden;
						padding: 20px;
						.goodsMsg{
							float: left;
							width: 386px;
							overflow: hidden;
							dt{
								float: left;
								width: 60px;
								height: 60px;
								margin-right: 16px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							dd{
								float: left;
								width: 310px;
								.goodsName{
									line-height: 18px;
									margin-bottom: 14px;
								}
								.goodsType{
									color: $text_color;
									span{
										margin-right: 10px;
									}
								}
							}
						}
						.priceCol,.numCol{
							height: 60px;
							position: relative;
							.vMiddle{
								position: absolute;
								top: 0px;
								bottom: 0px;
								right: 0px;
								left: 0px;
								height: 40px;
								display: inline-block;
								margin: auto;
								line-height: 18px;
								button{
									background-color: transparent;
									border: none;
									outline: none;
								}
							}
							.numBtn{
								display: inline-block;
								overflow: hidden;
								width: 86px;
								height: 24px;
								border: 1px solid $border_color;
								button{
									float: left;
									width: 22px;
									height: 22px;
									outline: none;
									border: none;
									background-color: $bg_color;
								}
								input{
									float: left;
									width: 40px;
									height: 22px;
									text-align: center;
									border-left: 1px solid  $border_color;
									border-right: 1px solid $border_color;
									border-top: none;
									border-bottom: none;
								}
							}
						}
						.totalCol{
							height: 60px;
						}
						.totalAmount{
							line-height: 60px;
							font-weight: 600; 
							color: $primary;
						}
					}
				}
				
			}
		}
		.settleInfo{
			overflow: hidden;
			padding: 20px;
			border-left: 1px solid $border_color;
			border-right: 1px solid $border_color;
			border-bottom: 1px solid $border_color;
			background-color: $bg_color;
			.msgBox{
				float: left;
				width: 576px;
			}
			.discountBox{
				float: right;
				width: 402px;
				li{
					margin-bottom: 20px;
				}
				.discountRow{
					width: 100%;
					overflow: hidden;
					img{
						cursor: pointer;
					}
					span{
						float: left;
					}
					strong{
						float: right;
						font-weight: 400;
					}
				}
				.discountInfo{
					color: $text_color;
					padding-left: 21px;
				}
				.raido{
					display: inline-block;
					position: relative; 
					width: 12px;
					height: 12px;
					border: 1px solid $border_color;
					border-radius: 50%;
					padding: 2px;
					cursor: pointer;
					vertical-align: text-top;
					i{
						display: inline-block;
						position: absolute;
						top: 0px;
						right: 0px;
						bottom: 0px;
						left: 0px;
						margin: auto;
						width: 10px;
						height: 10px;
						background-color: $primary;
						border-radius: 50%;
					}
				}
				.select{
					background-color: #fff;
				    border-radius: 4px;
				    border: 1px solid rgb(217, 193, 191);
				    box-sizing: border-box;
				    color: rgb(61, 33, 31);
				    display: inline-block;
				    font-size: inherit;
				    height: 22px;
				    outline: none;
				    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				    width: 130px;
				}
				
			}
		}
		.payWrap{
			overflow: hidden;
			margin-bottom: 240px;
			.payBox{
				width: 600px;
				float: right;
				text-align: right;
				.el-row{
					padding-right: 40px;
					margin-bottom: 20px;
					strong{
						font-weight: 600;
					}
					span{
						margin-left: 20px;
					}
					i,em{
						color: $primary;
					}
					i{
						margin-left: 20px;
					}
					em{
						font-size: 28px;
						font-weight: 600;
					}
				}
			}
			.full{
				float: right;
				color: $primary;
			}
		}
	}
</style>