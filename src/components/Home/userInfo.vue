<template>
	<div class="wrap">
		<div class="info_box">
			<dl @click='personCenter'>
				<dt>
					<img :src="userInfo.avater" v-if='userInfo.avater'>
					<img src="../../../static/centerImg/avaterDefault.jpg" v-else>
				</dt>
				<dd>
					<span>Hi,您好！{{userInfo.nickname}}</span>
				</dd>
			</dl>
			<div class="btnBox" v-if='!userInfo.nickname'>
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
				</a>
				<el-row class='info_order'>
					<div class="info_title">
						<span>
							<img src="../../../static/indexImg/order.png" height="16" width="16">
							我的订单
						</span>
						<em @click='afterSale'>
						    售后<img src="../../../static/commonImg/leftArrow.png" height="10" width="5" alt="">
						</em>
					</div>
					<el-row class='order_menu'>
						<el-col :span='6' >
						    <span  @click='checkOrder(1)'>待付款</span>
							<i v-show='userInfo.order.wait_pay_count-0'>{{userInfo.order.wait_pay_count| num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(2)'>待发货</span>
							<i v-show='userInfo.order.wait_delivery_count-0'>{{userInfo.order.wait_delivery_count | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(3)'>待收货</span>
							<i v-show='userInfo.order.wait_receive_count-0'>{{userInfo.order.wait_receive_count | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<span  @click='checkOrder(4)'>待评价</span>
							<i v-show='userInfo.order.wait_comment_count-0'>{{userInfo.order.wait_comment_count | num_filter}}</i>
						</el-col>
					</el-row>
				</el-row>
			</div>
		</div>
		<div class="pre_msg"  v-if='infoList.length'>
			<div class="info_title">
				<span>
					<img src="../../../static/indexImg/message.png" height="16" width="16">
					优惠快讯
				</span>
				<a href='javascript:window.open("infomation.html")'>
					更多<img src="../../../static/commonImg/leftArrow.png" height="10" width="5" alt="">
				</a>
			</div>
			<ul class="msg_list">
				<li v-for='(item,index) in infoList' v-text='item.name' :key='index' v-if='index<3' @click='msgDetail(item.id,index)'></li>
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
<style lang='scss'  scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
.wrap{
	margin-top: 0px;
	.info_box{
		width: 100%;
		height: 240px;
		dl{
		    width: 100%;
		    height: 118px;
		    margin-top: 12px;
		    padding-top: 10px;
		    padding-bottom: 10px;
		    cursor: pointer;
		    background-color: #f2f2f2;
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
				padding-top: 4px;
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
						background-color: $primary;
					}
				} 
			}
		}
	}
	.pre_msg{
		width: 100%;
		height: 116px;
		.msg_list{
			li{
				color: $text_color;
				line-height: 20px;
				overflow: hidden; 
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                cursor: pointer;
                border-bottom:1px solid $border_color;
			}
			li:last-child{
				border-bottom: none;
			}
		}
	}
	.info_title{
		width: 100%;
		height: 48px;
		line-height: 48px;
		font-size: 14px;
		padding: 0px 6px;
		span{
			float: left;
			font-weight: 600;
		}
		a{
			float: right;
			cursor: pointer;
			color: $text_color;
			img{
				margin-left: 6px;
			}
		}
	}
}
	
</style>