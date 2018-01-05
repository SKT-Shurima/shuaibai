<template>
	<div class="wrap">
		<div class="border-c f5-bg shop-info-head">
			<el-row>
				<el-col :span='9'>商品信息</el-col>
				<el-col :span='2'>单价</el-col>
				<el-col :span='2'>数量</el-col>
				<el-col :span='2'>售后类型</el-col>
				<el-col :span='3'>付款信息</el-col>
				<el-col :span='3'>售后状态</el-col>
				<el-col :span='3'>售后操作</el-col>
			</el-row>
		</div>
		<div class="border-c shop-info-list" v-for='(shopItem,index) in refunds' :key='index' v-if='refunds'>
			<div class="f5-bg title">
				<el-row>
					<el-col :span='9'>
						<em style='margin-left:24px;font-weight: 600;'>{{shopItem.date_add*1000|dateStyle}}</em>
						<span style='margin-left:26px'>订单号：{{shopItem.order_sn}}</span>
					</el-col>
					<el-col :span='10'>
						<span v-text='shopItem.shop_name'></span>
						<button class='border-c'>
							<img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服
						</button>
					</el-col>
				</el-row>
			</div>
			<div>
				<div class='list-con'>
				 	<div class="goods-list-box">
				 		<div v-for='(item,index) in shopItem.goods' :key='item.goods_id' class="goods-list">
					 		<dl class="goods-msg">
								<dt>
									<img :src="item.cover" @click='goodDetail(item.goods_id)'>
								</dt>
								<dd>
									<div class="goods-name" v-text='item.name'></div>
									<div class="color-6">
										<span style="margin-right: 10px;">规格:{{item.option_name}}</span>
									</div>
								</dd>
							</dl>
							<div class='goods-price'>
								<dd>{{item.price|currency}}</dd>
							</div>
							<div class="goods-price" v-text='item.quantity'></div>
							<div class="refunds">
								<dt v-text='shopItem.type'></dt>
								<dd class='color-primary' v-text='shopItem.state'></dd>
							</div>
						</div>
				 	</div>
					<div class="goods-info" :style="{height:130*shopItem.goods.length+'px'}" :class='{"multiple":shopItem.goods.length>1}'>
						<el-row>
							<el-col :span='8'>
								<div style="line-height:26px;font-size:14px;font-weight:600;">{{shopItem.order_amount|currency}}</div>
								<div style="color:#666;line-height:20px;">含运费:{{shopItem.express_amount|currency}}</div>
								<div style='color:#666;line-height:20px;'>优惠券:{{shopItem.goods_count|currency}}</div>
							</el-col>
							<el-col :span='8' style='line-height:20px;padding-top: 14px;'>
								<div>
									<span @click='checkRefund(shopItem.refund_sn,shopItem.refund_type)' class="opera">售后详情</span>
								</div>
							</el-col>
							<el-col :span='8' style='line-height:20px;padding-top: 14px;'>
								<div>
									<span @click='rush(shopItem.refund_sn)'>催一催</span>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
		<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	</div>
</template>
<script>
import {getRefunds,refundRemind} from '../../common/js/api'
import {currency,dateStyle} from '../../common/js/filter'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
import pagination from '../Common/pagination'
	export default {
		data(){
			return {
				refunds: null,
				pagesize: 1 ,// 总页数,
				state: "0" 
			}
		},
		filters: {
			currency,dateStyle
		},
		components:{
			pagination
		},
	    methods: {
	    	goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)  ;
			},
	        handleSelect(key, keyPath) {
	            console.log(key, keyPath);
	        },
	        getRefundsList(page){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		page: page
		    	};
		    	getRefunds(params).then(res=>{
		    		let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.refunds = content ;
					}
		    	})
	   	 	},
	   	 	// 查看售后详情
	   	 	checkRefund(refund_sn,type){
	   	 		if (type==="1") {
	   	 			window.open(`moneyReturn.html#seller?refund_sn=${refund_sn}`);
	   	 		}else {
	   	 			window.open(`goodsReturn.html#seller?refund_sn=${refund_sn}`);
	   	 		}
	   	 		
	   	 	},
	   	 	// 催一催
	   	 	rush(refund_sn){
	   	 		let params = {
	   	 			access_token: getCookie('access_token'),
	   	 			refund_sn: refund_sn
	   	 		}
	   	 		refundRemind(params).then(res=>{
	   	 			let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						MessageBox.alert('消息发送成功', '提示', {
				          	confirmButtonText: '确定'  
						});	   
					}
	   	 		})
	   	 	},
	   	 	// 改变页数
			changePage(page){
				this.getRefundsList(page);
			}
		},
		created(){
			this.$nextTick(()=>{
				// 获取订单列表
				this.getRefundsList("1")
			})
		}
	}
</script>
<style lang='scss' scoped>
	.shop-info-head{
		line-height: 40px;
		text-align: center;
		margin: 0px 0px 20px;
	}
	.shop-info-list{
		margin-bottom: 10px;
	}
	.title{
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		button{
			border-radius: 8px;
			background-color: #fff;
			img{
				margin-right: 4px;
			}
		}
	}
	.list-con{
		overflow: hidden;
	}
	.goods-list-box{
		width: 674px;
		float: left;
		overflow: hidden;
	}
	.goods-list{
		float: left;
		padding: 20px 0px 20px 20px;
		overflow: hidden;
		border-top: 1px solid #ccc;
		margin-top: -1px;
	}
	.goods-msg{
		float: left;
		width: 384px;
		overflow: hidden;
		dt{
			float: left;
			width: 90px;
			height: 90px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			float: left;
			width: 240px;
			margin-left: 18px;
		}
	}
	.goods-name{
		line-height: 18px;
		margin-bottom: 18px;
	}				
	.goods-price,.refunds{
		float: left;
		width: 90px;
		text-align: center;
		margin-top: 32px;
		line-height: 20px;
	}
	.refunds{
		margin-top: 20px;
	}
	.goods-info{
		float: left;
		width: 404px;
		height: 100%;
		position: relative;
		.el-row{
			width: 100%;
			height: 66px;
			position: absolute;
			right: 0px;
			top: 0px;
			bottom: 0px;
			margin: auto;
			text-align: center;
		}
		.opera{
			cursor: pointer;
		}
		.opera:hover{
			color: #c71724;
		}
		.el-col-8{
			span{
				line-height: 26px;
				cursor: pointer;
			}
			span:hover{
				color: #c71724;
			}
		}
	}
	.multiple{
		border-left: 1px solid #ccc;
	}
</style>