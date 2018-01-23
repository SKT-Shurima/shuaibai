<template>
	<div class="head-box">
		<dl class="head-l">
			<dt>
				<img src="../../../static/headImg/sbPhone.png" height="14" width="14">
				<span>手机帅柏</span>
			</dt>
			<dd @click='addToFavorite'>
				<img src="../../../static/headImg/sbCollection.png" height="14" width="14">
				<span>收藏帅柏</span>
			</dd>
		</dl>
		<ul class="head-r">
			<li v-show='!userInfo.nickname'><a href="login.html">登录</a>|</li>
			<li v-show='!userInfo.nickname'><a href="reg.html">注册</a>|</li>
			<li v-show='userInfo.nickname' class="login-info">
				<div class="title" @mouseenter='userBol=true' @mouseleave='userBol=false' @click='personCenter'>Hi!{{userInfo.nickname}}<img src="../../../static/headImg/down.png" height="7" width="10" class="down-img" style='cursor:pointer;' :class='{"transdown-img":userBol}'></div>|
				<dl  @mouseenter='userBol=true' @mouseleave='userBol=false' class="login-info-box" v-show='userBol'>
				    <dt>
				    	<img :src="userInfo.avater" v-if='userInfo.avater' @click='personCenter'>
				    	<img src="../../../static/centerImg/avaterDefault.jpg" v-else>
				    </dt>
				    <dd>
				    	<span v-text='userInfo.nickname'></span>
				    	<em>|</em>
				    	<button @click='quit'>退出登录</button>
				    </dd>
				</dl>
			</li>
			<li><a href="javascript:window.open('myOrder.html#view10')">我的订单</a>|</li>
			<li>
				<div class="title" @mouseenter='followBol=true' @mouseleave='followBol=false'>我的收藏<img src="../../../static/headImg/down.png" height="7" width="10" class="down-img" style='cursor:pointer;' :class='{"transdown-img":followBol}'></div>|
				<div  @mouseenter='followBol=true' @mouseleave='followBol=false' class="collection-box" v-show='followBol'>
				    <div class="collection-list-box" v-if='colList.length'>
				    	<ul class="collection-list">
							<li v-for='(item,index) in colList'>
								<dl class="goods-info">
									<dt>
										<img :src="item.cover" @click='goodDetail(item.goods_id)'>
									</dt>
									<dd>
										<div class="show-info" v-text='item.name'></div>
										<div class="sell-info">
											<span>{{item.price|currency}}</span><em @click="delColGood(item.collection_id)">取消收藏</em>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						<div class="check-collection">
							<a href="myOrder.html#vip1">
								查看全部收藏 <img src="../../../static/commonImg/leftArrow.png" height="10" width="5" class="down-img">
							</a>
						</div>
				    </div>
					<div class="no-collection" v-else>
				   		暂无收藏
				   	</div>
				</div>
			</li>
			<li><a href="javascript:window.open('http://app.shuaibomall.net/shopadmin/login/index')">商家后台</a>|</li>
			<li><a href="javascript:window.open('myOrder.html#vip6')">投诉中心</a></li>
		</ul>
	</div>
</template>
<script>
import {MessageBox} from  'element-ui'
import {currency} from '../../common/js/filter'
import {collection,cancelCollections,getUserInfo} from '../../common/js/api'
import {errorInfo,getCookie,delCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
	export default{
		data(){
			return{
				userInfo: {
					nickname: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }],
			   userBol: false,
			   followBol: false,
			   serviceBol: false,
			   colList: []
			}
		},
		filters:{
			currency
		},
		computed:{
			colState(){
				let bol = this.$store?this.$store.state.colBol :"";
				return bol ;
			}
		},
		watch:{
			colState(){
				this.initList(); 
			}
		},
		mixins: [userInfo],
		methods:{
			personCenter(){
				window.open(`myOrder.html#view10`) ;
			},
			quit(){
				delCookie('access_token');
				location.href = 'login.html';
			},
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
				window.open(`goodDetail.html?goods_id=${id}`) ;
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
							this.$store.commit('switchCol');
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
		mounted(){
			this.$nextTick(()=>{
				let  access_token = getCookie('access_token');
				if (access_token) {
					this.initList();
				}
			})
			
		}
	}
</script>
<style lang='scss' scoped>
	.head-box{
		width: 100%;
		margin:0px auto;
	}
	.head-l{
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
    .head-r{
    	float: right;
    	margin: 0px;
    	li{
    		float: left;
    		color: #ccc;
    	}
		a{
			color: #000;
			padding-left: 10px;
			padding-right: 10px;
		}
		.title{
			display: inline-block;
			padding-left: 10px;
			padding-right: 10px;
			color: #000;
		}
    }
	.login-info{
		position: relative;
		.title{
			cursor: pointer;
			color: #c71724;
		}
	}
	.login-info-box{
		position: absolute;
		padding: 10px;
		right: 0px;
		width: 254px;
		border: 1px solid #ccc;
		background-color: #f7f7f7;
		dt,dd{
			float: left;
		}
		dt{
			width: 60px;
			height: 60px;
			img{
				width: 100%;
				height: 100%;
				border-radius:  50%;
				vertical-align: middle;
				cursor: pointer;
			}
		}
		dd{
			width: 160px;
			margin-left: 10px;
			padding-top: 10px;
			span{
				display: inline-block;
			    width: 72px;
			    overflow: hidden;
			    white-space:nowrap;
			    text-overflow:ellipsis;
			    vertical-align: middle;
			    color: #c71724;
			}
			em{
				vertical-align: baseline;
				padding-left: 6px;
			}
			button{
				display: inline-block;
				width: 64px;
				border: none;
				background-color: transparent;
				outline: none;
				vertical-align: middle;
			}
			button:hover{
				color: #c71724;
			}
		}
	}
	.down-img{
		margin-left: 4px;
		margin-bottom: 4px;
		transition: all .3s ;
	}
	.transdown-img{
		transform: rotateZ(180deg);
	}
	.collection-box{
		position: relative;
		.no-collection,.collection-list{
			overflow: hidden;
			width: 240px;
			padding: 0px 14px;
			background-color: #fff;
		}
		.no-collection{
			position: absolute;
			height: 56px;
			line-height: 56px;
			text-align: center;
			border-bottom: 1px solid #ccc;
			border-left: 1px solid #ccc;
			border-right: 1px solid #ccc;
			color: #c71724;
		}
	}
	.collection-list-box{
		position: absolute;
		top: -1px;
		left: -1px;
		overflow-y: scroll;
		border: 1px solid #ccc;
		.check-collection{
			height: 36px;
			line-height: 36px;
			overflow: hidden;
			background-color: #fff;
			a{
				float: right;
			}
		}
	}
	.collection-list{
		li{
			width: 100%;
			height: 86px;
			padding: 10px 0px;
			border-bottom: 1px solid #ccc;
		}
		.goods-info{
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
					cursor: pointer;
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
		.show-info{
			line-height: 18px;
			height: 36px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
		  	-webkit-line-clamp: 2;
		  	-webkit-box-orient: vertical;
		}
		.sell-info{
			overflow: hidden;
			margin-top: 6px;
			line-height: 16px;
			span{
				float: left;
			}
			em{
				float: right;
			}
			em:hover{
				cursor: pointer;
				color: #c71724;
			}
		}
	}
</style>