<template>
	<div class="wrap">
		<div class="navBox">
			<div class="container">
				<div class="logo" @click='currentView="view10"'>
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
					<input type="text" name="">
					<button>搜索</button> 
				</div>
			</div>
		</div>
		<div class="containerBox">
			<div class="slider">
				<div class="title">
					订单中心
				</div>
				<ul>
					<li><i></i>全部订单</li>
					<li><i></i>待付款订单</li>
					<li><i></i>待发货订单</li>
					<li><i></i>待收货订单</li>
					<li><i></i>待评价订单</li>
					<li><i></i>退款/售后</li>
				</ul>
				<div class="title">
					会员中心
				</div>
				<ul>
					<li>
						<i></i>个人信息
					</li>
					<li>
						<i></i>商品收藏
					</li>
					<li>
						<i></i>店铺关注
					</li>
					<li>
						<i></i>我的购物车
					</li>
					<li>
						<i></i>我的足迹
					</li>
					<li>
						<i></i>我的优惠券
					</li>
					<li>
						<i></i>投诉
					</li>
					<li>
						<i></i>资金
					</li>
					<li>
						<i></i>商家入驻
					</li>
				</ul>
			</div>
			<div class="container">
				<div class="orderList">
					<component :is='currentView'></component>
				</div>
			</div>
		</div>
		<div class="guess">
			<you-like></you-like>
		</div>
	</div>
</template>
<script>
	import personalCenter from './personalCenter' ;
	import modidfyPw from './modidyPw'
	import phoneBind from './phoneBind'
	import addPhoneBind from './addPhoneBind'
	import changePhoneBind from './changePhoneBind'
	import emailBind from './emailBind'
	import addEmailBind from './addEmailBind'
	import unbindEmail from './unbindEmail'
	import message from "./message"
	import youLike from '../../components/Guess/content'
	export default {
		data() {
		    return {
		        accountListBol: false
		    };
		},
		computed:{
			currentView(){
				return this.$store.state.view;
			}
		},
		components:{
			youLike,
			"view10": personalCenter,
			"view11": modidfyPw,
			"view12": phoneBind,
			"view120": addPhoneBind,
			"view121": changePhoneBind,
			"view13": emailBind,
			"view130": addEmailBind,
			"view131": unbindEmail,
			"view20": message
		},
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      },changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 sessionStorage.currentView = this.currentView ;
	      }
	      
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.currentView) {
					let currentView = sessionStorage.currentView;
					this.changeView(currentView);
				}else{
					sessionStorage.setItem('currentView',this.currentView);
				}
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