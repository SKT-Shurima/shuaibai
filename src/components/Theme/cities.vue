<template>
	<div class="wrap">
		<div class="special" :style="{backgroundImage: `url(${special[0].image})`}"  v-if='special' @click='specialLink'></div>
		<div class="box">
			<div class="container">
				<ul class="top-seller">
					<li v-for='(item,index) in topSeller' :class='{"no-margin":index===4}'>
						<dl>
							<dt>
								<img :src="item.shop_logo" @click='storeDetail(item.seller_id)'>
							</dt>
							<dd>
								<div>{{item.province}}-{{item.city}}</div>
								<div style='font-size:14px;line-height:20px;font-weight:600;' v-text='item.shop_name'></div>
								<div>店铺活动</div>
							</dd>
						</dl>
					</li>
				</ul>
				<div class="area">
					<h1>区域地区馆</h1>
					<ul class="area-list">
						<li v-for='item in area'>
							<img :src="item.image">
						</li>
					</ul>
				</div>
			</div>
			<div class="theme-box">
				<div class="theme-list">
					<div class="theme-title">
						<div>优秀店铺/Excellent shop</div>
					</div>
					<ul class="excellent-shop">
						<li class='border-f0' v-for='(item,index) in excellent_shop'>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)'>
								</dt>
								<dd>
									<div v-text='item.shop_title'></div>
									<div class="ellipsis-1 shop-name" v-text='item.shop_name'></div>
									<div class="shop-area">{{item.province}}-{{item.city}}</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="theme-slider">
					<dl class="border-f0 slider-title">
						<dt @click='topIndex=0;topList=new_seller;' class='f5-bg border-f0' :class='{"active":topIndex===0}'>新店TOP10</dt>
						<dd @click='topIndex=1;topList=excellent_shop' class='f5-bg border-f0' :class='{"active":topIndex===1}'>优秀店铺TOP10</dd>
					</dl>
					<ul class="border-f0 top-list">
						<li v-for='(item,index) in topList'>
							<div class="num" v-show='index<9'>{{"0"+(index+1)}}</div>
							<div class="num" v-show='index===9'>{{index+1}}</div>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)'>
								</dt>
								<dd>
									<div class="ellipsis-1 shop-name" v-text='item.shop_name'></div>
									<div class="shop-area" >{{item.province}}-{{item.city}}</div>
									<div class="ellipsis-1 shop-title" v-text='item.shop_title'></div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="store">
					<div class="theme-title">
						<div>店铺列表/Store List</div>
					</div>
					<ul class="store-list">
						<li v-for='(item,index) in seller' class='border-f0' :class='{"no-margin":(index+1)%4===0}'>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)' >
								</dt>
								<dd>
									<div class="ellipsis-1 shop-name" v-text='item.shop_name'></div>
									<div class="shop-area">{{item.province}}-{{item.city}}</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {getThematicActivities} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
	export default {
		data(){
			return {
				special: null,
				topSeller: null,
				area: null,
				excellent_shop: null,
				seller:null,
				new_seller: null,
				topList: null,
				topIndex: 0
			}
		},
		methods: {
			specialLink(){

			},
			storeDetail(id){
				window.open(`storeDetail.html?seller_id=${id}`) ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				this.page = page ;
				this.initList();
			},
			initList(){
				let page = this.page + "" ;
				let params = {
					type: "7"
				}
				getThematicActivities(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.special = content.special ;
						this.topSeller = content.top_seller.seller ;
						this.area = content.area ;
						this.excellent_shop = content.excellent_shop ;
						this.new_seller = content.new_seller ;
						this.topList = this.new_seller ;
						this.seller = content.seller_list.seller ;
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
	.wrap{
		width: 100%;
	}
	.special{
		width: 100%;
		height: 460px;
		background:{
			repeat: no-repeat;
			size: 100% 100%;
		}
	}
	.box{
		width: 1210px;
		margin: 20px auto;
	}
	.container{
		.top-seller{
			padding: 10px;
			overflow: hidden;
			li{
				float: left;
				width: 218px;
				margin-right: 20px;
			}
			.no-margin{
				margin-right: 0px;
			}
			dl{
				width: 100%;
				height: 300px;
			}
			dt{
				width: 100%;
				height: 218px;
				img{
					width: 100% ;
					height: 100%;
					cursor: pointer;
				}
			}
			dd{
				height: 60px;
				text-align: center;
			}
		}
		.area{
			h1{
				margin-bottom: 10px;
				font-weight: 400;
			}
		}
		.area-list{
			overflow: hidden;
			li{
				float: left;
				width: 302px;
				height: 150px;
			}
			img{
				width: 100%;
				height: 100%;   
			}
		}
	}
	.theme-box{
		width: 100%;
		overflow: hidden;
	}
	.theme-title{
		width: 100%;
		border-bottom: 1px solid #f0f0f0;
		overflow: hidden;
		div{
			float: left;
			width: 400px;
			height: 54px;
			line-height: 50px;
			color: #fff;
			font-size: 28px;
			text-indent: 16px;
			border-top-right-radius: 54px;
			margin-bottom: -1px;
			background-color: #bf2032;
		}
	}
	.theme-list{
		float: left;
		width: 910px;
		margin-top: 18px;
	}
	.excellent-shop{
		width: 100%;
		li{
			width: 886px;
			height: 260px;
			margin-top: 12px;
		}
		dl{
			overflow: hidden;
		}
		dt,dd{
			float: left;
		}
		dt{
			width: 580px;
			height: 260px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			width: 304px;
			height: 260px;
			text-align: center;
			padding-top: 72px;
		}
		.shop-title{
			font-size: 20px;
		}
		.shop-name{
			font-size: 30px;
			line-height: 54px;
		}
		.shop-area{
			width: 180px;
			font-size: 16px;
			margin: 0px auto;
			border-top: 1px solid #f0f0f0;
		}
	}
	.theme-slider{
		float: left;
		width: 300px;
	}
	.slider-title{
		overflow: hidden;
		margin-top: 18px; 
		margin-bottom: 11px;
		dt,dd{
			float: left;
			width: 149px;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			text-align: center;
			cursor: pointer;
		}
		dt{
			border-right: none;
		}
		dd{
			border-left: none;
		}
		.active{
			background-color: #bf2032;
			border-color: #bf2032;
			color: #fff;
		}
	}
	.top-list{
		li{
			overflow: hidden;
			margin: 0px 10px;
			padding: 10px 0px;
			border-bottom: 1px solid #f0f0f0;
		}
		.num{
			float: left;
			font-size: 28px;
			line-height: 80px;
			padding: 0px 4px;
		}
		dl{
			width: 234px;
			float: left;
			overflow: hidden;
		}
		dt,dd{
			float: left;
			cursor: pointer;
		}
		dt{
			width: 80px;
			height: 80px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			width: 134px;
			margin-left: 10px;
			padding-top: 8px;
		}
		.shop-name{
			font-size: 16px;
		}
		.shop-area{
			font-size: 14px;
		}
		.shop-title{
			margin-top: 10px;
			font-size: 14px;
			color: #c71724;
		}
	}
	.store-list{
		overflow: hidden;
		margin-top: 12px;
		li{
			float: left;
			width: 292px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
		dt{
			width: 292px;
			height: 292px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			text-align: center;
		}
		.shop-name{
			font-size: 16px;
			line-height: 24px;
		}
		.shop-area{
			font-size: 14px;
			line-height: 20px;
		}
		.no-margin{
			margin-right: 0px;
		}
	}
</style>