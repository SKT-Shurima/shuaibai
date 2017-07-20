<template>
	<div class="wrap">
		<div class="box">
			<div class="container">
				<ul class="topSeller">
					<li v-for='(item,index) in topSeller' :class='{"noMargin":index===4}'>
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
					<ul class="areaList">
						<li v-for='item in area'>
							<img :src="item.image">
						</li>
					</ul>
				</div>
			</div>
			<div class="theme_box">
				<div class="themeList">
					<div class="theme_title">
						<div>优秀店铺/Excellent shop</div>
					</div>
					<ul class="excellentShop">
						<li v-for='(item,index) in excellent_shop'>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)'>
								</dt>
								<dd>
									<div v-text='item.shop_title'></div>
									<div class="shopName" v-text='item.shop_name'></div>
									<div class="shopArea">{{item.province}}-{{item.city}}</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="themeSlider">
					<dl class="sliderTitle">
						<dt @click='topIndex=0;topList=new_seller;' :class='{"active":topIndex===0}'>新店TOP10</dt>
						<dd @click='topIndex=1;topList=excellent_shop' :class='{"active":topIndex===1}'>优秀店铺TOP10</dd>
					</dl>
					<ul class="topList">
						<li v-for='(item,index) in topList'>
							<div class="num" v-show='index<9'>{{"0"+(index+1)}}</div>
							<div class="num" v-show='index===9'>{{index+1}}</div>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)'>
								</dt>
								<dd>
									<div class="shopName" v-text='item.shop_name'></div>
									<div class="shopArea" >{{item.province}}-{{item.city}}</div>
									<div class="shopTitle" v-text='item.shop_title'></div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="store">
					<div class="theme_title">
						<div>店铺列表/Store List</div>
					</div>
					<ul class="storeList">
						<li v-for='(item,index) in seller' :class='{"noMargin":(index+1)%4===0}'>
							<dl>
								<dt>
									<img :src="item.shop_logo" @click='storeDetail(item.seller_id)' >
								</dt>
								<dd>
									<div class="shopName" v-text='item.shop_name'></div>
									<div class="shopArea">{{item.province}}-{{item.city}}</div>
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
			storeDetail(id){
				window.open(`storeDetail.html?seller_id=${id}`) ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.initList();
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
$title_bg: #f5f5f5;
$page_border: #ddd;
$primary:#c71724;
$red_color: #bf2032;
$border_color: #f0f0f0;
$pink_color: #f61d4a;
$text_color: #ffd3d8;
	.wrap{
		width: 100%;
		.box{
			width: 1210px;
			margin: 0px auto;
			.container{
				.topSeller{
					padding: 10px;
					overflow: hidden;
					li{
						float: left;
						width: 218px;
						margin-right: 20px;
					}
					.noMargin{
						margin-right: 0px;
					}
					dl{
						width: 100%;
						height: 300px;
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
				}
				.area{
					h1{
						margin-bottom: 10px;
						font-weight: 400;
					}
					.areaList{
						overflow: hidden;
						li{
							float: left;
							width: 302px;
							height: 150px;
							img{
								width: 100%;
								height: 100%;   
							}
						}
					}
				}
			}
			.theme_box{
				width: 100%;
				overflow: hidden;
				.theme_title{
					width: 100%;
					border-bottom: 1px solid $border_color;
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
						background-color: $red_color;
					}
				}
				.themeList{
					float: left;
					width: 910px;
					margin-top: 18px;
					.excellentShop{
						width: 100%;
						li{
							width: 886px;
							height: 260px;
							margin-top: 12px;
							border: 1px solid $border_color;
							dl{
								overflow: hidden;
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
									.shopTitle{
										font-size: 20px;
									}
									.shopName{
										font-size: 30px;
										line-height: 54px;
									}
									.shopArea{
										width: 180px;
										font-size: 16px;
										margin: 0px auto;
										border-top: 1px solid $border_color;
									}
								}
							}
						}
					}
				}
				.themeSlider{
					float: left;
					width: 300px;
					.sliderTitle{
						overflow: hidden;
						border: 1px solid $border_color;
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
							background-color: $title_bg ;
							border:1px solid $border_color;
						}
						dt{
							border-right: none;
						}
						dd{
							border-left: none;
						}
						.active{
							background-color: $red_color;
							border-color: $red_color;
							color: #fff;
						}
					}
					.topList{
						border: 1px solid $border_color;
						li{
							overflow: hidden;
							margin: 0px 10px;
							padding: 10px 0px;
							border-bottom: 1px solid $border_color;
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
									.shopName,.shopTitle{
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.shopName{
										font-size: 16px;
									}
									.shopArea{
										font-size: 14px;
									}
									.shopTitle{
										margin-top: 10px;
										font-size: 14px;
										color: $primary;
									}
								}
							}
						}
					}
				}
				.storeList{
					overflow: hidden;
					margin-top: 12px;
					li{
						float: left;
						width: 292px;
						margin-right: 10px;
						margin-bottom: 10px;
						border: 1px solid $border_color;
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
							.shopName{
								font-size: 16px;
								line-height: 24px;
							}
							.shopArea{
								font-size: 14px;
								line-height: 20px;
							}
						}
					}
					.noMargin{
						margin-right: 0px;
					}
				}
			}
		}
	}

</style>