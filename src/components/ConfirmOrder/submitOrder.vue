<template>
	<div class="wrap">
		<h4>
			选择收货地址
		</h4>
		<ul class="addressList" v-if='addressList'>
			<li v-for= '(item,index) in addressList' :class='{"isDefault":item.status==="1"}' :key='item'>
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
			</li>
		</ul>
		<div class="opera">
			<el-button type='text' size='small'>显示全部地址</el-button>
			<el-button type='text' size='small'>管理收货地址</el-button>
			<el-button type='text' size='small' style='border:1px solid #ccc;'>使用新地址</el-button>
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
			<ul class="orderInfoList" v-if='orderInfo'>
				<li v-for='(item,index) in orderInfo.shop[0].goods'>
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
								<button><i class="el-icon-minus"></i></button>
								<input type="text" name="" v-model='item.quantity'>
								<button><i class="el-icon-plus"></i></button>
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
							<el-checkbox size='small'><span>使用优惠券</span></el-checkbox>
						</el-col>
						<el-col :span='5'>
							{{20|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-radio class="radio" v-model="radio" label="1">
							<span>购物币抵扣</span>
							</el-radio>
							<span><input type="" name=""><em>剩余购物币5.0，当前可用5.0</em></span>
						</el-col>
						<el-col :span='5'>
							{{0|currency}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='18' :offset='1'>
							<el-radio class="radio" v-model="radio" label="2">
							<span>积分抵扣</span>
							</el-radio>
							<span><input type="" name=""><em>剩余购物币5.0，当前可用5.0</em></span>
						</el-col>
						<el-col :span='5'>
							{{0|currency}}
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="payWrap">
			<div class="payBox">
				<el-row style='padding: 36px 40px;'>
					<strong>实付款：</strong><i>￥</i><em>512.00</em>
				</el-row>
				<el-row>
					<strong>收货地：</strong><span>杭州市</span>
				</el-row>
				<el-row>
					<strong>收货人：</strong><span>李达康</span><span>1008611</span>
				</el-row>
				<el-row style='padding: 12px 30px;'>
					<el-button type='primary' style='width:190px;height: 50px;font-size:20px;'>
						提交订单
					</el-button>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
import {getAddress} from '../../common/js/api.js'
import {currency} from '../../common/js/filter.js'
	export default{
		data(){
			return {
				radio: '1',
				userInfo: '',
				addressList: null,
				orderInfo: null
			} 
		},
		filters:{
			currency
		},
		methods:{
			getAddressList(){
		      	let params = {
		      	 	access_token: this.userInfo.access_token
		       };
		      	getAddress(params).then(res=>{
		      	 	let {errcode,content} = res;
		      	 	if (errcode===0) {
		      	 		this.addressList = content;
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
				float: left;
				width: 490px;
				padding: 20px;
				margin-right: 14px;
				margin-bottom: 16px;
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
			}
			.isDefault{
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