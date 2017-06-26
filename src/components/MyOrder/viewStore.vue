<template>
	<div class="wrap">
		<ul class="viewBox" v-if='viewList'>
			<li class="viewList" v-for='item in viewList'>
				<div class="storeInfo">
					<dl>
						<dt>
							<img :src="item.cover">
						</dt>
						<dd class="name">
						      {{item.shop_name}}
						</dd>
						<dd class="btn">
							<button @click='escView(attention_id)'>取消关注</button>
						</dd>
						<dd class="storeEval">
							<dl>
								<dt>商品</dt>
								<dd>4.5</dd>
							</dl>
							<dl>
								<dt>服务</dt>
								<dd>4.5</dd>
							</dl>
							<dl>
								<dt>物流</dt>
								<dd>4.5</dd>
							</dl>
						</dd>
					</dl>
				</div>
				<div class="goodsInfo">
					<nav class="title">
						<div>本周上新（{{item.new_count}}）</div>
						<div>优惠（20）</div>
						<div>热销（20）</div>
					</nav>
					<div class="listBox">
						<ul>
							<li v-for="item in 5">
								<dl>
									<dt>
										<img src="">
									</dt>
									<dd>
										<span>{{98.00|currency}}</span>
										<em>{{198.00|currency}}</em>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import {currency} from "../../common/js/filter"
	import {errorInfo,getCookie} from '../../common/js/common'
	import {attention,cancelAttentions} from '../../common/js/api'
	export default {
		data(){
			return {
			 	viewList: null
			}
		},
		filters:{
			currency
		},
		methods:{
			escView(id){
				let params = {
					access_token: getCookie('access_token'),
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
			}
		},
		 mounted(){
	    	this.$nextTick(()=>{
	    		let params  ={
					access_token: getCookie('access_token'),
					page: "0"
				}
				attention(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.viewList = content;
					}
				})
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
			height: 236px;
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
				width: 846px;
				margin-left: 30px;
				text-align: center;
				border: 1px solid $border_color;
				.title{
					width: 100%;
					height: 36px;
					line-height: 36px;
					background-color: #f5f5f5;
					div{
						float: left;
						width: 120px;
					}
				}
				.listBox{
					width: 100%;
					ul{
						overflow: hidden;
						li{
							float: left;
							width: 169px;
							height: 198px;
							padding: 10px;
							border-right: 1px solid $border_color;
							border-top: 1px solid $border_color;
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