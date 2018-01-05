<template>
	<div class="wrap">
		<div class="color-6 f5-bg border-c title">
		    <div class="check-all">
	    		<el-checkbox  v-model='allCheck'></el-checkbox>
		    </div>
			<ul class="top-nav">
				<li class="title-col" style="text-align:left;">全选</li>
				<li class="info-col">商品信息</li>
				<li class="normal-col">单价</li>
				<li class="normal-col">数量</li>
				<li class="normal-col">总金额</li>
				<li class="normal-col">操作</li>
			</ul>
		</div>
		<ul class="shop-list" v-if='shopList&&checkList.length>0'  >
			<li v-for='(item,sellerIndex) in shopList' :key='sellerIndex'>
				<div class="color-6 f5-bg border-c title">
					<div class="check-all">
				    	<el-checkbox v-model='checkList[sellerIndex].sellerBol'></el-checkbox>
				    </div>
				    <div class="shop-name">
				    	<span v-text='item.shop_name'>
				    	</span>
				    	<button class='border-c'  @click='kf(item.kf_qq)'>
				    		<img src="../../../static/commonImg/qq.png" height="14" width="12">
				    		联系客服
				    	</button>
				    </div>
				</div>
				<ul class="goods-list">
					<li v-for='(goodItem,goodsIndex) in  item.goods' :key='goodItem.goods_id'>
						<div class="check-all">
					    	<el-checkbox v-model='checkList[sellerIndex].goods[goodsIndex].goodsBol'></el-checkbox>

					    </div>
					    <div class="border-c goods-info">
					    	<dl class="goods-msg">
								<dt class="title-col">
									<img :src="goodItem.cover" @click='goodDetail(goodItem.goods_id)'>
								</dt>
								<dd class="info-col">
									<div class="ellipsis-2 goods-name" v-text='goodItem.name'>
									</div>
									<div class="color-6">
										<span style="margin-right:10px;">规格:{{goodItem.option_name}}</span>
									</div>
								</dd>
							</dl>
							<div class='normal-col'>
								<dl class="v-middle" v-if='goodItem.market_price' style="height: 20px;">
									<dt style="color:#666;text-decoration: line-through;">
										{{goodItem.market_price|currency}}
									</dt>
									<dd>
										{{goodItem.sale_price|currency}}
									</dd>
								</dl>
								<dl class="v-middle" v-else style="height: 20px;">
									<dd>
										{{goodItem.sale_price|currency}}
									</dd>
								</dl>
							</div>
							<div style='padding-top:30px;' class="normal-col">
								<div class="border-c num-btn">
									<button @click='editNum(goodItem,0)' class='f5-bg' style="padding: 6px 0px;"><i class="el-icon-minus"></i></button>
										<input type="text" v-model='goodItem.quantity' @change='editNum(goodItem)'>
									<button @click='editNum(goodItem,1)' class='f5-bg' style="padding:3px 0px;"><i class="el-icon-plus"></i></button>
								</div>
							</div>
							<div class="color-primary normal-col total-amount">
								{{(goodItem.sale_price * goodItem.quantity)|currency}}
							</div>
							<div class="normal-col">
								<dl class="v-middle">
									<dt>
										<button @click='colGoods(goodItem.goods_id,goodItem.collection_id)'>{{goodItem.collection_id-0?"移出收藏夹":"移入收藏夹"}}</button>
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
		<div class="color-6 f5-bg border-c title" style="margin-top:20px;padding-right: 0px;">
			<div class="check-all">
	    		<el-checkbox  v-model='allCheck'></el-checkbox>
		    </div>
			<ul class="foot-opera">
				<li>全选</li>
				<li class="pointer" @click='remove("",true)'>删除</li>
			</ul>
			<div class="shop-info">
				<div class="check-num">
					<span>已选商品<em class='color-primary'>{{checkNum}}</em>件</span>
				</div>
				<div class="check-amount">
					<span>合计（不含运费）：<em class='color-primary'>{{totalPrice|currency}}</em></span>
				</div>
				<div class="primary-bg settlement" @click='settlement'>
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
import {MessageBox} from  'element-ui'
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
		computed:{
			colState(){
				let bol = this.$store.state.colBol ;
				return bol;
			}
		},
		watch: {
			colState(){
				this.initList(false);
			},
			checkList: {
				handler(){
					let totaIndex = 0 ;
					let totalCheck = 0;
					// 选择框布尔值
					for(let i = 0;i<this.checkList.length;i++){
						// 如果商品全选 ->店铺选中
						let index =0 ;
						for(let j =this.checkList[i].goods.length-1;j>=0;j--){
							if (this.checkList[i].goods[j].goodsBol) {
								index++;
								if(index === this.checkList[i].goods.length){
									if (!this.checkList[i].sellerBol) {
										if (this.checkList[i].maskBol) {
											this.checkList[i].sellerBol = false;
										}else{
											this.checkList[i].sellerBol = true;
										}
									}
								}
							}
							if (j===0) {
								// 半选
								if (index>0&&index<this.checkList[i].goods.length) {
									if (this.checkList[i].sellerBol&&this.checkList[i].maskBol) {
										this.checkList[i].sellerBol = false;
									}	
									
								}
							}
						}
						// 店铺选中->商品全选
						if (this.checkList[i].sellerBol) {
							//  商品全选
							for(let k =0;k<this.checkList[i].goods.length;k++){
								this.checkList[i].goods[k].goodsBol = true;
							}
						}else {
							// 店铺取消选中->商品取消全选
							let index =0 ;
							for(let l =this.checkList[i].goods.length-1;l>=0;l--){
								if (this.checkList[i].goods[l].goodsBol) {
									index++;
									if(index === this.checkList[i].goods.length){
										for(let m = 0; m<this.checkList[i].goods.length;m++){
											this.checkList[i].goods[m].goodsBol = false;
										}
									}
								}
							}
						}
						// 记录上次的店铺选择框
						if (this.checkList[i].sellerBol) {
							this.checkList[i].maskBol  =  true;
						}else{
							this.checkList[i].maskBol  =  false;
						}
						
						let price = 0;
						this.totalPrice = 0;
						
						// 查询勾选项
						for(let n = 0 ; n< this.checkList[i].goods.length ; n++){
							totaIndex++;
							if (this.checkList[i].goods[n].goodsBol) {
								totalCheck++;
								price+=(this.shopList[i].goods[n].sale_price-0)*(this.shopList[i].goods[n].quantity-0);
							}
						}
						this.totalPrice = price;
					}
					this.checkNum = totalCheck ;
					if (totaIndex===totalCheck&&totalCheck!==0) {
						this.allCheck = true ;
					}else{
						this.allCheck = false;
					}
				},
				deep: true,
			},
			allCheck(){
				if (this.allCheck) {
					for(let i = 0;i<this.checkList.length;i++){
						this.checkList[i].sellerBol = true;
						for(let j =0;j<this.checkList[i].goods.length;j++){
							this.checkList[i].goods[j].goodsBol = true;
						}
					}
				}else{
					let totalCheck = 0;
					let totalIndex = 0;
					for(let i = 0 ; i<this.checkList.length;i++){
						for(let j =0;j<this.checkList[i].goods.length;j++){
							totalIndex++;
							if (this.checkList[i].goods[j].goodsBol) {
								totalCheck++;
							}
						}
					}
					if (totalIndex===totalCheck) {
						for(let i = 0;i<this.checkList.length;i++){
							this.checkList[i].sellerBol = false;
							for(let j =0;j<this.checkList[i].goods.length;j++){
								this.checkList[i].goods[j].goodsBol = false ;
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
				this.totalPrice = 0;
				// 查询勾选项
				for(let i = 0;i<this.checkList.length;i++){
					for(let n = 0 ; n< this.checkList[i].goods.length ; n++){
						if (this.checkList[i].goods[n].goodsBol) {
							price+=(this.shopList[i].goods[n].sale_price-0)*(this.shopList[i].goods[n].quantity-0);
						}
					}
				}
				this.totalPrice = price;
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
		 	let params = {
		 		access_token: getCookie('access_token')
		 	} ;
		 	if (batch) {
		 		let id = '' ;
		 		let checkIndex = 0 ;
		 		for(let i =0; i <this.checkList.length;i++){
 		 			for(let j =0 ;j <this.checkList[i].goods.length;j++){
		 				if (this.checkList[i].goods[j].goodsBol) {
		 					checkIndex++;
		 					id += this.shopList[i].goods[j].cart_id + ',' ;
		 				}
		 			}
		 		}
		 		params.cart_ids = id;
		 		if(checkIndex){
		 			this.removeAPI(params,false);
		 		}
		 	}else {
		 		let removeIndex = {
		 			sellerIndex: sellerIndex,
		 			goodsIndex: goodsIndex
		 		}
		 		params.cart_ids = cart_id ;
		 		this.removeAPI(params,removeIndex);
		 	}
		 },
		 colGoodsFn(id){
		 	let params = {
		 		access_token: getCookie('access_token'),
		 		goods_id: id
		 	}
		 	collectionGoods(params).then(res=>{
		 		let {errcode,message,content} = res ;
				if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					this.$store.commit('switchCol');
					MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定',
			          	type: 'success'
				    });
				    this.initList(false);
				}
		 	})
		 },
		 // 移入收藏夹
		 colGoods(id,colId){
		 	if (colId-0>0) {
		 		MessageBox.confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
			       this.colGoodsFn(id);
		        }).catch(() => {
		            return false;          
		        });
		 	}else{
		 		this.colGoodsFn(id);
		 	}
		 	
		 },
		 settlement(){
		 	let totalCheck = 0 ;
		 	let params = {
		 		access_token: getCookie('access_token'),
		 		data: new Array
		 	}
		 	for(let i = 0 ;i <this.checkList.length;i++){
		 		let checkIndex = 0 ;
		 		let sellerObj = {
		 			seller_id: this.shopList[i].seller_id,
		 			goods: new Array 
		 		};
		 		for(let j = 0 ; j<this.checkList[i].goods.length;j++){
		 			if (this.checkList[i].goods[j].goodsBol) {
		 				checkIndex++;
		 				totalCheck++;
		 				let goodObj = {
		 					cart_id: this.shopList[i].goods[j].cart_id,
							goods_id: this.shopList[i].goods[j].goods_id,
							option_id: this.shopList[i].goods[j].option_id,
							quantity: this.shopList[i].goods[j].quantity + ''
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
		 	this.checkList = new Array ;
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
		 		this.checkList.push(sellerObj);
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
	.title-col,.info-col,.normal-col{
		float: left;
	}
	.title-col{
		width: 90px;
		text-align: left;
	}
	.info-col{
		width: 264px;
		margin-left: 20px;
		margin-right: 44px;
	}
	.normal-col{
		width: 150px;
	}
	.check-all{
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
		.top-nav,.foot-opera{
			overflow: hidden;
			width: 100%;
		}
		.top-nav{
			li{
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}
		.foot-opera{
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
	}
	.shop-info{
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
		}
	}
	.check-num{
		float: left;
		width: 120px;
	}
	.check-amount{
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
	}
	.shop-list{
		margin-top: 20px;
	}
	.shop-name{
		width: 100%;
		height: 40px;
		padding-top: 10px;
		button{
			border-radius: 10px;
			background-color: #fff;
			outline: none;
		}
	}
	.goods-list{
		li{
			position: relative;
			.check-all{
				line-height: 130px;
			}
		}
	}
	.goods-info{
		overflow: hidden;
		padding: 20px 18px 20px 40px;
		border-top: none;
	}
	.goods-msg{
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
		}
	}
	.goods-name{
		line-height: 18px;
		margin-bottom: 18px;
	}
	.normal-col{
		height: 90px;
		text-align: center;
		position: relative;
		.v-middle{
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
	}
	.num-btn{
		display: inline-block;
		overflow: hidden;
		width: 86px;
		height: 24px;
		button{
			float: left;
			width: 22px;
			height: 22px;
			outline: none;
			border: none;
		}
		input{
			float: left;
			width: 40px;
			height: 22px;
			text-align: center;
			border-left: 1px solid  #ccc;
			border-right: 1px solid #ccc;
			border-top: none;
			border-bottom: none;
		}
	}
	.total-amount{
		line-height: 90px;
		font-weight: 600;
	}
</style>