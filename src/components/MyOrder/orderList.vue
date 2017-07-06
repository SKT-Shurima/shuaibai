<template>
	<div class="wrap">
		<div class="shopInfoHead">
			<el-row>
				<el-col :span='9'>商品信息</el-col>
				<el-col :span='2'>单价</el-col>
				<el-col :span='2'>数量</el-col>
				<el-col :span='2'>售后</el-col>
				<el-col :span='3'>付款信息</el-col>
				<el-col :span='3'>交易状态</el-col>
				<el-col :span='3'>交易操作</el-col>
			</el-row>
		</div>
		<div class="shopInfoList" v-for='(shopItem,shopIndex) in order' v-if='order'>
			<div class="title">
				<el-row>
					<el-col :span='9'>
						<em style='margin-left:24px;font-weight: 600;'>{{shopItem.date_add*1000|dateStyle}}</em>
						<span style='margin-left:26px'>订单号：{{shopItem.order_sn}}</span>
					</el-col>
					<el-col :span='10'>
						<span v-text='shopItem.shop_name'></span>
						<button  @click='kf(shopItem.kf_qq)'>
							<img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服
						</button>
					</el-col>
				</el-row>
			</div>
			<div class="list">
				<div class='listContent'>
				 	<div class="goodsListBox">
				 		<div v-for='(item,index) in shopItem.goods' :key='item' class="goodsList">
					 		<dl class="goodsMsg">
								<dt>
									<img :src="item.image" @click='goodDetail(item.goods_id)'>
								</dt>
								<dd>
									<div class="goodsName" v-text='item.name'></div>
									<div class="goodsType">
										<span>规格:{{item.option_name}}</span>
										<span>套餐:{{item.goods_type}}</span>
									</div>
								</dd>
							</dl>
							<div class='goodsPrice'>
								<!-- <dt style="color:#666;text-decoration: line-through;margin-top: 24px;">
									{{299.00|currency}}
								</dt> -->
								<dd>
									{{item.price|currency}}
								</dd>
							</div>
							<div class="goodsPrice" v-text='item.quantity'></div>
							<div class="goodsPrice" style='cursor:pointer;' @click='applyRefund(shopItem.order_sn,item.goods_id,item.option_id)'>
								申请售后
							</div>
						</div>
				 	</div>
					<div class="goodsInfo" :style="{height:130*shopItem.goods.length+'px'}" :class='{"multiple":shopItem.goods.length>1}'>
						<el-row>
							<el-col :span='8'>
								<div style="line-height:26px;font-size:14px;font-weight:600;">{{shopItem.order_amount|currency}}</div>
								<div style="color:#666;line-height:20px;">含运费:{{shopItem.express_amount|currency}}</div>
								<div style='color:#666;line-height:20px;'>优惠券:{{shopItem.goods_count|currency}}</div>
							</el-col>
							<el-col :span='8' style='line-height:20px;padding-top: 4px;'>
								<!-- 待付款 待发货 待评价 -->
								<ul style='margin-top:10px;' v-if='shopItem.order_state!=="3"'>
									<li v-text='shopItem.state'></li>
									<li @click='checkOrder(shopItem.order_sn)' class="opera">订单详情</li>
								</ul>
								<!-- 待收货 -->
								<ul v-else>
									<li v-text='shopItem.state'></li>
									<li @click='checkOrder(shopItem.order_sn)' class="opera">订单详情</li>
									<li @click='checkOrder(shopItem.order_sn)' class="opera" v-show='shopItem.order_state==="3"'>查看物流</li>
								</ul>
							</el-col>
							<el-col :span='8'>
								<!-- 待付款 -->
								<ul v-show='shopItem.order_state==="1"'   style='margin-top:10px;'>
									<li>
										<el-button size='small' type='text' @click='payFor(shopItem.order_sn)'>立即付款</el-button>
									</li>
									<li>
										<span @click='cancel(shopItem.order_sn)'>取消订单</span>
									</li>
								</ul>
								<!-- 待发货 -->
								<div v-show='shopItem.order_state==="2"' style='padding-top: 16px;'>
									<span @click='remind(shopItem.order_sn)'>提醒发货</span>
								</div>
								<!-- 待收货 -->
								<div v-show='shopItem.order_state==="3"' style='padding-top: 16px;'>
									<el-button size='small' type='text' @click='confirmGet(shopItem.order_sn)'>确认收货</el-button>
								</div>
								<!-- 待评价 -->
								<div v-show='shopItem.order_state==="4"' style='padding-top: 16px;'>
									<el-button size='small' type='text' @click='toEval(shopItem.order_sn)'>评价</el-button>
								</div>
								<!-- 追加评价 -->
								<div v-show='shopItem.order_state==="5"' style='padding-top: 16px;'>
									<span>追加评价</span>
								</div>
								<!-- 再次购买 -->
								<div v-show='shopItem.order_state==="6"' style='padding-top: 8px;'>
									<ul>
										<li><span @click='buyAgain(shopItem.goods[0].goods_id)'>再次购买</span></li>
										<li><span @click='del(shopItem.order_sn)'>删除订单</span></li>
									</ul>
								</div>
								<div v-show='shopItem.order_state==="7"' style='padding-top: 16px;'>
									<span @click='del(shopItem.order_sn)'>删除订单</span>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
		<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	</div>
</template>
<script>
import {getOrders,cancelOrder,orderRemind,delivery,delOrder} from '../../common/js/api'
import {currency,dateStyle} from '../../common/js/filter'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
import pagination from '../Common/pagination'
	export default {
		data(){
			window.addEventListener("popstate",()=>{
		 		this.init();
		 	})
			return {
				order: null,
				pagesize: 1 ,// 总页数,
				state: "0" ,
				reqParams: null
			}
		},
		filters: {
			currency,dateStyle
		},
		components:{
			pagination
		},
	    methods: {
	    	goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			kf(qq){
	       		window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	        },
	        handleSelect(key, keyPath) {
	            console.log(key, keyPath);
	        },
	        getOrderList(state,page){
	        	let _this = this ;
	        	_this.state = state ;
		      	state+='';
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		state: state,
		    		page: page
		    	};
		    	getOrders(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.order = content.orders;
						this.pagesize = content.pageSize;
					}
		    	})
	   	 	},
	   	 	// 申请售后
	   	 	applyRefund(order_sn,goods_id,option_id){
	   	 		option_id = option_id?option_id:"";
	   	 		window.open(`afterSale.html#applyType?order_sn=${order_sn}&goods_id=${goods_id}&option_id=${option_id}`);
	   	 	},
	   	 	// 查看订单详情  物流信息
	   	 	checkOrder(order_sn){
	   	 		window.open(`orderDetail.html#?order_sn=${order_sn}`);
	   	 	},
	   	 	// 立即付款
	   	 	payFor(order_sn){
	   	 		window.open(`confirmOrder.html#payfor?order_sn=${order_sn}`)
	   	 	},
	   	 	// 提醒发货
	   	 	remind(order_sn){
	   	 		let params = {
	   	 			access_token: getCookie('access_token'),
	   	 			order_sn: order_sn
	   	 		}
	   	 		orderRemind(params).then(res=>{
	   	 			let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							Message.success({
					            message: message,
					            type: 'success'
					        });
						}
	   	 		})
	   	 	},
	   	 	// 取消订单
	   	 	cancel(order_sn){
	   	 		let _this = this ;
	   	 		let msg  = '是否取消订单?'
	   	 		_this.commonAPI(msg,cancelOrder,order_sn);
	   	 	},
	   	 	// 再次购买
	   	 	buyAgain(id){
	   	 		window.open(`goodDetail.html?goods_id=${id}`);
	   	 	},
	   	 	// 评价
	   	 	toEval(order_sn){
	   	 		window.open(`eval.html?order_sn=${order_sn}`);
	   	 	},
	   	 	// 确认收货
	   	 	confirmGet(order_sn){
	   	 		let _this = this ;
	   	 		let msg  = '确定收货之前确定是否已经收货?'
	   	 		_this.commonAPI(msg,delivery,order_sn);
	   	 	},
	   	 	// 删除订单
	   	 	del(order_sn){
	   	 		let _this = this ;
	   	 		let msg  = '是否确定永久删除订单？'
	   	 		_this.commonAPI(msg,delOrder,order_sn);
	   	 	},
	   	 	commonAPI(msg,api,order_sn){
	   	 		let _this = this ;
	   	 		MessageBox.confirm(msg, '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params = {
		   	 			access_token: getCookie('access_token'),
		   	 			order_sn: order_sn
		   	 		}
		   	 		api(params).then(res=>{
		   	 			let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							Message.success({
					            message: message,
					            type: 'success'
					        });
					        _this.getOrderList(_this.state,'1');
						}
		   	 		})
		        }).catch(() => {
		                   
		        });
	   	 	},
	   	 	// 改变页数
			changePage(page){
				let _this = this ;
				_this.getOrderList(_this.state,page);
			},
			init(){
				let hash = location.hash ;
				if (hash.indexOf('?')>0) {
					this.reqParams = getHashReq();
					if (this.reqParams.orderIndex) {
						let index = this.reqParams.orderIndex;
						this.getOrderList(index,"1")
					}
				}else {
					// 获取订单列表
					this.getOrderList("0","1")
				}
			}
		},
		created(){
			this.$nextTick(()=>{
				this.init();	
			})
		}
	}
</script>
<style lang='scss' scoped>
	$primary:#c71724;
	$text_color: #666;
	$border_color: #ddd;
	$bg_color: #f5f5f5;
	.wrap{
		width: 100%;
		.shopInfoHead{
			line-height: 40px;
			text-align: center;
			margin: 0px 0px 20px;
			border: 1px solid $border_color;
			background-color: $bg_color;
		}
		.shopInfoList{
			margin-bottom: 10px;
			border: 1px solid $border_color;
			.title{
				line-height: 40px;
				border-bottom: 1px solid $border_color;
				background-color: $bg_color;
				.el-col-10{
					button{
						border: 1px solid $border_color;
						border-radius: 8px;
						background-color: #fff;
						img{
							margin-right: 4px;
						}
					}
				}
			}
			.list{
				.listContent{
					overflow: hidden;
					.goodsListBox{
						width: 674px;
						float: left;
						overflow: hidden;
						.goodsList{
							float: left;
							padding: 20px 0px 20px 20px;
							overflow: hidden;
							border-top: 1px solid $border_color;
							margin-top: -1px;
							.goodsMsg{
								float: left;
								width: 384px;
								overflow: hidden;
								dt{
									float: left;
									width: 90px;
									height: 90px;
									img{
										width: 100%;
										height: 100%;
										cursor: pointer;
									}
								}
								dd{
									float: left;
									width: 240px;
									margin-left: 18px;
									.goodsName{
										line-height: 18px;
										margin-bottom: 18px;
									}
									.goodsType{
										color: $text_color;
										span{
											margin-right: 10px;
										}
									}
								}
							}
							.goodsPrice{
								float: left;
								width: 90px;
								text-align: center;
								margin-top: 32px;
								line-height: 20px;
							}
						}
					}
					.goodsInfo{
						float: left;
						width: 404px;
						height: 100%;
						position: relative;
						.el-row{
							width: 100%;
							height: 66px;
							position: absolute;
							right: 0px;
							top: 0px;
							bottom: 0px;
							margin: auto;
							text-align: center;
							.el-button{
								width: 62px;
								padding: 6px;
								color: #000;
								border: 1px solid $border_color;
							}
							.opera{
								cursor: pointer;
							}
							.opera:hover{
								color: $primary;
							}
							.el-col-8{
								span{
									line-height: 26px;
									cursor: pointer;
								}
								span:hover{
									color: $primary;
								}
							}
						}
					}
					.multiple{
						border-left: 1px solid $border_color;
					}
				}
			}
		}
	}
</style>