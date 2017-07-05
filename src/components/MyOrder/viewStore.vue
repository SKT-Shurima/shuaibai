<template>
	<div class="wrap">
		<ul class="viewBox" v-if='viewList'>
			<li class="viewList" v-for='(shopItem,shopIndex) in viewList'>
				<div class="storeInfo">
					<dl>
						<dt>
							<img :src="shopItem.cover">
						</dt>
						<dd class="name" v-text='shopItem.shop_name'></dd>
						<dd class="btn">
							<button @click='escView(attention_id)'>取消关注</button>
						</dd>
						<dd class="storeEval">
							<dl>
								<dt>商品</dt>
								<dd v-text='shopItem.comment.goods_comment'></dd>
							</dl>
							<dl>
								<dt>服务</dt>
								<dd v-text='shopItem.comment.service_comment'></dd>
							</dl>
							<dl>
								<dt>物流</dt>
								<dd v-text='shopItem.comment.logistics_comment'></dd>
							</dl>
						</dd>
					</dl>
				</div>
				<div class="goodsInfo">
					<nav class="title">
						<div @click='shopItem.goodsList=shopItem.week;shopItem.tabIndex=1;shopItem.scrollIndex=0;' :class='{"active":shopItem.tabIndex===1}'>本周上新（{{shopItem.week_count}}）</div>
						<div @click='shopItem.goodsList=shopItem.coupon;shopItem.tabIndex=2;shopItem.scrollIndex=0;'  :class='{"active":shopItem.tabIndex===2}'>优惠（{{shopItem.coupon_count}}）</div>
						<div  @click='shopItem.goodsList=shopItem.hot;shopItem.tabIndex=3;shopItem.scrollIndex=0;'  :class='{"active":shopItem.tabIndex===3}'>热销（{{shopItem.hot_count}}）</div>
					</nav>
					<div class="listBox">
						<div class="left_btn" @click='shopItem.scrollIndex=shopItem.scrollIndex>0?--shopItem.scrollIndex:0'>
							<i class="el-icon-arrow-left"></i>
						</div> 
						<ul>
							<li v-for="(item,index) in shopItem.goodsList" v-if='index>=shopItem.scrollIndex&&index<(shopItem.scrollIndex+5)'>
								<dl>
									<dt>
										<img :src="item.cover">
									</dt>
									<dd>
										<span>{{item.shop_price|currency}}</span>
										<em>{{item.market_price|currency}}</em>
									</dd>
								</dl>
							</li>
						</ul>
						<div class="right_btn" @click='shopItem.scrollIndex=shopItem.scrollIndex<shopItem.goodsList.length?++shopItem.scrollIndex:shopItem.goodsList.length'>
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	</div>
</template>
<script>
	import {currency} from "../../common/js/filter"
	import {errorInfo} from '../../common/js/common'
	import {attention,cancelAttentions} from '../../common/js/api'
	import pagination from '../Common/pagination'
	export default {
		data(){
			return {
			 	viewList: null,
			 	pagesize: 1 ,// 总页数
				page: "1"
			}
		},
		filters:{
			currency
		},
		components: {
			pagination
		},
		methods:{
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.initList();
			},
			escView(id){
				let params = {
					access_token: sessionStorage.access_token,
					ids: id
				};
				cancelAttentions(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.viewList = content;
					}
				})
			},
			initList(){
				let params  ={
					access_token: sessionStorage.access_token,
					page: "1"
				}
				attention(params).then(res=>{
					let {errcode,message,content,pageSize} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						for(let i =0;i<content.length;i++){
							content[i].goodsList = content[i].week ;
							content[i].scrollIndex = 0;
							content[i].tabIndex = 1;
						}
						this.viewList = content;
						this.pagesize  = pageSize ;
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
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
.wrap{
	width: 100%;
	padding-left: 15px;
	.viewBox{
		width: 100%;
		.viewList{
			width: 100%;
			height: 240px;
			margin-top: 46px;
			overflow: hidden;
			.storeInfo{
				float: left;
				width: 150px;
				text-align: center;
				dl{
					width: 100%;
					dt{
						width: 70px;
						height: 70px;
						margin: 14px auto;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.name{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.btn{
						text-align: center;
						padding: 18px 0px;
						button{
							width: 66px;
							height: 24px;
							border: 1px solid $border_color;
							border-radius: 4px;
							color: $text_color;
							background-color: transparent;
						}
					}
					.storeEval{
						overflow: hidden;
						dl{
							float: left;
							width: 50px;
							border-right: 1px solid $border_color;
							border-top: 1px solid $border_color;
							dt{
								width: 100%;
								height: 40px;
								line-height: 40px;
								margin: 0px;
								color: $text_color;
							}
							dd{
								font-size: 16px;
								font-weight: 600;
								color: $primary;
							}
						}
						dl:last-child{
							border-right: none;
						}
					}
				}
			}
			.goodsInfo{
				float: left;
				width: 842px;
				margin-left: 30px;
				text-align: center;
				border: 1px solid $border_color;
				.title{
					width: 100%;
					height: 36px;
					line-height: 36px;
					background-color: #f5f5f5;
					border-bottom: 1px solid $border_color;
					div{
						float: left;
						width: 120px;
						cursor: pointer;
					}
					.active{
						background-color: #fff;
						color:$primary;
					}
				}
				.listBox{
					position: relative;
					width: 100%;
					height: 200px;
					.left_btn,.right_btn{
						width: 24px;
						height: 60px;
						position: absolute;
						top: 0px;
						bottom: 0px;
						margin-top: auto;
						margin-bottom: auto;
						z-index: 10;
						cursor: pointer;
						color: $primary;
						i{
							font-size: 32px;
							line-height: 56px;
						}
					}
					.left_btn{
						left: -32px;
					}
					.right_btn{
						right: -28px;
					}
					ul{
						position: absolute;
						overflow: hidden;
						li{
							float: left;
							width: 169px;
							height: 198px;
							padding: 10px;
							margin-right: -1px;
							border-right: 1px solid $border_color;
							dl{
								width: 100%;
								dt{
									width: 150px;
									height: 150px;
									img{
										width: 100%;
										height: 100%;
									}
								}
								dd{
									margin-top: 6px;
									line-height: 28px;
									span{
										font-size: 16px;
										font-weight: 600;
										color: $primary;
									}
									em{
										text-decoration: line-through;
										font-size: 14px;
										color: $text_color;
									}
								}
							}
						}
						li:last-child{
							margin-right: -1px;
						}

					}
				}
			}
		}
		.viewList:first-child{
			margin-top: 20px;
		}
	}
}
</style>