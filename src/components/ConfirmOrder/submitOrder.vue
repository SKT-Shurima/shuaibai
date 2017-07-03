<template>
	<div class="wrap" v-if='orderInfo'>
		<h4>
			选择收货地址
		</h4>
		<ul class="addressList" v-if='addressList'>
			<li v-for= '(item,index) in addressList' :class='{"isAddress":addressIndex===index}' :key='item' @click='initExpressFee(index)' v-if='index<entries'>
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
					</dd>
				</dl>
				<div class="icon" v-show='addressIndex===index'>
					<img src="../../../static/commonImg/checked.png" height="32" width="32">
				</div>
			</li>
		</ul>
		<div class="opera">
			<el-button type='text' size='small' @click='entries=addressList.length'>显示全部地址</el-button>
			<el-button type='text' size='small' @click='addressView'>管理收货地址</el-button>
			<el-button type='text' size='small' style='border:1px solid #ccc;' @click='addressView'>使用新地址</el-button>
		</div>
		<h4>
			订单信息
		</h4>
		<div class="orderInfo" v-for='(shopItem,shopIndex) in orderInfo.shop'>
			<div class="shopTitle" v-text='shopItem.shopName'></div>
			<div class="orderTitle">
				<div class="infoCol">商品信息</div>
				<div class="priceCol">单价</div>
				<div class="numCol">数量</div>
				<div class="totalCol">小计</div>
			</div>
			<ul class="orderInfoList">
				<li v-for='(item,index) in shopItem.goods'>
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
									{{(item.price-0)|currency}}
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
							{{(item.quantity-0)*(item.price-0)|currency}}
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
							  v-model='shopItem.remark'
							  :autosize="{ minRows: 2, maxRows: 4}"
							  placeholder="请输入内容"
							  ></el-input>
						</el-col>
					</el-row>
				</div>
				<div class="discountBox">
					<el-row>
						<el-col :span='18' :offset='1'>
							运费
						</el-col>
						<el-col :span='5'>
							{{shopItem.express_fee|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-checkbox size='small' v-model='shop[shopIndex].check'><span>使用优惠券</span></el-checkbox>
						</el-col>
						<el-col :span='5'>
							{{0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<span @click='shop[shopIndex].radio = "1"'>
								<el-radio class="radio" v-model="shop[shopIndex].radio" label="1">
								<span>购物币抵扣</span>
								</el-radio>
							</span>
							<span><em>剩余购物币{{orderInfo.customer.shopping_coin}}，当前可用{{shopItem.max_shopping_coin}}</em></span>
						</el-col>
						<el-col :span='5'>
							{{shopItem.radio==="1"?orderInfo.customer.shopping_coin-0:0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<span @click='shop[shopIndex].radio = "2"'>
								<el-radio class="radio" v-model="shop[shopIndex].radio" label="2">
								<span @click='shopItem.radio="2"'>积分抵扣</span>
								</el-radio>
							</span>
							
							<span><em>剩余积分{{orderInfo.customer.integration}}，当前可用{{shopItem.max_integration}}</em></span>
						</el-col>
						<el-col :span='5'>
							{{shopItem.radio==='2'?orderInfo.customer.integration-0:0|currency}}
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="payWrap" v-if='addressList'>
			<div class="payBox">
				<el-row style='padding: 36px 40px;'>
					<strong>实付款：</strong><i>￥</i><em v-text='orderInfo.total_fee'></em>
				</el-row>
				<el-row>
					<strong>收货地：</strong><span>{{addressList[addressIndex].province}}{{addressList[addressIndex].city}}{{addressList[addressIndex].district}}</span>
				</el-row>
				<el-row>
					<strong>收货人：</strong><span v-text='addressList[addressIndex].name'></span><span v-text='addressList[addressIndex].postcode'></span>
				</el-row>
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
import {buy_bal,getAddress,getExpressFee,generate} from '../../common/js/api'
import {currency} from '../../common/js/filter'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
	export default{
		data(){
			return {
				addressList: null,
				orderInfo: null,
				addressIndex: "",
				entries: 4,
				goodsList: null,
				shop: [],
				reqParams: null
			} 
		},
		filters:{
			currency
		},
		methods:{
			addressView(){
				location.href = 'myOrder.html#view100'
			},
			getAddressList(){
		      	let params = {
		      	 	access_token: getCookie('access_token')
		       };
		      	getAddress(params).then(res=>{
		      	 	let {errcode,message,content} = res;
		      	 	if (errcode!==0) {
		      	 		errorInfo(errcode,message) ;
		      	 	}else{
		      	 		this.addressList = content;
		      	 		for(let i = 0;i<this.addressList.length;i++){
		      	 			if (this.addressList[i].status === '1') {
		      	 				this.addressIndex = i ;
		      	 			}
		      	 		}
		      	 	}
		       })
		    },
		    initExpressFee(index){
		    	let _this= this ;
		    	if(index>=0){
		    		_this.addressIndex=index;
		    	}
		    	let id = _this.addressList[_this.addressIndex].address_id ;
		    	console.log("")
		    	let params = {
		    		address_id: id
		    	}
		    	let shops = [] ;
		    	let shopArr = _this.orderInfo.shop ;
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
										shopArr.express_fee = content[m].express_fee ;
									}
								}
							}
							_this.orderInfo.shop = shopArr ;
						}
			    	}) 
		 		}
		    },
		    getGoodsInfo(){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		id: this.reqParams.id
		    	}
		    	buy_bal(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.orderInfo = content ;
						this.initOrderInfo();
					}
		    	})
		    },
		    initOrderInfo(){
		    	let _this = this;
		    	let  shopArr = _this.orderInfo.shop ;
		    	let arr = [] ;
		    	for(let i = 0 ; i < shopArr.length; i++) {
		    		shopArr[i].express_fee = 0 ;
		    		shopArr[i].remark = "" ;
		    		let  obj = {
		    			check: false,
		    			radio: "1"
		    		}
		    		arr.push(obj);
		    	}
		    	_this.orderInfo.shop = shopArr ;
		    	_this.shop = arr ;
		    	_this.initExpressFee();
		    },
		    countTotalFee(){
		    	let  _this = this ;
		    	let shopArr = _this.orderInfo.shop ;
		    	let totalFee = 0 ;
		    	for(let i = 0 ; i< shopArr.length ;i++) {
		    		let  goodsArr = shopArr[i].goods ;
		    		totalFee+= shopArr[i].express_fee ; 
		    		for(let j = 0 ; j < goodsArr.length; j++){
		    			let fee = goodsArr[j].price * goodsArr[j].quantity ;
		    			totalFee+= fee;
		    		}
		    	}
		    	if (_this.orderInfo.full) {
		    		totalFee = totalFee > _this.orderInfo.full.limit-0?(totalFee-_this.orderInfo.full.amount) : totalFee ;
		    	}
		    	_this.orderInfo.total_fee = totalFee ;
		    },
		    editGoods(seller_id,item,mask){
		    	let _this  = this ;
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
		    	_this.countTotalFee(); 
		    	_this.initExpressFee();
		    	
		    },
		    submitOrder(){
		    	let _this = this ; 
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		address_id: _this.addressList[_this.addressIndex].address_id
		    	}
		    	let  data = []
		    	let shopArr = _this.orderInfo.shop ;
		    	for(let i = 0 ; i< shopArr.length;i++){
		    		let  shopObj = {
			    		remark: shopArr[i].remark,
			    		seller_id: shopArr[i].seller_id,
			    		use_type: this.shop[i].radio,
			    		coupon: '',
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
		created(){
	        this.$nextTick(()=>{
        		this.getAddressList();
				this.reqParams = getHashReq() ;
        		this.getGoodsInfo();
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
				float: left;
				width: 616px;
				margin-left: 10px;
				.el-row{
					margin-bottom: 20px;
					.el-col-18{
						span{
							font-size: 12px;
						}
						input{
							width: 60px;
							text-align: center;
							margin: 0px 10px;
						}
						em{
							color: $text_color;
						}
					}
					.el-col-5{
						text-align: center;
					}
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
		}
	}
</style>