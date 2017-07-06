<template>
	<div class="head_box">
		<dl class="h_left">
			<dt>
				<img src="../../../static/headImg/sbPhone.png" height="14" width="14">
				<span>手机帅柏</span>
			</dt>
			<dd @click='addToFavorite'>
				<img src="../../../static/headImg/sbCollection.png" height="14" width="14">
				<span>收藏帅柏</span>
			</dd>
		</dl>
		<ul class="h_right">
			<li v-show='!userInfo.nickname'><a href="login.html">登录</a>|</li>
			<li v-show='!userInfo.nickname'><a href="reg.html">注册</a>|</li>
			<li v-show='userInfo.nickname'><a href="javascript:void(0)" style='color:#c71724;'>Hi,{{userInfo.nickname}}</a>|</li>
			<li><a href="myOrder.html#view10">我的订单</a>|</li>
			<li class="collection">
				<div class="title" @mouseenter='followBol=true' @mouseleave='followBol=false'>我的收藏<img src="../../../static/headImg/down.png" height="7" width="10" class="downImg" style='cursor:pointer;' :class='{"transDownImg":followBol}'></div>|
				<div  @mouseenter='followBol=true' @mouseleave='followBol=false' class="collectionBox" v-show='followBol&&colList.length'>
				    <div class="collectionListBox" v-if='colList.length'>
				    	<ul class="collectionList">
							<li v-for='(item,index) in colList'>
								<dl class="goods_info">
									<dt>
										<img :src="item.cover" @click='goodDetail(item.goods_id)'>
									</dt>
									<dd>
										<div class="show_info" v-text='item.name'></div>
										<div class="sell_info">
											<span>{{item.price|currency}}</span><em @click="delColGood(item.collection_id)">取消收藏</em>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						<div class="checkCollection">
							<a href="myOrder.html#vip1">
								查看全部收藏 <img src="../../../static/commonImg/leftArrow.png" height="10" width="5" class="downImg">
							</a>
						</div>
				    </div>
					<div class="no_collection" v-else>
				   		暂无收藏
				   	</div>
				</div>
			</li>
			<li><a href="index.html">商家后台</a>|</li>
			<li class="service">
				<div class="title" @mouseenter='serviceBol=true' @mouseleave='serviceBol=false'>客户服务<img src="../../../static/headImg/down.png" height="7" width="10" class="downImg" style='cursor:pointer;' :class='{"transDownImg":serviceBol}'></div>
				<ul class="serviceList" @mouseenter='serviceBol=true' @mouseleave='serviceBol=false' v-show='serviceBol'>
					<li>售前服务</li>
					<li>售后服务</li>
					<li><a href="myOrder.html#vip6">投诉中心</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
import {MessageBox} from  'element-ui'
import {currency} from '../../common/js/filter'
import {collection,cancelCollections} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
	export default{
		data(){
			return{
				userInfo: {
					nickname: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }],
			   followBol: false,
			   serviceBol: false,
			   colList: []
			}
		},
		filters:{
			currency
		},
		methods:{
			addToFavorite() {
				if (window.external.addFavorite) {
					window.external.addFavorite(location.href, document.title);
				}else{
					MessageBox.alert("加入收藏失败，请使用Ctrl+D进行添加", '提示', {
			          	confirmButtonText: '确定'
				    });
				}
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)
			},
			// 取消收藏
			delColGood(ids){
				MessageBox.confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
			        let params = {
			        	access_token: getCookie('access_token'),
			        	ids: ids
			        }
			        cancelCollections(params).then(res=>{
			        	let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							this.initList();
						}
			        })
		        }).catch(() => {
		            return false;          
		        });

			},
			initList(){
				let params  ={
					access_token: getCookie('access_token'),
					page: ''
				}
				collection(params).then(res=>{
					let {errcode,message,content,pageSize} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.colList = content;
					}
				})
			}
		},
		created(){
			if (localStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(localStorage.userInfo);
			}
			let  access_token = getCookie('access_token');
			if (access_token) {
				this.initList();
			}
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
$bg_color: rgb(217, 193, 191);
	.head_box{
		width: 100%;
		margin:0px auto;
	    .h_left{
	    	float: left;
	    	overflow: hidden;
	    	dt,dd{
	    		float: left;
	    		overflow: hidden;
	    		cursor: pointer;
	    	}
	    	dd{
	    		margin-left: 16px;
	    	}
	    }
	    .h_right{
	    	float: right;
	    	margin: 0px;
	    	li{
	    		float: left;
	    		color: #ccc;
	    		a{
	    			color: #000;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    		}
	    	}
	    	.downImg{
    			margin-left: 4px;
				margin-bottom: 4px;
				transition: all .3s ;
    		}
    		.transDownImg{
				transform: rotateZ(180deg);
    		}
    		.collection,.service{
    			.title{
	    			display: inline-block;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    			color: #000;
	    		}
    		}
	    	.collection{
	    		.collectionBox{
	    			position: relative;
	    			.no_collection,.collectionList{
	    				overflow: hidden;
		    			width: 240px;
		    			padding: 0px 14px;
		    			background-color: #fff;
		    		}
		    		.no_collection{
		    			height: 56px;
		    			line-height: 56px;
		    			text-align: center;
		    			border-top: 1px solid $border_color;
		    			border-left: 1px solid $border_color;
		    			border-right: 1px solid $border_color;
		    		}
	    		}
	    		.collectionListBox{
	    			position: absolute;
	    			top: -1px;
	    			left: -1px;
	    			overflow-y: scroll;
	    			border: 1px solid $border_color;
	    			.checkCollection{
	    				height: 36px;
	    				line-height: 36px;
	    				overflow: hidden;
	    				background-color: #fff;
	    				a{
	    					float: right;
	    				}
	    			}
	    		}
	    		.collectionList{
	    			li{
	    				width: 100%;
	    				height: 80px;
	    				cursor: pointer;
						padding: 10px 0px;
						border-bottom: 1px solid $border_color;
						.goods_info{
							width: 100%;
							height: 80px;
							overflow: hidden;
							dt{
								float: left;
								width: 60px;
								height: 60px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							dd{
								float: left;
								width: 136px;
								height: 60px;
								margin-left: 10px;
								color: #000;
							}
						}
						.show_info{
							line-height: 18px;
							height: 36px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
						  	-webkit-line-clamp: 2;
						  	-webkit-box-orient: vertical;
						}
						.sell_info{
							overflow: hidden;
							margin-top: 6px;
							span{
								float: left;
							}
							em{
								float: right;
							}
							em:hover{
								cursor: pointer;
								color: $primary;
							}
						}
	    			}
	    		}
	    	}
	    	.service{
	    		position: relative;
	    		.serviceList{
	    			position: absolute;
	    			left: 0px;
	    			top: 30px;
	    			border: 1px solid $border_color;
	    			padding: 0px 14px;
	    			background-color: #fff;
	    			li{
	    				height: 30px;
	    				line-height: 30px;
	    				color: #000;
	    				cursor: pointer;
	    			}
	    			li:hover{
	    				color: $primary;
	    			}
	    			a{
	    				padding: 0px;
	    			}
	    		}
	    	}
	    }
	}
</style>