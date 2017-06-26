<template>
	<div class="wrap" v-if='orderInfo'>
		<h4>
			选择收货地址
		</h4>
		<ul class="addressList" v-if='addressList'>
			<li v-for= '(item,index) in addressList' :class='{"isAddress":addressIndex===index}' :key='item' @click='addressIndex=index' v-if='index<entries'>
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
					    }
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
		<div class="orderInfo">
			<div class="orderTitle">
				<div class="infoCol">商品信息</div>
				<div class="priceCol">单价</div>
				<div class="numCol">数量</div>
				<div class="totalCol">小计</div>
			</div>
			<ul class="orderInfoList">
				<li v-for='(item,index) in goodsList'>
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
							<dl class="vMiddle" v-show='false' style="height: 20px;">
								<dt style="color:#666;text-decoration: line-through;">
									{{|currency}}
								</dt>
								<dd>
									{{299.00|currency}}
								</dd>
							</dl>
							<dl class="vMiddle" v-show='true' style="height: 20px;">
								<dd>
									{{(item.price-0)|currency}}
								</dd>
							</dl>
						</div>
						<div style='padding-top:16px;' class="numCol">
							<div class="numBtn">
								<button @click='editGoods(item,-1)'><i class="el-icon-minus"></i></button>
								<input type="text" name="" v-model='item.quantity' @change='editGoods(item,0)'>
								<button @click='editGoods(item,1)'><i class="el-icon-plus"></i></button>
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
							{{0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-checkbox size='small' v-model='checkbox'><span>使用优惠券</span></el-checkbox>
						</el-col>
						<el-col :span='5'>
							{{0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-radio class="radio" v-model="radio" label="1">
							<span>购物币抵扣</span>
							</el-radio>
							<span><em>剩余购物币{{userInfo.shopping_coin}}，当前可用{{orderInfo.shop[0].max_shopping_coin}}</em></span>
						</el-col>
						<el-col :span='5'>
							{{radio==="1"?orderInfo.shop[0].max_shopping_coin-0:0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-radio class="radio" v-model="radio" label="2">
							<span>积分抵扣</span>
							</el-radio>
							<span><em>剩余积分{{userInfo.integration}}，当前可用{{orderInfo.shop[0].max_integration}}</em></span>
						</el-col>
						<el-col :span='5'>
							{{radio==='2'?orderInfo.shop[0].max_integration-0:0|currency}}
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
import {getAddress,buy,generate} from '../../common/js/api'
import {currency} from '../../common/js/filter'
import {errorInfo} from '../../common/js/common'
import {MessageBox} from  'element-ui'
	export default{
		data(){
			return {
				userInfo: '',
				addressList: null,
				orderInfo: null,
				addressIndex: "",
				entries: 4,
				goodsList: null,
				remark: '',
				radio: '0',
				checkbox: ""
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
		      	 	access_token: this.userInfo.access_token
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
		    editGoods(item,mask){
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
		    	let params = {
		    		access_token: sessionStorage.access_token
		    	}
		    	let data =[{
		    		seller_id: _this.orderInfo.shop[0].seller_id,
		    		goods: []
		    	}]
		    	for(let i = 0 ; i<_this.goodsList.length;i++){
		 			let goodObj = {
	 					cart_id: _this.goodsList[i].cart_id,
						goods_id: _this.goodsList[i].goods_id,
						option_id: _this.goodsList[i].option_id,
						quantity: _this.goodsList[i].quantity + ''
					}
					data[0].goods.push(goodObj);
		 		}
		    	params.data = JSON.stringify(data);
		    	buy(params).then(res=>{
			 		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						if(sessionStorage.orderInfo){
							sessionStorage.removeItem('orderInfo');
						}
						this.orderInfo = content ;
						this.goodsList = this.orderInfo.shop[0].goods ;
						content = JSON.stringify(content);
						sessionStorage.setItem('orderInfo',content)
					}
			 	})
		    },
		    submitOrder(){
		    	let _this = this ; 
		    	let params = {
		    		access_token: sessionStorage.access_token,
		    		address_id: _this.addressList[_this.addressIndex].address_id
		    	}
		    	let  data = [{
		    		remark: _this.remark,
		    		seller_id: _this.orderInfo.shop[0].seller_id,
		    		use_type: _this.radio,
		    		coupon: ''
		    	}]
		    	let goods = [];
		    	for(let i = 0;i<_this.orderInfo.shop[0].goods.length;i++){
		    		let goodsObj = {
		    			cart_id: _this.orderInfo.shop[0].goods[i].cart_id,
						goods_id: _this.orderInfo.shop[0].goods[i].goods_id,
						option_id: _this.orderInfo.shop[0].goods[i].option_id,
						quantity: _this.orderInfo.shop[0].goods[i].quantity
		    		}
		    		goods.push(goodsObj); 
		    	}
		    	data[0].goods  = goods ;
		    	data = JSON.stringify(data);
		    	params.data = data ;
		    	generate(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						let order_sn = sessionStorage.order_sn;
						if (order_sn) {
							sessionStorage.removeItem('order_sn');
						}
						sessionStorage.order_sn = content.order_sn[0] ;
						location.hash = '#successSubmit'
					}
		    	})
		    }
		},
		created(){
	        this.$nextTick(()=>{
	        	if (sessionStorage.userInfo) {
					this.userInfo = JSON.parse(sessionStorage.userInfo);
					this.getAddressList();
					if (sessionStorage.orderInfo) {
						this.orderInfo = JSON.parse(sessionStorage.orderInfo);
						this.goodsList = this.orderInfo.shop[0].goods ;
					}
				}else{
					window.location.href = "login.html";
				}
	        })
	    }
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
$bg_color: #f5f5f5;
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