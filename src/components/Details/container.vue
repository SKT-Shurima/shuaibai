<template>
	<div class="wrap">
		<div class="container" v-if='goodsInfo'>
			<!-- 店铺小信息列表 -->
			<div class="sliderBox">
			<!-- 优惠券 -->
				<ul class="coupons">
					<li v-for='item in 3'>
						
					</li>
				</ul>
				<!-- 分类 -->
				<ul class="navList">
					<li><div class="title">查看全部分类</div></li>
					<li><div class="title">店铺热卖</div></li>
					<li><div class="title">掌柜推荐</div></li>
					<li><div class="title">护肤品 
						<img src="../../../static/detailImg/close.png" height="14" width="14">
					</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li>
					<li><div class="title">护肤品
							<img src="../../../static/detailImg/close.png" height="14" width="14">
						</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li>
					<li><div class="title">护肤品
							<img src="../../../static/detailImg/close.png" height="14" width="14">
						</div>
						<ul>
							<li v-for='item in 4'>面膜</li>
						</ul>
					</li> 
				</ul> 
				<!-- 热销排行 -->
				<div class="hotSell">
					<div class="title">
						<div class="slider"></div>
						<div class="text">热销排行</div>
						<div class='slider'></div>
					</div>
					<ul>
						<li v-for='item in 3' class="infoList">
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd>
									<div class="sellInfo">
										9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
									</div>
									<div class="priceInfo">
										<span>
											{{168.00|currency}}
										</span>
										<em>
											{{2017}}人付款
										</em>
									</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
			<!-- 内容 -->
			<div class="contentBox">
				 <dl class="infoBox">
				 	<dt>
				 		<button @click='infoTabIndex=1' :class='{"infoTabChecked":infoTabIndex===1}' >商品详情</button>
				 		<button @click='infoTabIndex=2' :class='{"infoTabChecked":infoTabIndex===2}'>评价（{{goodsInfo.goods.comment.total}}）</button>
				 	</dt>
				 	<dd>
				 		<!-- 产品参数 -->
				 		<div class="detailsCon" v-show='infoTabIndex===1'>
				 			<div class="detailTitle">
					 			产品参数
					 		</div>
					 		<ul class="productInfo">
					 			<li v-for='item in goodsInfo.goods.params'>
					 				<el-row>
					 					<el-col :span='6' v-text='item.name'></el-col>
					 					<el-col :span='18' v-text='item.value'></el-col>
					 				</el-row>
					 			</li>
					 		</ul>
				 		</div>
				 		<div class="evalCon" v-show='infoTabIndex===2'>
				 			<div class="evalRate" style="text-align: center;">
				 				好评率
				 			</div>
				 			<div style="font-size:60px;font-weight:600;color:#c71724;" class="evalRate">
				 				{{goodsInfo.goods.comment.praise_rate*100}}%
				 			</div>
				 			<div class="evalInfo">
				 				<el-row>
				 				   		<el-col :span='10'>
				 				   			商品评价（{{goodsInfo.goods.comment.goods_comment.toFixed(1)}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="goodsInfo.goods.comment.goods_comment"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 				   <el-row>
				 				   		<el-col :span='10'>
				 				   			服务评价（{{goodsInfo.goods.comment.service_comment.toFixed(1)}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="goodsInfo.goods.comment.service_comment"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 				   <el-row>
				 				   		<el-col :span='10'>
				 				   			物流评价（{{goodsInfo.goods.comment.logistics_comment.toFixed(1)}}）
				 				   		</el-col>
				 				   		<el-col :span='14'>
				 				   			<el-rate
											  v-model="goodsInfo.goods.comment.logistics_comment"
											  disabled
											  text-color="#ff9900">
											</el-rate>
				 				   		</el-col>
				 				   </el-row>
				 			</div>
				 		</div>
				 	</dd>
				 </dl>
				 <div class="detailsList" v-show='infoTabIndex===1'>
				 	<ul class="storeImg">
					 	<li>
					 		{{goodsInfo.goods.description}}
					 	</li>
					 </ul>
				 </div>
				 <!-- 评论区域 -->
				 <div class="evalList" v-show='infoTabIndex===2'>
				 	<div class="title">
				 		<button :class='{"evalTabChecked":evalTabIndex===0}' @click='getComment(0)'>全部评论</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===1}' @click='getComment(1)'>好评（{{goodsInfo.goods.comment.praise}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===2}' @click='getComment(2)'>中评（{{goodsInfo.goods.comment.common}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===3}' @click='getComment(3)'>差评（{{goodsInfo.goods.comment.bad}}）</button>
				 		<button :class='{"evalTabChecked":evalTabIndex===4}' @click='getComment(0)'>有图（{{goodsInfo.goods.comment.have_picture}}）</button>
				 	</div>
				 	<!-- 初次评论列表 -->
				 	<ul v-if='commentList' class="evalWrap">
				 		<li v-for='(item,index) in commentList.content' class="evalBox">
				 			<dl>
				 				<dt>
				 					<div class="avatar">
				 						<img :src="item.image">
				 					</div>
				 					<div v-text='item.nickName'></div>
				 				</dt>
				 				<dd>
				 					<p v-text='item.content' class="evalContent"></p>
				 					<ul class="evalImgList">
				 						<li v-for='item in images'>
				 							<img :src="item">
				 						</li>
				 					</ul>
				 					<div class="evalBigImg" v-show='item.current_img'>
				 						<img :src="item.current_img">
				 					</div>
				 					<div class="evalMsg">
				 						<div class="time">
				 							<span>
					 							{{item.date|dateStyleCh}}&nbsp;{{item.date|timeStyle}}
					 						</span>
					 						<strong>
					 							颜色分类：{{item.option_name}}
					 						</strong>
					 					</div>
					 					<div class="more">
					 						<button>有用（{{item.useful}}）</button>
					 						<button>回复（{{item.reply_count}}）</button>
					 						<button @click='getAddReply(index)'>{{replyList[index].bol?'收起':'展开'}}<img src="../../../static/detailImg/replayOpen.png" height="11" width="10" v-show='!replyList[index].bol'><img src="../../../static/detailImg/replayClose.png" v-show='replyList[index].bol'></button>
					 					</div>
				 					</div>
				 					<!-- 追加评论列表 -->
				 					<div class="addEval" v-show='replyList[index].bol'>
				 						<ul v-if='replyList[index].replyList'> 
					 						<li v-for='replyItem in replyList[index].replyList'>
					 							<p class="addContent">
					 								sajdjashdasb
					 							</p>
					 							<div class="addTime">
					 								<span>2017年12月12日 12：21</span>
					 							</div>
					 						</li>
					 					</ul>
					 					<div class="packUp">
						 					<span @click='replyList[index].bol=false'>
						 						收起<img src="../../../static/detailImg/replayClose.png" height="11" width="10" alt="">
						 					</span>
					 						
					 					</div>
				 					</div>
				 					
				 				</dd>
				 			</dl>
				 		</li>
				 	</ul>
				 </div>
				 <!-- 推荐 -->
				 <div class="recommend">
				 	<div class="title">
				 		<i class="icon"></i>
				 		<span>店内推荐</span>
				 		<strong>换一组<img src="../../../static/commonImg/newGroup.png" height="14" width="14"></strong>
				 	</div>
				 	<ul v-if='storeRecommend'>
				 		<li class="infoList" v-for='item in storeRecommend'>
				 			<dl>
								<dt>
									<img :src="item.cover">
								</dt>
								<dd>
									<div class="sellInfo">
										{{item.name}}
									</div>
									<div class="priceInfo">
										<span>
											{{item.shop_price|currency}}
										</span>
										<em>
											{{item.sale_count}}人付款
										</em>
									</div>
								</dd>
							</dl>
				 		</li>
				 	</ul>
				 </div>         
			</div>
			<!-- 猜你喜欢 -->
			 <you-love></you-love>
		</div>
	</div>
</template>
<script>
	import {currency,dateStyleCh,timeStyle} from '../../common/js/filter.js'
	import {getHighGoods,goodsDetail,getComments} from '../../common/js/api.js'
	import {MessageBox} from  'element-ui'
	import youLove from '../../components/Guess/content.vue'
	export default {
		data(){
			return {
				infoTabIndex: 1,
				evalTabIndex: 1,
				goodsInfo: null,
				storeRecommend: null,
				commentList: null,
				replyList:[]
			}
		},
		filters:{
			currency,dateStyleCh,timeStyle
		},
		components:{
			youLove
		},
		methods:{
			getRequest() {
				 var url = location.search; //获取url中"?"符后的字串
				 var theRequest = new Object();
				 if (url.indexOf("?") != -1) {
				  let  str = url.substr(1);
				  let strs = str.split("&");
				  for(var i = 0; i < strs.length; i ++) {
				   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
				  }
				 }
				 return theRequest;
			},
			// 获取评价列表
			getComment(mask){
				let _this = this ;
				_this.evalTabIndex = mask;
				let params = {
					goods_id: _this.params.goods_id,
					type: mask
				}
				getComments(params).then(res=>{
					let {errcode,message,content} = res ;
						if(errcode !== 0){
							if (errcode === 99) {
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
						          		window.location.href = 'login.html';
						          	}
							    });
		            		}else{
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
		            		}
						}else {
							this.commentList = content ;
							this.initAddReply(this.commentList.content.length);
						}
				})
			},
			// 格式化追加回复列表
			initAddReply(len){
				let _this = this ;
				_this.replyList = [];
				for (let i = 0; i < len; i++) {
					let obj = new Object();
					obj.replyList = null;
					obj.bol=false;
					_this.replyList.push(obj);
				}
			},
			// 展开对应的追加回复
			getAddReply(index){
				let _this =this ;
				_this.replyList[index].bol = !_this.replyList[index].bol ;
			},
			// 获取店铺推荐
			getRecomment(){
				let params ={
						seller_id: this.goodsInfo.goods.seller_id
					}
					getHighGoods(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode !== 0){
							if (errcode === 99) {
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
						          		window.location.href = 'login.html';
						          	}
							    });
		            		}else{
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
		            		}
						}else {
							this.storeRecommend = content ;
						}
					})
			},
			// 初始化获取商品详情
			init(){
				this.params = this.getRequest();
				let params = {
					access_token : sessionStorage.access_token,
					goods_id: this.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		window.location.href = 'login.html';
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else {
						content.goods.comment.goods_comment -= 0;
						content.goods.comment.logistics_comment -= 0;
						content.goods.comment.service_comment -= 0;
						this.goodsInfo = content ;
						this.getRecomment();
						this.getComment(0);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
	.wrap{
		width: 100%;
		margin-top: 70px;
		.container{
			width: 1250px;
			margin: 0px auto;
			overflow: hidden;
			/*商品信息*/
			.infoList{
				dl{
					dt{
						width: 210px;
						height: 210px;
						img{
							width: 100%;
							height: 100%; 
						}
					}
					dd{
						width: 100%;
						overflow: hidden;
						.sellInfo{
							line-height: 18px;
							font-weight: 600;
							margin-top: 10px;
						}
						/*价格信息*/
						.priceInfo{
							margin-top: 6px;
							span{
								font-size: 18px;
								font-weight: 600;
								color: $primary;
							}
							em{
								margin-top: 4px;
								float: right;
								color: #999;
							}
						}
					}	 
				}
			}
			/*店铺小信息*/
			.sliderBox{
				float: left; 
				width: 250px;
				.coupons{
					width: 100%;
					margin-left: 10px;
					margin-bottom: 14px;
					li{
						width: 220px;
						height: 116px;
						margin-bottom: 10px;     
						background-color: #e7354d; 
					}
			}
			.navList{
				width: 220px;
				margin-left: 10px;
				border-left: 1px solid $border_color;
				border-right: 1px solid $border_color;
				border-top: 1px solid $border_color;
				.title{
					position: relative;
					background-color: $bg_title;
					padding-left: 16px;
					line-height: 40px;
					font-weight: 600;
					font-size: 14px;
					border-bottom: 1px solid $border_color;
					img{
						position: absolute;
						top: 0px;
						bottom: 0px;
						right: 10px;
						margin: auto;

					}
				}
				ul{
					border-bottom: 1px solid $border_color;
					li{
						color: $text_color;
						line-height: 36px;
						padding-left: 10px;
						font-weight: 400;
					}
				}
			}
			/*热销*/
			.hotSell{
				.title {
					width: 192px;
					overflow: hidden;
					margin: 72px auto 12px;
					.slider,.text{
						float: left;
					}
					.slider{
						width: 46px;
						height: 1px;
						margin-top: 6px;
						background-color: $border_color;
					}
					.text{
						width: 100px;
						text-align: center;
						font-size: 16px;
						color: $text_color;
					}
				}
				ul{
					width: 240px;
					border: 1px solid $border_color;
					li{
						width: 100%;
						height: 310px;
						padding: 15px;
						border-bottom: 1px solid $border_color;
					}
					li:last-child{
						   border-bottom: none; 
					}
				}
			}
		}
	}
	/*内容区域*/
	.contentBox{
		width: 1000px;
		float: left;
		overflow: hidden;
		.infoBox{
			width: 100%;
			border: 1px solid $border_color;
			dt{
				line-height: 36px;
				border-bottom: 1px solid $border_color;
				background-color: $bg_title;
				button{
					width: 100px;
					height: 36px;
					text-align: center;
					color: $text_color;
					background-color: transparent;
					border: none;
					border: 1px solid transparent;
					outline: none;
				}
			   button:first-child{
			   		border-right: 1px solid $border_color;
			   }
				.infoTabChecked{
					color: $primary;
					background-color: #fff;
					border-right: 1px solid $border_color;
				}
			}
			dd{
				padding: 10px;
				.detailsCon{
					color: $text_color;
					.detailTitle{
						line-height: 24px;
						font-weight: 600;
						padding-left: 12px;
						margin-bottom: 10px;
					}
					ul{
						width: 672px;
						padding-left: 12px;
						overflow: hidden;
						li {
							float: left;
							line-height: 30px;
							width: 210px;
							margin-right: 10px;
							.el-row{
								margin: 0px;

							}
						}
					}
				}
				.evalCon{
					overflow: hidden;
					.evalRate{
						float: left;
						width: 90px;
						height: 100px;
						line-height: 100px;
					}
					.evalInfo{
						float: left;
						width: 240px;
						padding: 10px 0px;
						margin-left: 90px;
						.el-row{
							line-height: 28px;
						}
					}
				}
			}
		}
		.detailsList{
			.storeImg{
				margin-top: 32px;
				li{
					width: 100%;
					height: 800px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		/*评论列表*/
		.evalList{
			margin-top: 10px;
			.title{
				width: 100%;
				height: 34px;
				border-bottom: 1px solid $border_color;
				button{
					width: 100px;
					height: 32px;
					text-align: center;
					margin-top: 2px;
					border: none;
					outline: none;
					border-bottom: 2px solid transparent;
					background-color: transparent;
				}
				.evalTabChecked{
					color: $primary;
					border-bottom: 4px solid $primary;
				}
			}
			/*评论*/
			.evalWrap{
				.evalBox{
					padding: 26px 0px;
					border-bottom: 1px solid $border_color;
					dl{
						overflow: hidden;
						dt{
							float: left;
							width: 100px;
							text-align: center;
							line-height: 20px;
							.avatar{
								width: 50px;
								height: 50px;
								margin: 0px auto;
								img{
									width: 100%;
									height: 100%;
								}
							}
						}
						dd{
							float: left;
							width: 870px;
							.evalContent{
								font-size: 14px;
								line-height: 20px;
							}
							.evalImgList{
								margin: 18px 0px;
								padding-bottom: 10px;
								overflow: hidden;
								li{
									float: left;
									width: 40px;
									height: 40px;
									margin-right: 10px;
									padding: 0px;
									border: 2px solid transparent;
									img{
										width: 100%;
										height: 100%;
									}
								}
								.evalImgChecked{
									border:2 px solid $primary;
								}
							}
							.evalBigImg{
								width: 230px;
								height: 230px;
								border: 1px solid  $border_color;
								margin-bottom: 10px;
							}
							.evalMsg{
								overflow: hidden;
								color: $text_color;
								.time{
									float: left;
									strong{
										font-weight: 400;
										margin-left: 30px;
									}
								}
								.more{
									float: right;
									button{
										width: 80px;
										color: #2c82d3;
										padding: 0px;
										background-color: transparent;
										outline: none;
										border: none;
										img{
											vertical-align: -2px;
										}
									}
									button:last-child{
										color: $text_color;
									}
								}
							}
							/*追加评论*/
							.addEval{
								margin-top: 24px;
								ul{
									border-bottom: 1px dashed $border_color;
									li{
										padding: 18px 38px 10px 12px;
										border-top: 1px dashed $border_color;
										.addContent{
											font-size: 14px;
											line-height: 20px;
										}
										.sellerReply{
											color: $primary;
										}
										.addTime{
											overflow: hidden;
											span{
												float: right;
												line-height: 36px;
												color: $text_color;
											}
										}
									}
								}
								.packUp{
									text-align: center;
									margin-top: 14px;
									color: $text_color;
									span{
										cursor: pointer;
									}
									img{
										margin-left: 12px;
										vertical-align: -2px;
									}
								}
							}
						}
					}
				}
			}
		}
		.recommend{
			margin-top: 70px;
			ul{
				width: 100%;
				overflow: hidden;
				.infoList{
					width: 25%;
					float: left;
					padding: 15px;
					dt{
						width: 216px;
						height: 216px;
					}
				}
			}
		}
	}
	/*店铺推荐*/
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
		.title{
			width: 100%;
			height: 40px;
			padding: 10px;
			line-height: 20px;
			color: $text_color;
			background-color: $bg_title;
			.icon{
				display: inline-block;
				width: 8px;
				height: 20px;
				background-color: $primary;
			}
			span{
				font-size: 16px;
				font-weight: 600;
			}
			strong{
				float: right;
				font-size: 14px;
			}
		}
		.youLove{
			width: 100%;
			overflow: hidden;
		}
 }
} 
</style>