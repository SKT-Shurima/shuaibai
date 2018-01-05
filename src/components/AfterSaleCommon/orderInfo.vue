<template>
	<div class="orderwrap">
		<div class="box" v-if='refundInfo'>
			<dl class="goods-info">
				<dt>
					<img :src="refundInfo.cover">
				</dt>
				<dd class="name" v-text='refundInfo.name'></dd>
				<dd class="type">
					<span>规格：{{refundInfo.option_name}}</span>
					<!-- <em>套餐：{{refundInfo.goods_type}}</em> -->
				</dd>
			</dl>
			<div class="storeInfo">
				<div class="storeName">
					<span v-text='refundInfo.shop_name'></span>
					<button @click='kf(refundInfo.kf_qq)'><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
				</div>
				<ul>
					<li>
						<el-row>
							<el-col :span='8'>单价：</el-col>
							<el-col :span='16'>{{refundInfo.price|currency}} × {{refundInfo.quantity}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>小计：</el-col>
							<el-col :span='16'><strong>{{(refundInfo.price*refundInfo.quantity)|currency}}</strong></el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<ul class="refundInfo">
				<li>
					<el-row>
						<el-col :span='8'>订单号：</el-col>
						<el-col :span='16'><span v-text='refundInfo.order_sn'></span></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>运费：</el-col>
						<el-col :span='16'>{{refundInfo.express_amount|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>总优惠：</el-col>
						<el-col :span='16'>-{{refundInfo.coupon_amount|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>合计：</el-col>
						<el-col :span='16'><strong>{{refundInfo.order_amount|currency}}</strong></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>成交时间：</el-col>
						<el-col :span='16'>{{refundInfo.date_add*1000|dateStyle}}&nbsp;{{refundInfo.date_add*1000|timeStyle}}</el-col>
					</el-row>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {currency,dateStyle,timeStyle} from '../../common/js/filter'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {refundGoods} from '../../common/js/api'
import {MessageBox} from  'element-ui'
	export default {
		data(){
			return {
				reqParams: null,
				refundInfo: null
			}
		},
		filters:{
			currency,dateStyle,timeStyle
		},
		methods:{
			kf(qq){
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
		    }
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getHashReq();
				let params = {
					access_token: getCookie('access_token')
				};
				if (this.reqParams.order_sn) {
					params.order_sn = this.reqParams.order_sn ;
					params.goods_id = this.reqParams.goods_id ;
					params.option_id = this.reqParams.option_id ;
				}else if(this.reqParams.refund_sn){
					params.refund_sn = this.reqParams.refund_sn ;
				}
				refundGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.refundInfo = content;
						this.$emit('sendGoodsInfo',this.refundInfo);
					}
				})
			})
		}
	}
</script>
<style lang='scss' scoped>
	.orderwrap{
		.el-row{
			margin-top: 16px;
		}
		.el-col-8{
			color: #666;
		}
		.el-col-16{
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			strong{
				font-size: 14px;
				font-weight: 600;
				color: #c71724;
			}
			span{
				color: #0080ca;
			}
		}
		.storeInfo{
			padding-bottom: 20px;
			border-bottom: 1px solid #ddd;
		}
		.storeName{
			margin-top: 20px;
			span{
				line-height: 20px;
			}
			button{
				outline: none;
				border-radius: 10px;
				border: 1px solid #ddd;
				background-color: transparent;
			}
		}
	}
	.goods-info{
		padding-bottom: 10px;
		border-bottom: 1px solid #ddd;
		dt{
			width: 200px;
			height: 200px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.name{
			margin: 8px 0px;
			line-height: 18px;
		}
		.type{
			overflow: hidden;
			line-height: 20px;
			color: #666;
			span{
				float: left;
			}
			em{
				float: left;
				margin-left: 20px;
			}
		}
	}
</style>