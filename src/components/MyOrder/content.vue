<template>
	<div class="wrap">
		<div class="navBox">
			<div class="container">
				<div class="logo" @click='changeView("view10")'>
					我的帅柏
				</div>
				<div class="navTitle">
					<ul class="navList">
						<li><a href="index.html">帅柏首页</a></li>
						<li>
							<div @mouseenter='accountListBol=true' @mouseleave='accountListBol=false'>账户安全</div>
							<ul v-show='accountListBol' @mouseleave='accountListBol=false' @mouseenter='accountListBol=true'>
								<li @click='changeView("view11")'>修改密码</li>
								<li @click='changeView("view12")'>手机绑定</li>
								<li @click='changeView("view13")'>邮箱绑定</li>
							</ul>
						</li>
						<li><div @click='changeView("view20")'>消息</div></li>
					</ul>
				</div>
				<div class="searchBox">
					<input type="text" name="" v-model='searchInput' @keyup.enter='search'>
					<button @click='search'>搜索</button> 
				</div>
			</div>
		</div>
		<div class="containerBox">
			<div class="slider">
				<div class="title">
					订单中心
				</div>
				<ul>
					<li @click='getOrder(index)' v-for='(item,index) in orderList' :class='{"isClick":orderIndex===index}'><i></i>{{item.name}}</li>
				</ul>
				<div class="title">
					会员中心
				</div>
				<ul>
					<li @click='vipView(index)' :class='{"isClick":vipIndex===index}' v-for='(item,index) in  vipCenterList'>
						<i></i>{{item.name}}
					</li>
				</ul>
			</div>
			<div class="container">
				<div class="orderList">
					<keep-alive>
						<component :is='currentView' @hasGuess='hasGuess(msg)' ref='orderList'></component>
					</keep-alive>
				</div>
			</div>
		</div>
		<div class="guess" v-show='guessBol'>
			<you-like></you-like>
		</div>
	</div>
</template>
<script>
	import {getHashReq,getCookie} from '../../common/js/common'
	import {MessageBox} from  'element-ui'
    import orderList from './orderList'
    import refundList from './refundList'
	import personalCenter from './personalCenter' ;
	import address from './address'
	import modidfyPw from './modidyPw'
	import phoneBind from './phoneBind'
	import addPhoneBind from './addPhoneBind'
	import changePhoneBind from './changePhoneBind'
	import emailBind from './emailBind'
	import addEmailBind from './addEmailBind'
	import unbindEmail from './unbindEmail'
	import message from "./message"
	import personalInfo from './personalInfo'
	import editAvater from './editAvater'
	import colGoods from './colGoods'
	import viewStore from "./viewStore"
	import myShopCar from "./myShopCar"
	import footmark from './footmark'
	import coupons from './coupons'
	import complaints from './complaints'
	import money from './money'
	import recharge from './recharge'
	import withdraw from './withdraw'
	import shopCoin from './shopCoin'
	import integral from './integral'
	import tenants from './tenants'
	import youLike from '../../components/Guess/content'

	//  监测地址栏的变化
	 
	export  default {
		data() {
		 	window.addEventListener("popstate",()=>{
		 		this.init();
		 	})
		    return {
		    	searchInput: "", 
		    	guessBol: true,
		        accountListBol: false,
		        vipIndex: '',
		        vipCenterList: [
		        	{name: '个人中心'},
		        	{name: '商品收藏'},
		        	{name: '店铺关注'},
		        	{name: '我的购物车'},
		        	{name: '我的足迹'},
		        	{name: '我的优惠券'},
		        	{name: '投诉'},
		        	{name: '资金'},
		        	{name: '商家入驻'}
		        ],
		        orderIndex: '',
		        orderList: [
		        	{name: '全部订单'},
		        	{name: '待付款订单'},
		        	{name: '待发货订单'},
		        	{name: '待收货订单'},
		        	{name: '待评价订单'},
		        	{name: '退款/售后'}
		        ],
		        reqParams: null
		    };
		},
		computed:{
			currentView(){
				let view = this.$store.state.view;
				return view;;
			}
		},
		components:{
			youLike,
			"view0": orderList,
			'view01': refundList,
			"view10": personalCenter,
			"view100": address,
			"view11": modidfyPw,
			"view12": phoneBind,
			"view120": addPhoneBind,
			"view121": changePhoneBind,
			"view13": emailBind,
			"view130": addEmailBind,
			"view131": unbindEmail,
			"view20": message,
			"vip0": personalInfo,
			"vip01": editAvater,
			"vip1": colGoods,
			"vip2": viewStore,
			"vip3": myShopCar,
			"vip4": footmark,
			"vip5": coupons,
			"vip6": complaints,
			"vip7": money,
			"vip70": recharge,
			"vip71": withdraw,
			"vip72": shopCoin,
			"vip73": integral,
			"vip8": tenants
		},
	    methods: {
	    	search(){
	    		let _this = this ;
	    		let keyword = _this.searchInput ;
	    		keyword = keyword.trim();
	    		if (keyword) {
	    			window.open(`relatedGoods.html?keyword=${keyword}`);
	    		}else {
	    			MessageBox.alert('请输入关键字', '提示', {
			          	confirmButtonText: '确定'
				    });
	    		}
	    	},
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      hasGuess(msg){
	      	let _this = this ;
	      	_this.guessBol = msg;
	      },
	      changeView(view,hash){
	      	let _this = this ;
	      	_this.$store.commit('switchView',view);
	      	location.hash = hash ? hash : view ;
	      },
	      vipView(index){
	      	let _this = this ;
	      	_this.vipIndex = index;
	      	_this.orderIndex= "";
	      	let view = 'vip' ;
	        view += index ;
	        _this.changeView(view);
	      },
	      getOrder(index){
	      	let _this = this ;
	      	// 改变点击后的列表效果
	      	_this.orderIndex = index ;
	      	_this.vipIndex = '';
	      	if (index<5) {
	      		if (_this.currentView === 'view0') {
	      			_this.$refs.orderList.getOrderList(index,"1");
	      		}
	      		// 切换当前视图
	      		_this.changeView('view0');
	      	}else{
	      		// 切换当前视图
	      		_this.changeView('view01');
	      	}
	      },
	      init(){
	      	let hash = location.hash ;
			let view ;
			this.reqParams = null ;
			if (hash.indexOf('?')>0) {
				view = hash.split('?')[0].slice(1)
				this.reqParams = getHashReq();
			}else {
				view = location.hash.slice(1) ;
			}
			if (view) {
				if(view.indexOf('vip')>=0){
					this.vipIndex = view[3] - 0;
				}else{
					this.vipIndex = "" ;
				}
				if (view === 'view0') {
					this.orderIndex = this.reqParams ? this.reqParams.orderIndex -0 : 0 ;
				}
				if (view==='view01'){
					this.orderIndex = 5;
				}
				this.changeView(view,hash);
			}else {
				this.changeView('view10');
			}
	      }
		},
		created(){
			this.$nextTick(()=>{
				let access_token = getCookie('access_token') ;
	            if(!access_token){
	                location.href = 'login.html';
	            }
	        })
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			});
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
		.navBox{
			width: 100%;
			height: 60px;
			line-height: 60px;
			text-align: center;
			color: #fff;
			background-color: $primary;
			.container{
				width: 1250px;
				margin: 0px auto;
				.logo{
					float: left;
					width: 150px;
					font-size: 28px;
					cursor: pointer;
				}
				.navTitle{
					float: left;
					.navList{
						margin-left: 80px;
						li{
							float: left;
							position: relative;
							cursor: pointer;
							font-size: 16px;
							font-weight: 600;
							width: 120px;
							text-align: center;
							color: #fff;
							a{
								color: #fff;
							}
							ul{
								position: absolute;
								left: 0px; 
								z-index: 10;
								overflow: hidden;
								background-color: #bd2f30;
								li{
									height: 40px;
									line-height: 40px;
									font-weight: 400;
								}
								li:hover{
									background-color: #fff;
									color: $primary;
								}
							}
						}
					}
				}
				.searchBox{
					float: right;
					width: 310px;
					height: 28px;
					line-height: 28px;
					margin-top: 16px;
					margin-right: 20px;
					overflow: hidden;
					input{
						float: left;
						width: 250px;
						height: 28px;
						border: 1px solid $border_color;
					}
					button{
						float: left;
						width: 60px;
						height: 28px;
						text-align: center;
						color: $text_color;
						border: 1px solid $border_color;
						background-color: #eee;
					}
				}
			}
		}
		.containerBox{
			width: 1250px;
			margin: 30px auto;
			overflow: hidden;
			.slider{
				float: left;
				width: 150px;
				line-height: 40px;
				border: 1px solid $border_color;
				div{
					font-size: 14px;
					font-weight: 600;
					padding-left: 24px;
					margin-top: -1px;
					border-top: 1px solid $border_color;
					border-bottom: 1px solid $border_color;
					background-color: $bg_color;
				}
				li{
					padding-left: 16px;
					cursor: pointer;
					color: $text_color;
					i{
						display: inline-block;
						width: 6px;
						height: 6px;
						border-radius: 50%;
						margin-right: 10px;
						background-color: #aaa ;
					}
				}
				.isClick{
					color: $primary;
					i{
						background-color: $primary;
					}
				}
			}
			.container {
				float: left;
				width: 1080px;
				margin-left: 20px;
				overflow: hidden;
			}
		}
		.guess{
			width: 1250px;
			margin: 0px auto;
		}
	}
</style>