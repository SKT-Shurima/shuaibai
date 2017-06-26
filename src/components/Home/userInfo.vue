<template>
	<div class="info_box">
		<dl>
			<dt>
				<img :src="userInfo.avater">
			</dt>
			<dd>
				<span>Hi,您好！{{userInfo.nickname}}</span>
			</dd>
		</dl>
		<div class="btnBox" v-if='!hasUser'>
			<div>
				<a href="login.html">
					<el-button type='text' size='small'>登录</el-button>
				</a>
			</div>
			<div>
				<a href="reg.html">
					<el-button type='text' size='small'>注册新用户</el-button>
				</a>
			</div>
		</div>
		<div class="info" v-if='hasUser'>
			<el-row class='info_money'>
				<el-col :span='8'>
					<div class="info_num" v-text='userInfo.account'>
					</div>
					<div>
						余额
					</div>
				</el-col>
				<el-col :span='8'>
					<div class="info_num" v-text='userInfo.shopping_coin'>
					</div>
					<div>
						购物币
					</div>
				</el-col>
				<el-col :span='8'>
					<div class="info_num" v-text='userInfo.integration'>
					</div>
					<div>
					    积分
					</div>
				</el-col>
			</el-row>
			<el-row class='info_order'>
				<div class="info_title">
					<span>
						<i></i>
						我的订单
					</span>
					<em>
					    售后
						<i></i>
					</em>
				</div>
				<el-row class='order_menu'>
					<el-col :span='6'>
					    <span>待付款</span>
						<i v-show='order.wait_pay_count'>{{order.wait_pay_count | num_filter}}</i>
					</el-col>
					<el-col :span='6'>
						<span>待发货</span>
						<i v-show='order.wait_delivery_count'>{{order.wait_delivery_count | num_filter}}</i>
					</el-col>
					<el-col :span='6'>
						<span>待收货</span>
						<i v-show='order.wait_receive_count'>{{order.wait_receive_count | num_filter}}</i>
					</el-col>
					<el-col :span='6'>
						<span>待评价</span>
						<i v-show='order.wait_comment_count'>{{ order.wait_comment_count | num_filter}}</i>
					</el-col>
				</el-row>
			</el-row>
		</div>
	</div>
</template>
<script>
import {num_filter,currency} from '../../common/js/filter'
	export default{
		data(){
			return {
				userInfo:{
			   		nickname: '',
			   		avater:'',
			   		account: '',
			   		integration: '',
			   		shopping_coin: ''
			    },
			    order: {
			   		wait_comment_count: null,
			   		wait_delivery_count: null,
					wait_pay_count: null,
					wait_receive_count: null
			    },
			    hasUser: false,
			}
		},
		filters:{
			num_filter,
			currency
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					// 读取用户信息
					this.userInfo = JSON.parse(sessionStorage.userInfo);
					// 获取购物信息
					this.order = this.userInfo.order;
				}
			})
		}
	}
</script>
<style lang='scss'  scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
	.info_box{
		width: 100%;
		height: 254px;
		dl{
			width: 100%;
			height: 130px;
			padding-top: 22px;
			padding-bottom: 10px;
			dt{
				width: 70px;
				margin: 0px auto;
				img{
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
			}
			dd{
				width: 100%;
				text-align: center;
				font-size: 14px;
				margin-top: 10px;
			}
		}
		.btnBox{
			width: 100%;
			height: 124px;
			text-align: center;
			background-color: #f2f2f2;
			padding-top: 12px;
			padding-bottom: 24px;
			div{
				margin-top: 14px;
				.el-button{
					width: 130px;
					border: 1px solid $primary;
				}
			}
		}
		.info{
			width: 100%;
			height: 124px;
			.info_money{
				width: 100%;
				height: 44px;
				padding-bottom: 10px;
				border-bottom: 1px solid $border_color;
				text-align: center;
				.info_num{
					color: $primary;
				}
			}
		    .info_order{
				width: 100%;
				.order_menu{
					width: 100%;
					span{
						float: left;
					}
					i{
						float: left;
						height: 12px;
						line-height: 12px;
						padding: 0px 3px;
						border-radius: 6px;
						margin-top: 2px;
						text-align: center;
						color: #fff;
						background-color: $primary;
					}
				} 
			}
			.info_title{
					width: 100%;
					height: 48px;
					line-height: 48px;
					span{
						float: left;
						font-weight: 600;
					}
					em{
						float: right;
						color: $text_color;
					}
				}
		}
	}
</style>