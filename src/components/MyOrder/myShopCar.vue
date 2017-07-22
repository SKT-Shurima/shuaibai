<template>
	<div class="wrap">
		<div class="title">
		    <div class="checkAll">
	    		<el-checkbox  v-model='allCheck'></el-checkbox>
		    </div>
			<ul class="topNav">
				<li class="titleCol" style="text-align:left;">全选</li>
				<li class="infoCol">商品信息</li>
				<li class="normalCol">单价</li>
				<li class="normalCol">数量</li>
				<li class="normalCol">总金额</li>
				<li class="normalCol">操作</li>
			</ul>
		</div>
		<ul class="shopList" v-if='shopList&&checkList.length>0'  >
			<li v-for='(item,sellerIndex) in shopList' :key='item'>
				<div class="title">
					<div class="checkAll">
				    	<el-checkbox v-model='checkList[sellerIndex].sellerBol'></el-checkbox>
				    </div>
				    <div class="shopName">
				    	<span v-text='item.shop_name'>
				    	</span>
				    	<button  @click='kf(item.kf_qq)'>
				    		<img src="../../../static/commonImg/qq.png" height="14" width="12">
				    		联系客服
				    	</button>
				    </div>
				</div>
				<ul class="goodsList">
					<li v-for='(goodItem,goodsIndex) in  item.goods' :key='goodItem'>
						<div class="checkAll">
					    	<el-checkbox v-model='checkList[sellerIndex].goods[goodsIndex].goodsBol'></el-checkbox>

					    </div>
					    <div class="goodsInfo">
					    	<dl class="goodsMsg">
								<dt class="titleCol">
									<img :src="goodItem.cover" @click='goodDetail(goodItem.goods_id)'>
								</dt>
								<dd class="infoCol">
									<div class="goodsName" v-text='goodItem.name'>
									</div>
									<div class="goodsType">
										<span>规格:{{goodItem.option_name}}</span>
										<!-- <span>套餐:套餐一</span> -->
									</div>
								</dd>
							</dl>
							<div class='normalCol'>
								<dl class="vMiddle" v-if='goodItem.market_price' style="height: 20px;">
									<dt style="color:#666;text-decoration: line-through;">
										{{goodItem.market_price|currency}}
									</dt>
									<dd>
										{{goodItem.sale_price|currency}}
									</dd>
								</dl>
								<dl class="vMiddle" v-else style="height: 20px;">
									<dd>
										{{goodItem.sale_price|currency}}
									</dd>
								</dl>
							</div>
							<div style='padding-top:30px;' class="normalCol">
								<div class="numBtn">
									<button @click='editNum(goodItem,0)' style="padding: 6px 0px;"><i class="el-icon-minus"></i></button>
										<input type="text" v-model='goodItem.quantity' @change='editNum(goodItem)'>
									<button @click='editNum(goodItem,1)' class="padding:3px 0px;"><i class="el-icon-plus"></i></button>
								</div>
							</div>
							<div class="normalCol totalAmount">
								{{(goodItem.sale_price * goodItem.quantity)|currency}}
							</div>
							<div class="normalCol">
								<dl class="vMiddle">
									<dt>
										<button @click='colGoods(goodItem.goods_id)'>移入收藏夹</button>
									</dt>
									<dd>
										<button @click='remove(goodItem.cart_id,false,sellerIndex,goodsIndex)'>删除</button>
									</dd>
								</dl>
							</div>
					    </div>
					</li>
				</ul>
			</li>
		</ul>
		<div class="title" style="margin-top:20px;padding-right: 0px;">
			<div class="checkAll">
	    		<el-checkbox  v-model='allCheck'></el-checkbox>
		    </div>
			<ul class="footOpera">
				<li>全选</li>
				<li class="pointer" @click='remove("",true)'>删除</li>
				<li class="pointer">清除失效商品</li>
				<li class="pointer">移入收藏夹</li>
			</ul>
			<div class="shopInfo">
				<div class="checkNum">
					<span>已选商品<em>{{checkNum}}</em>件</span>
				</div>
				<div class="checkAmount">
					<span>合计（不含运费）：<em>{{totalPrice|currency}}</em></span>
				</div>
				<div class="settlement" @click='settlement'>
					结算
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from "../../common/js/filter"
import {getCarts,removeCart,editCart,buy,collectionGoods}  from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
	export default{
		data(){
			return{
				shopList: null,
				totalPrice: 0,
				checkList: [],
				allCheck: false,
				checkNum: 0,
			}
		},
		filters: {
			currency
		},
		watch: {
			checkList: {
				handler(){
					let _this = this ;
					let totaIndex = 0 ;
					let totalCheck = 0;
					// 选择框布尔值
					for(let i = 0;i<_this.checkList.length;i++){
						// 如果商品全选 ->店铺选中
						let index =0 ;
						for(let j =_this.checkList[i].goods.length-1;j>=0;j--){
							if (_this.checkList[i].goods[j].goodsBol) {
								index++;
								if(index === _this.checkList[i].goods.length){
									if (!_this.checkList[i].sellerBol) {
										if (_this.checkList[i].maskBol) {
											_this.checkList[i].sellerBol = false;
										}else{
											_this.checkList[i].sellerBol = true;
										}
									}
								}
							}
							if (j===0) {
								// 半选
								if (index>0&&index<_this.checkList[i].goods.length) {
									if (_this.checkList[i].sellerBol&&_this.checkList[i].maskBol) {
										_this.checkList[i].sellerBol = false;
									}	
									
								}
							}
						}
						// 店铺选中->商品全选
						if (_this.checkList[i].sellerBol) {
							//  商品全选
							for(let k =0;k<_this.checkList[i].goods.length;k++){
								_this.checkList[i].goods[k].goodsBol = true;
							}
						}else {
							// 店铺取消选中->商品取消全选
							let index =0 ;
							for(let l =_this.checkList[i].goods.length-1;l>=0;l--){
								if (_this.checkList[i].goods[l].goodsBol) {
									index++;
									if(index === _this.checkList[i].goods.length){
										for(let m = 0; m<_this.checkList[i].goods.length;m++){
											_this.checkList[i].goods[m].goodsBol = false;
										}
									}
								}
							}
						}
						// 记录上次的店铺选择框
						if (_this.checkList[i].sellerBol) {
							_this.checkList[i].maskBol  =  true;
						}else{
							_this.checkList[i].maskBol  =  false;
						}
						


						let price = 0;
						_this.totalPrice = 0;
						
						// 查询勾选项
						for(let n = 0 ; n< _this.checkList[i].goods.length ; n++){
							totaIndex++;
							if (_this.checkList[i].goods[n].goodsBol) {
								totalCheck++;
								price+=(_this.shopList[i].goods[n].sale_price-0)*(_this.shopList[i].goods[n].quantity-0);
							}
						}
						_this.totalPrice = price;
					}
					_this.checkNum = totalCheck ;
					if (totaIndex===totalCheck&&totalCheck!==0) {
						_this.allCheck = true ;
					}else{
						_this.allCheck = false;
					}
				},
				deep: true,
			},
			allCheck(){
				let _this = this ;
				if (_this.allCheck) {
					for(let i = 0;i<_this.checkList.length;i++){
						_this.checkList[i].sellerBol = true;
						for(let j =0;j<_this.checkList[i].goods.length;j++){
							_this.checkList[i].goods[j].goodsBol = true;
						}
					}
				}else{
					let totalCheck = 0;
					let totalIndex = 0;
					for(let i = 0 ; i<_this.checkList.length;i++){
						for(let j =0;j<_this.checkList[i].goods.length;j++){
							totalIndex++;
							if (_this.checkList[i].goods[j].goodsBol) {
								totalCheck++;
							}
						}
					}
					if (totalIndex===totalCheck) {
						for(let i = 0;i<_this.checkList.length;i++){
							_this.checkList[i].sellerBol = false;
							for(let j =0;j<_this.checkList[i].goods.length;j++){
								_this.checkList[i].goods[j].goodsBol = false ;
							}
						}
					}
				}
			}
		},
		methods:{
			kf(qq){
	       		window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	        },
	        goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			editNum(item,mask){
				let _this = this ;
				if(mask===1){
					item.quantity++;
					
				}else if(mask===0){
					item.quantity--;
					
				}
				if ((item.quantity-0)>(item.max_once_buy-0)) {
					item.quantity = item.max_once_buy ;
				}else if ((item.quantity-0)<1) {
					item.quantity = 1 ;
				}
				let data = {
					cart_id: item.cart_id,
					quantity: item.quantity
				}
				let price = 0;
				_this.totalPrice = 0;
				// 查询勾选项
				for(let i = 0;i<_this.checkList.length;i++){
					for(let n = 0 ; n< _this.checkList[i].goods.length ; n++){
						if (_this.checkList[i].goods[n].goodsBol) {
							price+=(_this.shopList[i].goods[n].sale_price-0)*(_this.shopList[i].goods[n].quantity-0);
						}
					}
				}
				_this.totalPrice = price;
				let arr = [];
				arr.push(data);
				let params = {
					access_token: getCookie('access_token'),
					data: JSON.stringify(arr),
				}
				editCart(params).then(res=>{
					let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.initList(false);
					}
				})
			},
		removeAPI(params,removeIndex){
			MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
		          removeCart(params).then(res=>{
			 		let {errcode,message,content} = res;
			 		if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						if (removeIndex) {
							this.initList(false,removeIndex);
						}else{
							this.initList(true);
						}
						
					}
			 	})
	        }).catch(() => {
	            return false;          
	        });
		},
		 remove(cart_id,batch,sellerIndex,goodsIndex){
		 	let _this = this ;
		 	let params = {
		 		access_token: getCookie('access_token')
		 	} ;
		 	if (batch) {
		 		let id = '' ;
		 		let checkIndex = 0 ;
		 		for(let i =0; i <_this.checkList.length;i++){
 		 			for(let j =0 ;j <_this.checkList[i].goods.length;j++){
		 				if (_this.checkList[i].goods[j].goodsBol) {
		 					checkIndex++;
		 					id += _this.shopList[i].goods[j].cart_id + ',' ;
		 				}
		 			}
		 		}
		 		params.cart_ids = id;
		 		if(checkIndex){
		 			_this.removeAPI(params,false);
		 		}
		 	}else {
		 		let removeIndex = {
		 			sellerIndex: sellerIndex,
		 			goodsIndex: goodsIndex
		 		}
		 		params.cart_ids = cart_id ;
		 		_this.removeAPI(params,removeIndex);
		 	}
		 },
		 // 移入收藏夹
		 colGoods(id){
		 	let params = {
		 		access_token: getCookie('access_token'),
		 		goods_id: id
		 	}
		 	collectionGoods(params).then(res=>{
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
		 settlement(){
		 	let _this = this ;
		 	let totalCheck = 0 ;
		 	let params = {
		 		access_token: getCookie('access_token'),
		 		data: new Array
		 	}
		 	for(let i = 0 ;i <_this.checkList.length;i++){
		 		let checkIndex = 0 ;
		 		let sellerObj = {
		 			seller_id: _this.shopList[i].seller_id,
		 			goods: new Array 
		 		};
		 		for(let j = 0 ; j<_this.checkList[i].goods.length;j++){
		 			if (_this.checkList[i].goods[j].goodsBol) {
		 				checkIndex++;
		 				totalCheck++;
		 				let goodObj = {
		 					cart_id: _this.shopList[i].goods[j].cart_id,
							goods_id: _this.shopList[i].goods[j].goods_id,
							option_id: _this.shopList[i].goods[j].option_id,
							quantity: _this.shopList[i].goods[j].quantity + ''
		 				}
		 				sellerObj.goods.push(goodObj);
		 			}
		 		}
		 		if (checkIndex) {
		 			params.data.push(sellerObj);
		 		}
		 	}
		 	if (totalCheck) {
		 		params.data = JSON.stringify(params.data);
			 	buy(params).then(res=>{
			 		let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						location.href = `confirmOrder.html#submitOrder?id=${content}` ;
					}
			 	})
		 	}else{
		 		MessageBox.alert('请选择商品', '提示', {
		          	confirmButtonText: '确定'
			    });
		 	}
		 	
		 },
		 initCheckList(arr){
		 	let _this = this ;
		 	_this.checkList = new Array ;
		 	for(let i = 0 ;i<arr.length; i++){
		 		let sellerObj = {
		 			sellerBol: false,
		 			maskBol: false,
		 			goods: []
		 		};
		 		for(let j = 0; j<arr[i].goods.length;j++){
		 			let goodsObj = {
		 				goodsBol: false
		 			}
		 			sellerObj.goods.push(goodsObj);
		 		}
		 		_this.checkList.push(sellerObj);
		 	}
		 },
		 initList(mask,removeIndex){
		 	let params = {
				access_token: getCookie('access_token')
			};
			getCarts(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					this.shopList = content ;
					//  刷新初始化选择列表
					if(mask){
						this.initCheckList(this.shopList);
					}else if(removeIndex){
						this.checkList[removeIndex.sellerIndex].goods.splice(removeIndex.goodsIndex,1);
					}

				}
			});
		 }
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList(true);
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
	.titleCol,.infoCol,.normalCol{
		float: left;
	}
	.titleCol{
		width: 90px;
		text-align: left;
	}
	.infoCol{
		width: 264px;
		margin-left: 20px;
		margin-right: 44px;
	}
	.normalCol{
		width: 150px;
	}
	.checkAll{
		position: absolute;
		left: 0px;
		top: 0px;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
	}
	.title{
		position: relative;
		width: 100%;
		overflow: hidden;
		padding: 0px 20px 0px 40px;
		border: 1px solid $border_color;
		background-color: $bg_color;
		.topNav,.footOpera{
			overflow: hidden;
			width: 100%;
		}
		.topNav{
			li{
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}
		.footOpera{
			float: left;
			width: 558px;
			li{
				float: left;
				height: 40px;
				line-height: 40px;
				margin-right: 42px;
			}
			.pointer{
				cursor: pointer;
			}
		}
		.shopInfo{
			float: left;
			width: 480px;
			height: 40px;
			overflow: hidden;
			span,em{
				line-height: 40px;
				vertical-align: top;
			}
			em{
				padding:0px 4px;
				font-size: 18px;
				font-weight: 600;
				color: $primary;
			}
			.checkNum{
				float: left;
				width: 120px;
			}
			.checkAmount{
				float: left;
				width: 230px;
			}
			.settlement{
				float: left;
				width: 130px;
				height: 40px;
				line-height: 40px;
				font-size: 20px;
				font-weight: 600;
				text-align: center;
				cursor: pointer;
				color: #fff;
				background-color: $primary;
			}
		}
	}
	.shopList{
		margin-top: 20px;
		.shopName{
			width: 100%;
			height: 40px;
			padding-top: 10px;
			button{
				border-radius: 10px;
				background-color: #fff;
				outline: none;
				border: 1px solid $border_color;
			}
		}
		.goodsList{
			li{
				position: relative;
				.checkAll{
					line-height: 130px;
				}
				.goodsInfo{
					overflow: hidden;
					padding: 20px 18px 20px 40px;
					border-left: 1px solid $border_color;
					border-right: 1px solid $border_color;
					border-bottom: 1px solid $border_color;
					.goodsMsg{
						float: left;
						width: 420px;
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
							.goodsName{
								line-height: 18px;
								margin-bottom: 18px;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
							  	-webkit-line-clamp: 2;
						  	 	-webkit-box-orient: vertical;
							}
							.goodsType{
								color: $text_color;
								span{
									margin-right: 10px;
								}
							}
						}
					}
					.normalCol{
						height: 90px;
						text-align: center;
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
					.totalAmount{
						line-height: 90px;
						font-weight: 600; 
						color: $primary;
					}
				}
			}
			
		}
		
	}
}
</style>