<template>
	<div class="head_box">
		<dl class="h_left">
			<dt>
				<img src="../../../static/headImg/sbPhone.png" height="14" width="14">
				<span>手机帅柏</span>
			</dt>
			<dd>
				<img src="../../../static/headImg/sbCollection.png" height="14" width="14">
				<span>收藏帅柏</span>
			</dd>
		</dl>
		<ul class="h_right">
			<li v-show='!userInfo.nickname'><a href="login.html">登录</a>|</li>
			<li v-show='!userInfo.nickname'><a href="reg.html">注册</a>|</li>
			<li v-show='userInfo.nickname'><a href="javascript:void(0)" style='color:#c71724;'>Hi,{{userInfo.nickname}}</a>|</li>
			<li><a href="myOrder.html#view10">我的订单</a>|</li>
			<li class="collection"><div class="title" @mouseenter='followBol=true' @mouseleave='followBol=false'>我的收藏<img src="../../../static/headImg/down.png" height="7" width="10"></div>|
				<div  @mouseenter='followBol=true' @mouseleave='followBol=false' class="collectionBox" v-show='followBol'>
					<div class="no_collection" v-if='userInfo.collection_count-0===0'>
				   		暂无收藏
				   	</div>
					<ul class="collectionList" v-else>
						<li v-for='(item,index) in userInfo.follow'>
							<div class="avatar">
								<img :src="item.shop_logo">
							</div>
							<div class="name" v-text='item.shop_name'>
							</div>
						</li>
					</ul>
				</div>
			   
			</li>
			<li><a href="">商家后台</a>|</li>
			<li><a href="">客户服务<img src="../../../static/headImg/down.png" height="7" width="10"></a></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				userInfo: {
					nickname: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }],
			   followBol: false
			}
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
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
	    			img{
	    				margin-left: 4px;
	    				margin-bottom: 4px;
	    			}
	    		}
	    	}
	    	.collection{
	    		.title{
	    			display: inline-block;
	    			padding-left: 10px;
	    			padding-right: 10px;
	    			color: #000;
	    		}
	    		.collectionBox{
	    			position: relative;
	    			.no_collection,.collectionList{
		    			position: absolute;
		    			top: 0px;
		    			right: 0px;
		    			width: 160px;
		    			padding: 0px 10px;
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
	    		.collectionList{
	    			border-left: 1px solid $border_color;
	    			border-right: 1px solid $border_color;
	    			border-bottom: 1px solid $border_color;
	    			li{
	    				height: 36px;
	    				cursor: pointer;
						margin: 10px 0px;
						overflow: hidden;
						border-bottom: 1px solid $border_color;
						div{
							float: left;
						}
						.avatar{
							width: 36px;
							height: 36px;
							img{
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.name{
							width: 92px;
							margin-left: 10px;
							line-height: 36px;
							font-size: 14px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: #000;
						}
	    			}
	    			li:last-child{
	    				border: none;
	    			}
	    			li:hover{
	    				background-color: $bg_color;
	    			}
	    		}
	    	}
	    }
	}
</style>