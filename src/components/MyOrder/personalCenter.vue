<template>
	<div class="wrap">
		<div class="userInfo" v-if='userInfo'>
			<div class="title">
				<dl>
					<dt>
						<img :src="userInfo.avater" v-if='userInfo.avater'>
						<img src="../../../static/centerImg/avaterDefault.jpg" v-else>
					</dt>
					<dd>
						{{userInfo.nickname}}({{userInfo.real_phone}})
					</dd>
				</dl>
				<ul>
					<li>
						<em>余额</em>
						<span>{{userInfo.account}}</span>
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
				 	<li @click='getOrders(1)'>待付款<i>{{userInfo.order.wait_pay_count | num_filter}}</i></li>
				 	<li @click='getOrders(2)'>待发货<i>{{userInfo.order.wait_delivery_count | num_filter}}</i></li>
				 	<li @click='getOrders(3)'>待收货<i>{{userInfo.order.wait_receive_count | num_filter}}</i></li>
				 	<li @click='getOrders(4)'>待评价<i>{{userInfo.order.wait_comment_count | num_filter}}</i></li>
				 	<li @click='getOrders(5)'>退款/售后</li>
				 </ul>
				 <div class="lastLogin">
				 	上次登录时间：{{userInfo.last_check_date|dateStyleCh}}&nbsp;{{userInfo.last_check_date*1000 | timeStyle}}
				 </div>             
			</div>
		</div>
		<order-list ref='orderList'></order-list>
	</div>
</template>
<script>
import {num_filter,dateStyleCh,timeStyle} from '../../common/js/filter'
import {getOrders} from '../../common/js/api'
import {getCookie} from '../../common/js/common'
import orderList from './orderList'
import {userInfo} from '../../common/js/mixins'
	export default {
		data() {
		    return {
		        userInfo: null
		    };
		},
		components:{
			orderList
		},
		filters: {
			num_filter,
			dateStyleCh,
			timeStyle
		},
		mixins: [userInfo],
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 location.hash = view;
		    },
		    getOrders(index){
		    	if (index!==5) {
		    		this.$refs.orderList.getOrderList(index,"1");
		    	}else{
		    		this.changeView('view01');
		    	}
		    	
		    }
		},
		created(){
			this.$nextTick(()=>{
				let access_token = getCookie('access_token') ;
				if (!access_token) {
					location.href = 'login.html' ;
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
		margin-bottom: 30px;
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
					cursor: pointer;
					border-right: 1px solid $border_color; 
					i{
						margin-left: 4px;
						padding: 0px 4px;
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