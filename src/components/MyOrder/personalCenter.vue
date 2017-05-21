<template>
	<div class="wrap">
		<div class="userInfo">
			<div class="title">
				<dl>
					<dt>
						<img src="">
					</dt>
					<dd>
						{{userInfo.nickname}}({{userInfo.real_phone}})
					</dd>
				</dl>
				<ul>
					<li>
						<em>余额</em>
						<span>{{userInfo.unread_count}}</span>
					</li>
					<li>
						<em>购物币</em>
						<span>{{userInfo.shopping_coin}}</span>
					</li>
					<li>
						<em>积分</em>
						<span>{{userInfo.integration}}</span>
					</li>
				</ul>
				<div class="address" @click='changeView("view100")'>
					我的收货地址
				</div>
			</div>
			<div class="shopInfo">
				 <ul>
				 	<li>待付款<i>1</i></li>
				 	<li>待发货<i>1</i></li>
				 	<li>待收货<i>1</i></li>
				 	<li>待评价<i>1</i></li>
				 	<li>退款/售后</li>
				 </ul>
				 <div class="lastLogin">
				 	上次登录时间：{{'2017年5月16号 12:00'}}
				 </div>             
			</div>
		</div>
		<order-list></order-list>
	</div>
</template>
<script>
import orderList from './orderList.vue'
	export default {
		data() {
		    return {
		        userInfo: {
		        	shopping_coin: '',
		        	integration: '',
		        	nickname: '',
		        	real_phone: '',
		        	unread_count: ''
		        }
		    };
		},
		components:{
			orderList
		},
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 sessionStorage.currentView = view ;
		    }
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
	$primary:#c71724;
	$text_color: #666;
	$border_color: #ddd;
	$bg_color: #f5f5f5;
	.userInfo{
		width: 100%;
		border: 1px solid $border_color;
		.title{
			padding: 14px 40px 16px 22px;
			line-height: 50px;
			border-bottom: 1px solid $border_color;
			background-color: $bg_color;
			overflow: hidden;
			dl{
				float: left;
				overflow: hidden;
				dt{
					float: left;
					width: 50px;
					height: 50px;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				dd{
					float: left;
					margin-left: 26px;

				}
			}
			ul{
				float: left;
				height: 50px;
				line-height: 50px;
				margin-left: 38px;
				overflow: hidden;
				li{
					float: left;
					width: 126px;
					em{
						vertical-align: 1px;
						color:$text_color;
					}
					span{
						font-size: 16px;
						font-weight: 600;
						color:  $primary; 
					}
				}
			}
		}
		.shopInfo{
			padding: 26px 40px 26px 30px;
			line-height: 20px;
			text-align: center;
			overflow: hidden;
			ul{
				float: left;
				overflow: hidden;
				li{
					float: left;
					width: 130px;
					border-right: 1px solid $border_color; 
					i{
						margin-left: 4px;
						padding: 2px 5px;
						border-radius: 8px;
						color: #fff;
						background-color: $primary;
					}
				}
				li:last-child{
					border-right: none;
				}
			}
			
		}
		.address,.lastLogin{
			float: right;
		}
		.address{
			cursor: pointer;
			color: $primary;
		}
		.lastLogin{
			color: $text_color;
		}
	}
</style>