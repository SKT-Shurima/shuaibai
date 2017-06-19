<template>
	<div class="wrap">
		<div class="box" v-if='orderInfo'>
			<dl class="goodsInfo" v-for='(item,index) in orderInfo.goods' :key='item'>
				<dt>
					<img :src="item.image">
				</dt>
				<dd class="name" v-text='item.name'></dd>
				<dd class="type">
					<span>规格：{{item.option_name}}</span>
					<em>套餐：{{item.goods_type}}</em>
				</dd>
			</dl>
			<div class="storeInfo">
				<div class="storeName">
					<span v-text='orderInfo.shop_name'></span>
					<button><img src="../../../static/commonImg/qq.png" height="14" width="12">联系客服</button>
				</div>
				<ul>
					<li>
						<el-row>
							<el-col :span='8'>单价：</el-col>
							<el-col :span='16'>{{199|currency}}<em>×1</em></el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>小计：</el-col>
							<el-col :span='16'><strong>{{199|currency}}</strong></el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<ul class="orderInfo">
				<li>
					<el-row>
						<el-col :span='8'>订单号：</el-col>
						<el-col :span='16'><span>1216551</span></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>运费：</el-col>
						<el-col :span='16'>{{165|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>总优惠：</el-col>
						<el-col :span='16'>-{{165|currency}}</el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>合计：</el-col>
						<el-col :span='16'><strong>1216551</strong></el-col>
					</el-row>
				</li>
				<li>
					<el-row>
						<el-col :span='8'>成交时间：</el-col>
						<el-col :span='16'>2017-01-01 12：:00</el-col>
					</el-row>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getOrderDetail} from '../../common/js/api'
	export default {
		data(){
			return {
				orderInfo: null
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let params = {
					access_token: sessionStorage.access_token,
					order_sn: sessionStorage.order_sn
				}
				getOrderDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		if (action==='confirm') {
					          			window.location.href = 'login.html';
					          		}
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else{
						this.orderInfo = content ;
					}
				})
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		.goodsInfo{
			padding-bottom: 10px;
			border-bottom: 1px solid $border_color;
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
				color: $text_color;
				span{
					float: left;
				}
				em{
					float: right;
				}
			}
		}
		.el-row{
			margin-top: 16px;
			.el-col-8{
				color: $text_color;
			}
			.el-col-16{
				strong{
					font-size: 14px;
					font-weight: 600;
					color: $primary;
				}
				span{
					color: #0080ca;
				}
			}
		}
		.storeInfo{
			padding-bottom: 20px;
			border-bottom: 1px solid $border_color;
			.storeName{
				margin-top: 20px;
				span{
					line-height: 20px;
				}
				button{
					outline: none;
					border-radius: 10px;
					border: 1px solid $border_color;
					background-color: transparent;
				}
			}
		}
	}
</style>