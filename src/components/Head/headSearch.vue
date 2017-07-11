<template>
	<div class="head_con_wrap">
		<div class="head_con_box">
			<div class="logo">
				<a href="index.html">
					<img src="../../../static/headImg/logo.png" height="39" width="269">
				</a>
			</div>
			<div class="search_box">
				<div class="search_form">
					<form id="searchForm" name="searchForm" method="get" action="relatedGoods.html">
						<input type="text" name="keyword"  autocomplete="off" id="key" accesskey="s" class="search_text" v-model='searchWord'>
						<input type='submit' class="search_but" value="搜索" />
                    </form>
				</div>
				<ul class="hot_words">
					<li v-for='item in keyWordsArr'  :key='item' v-text='item.keyword' @click='relatedGoods(item.keyword)'></li>
				</ul>
			</div>
			 <div class="shopping_cart" @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				<a href="myOrder.html#vip3">
					<img src="../../../static/headImg/shopCarRed.png" height="14" width="14" style="vertical-align:-2px;">
					我的购物车
					<span v-text='userInfo.cart_num-0?userInfo.cart_num:0'  :style='{opacity:userInfo.cart_num?1:0}'></span>
				</a>
				<div class="cartBox" v-show='cartBol' @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				    <div class="shopListBox" v-if='shopList.length'>
				    	<ul class="shopList" v-for='shopItem in shopList'>
							<li v-for='(item,index) in shopItem.goods'>
								<dl class="goods_info">
									<dt>
										<img :src="item.cover" @click='goodDetail(item.goods_id)'>
									</dt>
									<dd>
										<div class="show_info" v-text='item.name'></div>
										<div class="sell_info">
											<span>{{item.shop_price|currency}}*{{item.quantity}}</span><em @click="remove(item.cart_id)">删除</em>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						<dl class="checkCcart">
							<dt>
								共{{userInfo.cart_num}}件商品&nbsp;共计{{totalPrice|currency}}
							</dt>
							<dd>
								<el-button size='mini' type='primary'>
									<a href="myOrder.html#vip3" style="color:#fff;">去购物车结算</a>
								</el-button>
							</dd>
						</dl>
				    </div>
					<div class="no_cart" v-else>
				   		暂无商品
				   	</div>
				</div>
			 </div> 
		</div>
	</div>
</template>
<script>
    import {getKeyWord,getCarts,removeCart} from "../../common/js/api"
    import {MessageBox} from 'element-ui'
	import {currency} from '../../common/js/filter'
	import {errorInfo,getCookie} from '../../common/js/common'
	export default{
		data(){
			return{
				cartBol: false,
				searchWord: "",
				userInfo: {
					cart_num: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }],
			   shopList:[],
			   totalPrice: 0 
			}
		},
		filters:{
			currency
		},
		methods:{
			relatedGoods(keyword){
				location.href = `relatedGoods.html?keyword=${keyword}`; 
			},
			keyWords(){
				getKeyWord().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
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
					}else {
						this.keyWordsArr = content;	
					}
				})
			},
			countTotalPrice(){
				let _this  = this ;
				let totalPrice = 0 ;
				let totalNum = 0 ;
				for (let i = 0 ;i < _this.shopList.length; i++){
					let arr = _this.shopList[i].goods ;
					for(let j = 0;j< arr.length;j++){
						let price = arr[j].shop_price*arr[j].quantity ;
						totalPrice+=price;
						totalNum++;
					}
				}
				_this.totalPrice = totalPrice ;
				_this.userInfo.cart_num = totalNum ;
				localStorage.userInfo = JSON.stringify(_this.userInfo) ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)
			},
			remove(cart_id){
			 	MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let params = {
				 		access_token: getCookie('access_token'),
				 		cart_ids: cart_id
		 			} ;
			        removeCart(params).then(res=>{
				 		let {errcode,message,content} = res;
				 		if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							this.initList(); 
						}
				 	})
		        }).catch(() => {
		            return false;          
		        });
			 },
			initList(){
			 	let params = {
					access_token: getCookie('access_token')
				};
				getCarts(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.shopList = content ;
						this.countTotalPrice() ;
					}
				});
			 }
		},
		mounted(){
			this.$nextTick(()=>{
				if (localStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(localStorage.userInfo);
				}
				this.keyWords();
				let  access_token = getCookie('access_token');
				if (access_token) {
					this.initList();
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
$border_color: #ccc;
	.head_con_wrap{
		width: 100%;
		.head_con_box{
			width: 100%;
			height: 104px;
			.logo{
				width: 270px;
				margin-top: 32px;
				float: left;
				img{
					width: 100%;
				}
			}
			.search_box{
				width: 520px;
				float: left;
				margin-top: 32px;
				margin-left: 120px;
				.search_form{
				    border: 3px solid #e4393c;
				    height: 44px;
				    width: 496px;
				    #searchForm{
				    	overflow: hidden;
				    	.search_text{
							float: left;
							background-color: #fff;
							background-position: 0 -360px;
							background-repeat: repeat-x;
						 	font-family: arial,"宋体";
							font-size: 14px;
							padding: 5px;
							width: 412px;
							height: 38px;
							line-height: 38px;
							border: none;
							outline: none;
						}
						.search_but{
							float: left;
							background: none repeat scroll 0 0 #e4393c;
						    color: #fff;
						    font-size: 14px;
						    font-weight: 700;
						    width: 78px;
						    height: 38px;
						    border: none;
						    margin: 0px;
						}
				    }
				}
				.hot_words{
					margin: 0px;
					padding: 6px 0px;
					overflow: hidden;
					li{
						float: left;
						padding-left: 10px;
						cursor: pointer;
					}
				}
			}
			.shopping_cart{
				position: relative;
				width: 150px;
				height: 36px;
				margin-top: 32px;
				padding-top: 6px;
				color: $primary;
				text-align: center;
				float: right;
				border: 1px  solid $primary;
				a{
					span{
						vertical-align: super;
					    border-radius: 8px;
					    padding: 0px 4px;
						color: #fff;
						background-color: $red_color;
					}
				}
			}
			.cartBox{
    			position: relative;
    			.no_cart,.shopList{
    				overflow: hidden;
	    			width: 240px;
	    			padding: 0px 14px;
	    			background-color: #fff;
	    		}
	    		.no_cart{
	    			position: absolute;
	    			right: -1px;
	    			top: 8px;
	    			height: 56px;
	    			line-height: 56px;
	    			text-align: center;
	    			border: 1px solid $border_color;
	    		}
    		}
    		.shopListBox{
    			position: absolute;
    			top: 8px;
    			right: -1px;
    			overflow-y: scroll;
    			border: 1px solid $border_color;
    			z-index: 100;
    			.checkCcart{
    				height: 72px;
    				line-height: 30px;
    				overflow: hidden;
    				background-color: #fff;
    			}
    		}
    		.shopList{
    			li{
    				width: 100%;
    				height: 80px;
					padding: 10px 0px;
					border-bottom: 1px solid $border_color;
					.goods_info{
						width: 100%;
						height: 80px;
						overflow: hidden;
						dt{
							float: left;
							width: 60px;
							height: 60px;
							img{
								width: 100%;
								height: 100%;
								cursor: pointer;
							}
						}
						dd{
							float: left;
							width: 136px;
							height: 60px;
							margin-left: 10px;
							color: #000;
						}
					}
					.show_info{
						line-height: 18px;
						height: 36px;
						overflow: hidden;
					    text-overflow: ellipsis;
					    display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					}
					.sell_info{
						overflow: hidden;
						margin-top: 6px;
						span{
							float: left;
						}
						em{
							float: right;
						}
						em:hover{
							cursor: pointer;
							color: $primary;
						}
					}
    			}
    		}
		}
	}
</style>