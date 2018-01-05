<template>
	<div class="wrap">
		<div class="container" v-if='deliveryInfo.goodsInfo'>
			<!-- 店铺小信息列表 -->
			<div class="slider-box">
				<!-- 优惠券 -->
				<coupons :seller_id='deliveryInfo.goodsInfo.goods.seller_id'></coupons>
				<!-- 分类 -->
				<classify  :sellerCat='sellerCat' :seller-id='deliveryInfo.goodsInfo.goods.seller_id'></classify>
				<!-- 热销排行 -->
				<hot-sell :seller-id='deliveryInfo.goodsInfo.goods.seller_id'></hot-sell>
			</div>
			<!-- 内容 -->
			<div class="content-box">
				 <dl class="info-box">
				 	<dt>
				 		<button @click='infoTabIndex=1' :class='{"info-tab-checked":infoTabIndex===1}' >商品详情</button>
				 		<button @click='infoTabIndex=2' :class='{"info-tab-checked":infoTabIndex===2}'>评价（{{deliveryInfo.goodsInfo.goods.comment.total}}）</button>
				 	</dt>
				 	<dd>
				 		<!-- 产品参数 -->
				 		<div class="color-9 details-con" v-show='infoTabIndex===1'>
				 			<div class="details-title">
					 			产品参数
					 		</div>
					 		<ul class="productInfo">
					 			<li v-for='item in deliveryInfo.goodsInfo.goods.params'>
                                    <el-row>
                                        <el-col :span='6' v-text='item.name'></el-col>
                                        <el-col :span='18' v-text='item.value'></el-col>
                                    </el-row>
                                </li>
					 		</ul>
				 		</div>
				 		<div class="eval-con" v-show='infoTabIndex===2'>
				 			<div class="eval-rate" style="text-align: center;">
				 				好评率
				 			</div>
				 			<div style="font-size:60px;font-weight:600;color:#c71724;" class="eval-rate">
				 				{{deliveryInfo.goodsInfo.goods.comment.praise_rate*100}}%
				 			</div>
				 			<div class="eval-info">
		 						<el-row>
			 				   		<el-col :span='10'>
			 				   			商品评价（{{(comment.goods_comment-0).toFixed(1)}}）
			 				   		</el-col>
			 				   		<el-col :span='14'>
			 				   			<el-rate
										  v-model="comment.goods_comment"
										  disabled
										  text-color="#ff9900">
										</el-rate>
			 				   		</el-col>
			 				   </el-row>
			 				   <el-row>
			 				   		<el-col :span='10'>
			 				   			服务评价（{{(comment.service_comment-0).toFixed(1)}}）
			 				   		</el-col>
			 				   		<el-col :span='14'>
			 				   			<el-rate
										  v-model="comment.service_comment"
										  disabled
										  text-color="#ff9900">
										</el-rate>
			 				   		</el-col>
			 				   </el-row>
			 				   <el-row>
			 				   		<el-col :span='10'>
			 				   			物流评价（{{(comment.logistics_comment-0).toFixed(1)}}）
			 				   		</el-col>
			 				   		<el-col :span='14'>
			 				   			<el-rate
										  v-model="comment.logistics_comment"
										  disabled
										  text-color="#ff9900">
										</el-rate>
			 				   		</el-col>
			 				   </el-row>
				 			</div>
				 		</div>
				 	</dd>
				 </dl>
				 <div v-show='infoTabIndex===1'>
				 	<div class="store-img" v-html='deliveryInfo.goodsInfo.goods.description'>
					 </div>
				 </div>
				 <!-- 评论区域 -->
				 <div class="eval-list" v-show='infoTabIndex===2'>
				 	<div class="title">
				 		<button :class='{"eval-tab-checked":evalTabIndex===0}' @click='getComment(0)'>全部评论</button>
				 		<button :class='{"eval-tab-checked":evalTabIndex===1}' @click='getComment(1)'>好评（{{deliveryInfo.goodsInfo.goods.comment.praise}}）</button>
				 		<button :class='{"eval-tab-checked":evalTabIndex===2}' @click='getComment(2)'>中评（{{deliveryInfo.goodsInfo.goods.comment.common}}）</button>
				 		<button :class='{"eval-tab-checked":evalTabIndex===3}' @click='getComment(3)'>差评（{{deliveryInfo.goodsInfo.goods.comment.bad}}）</button>
				 		<button :class='{"eval-tab-checked":evalTabIndex===4}' @click='getComment(4)'>有图（{{deliveryInfo.goodsInfo.goods.comment.have_picture}}）</button>
				 	</div>
				 	<!-- 初次评论列表 -->
				 	<ul v-if='commentList'>
				 		<li v-for='(item,index) in commentList.content' class="eval-box">
				 			<dl>
				 				<dt>
				 					<div class="avatar">
				 						<img :src="item.image">
				 					</div>
				 					<div v-text='item.nickname' class="name"></div>
				 				</dt>
				 				<dd>
				 					<p v-text='item.content' class="eval-container"></p>
				 					<ul class="eval-img-list">
				 						<li v-for='(imgItem,imgIndex) in item.images' @click='item.current_img=imgItem;item.currentIndex=imgIndex;' :class='{"eval-img-checked":item.currentIndex===imgIndex}'>
				 							<img :src="imgItem">
				 						</li>
				 					</ul>
				 					<div class="eval-big-img" v-show='item.current_img'>
				 						<img :src="item.current_img">
				 					</div>
				 					<div class="eval-msg">
				 						<div class="time">
				 							<span>
					 							{{item.date|dateStyleCh}}&nbsp;{{item.date|timeStyle}}
					 						</span>
					 						<strong>
					 							规格：{{item.option_name}}
					 						</strong>
					 					</div>
					 					<!-- 已经登录显示状态 -->
					 					<div class="more" v-if='hasLogin'>
					 						<button :class="item.is_useful==='0'?'is-userful':'canscel-userful'" @click='isUseful(item.id)'>{{item.is_useful==='0'?'有用':'取消有用'}}（{{item.useful}}）</button>
					 						<button @click='replyInfo.replyId=item.id;replyInfo.replyBol=true;replyInfo.replyIndex=index;'>回复（{{item.reply_count}}）</button>
					 						<button @click='getAddReply(item.id,index)'>{{replyList[index].bol?'收起':'展开'}}<img src="../../../static/detailImg/replayOpen.png" height="11" width="10" v-show='!replyList[index].bol'><img src="../../../static/detailImg/replayClose.png" v-show='replyList[index].bol'></button>
					 					</div>
					 					<!-- 没有登录显示状态 -->
					 					<div class="more" v-else>
					 						<button>有用（{{item.useful}}）</button>
					 						<button>回复（{{item.reply_count}}）</button>
					 						<button @click='getAddReply(item.id,index)'>{{replyList[index].bol?'收起':'展开'}}<img src="../../../static/detailImg/replayOpen.png" height="11" width="10" v-show='!replyList[index].bol'><img src="../../../static/detailImg/replayClose.png" v-show='replyList[index].bol'></button>
					 					</div>
					 					<!-- 回复组件 -->
					 					<reply :reply-info='replyInfo' @reply-success='refresh'></reply>
				 					</div>
				 					<!-- 追加评论列表 -->
				 					<div class="add-eval" v-show='replyList[index].bol'>
				 						<ul v-if='replyList[index].replyList'>
				 							<li v-if='replyList[index].replyList.seller_reply.reply_content'>
				 								<p class="add-con seller-reply">【店家回复】{{replyList[index].replyList.seller_reply.reply_content}}</p>
				 								<div class="add-time">
				 									{{(replyList[index].replyList.seller_reply.date_content-0)*1000|dateStyleCh}}&nbsp;{{(replyList[index].replyList.seller_reply.date_content-0)|timeStyle}}
				 								</div>
				 							</li> 
					 						<li v-for='replyItem in replyList[index].replyList.reply'>
					 							<p class="add-con">
					 								<span>{{replyItem.nickname}}：</span>{{replyItem.content}}
					 							</p>
					 							<div class="add-time">
					 								<span>{{(replyItem.reply_date-0)|dateStyleCh}}&nbsp;{{(replyItem.reply_date-0)|timeStyle}}</span>
					 							</div>
					 						</li>
					 					</ul>
					 					<div class="pack-up">
						 					<span @click='replyList[index].bol=false'>
						 						收起<img src="../../../static/detailImg/replayClose.png" height="11" width="10" alt="">
						 					</span>
					 						
					 					</div>
				 					</div>
				 					
				 				</dd>
				 			</dl>
				 		</li>
				 	</ul>
				 	<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
				 </div>
				<recommend :seller_id='deliveryInfo.goodsInfo.goods.seller_id'></recommend>    
			</div>
		</div>
		<!-- 猜你喜欢 -->
		 <you-love></you-love>
	</div>
</template>
<script>
	import {dateStyleCh,timeStyle} from '../../common/js/filter'
	import {getRecommend,getComments,replyContent,usefulComment,getSellerInfo} from '../../common/js/api'
	import {errorInfo,getCookie,getRequest} from '../../common/js/common'
	import {MessageBox} from  'element-ui'
	import youLove from '../../components/Guess/content'
	import coupons from './coupons.vue'
	import hotSell from '../StoreCommon/hotSell'
	import classify from '../StoreCommon/classify'
	import reply from './reply'
	import recommend from './recommend'
	import pagination from '../../components/Common/pagination'
	export default {
		data(){
			return {
				sellerCat: [], // 店铺分类
				infoTabIndex: 1,  // 切换商品详情和评价 初始加载商品详情
				evalTabIndex: null, // 评论分类标识
				storeRecommend: null, // 店铺推荐
				comment: {
					goods_comment: "",
					logistics_comment: "",
					service_comment: ""
				},
				seller_id: '',
				commentList: null, // 评价列表
				replyList:[], // 获取回复列表
				params: "",
				hasLogin: getCookie('access_token'), // 判断是否登录
				replyInfo: {
					replyId: '',
					replyIndex: 0,
					replyBol: false
				},
				pagesize: 1, // 总页数 
			}
		},
		props:{
			deliveryInfo: {
				type: Object,
				require: true
			}
		},
		filters:{
			dateStyleCh,timeStyle
		},
		components:{
			youLove,hotSell,coupons,classify,reply,recommend,pagination
		},
		watch: {
			deliveryInfo: {
				handler(newVal,oldVal){
					if (newVal.goodsInfo) {
						this.getComment(0,1);
						let id = newVal.goodsInfo.goods.seller_id ;
						if (id) {
							this.getCat(id);
							this.seller_id  = id;
						}
						this.comment.goods_comment = newVal.goodsInfo.goods.comment.goods_comment - 0; 
						this.comment.logistics_comment = newVal.goodsInfo.goods.comment.logistics_comment - 0; 
						this.comment.service_comment = newVal.goodsInfo.goods.comment.service_comment - 0;
						let description = newVal.goodsInfo.goods.description ;
						description = this.escape2Html(description) ;
						this.deliveryInfo.goodsInfo.goods.description  = description ;
					}
				},
				deep: true
			}
		},
		methods:{
			// 转义
			escape2Html(a) {
			 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			 return a.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},
			// 获取店铺分类
			getCat(id){
				let params = {
					seller_id: id,
					page: "1"
				}
				getSellerInfo(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						let arr = content.seller_cat ;
						for(let i = 0 ;i<arr.length;i++){
							arr[i].bol = false ;
						}
						this.sellerCat = arr ;
					}
				})
			},
			// 获取评价列表
			getComment(mask,page){
				let access_token = getCookie('access_token') ;
				let params = {
					access_token: access_token?access_token:"",
					goods_id: this.deliveryInfo.params.goods_id,
					type: mask,
					page: page
				}
				getComments(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						let  commentArr = content.content ;
						for(let i = 0 ;i < commentArr.length ; i++){
							commentArr[i].currentIndex =  "" ;
						}
						content.content  = commentArr ;
						this.commentList = content ;
						this.pagesize = content.pagesize;
						if (this.evalTabIndex!==mask) {
							this.initAddReply(this.commentList.content.length);
						}
						this.evalTabIndex = mask;
					}
				})
			},
			// 格式化追加回复列表
			initAddReply(len){
				this.replyList = [];
				for (let i = 0; i < len; i++) {
					let obj = new Object();
					obj.replyList = null;
					obj.bol=false;
					this.replyList.push(obj);
				}
			},
			// 展开对应的追加回复
			getAddReply(id,index,bol){
				if (!bol) {
					this.replyList[index].bol = !this.replyList[index].bol ;
				}
				let params = {
					id: id
				}
				replyContent(params).then(res=>{
					let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							this.replyList[index].replyList = content ;
						}
				})

			},
			// 有用
			isUseful(id){
				let params = {
					access_token: getCookie('access_token'),
					id: id
				}
				usefulComment(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.getComment(this.evalTabIndex,1);
					}
				})
			},
			// 回复成功之后重新刷新回复列表
			refresh(mask){
				this.getAddReply(this.replyInfo.replyId,this.replyInfo.replyIndex,mask);
				this.getComment(this.evalTabIndex,1);
			},
			// 改变页数
			changePage(page){
				this.getComment(this.evalTabIndex,page);
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getComment(0,1);
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1250px;
		margin: 0px auto;
		margin-top: 70px;
	}
	.container{
		width: 100%;
		overflow: hidden;
		/*店铺小信息*/
		.slider-box{
			float: left; 
			width: 250px;
		}
	}
	/*内容区域*/
	.content-box{
		width: 1000px;
		float: left;
		overflow: hidden;
	}
	.info-box{
		width: 100%;
		border: 1px solid #ccc;
		dt{
			line-height: 36px;
			border-bottom: 1px solid #ccc;
			background-color: #f5f5f5;
			button{
				width: 100px;
				height: 36px;
				text-align: center;
				color: #999;
				background-color: transparent;
				border: none;
				border: 1px solid transparent;
				outline: none;
			}
		   button:first-child{
		   		border-right: 1px solid #ccc;
		   }
		}
		.info-tab-checked{
			color: #c71724;
			background-color: #fff;
			border-right: 1px solid #ccc;
		}
		dd{
			padding: 10px;
		}
		.details-con{
			ul{
				width: 672px;
				padding-left: 12px;
				overflow: hidden;
			}
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
		.details-title{
			line-height: 24px;
			font-weight: 600;
			padding-left: 12px;
			margin-bottom: 10px;
		}
		.eval-con{
			overflow: hidden;
		}
		.eval-rate{
			float: left;
			width: 90px;
			height: 100px;
			line-height: 100px;
		}
		.eval-info{
			float: left;
			width: 240px;
			padding: 10px 0px;
			margin-left: 90px;
			.el-row{
				line-height: 28px;
			}
		}
	}
	.store-img{
		margin-top: 32px;
		text-align: center;
	}
	/*评论列表*/
	.eval-list{
		margin-top: 10px;
		.title{
			width: 100%;
			height: 34px;
			border-bottom: 1px solid #ccc;
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
		}
		.eval-tab-checked{
			color: #c71724;
			border-bottom: 4px solid #c71724;
		}
	}
	/*评论*/
	.eval-box{
		padding: 26px 0px;
		border-bottom: 1px solid #ccc;
		dl{
			overflow: hidden;
		}
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
					border-radius: 50%
				}
			}
			.name{
				margin-top: 4px;
			}
		}
		dd{
			float: left;
			width: 870px;
		}
	}
	.eval-container{
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 18px;
	}
	.eval-img-list{
		margin-bottom: 18px;
		padding-bottom: 10px;
		overflow: hidden;
		li{
			float: left;
			width: 40px;
			height: 40px;
			margin-right: 10px;
			padding: 0px;
			cursor: pointer;
			border: 2px solid transparent;
		}
		img{
			width: 100%;
			height: 100%;
		}
		.eval-img-checked{
			border: 2px solid #c71724;
		}
	}
	.eval-big-img{
		width: 230px;
		height: 230px;
		border: 1px solid  #ccc;
		margin-bottom: 10px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.eval-msg{
		overflow: hidden;
		color: #999;
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
				color: #2c82d3;
				padding: 2px 6px;
				background-color: transparent;
				outline: none;
				border: none;
				img{
					vertical-align: -2px;
				}
			}
			button:last-child{
				color: #999;
			}
		}
		.is-userful{
			color: #c71724;
			border: 1px solid #c71724;
			border-radius: 4px;
		}
		.canscel-userful{
			color: #999;
			border: 1px solid #999;
			border-radius: 4px;
		}
	}
	/*追加评论*/
	.add-eval{
		margin-top: 24px;
		ul{
			border-bottom: 1px dashed #ccc;
		}
		li{
			padding: 18px 38px 10px 12px;
			border-top: 1px dashed #ccc;
		}
		.add-con{
			font-size: 14px;
			line-height: 20px;
			span{
				color: #0176ac;
			}
		}
		.seller-reply{
			color: #c71724;
		}
		.add-time{
			overflow: hidden;
			span{
				float: right;
				line-height: 36px;
				color: #999;
			}
		}
	}
	.pack-up{
		text-align: center;
		margin-top: 14px;
		color: #999;
		span{
			cursor: pointer;
		}
		img{
			margin-left: 12px;
			vertical-align: -2px;
		}
	}
	.el-dialog .el-dialog--small{
		width: 360px;
	}
</style>