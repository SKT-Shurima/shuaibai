<template>
	<div class="wrap">
		<div class="primary-bg nav-box">
			<div class="container">
				<div class="logo" @click='changeView("view10")'>
					我的帅柏
				</div>
				<div class="nav-title">
					<ul class="nav-list">
						<li><a href="index.html">帅柏首页</a></li>
						<li>
							<div @mouseenter='accountListBol=true' @mouseleave='accountListBol=false'>账户安全</div>
							<ul v-show='accountListBol' @mouseleave='accountListBol=false' @mouseenter='accountListBol=true'>
								<li @click='changeView("view11")'>修改密码</li>
								<li @click='changeView("view12")'>手机绑定</li>
								<li @click='changeView("view13")'>邮箱绑定</li>
							</ul>
						</li>
						<li><div @click='changeView("view20")'>消息<span v-text='msgNum' v-show='msgNum-0' style="margin-left: 6px;"></span></div></li>
					</ul>
				</div>
				<div class="search-box">
					<input class='border-d' type="text" name="" v-model='searchInput' @keyup.enter='search'>
					<button class='color-6 border-d' @click='search'>搜索</button> 
				</div>
			</div>
		</div>
		<div class="container-box">
			<div class="border-d slider">
				<div class="f5-bg title">订单中心</div>
				<ul>
					<li @click='getOrder(index)' v-for='(item,index) in orderList' class='color-6' :class='{"is-click":orderIndex===index}'><i></i>{{item.name}}</li>
				</ul>
				<div class="f5-bg title">
					会员中心
				</div>
				<ul>
					<li @click='vipView(index)' :class='{"is-click":vipIndex===index}' v-for='(item,index) in  vipCenterList'>
						<i></i>{{item.name}}
					</li>
				</ul>
			</div>
			<div class="container">
				<div class="orderList">
					<component :is='currentView' @hasGuess='hasGuess(msg)' ref='orderList' @hasRead='msgNum=0'></component>
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
	import {getMessageCount,errorInfo} from '../../common/js/api'
	import {MessageBox} from  'element-ui'
    import orderList from './orderList'
    import refundList from './refundList'
    import mobileOrder from './mobileOrder'
	import personalCenter from './personalCenter' ;
	import address from './address'
	import editAddress from './editAddress'
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
	import payFor from './payFor'
	import withdraw from './withdraw'
	import shopCoin from './shopCoin'
	import wallet from './wallet'
	import walletRecharge from './walletRecharge'
	import walletWithdraw from './walletWithdraw'
	import walletTransfer from './walletTransfer'
	import hongfu from './hongfu';
	import integral from './integral'
	import tenants from './tenants'
	import auditStatus from './auditStatus'
	import commission from './commission'
	import commissionWithdraw from './commissionWithdraw'
	import settingPay from './settingPay'
	import settingTrans from './settingTrans'
	import youLike from '../../components/Guess/content'

	//  监测地址栏的变化
	 
	export  default {
		data() {
		 	window.addEventListener("popstate",()=>{
		 		this.initView();
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
		        	{name: '商家入驻'},
		        	{name: '设置支付密码'},
		        	{name: '设置转账密码'}
		        ],
		        orderIndex: '',
		        orderList: [
		        	{name: '全部订单'},
		        	{name: '待付款订单'},
		        	{name: '待发货订单'},
		        	{name: '待收货订单'},
		        	{name: '待评价订单'},
		        	{name: '线下提货订单'},
		        	{name: '退款/售后'},
		        	{name: '充值订单'}
		        ],
		        reqParams: null,
		        msgNum: 0
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
			'view02': mobileOrder,
			"view10": personalCenter,
			"view100": address,
			"view101": editAddress,
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
			"vip700": payFor,
			"vip71": withdraw,
			"vip72": shopCoin,
			"vip73": integral,
			"vip74": wallet,
			"vip740": walletRecharge,
			"vip741": walletWithdraw,
			"vip742": walletTransfer,
			"vip75": hongfu,
			"vip8": tenants,
			"vip800": auditStatus,
			"vip80": commission,
			"vip81": commissionWithdraw,
			"vip9": settingPay,
			"vip10": settingTrans
		},
	    methods: {
	    	search(){
	    		let keyword = this.searchInput ;
	    		keyword = keyword.trim();
	    		if (keyword) {
	    			window.open(`relatedGoods.html?keyword=${keyword}`);
	    		}else {
	    			MessageBox.alert('请输入关键字', '提示', {
			          	confirmButtonText: '确定'
				    });
	    		}
	    	},
	      hasGuess(msg){
	      	this.guessBol = msg;
	      },
	      changeView(view,hash){
	      	this.$store.commit('switchView',view);
	      	location.hash = hash ? hash : view ;
	      },
	      vipView(index){
	      	this.vipIndex = index;
	      	this.orderIndex= "";
	      	let view = 'vip' ;
	        view += index ;
	        this.changeView(view);
	      },
	      getOrder(index){
	      	// 改变点击后的列表效果
	      	this.orderIndex = index ;
	      	this.vipIndex = '';
	      	if (index<6) {
	      		if (this.currentView === 'view0') {
	      			this.$refs.orderList.getOrderList(index,"1");
	      		}else{
	      			// 切换当前视图
	      			this.changeView(`view0?orderIndex=${index}`);
	      		}
	      	}else if(index === 5){
	      		// 售后
	      		this.changeView('view01');
	      	}else if(index===6){
	      		// 充值订单
	      		this.changeView('view02');
	      	}
	      },
	      initView(){
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
					if (view != 'vip10') {
						this.vipIndex = view[3] - 0;
					}else{
						this.vipIndex = 10;
					}
				}else{
					this.vipIndex = "" ;
				}
				if (view === 'view0') {
					this.orderIndex = this.reqParams ? this.reqParams.orderIndex -0 : 0 ;
				}
				if (view==='view01'){
					this.orderIndex = 5;
				}
				if (view==='view02'){
					this.orderIndex = 6;
				}
				this.changeView(view,hash);
			}else {
				this.changeView('view10');
			}
	      }
		},
		created(){
			this.$nextTick(()=>{
				let  access_token = getCookie('access_token');
	            if(!access_token){
	                location.href = 'login.html';
	            }else{
	            	let params = {
	            		access_token: access_token
	            	}
	            	getMessageCount(params).then(res=>{
	            		let {errcode,message,content} = res;
				 		if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							this.msgNum = content ;
						}
	            	})
	            }

	        })
		},
		mounted(){
			this.$nextTick(()=>{
				this.initView();
			});
		}
	}
</script>
<style lang='scss' scoped>
	.nav-box{
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
		.container{
			width: 1250px;
			margin: 0px auto;
		}
		.logo{
			float: left;
			width: 150px;
			font-size: 28px;
			cursor: pointer;
		}
		.nav-title{
			float: left;
		}
		.nav-list{
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
						color: #c71724;
					}
				}
			}
		}
		.search-box{
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
			}
			button{
				float: left;
				width: 60px;
				height: 28px;
				text-align: center;
				background-color: #eee;
			}
		}
	}
	.container-box{
		width: 1250px;
		margin: 30px auto;
		overflow: hidden;
		.slider{
			float: left;
			width: 150px;
			line-height: 40px;
			div{
				font-size: 14px;
				font-weight: 600;
				padding-left: 24px;
				margin-top: -1px;
				border-top: 1px solid #ddd;
				border-bottom: 1px solid #ddd;
			}
			li{
				padding-left: 16px;
				cursor: pointer;
				i{
					display: inline-block;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					margin-right: 10px;
					background-color: #aaa ;
				}
			}
			.is-click{
				color: #c71724;
				i{
					background-color: #c71724;
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
</style>