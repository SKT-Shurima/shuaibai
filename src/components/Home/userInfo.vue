<template>
	<div class="wrap">
		<div class="info-box">
			<dl class="f2-bg" @click='personCenter'>
				<dt>
					<img :src="userInfo.avater" v-if='userInfo.avater'>
					<img src="../../../static/centerImg/avaterDefault.jpg" v-else>
				</dt>
				<dd>
					<span>Hi,您好！{{userInfo.nickname}}</span>
				</dd>
			</dl>
			<div class="f2-bg btn-box" v-if='!userInfo.nickname'>
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
			<div class="info" v-if='userInfo.nickname'>
				<a href="myOrder.html#view10">
					<el-row class='info-money'>
						<el-col :span='8'>
							<div class="color-primary" v-text='userInfo.account'></div>
							<div>余额</div>
						</el-col>
						<el-col :span='8'>
							<div class="color-primary" v-text='userInfo.shopping_coin'></div>
							<div>购物积分</div>
						</el-col>
						<el-col :span='8'>
							<div class="color-primary" v-text='userInfo.reward_amount'></div>
							<div>钱包</div>
						</el-col>
					</el-row>
				</a>
				<el-row>
					<div class="info-title">
						<span>
							<img src="../../../static/indexImg/order.png" height="16" width="16">
							我的订单
						</span>
						<em @click='afterSale'>
						    售后<img src="../../../static/commonImg/leftArrow.png" height="10" width="5" alt="">
						</em>
					</div>
					<el-row class='order-menu'>
						<el-col :span='6' >
						    <span  @click='checkOrder(1)'>待付款</span>
							<i class="primary-bg" v-show='userInfo.order.wait_pay_count-0'>{{userInfo.order.wait_pay_count| num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(2)'>待发货</span>
							<i class="primary-bg" v-show='userInfo.order.wait_delivery_count-0'>{{userInfo.order.wait_delivery_count | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(3)'>待收货</span>
							<i class="primary-bg" v-show='userInfo.order.wait_receive_count-0'>{{userInfo.order.wait_receive_count | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(4)'>待评价</span>
							<i class="primary-bg" v-show='userInfo.order.wait_comment_count-0'>{{userInfo.order.wait_comment_count | num_filter}}</i>
						</el-col>
					</el-row>
				</el-row>
			</div>
		</div>
		<div class="pre-msg"  v-if='infoList.length'>
			<div class="info-title">
				<span>
					<img src="../../../static/indexImg/message.png" height="16" width="16">
					优惠快讯
				</span>
				<a href='javascript:window.open("infomation.html")'>
					更多<img src="../../../static/commonImg/leftArrow.png" height="10" width="5" alt="">
				</a>
			</div>
			<ul class="msg-list">
				<li class='ellipsis-1 color-6' v-for='(item,index) in infoList' v-text='item.name' :key='index' v-if='index<3' @click='msgDetail(item.id,index)'></li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getUserInfo,getHomeInformations} from '../../common/js/api'
import {getCookie} from '../../common/js/common'
import {num_filter} from '../../common/js/filter'
import {userInfo} from '../../common/js/mixins'
	export default{
		data(){
			return {
				userInfo: {
					avater: "",
					nickname: ""
				},
				infoList: []
			}
		},
		filters:{
			num_filter
		},
		mixins: [userInfo],
		methods: {
			personCenter(){
				window.open(`myOrder.html#view10`) ;
			},
			afterSale(){
				window.open(`myOrder.html#view01`);
			},
			checkOrder(index){
				window.open(`myOrder.html#view0?orderIndex=${index}`);
			},
			msgDetail(id,index){
				window.open(`infomation.html#infoDetail?id=${id}&index=${index}&page=1`);
			},
			initMsg(){
				getHomeInformations().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.infoList = content.infos ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initMsg();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		margin-top: 0px;
	}
	.info-box{
		height: 240px;
		dl{
		    height: 118px;
		    margin-top: 12px;
		    padding-top: 10px;
		    padding-bottom: 10px;
		    cursor: pointer;
		}
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
			text-align: center;
			font-size: 14px;
			margin-top: 10px;
		}
	}
	.btn-box{
		height: 124px;
		text-align: center;
		padding-top: 12px;
		padding-bottom: 24px;
		div{
			margin-top: 14px;
			.el-button{
				width: 130px;
				border: 1px solid #c71724;
			}
		}
	}
	.info{
		height: 124px;
	}
	.info-money{
		height: 44px;
		padding-top: 4px;
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
	.order-menu{
		.el-col-6{
			cursor: pointer;
		}
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
			background-color: #c71724;
		}
	}
	.pre-msg{
		height: 116px;
	}
	.msg-list{
		li{
			line-height: 20px;
			overflow: hidden; 
            cursor: pointer;
            border-bottom:1px solid #ccc;
		}
		li:last-child{
			border-bottom: none;
		}
	}
	.info-title{
		width: 100%;
		height: 48px;
		line-height: 48px;
		font-size: 14px;
		padding: 0px 6px;
		span{
			float: left;
			font-weight: 600;
		}
		a,em{
			float: right;
			cursor: pointer;
			color: #666;
			img{
				margin-left: 6px;
			}
		}
	}
</style>