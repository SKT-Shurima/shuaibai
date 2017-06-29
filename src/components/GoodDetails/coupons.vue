<template>
	<ul class="coupons">
		<li v-for='item in couponsList' >
			<dl>
				<dt>
					<i>￥</i>
					<span v-text='item.amount-0'></span>
				</dt>
				<dd>
					<div class="title">
						优惠券
					</div>
					<div class="limit">
						满{{item.limit-0}}使用
					</div>
				</dd>
			</dl>
			<div class="btn">
				<el-button @click='getCoupon(item.coupon_id)' type='text' :disabled='!(item.use_total-0)'>
					立即领取
				</el-button>
			</div>
		</li>
	</ul>
</template>
<script>
import {getShopCoupons,receiveCoupon} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
	export default {
		data(){
			return {
				couponsList: null
			}
		},
		methods:{
			getCoupon(id){
				let  access_token  =getCookie('access_token');
				if (access_token) {
					let params = {
						access_token: access_token,
						coupon_id: id
					}
					receiveCoupon(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							Message.success({message:message}) ;
							this.initList();
						}
					})
				}else{
					MessageBox.confirm('请先登录', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
				        location.href='login.html' ;
			        }).catch(() => {
			            return false;          
			        });
				}
				
			},
			initList(){
				let  access_token = getCookie() ;
				let params = {
					access_token: access_token?access_token:""
				}
				getShopCoupons(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.couponsList = content; 
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
$primary:#c71724;
	.coupons{
		width: 220px;
		margin-left: 10px;
		margin-bottom: 14px;
		li{
			width: 220px;
			height: 116px;
			margin-bottom: 10px; 
			padding: 0px 20px;    
			background-color: #e7354d; 
		}
		dl{
			overflow: hidden;
			padding: 12px 0px;
			border-bottom: 1px dashed #fff;
			color: #fff;
			dt,dd{
				float: left;
			}
			dt{
				i{
					font-size: 16px;
					vertical-align: top;
				}
				span{
					font-size: 36px;
					line-height: 36px;
				}
			}
			dd{
				width: 88px;
				margin-left: 8px;
				line-height: 26px;
				text-align: center;
				.title{
					font-size: 22px;
				}
				.limit{
					font-size: 16px;
				}
			}
		}
		.btn{
			margin: 10px 0px;
			text-align: center;
			button{
				width: 108px;
				height: 20px;
				line-height: 20px;
				font-size: 16px;
				border-radius: 10px;
				padding: 0px;
				color: $primary;
				background-color: #fff;
			}
		}
	}
</style>