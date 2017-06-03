<template>
	<div class="wrap">
		<div class="title">
		    <div class="checkAll">
	    		<el-checkbox  size='small'></el-checkbox>
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
		<ul class="shopList" v-if='shopList'>
			<li v-for='item in shopList' :key='item'>
				<div class="title">
					<div class="checkAll">
				    	<el-checkbox size='small'></el-checkbox>
				    </div>
				    <div class="shopName">
				    	<span v-text='item.shop_name'>
				    	</span>
				    	<button>
				    		<img src="../../../static/commonImg/qq.png" height="14" width="12">
				    		联系客服
				    	</button>
				    </div>
				</div>
				<ul class="goodsList">
					<li v-for='goodItem in  item.goods' :key='goodItem'>
						<div class="checkAll">
					    	<el-checkbox></el-checkbox>
					    </div>
					    <div class="goodsInfo">
					    	<dl class="goodsMsg">
								<dt class="titleCol">
									<img :src="goodItem.cover">
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
								<dl class="vMiddle" v-show='false' style="height: 20px;">
									<dt style="color:#666;text-decoration: line-through;">
										{{goodItem.market_price|currency}}
									</dt>
									<dd>
										{{goodItem.sale_price|currency}}
									</dd>
								</dl>
								<dl class="vMiddle" v-show='true' style="height: 20px;">
									<dd>
										{{299.00|currency}}
									</dd>
								</dl>
							</div>
							<div style='padding-top:30px;' class="normalCol">
								<div class="numBtn">
									<button>-</button>
									<input type="number" name="" v-model='goodItem.on_sale'>
									<button>+</button>
								</div>
							</div>
							<div class="normalCol totalAmount">
								{{299.00|currency}}
							</div>
							<div class="normalCol">
								<dl class="vMiddle">
									<dt>
										<button>移入收藏夹</button>
									</dt>
									<dd>
										<button @click='remove(goodItem.cart_id)'>删除</button>
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
	    		<el-checkbox  size='small'></el-checkbox>
		    </div>
			<ul class="footOpera">
				<li>全选</li>
				<li>删除</li>
				<li>清除失效商品</li>
				<li>移入收藏夹</li>
			</ul>
			<div class="shopInfo">
				<div class="checkNum">
					<span>已选商品<em>2</em>件</span>
				</div>
				<div class="checkAmount">
					<span>合计（不含运费）：<em>{{595.00|currency}}</em></span>
				</div>
				<div class="settlement">
					结算
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from "../../common/js/filter.js"
import {getCarts,removeCart}  from '../../common/js/api.js'
	export default{
		data(){
			return{
				shopList: null
			}
		},
		filters: {
			currency
		},
		methods:{
		 remove(cart_id){
		 	let params ={
		 		access_token: sessionStorage.access_token,
		 		cart_ids: cart_id
		 	}
		 	removeCart(params).then(res=>{
		 		let {errcode,message,content} = res;
		 		if(errcode!==0) {
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
				}else{
					this.initList();
				}
		 	})
		 },
		 initList(){
		 	let params = {
				access_token: sessionStorage.access_token
			};
			getCarts(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode!==0) {
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
				}else{
					this.shopList = content ;
				}
			})
		 }
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList();
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
							}
						}
						dd{
							float: left;
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