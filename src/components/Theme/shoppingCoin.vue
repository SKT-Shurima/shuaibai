<template>
	<div class="wrap">
		<div class="box">
			<special :special='special'></special>
			<div class="container">
				<ul class="title">
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===0}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico01.png" height="51" width="56">
							</dt>
							<dd>
								帅柏优选
							</dd>
						</dl>
					</li>
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===1}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico02.png" height="51" width="56">
							</dt>
							<dd>
								私人定制
							</dd>
						</dl>
					</li>
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===2}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico03.png" height="51" width="56">
							</dt>
							<dd>
								饮食
							</dd>
						</dl>
					</li>
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===3}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico04.png" height="51" width="56">
							</dt>
							<dd>
								服饰
							</dd>
						</dl>
					</li>
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===4}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico05.png" height="51" width="56">
							</dt>
							<dd>
								居家
							</dd>
						</dl>
					</li>
					<li @mouseenter='index=0' @click='index=0' :class='{"active":index===5}'>
						<dl>
							<dt>
								<img src="../../../static/shopingCoinImg/spico06.png" height="51" width="56">
							</dt>
							<dd>
								出行
							</dd>
						</dl>
					</li>
				</ul>
				<ul class="goodsList">
					<li v-for='item in goods'>
						<dl>
							<dt>
								<img :src="item.cover" @click='goodDetail(item.goods_id)'>
							</dt>
							<dd>
								<div class="name" v-text='item.name'></div>
								<div class="priceInfo">
									<i></i>
									<span v-text='item.shopping_coin'></span>
									<em>原价{{item.shop_price|currency}}</em>
									<el-button @click='goodDetail(item.goods_id)' type='text'>
										立即购买
									</el-button>
								</div>
							</dd>
						</dl>
					</li>
				</ul>	
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import {getThematicActivities} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
import special from '../ThemeCommon/special'
	export default {
		data(){
			return {
				pagesize: 1,
				page:0,
				special: [],
				index: 0,
				goods: null
			}
		},
		filters:{
			currency
		},
		components:{
			special
		},
		methods: {
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			initList(){
				let page = this.page + "" ;
				let params = {
					type: "6",
					page: page
				}
				getThematicActivities(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.special = content.special ;
						this.goods = content.goods["1"];
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
<style scoped lang='scss'>
$primary:#c71724;
$text_color: #ffd3d8;
$bg_color: #f5f5f5 ;
	.wrap{
		width: 100%;
		.box{
			width: 1210px;
			margin: 0px auto;
		}
		.container{
			width: 1248px;
			margin: 0px auto ;
		}
		.title,.goodsList{
			margin-top: 10px;
			overflow: hidden;
		}
		.title{
			li{
				float: left;
				width: 208px;
				height: 90px;
				border-bottom: 2px solid transparent;
				color: #B7B7B7;
				dl{
					text-align: center;
				}
				dd{
					font-size: 16px;
					line-height: 40px;
				}
			}
			.active{
				color: $primary ;
				border-bottom-color: $primary; 
			}
		}
		.goodsList{
			li{
				float: left;
				width: 312px;
				padding: 10px;
				background-color: $bg_color;
				dl{
					dt{
						width: 302px;
						height: 302px;
						img{
							width: 100%;
							height: 100%;
							cursor: pointer;
						}
					}
					dd{
						padding: 0px 6px;
						.name{
							font-size: 14px;
							line-height: 20px;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
						.priceInfo{
							height: 40px;
							overflow: hidden;
							i{
								display: inline-block;
								width: 20px;
								height: 20px;
								background: url('../../../static/shopingCoinImg/coin.png') no-repeat ;
							}
							span{
								font-size: 30px;
								line-height: 40px;
								color: $primary;
							}
							em{
								font-size: 14px;
								text-decoration: line-through ;
								color: #ababab;
							}
							.el-button{
								float: right;
								font-size: 20px;
								line-height: 40px;
								padding: 0px;
							}
						}
					}
				}
			}
		}
	}
</style>