<template>
	<div class="wrap">
		<div class="nav_wrap">
			<nav class="nav_box">
				<a href="javascript:void(0)">全部商品分类</a>
				<a href="integral.html">积分半价</a>
				<a href="">购物币专区</a>
				<a href="">百城万店</a>
			</nav>
		</div>
		<div class="con_wrap">
		<div class="con_box">
			<ul class="con_list" @mouseenter='listBol=true' @mouseleave='listBol=false'>
				<li v-for='(item,index) in category' :key='item'>
					<img :src="item.icon">{{item.name}}
				</li>
			</ul>
			<div class="content" v-show='listBol'  @mouseleave='listBol=false' @mouseenter='listBol=true'>
				<div class="detail_list">
					<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2'>
						<el-col :span='4'>
						    <span v-text='item2.name'></span>
						    <em>></em>
						</el-col>
						<el-col :span='16' :offset="1">
							<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3' v-text='item3.name'></span>
						</el-col>
					</el-row>
				</div>
				<div class="img_box">
					 <ul class="small_img">
					 	<li v-for='(sItem,index) in youLike' :class='{"margin_left":index%2}' v-if='index<4'>
					 		<img src="">
					 	</li>
					 </ul>
					 <ul class="big_img">
					 	<li v-for= '(bItem,index) in youLike' v-if='index>=4'>
					 		<img src="">
					 	</li>
					 </ul>

				</div>
			</div>
			<dl class="slide_show">
				<dt>
					<el-carousel height="390px">
				      <el-carousel-item v-for="item in banners" :key="item">
				        <img :src="item.image">
				      </el-carousel-item>
				    </el-carousel>
				</dt>
				<dd>
					<div class="left_btn"></div>   
					<div class="cont">
						<img :src="item.image" alt="" v-for='item in banners' :key='item' @click='goodDetail(item)'>
					</div>
					<div class="right_btn"></div>
				</dd>
			</dl>
			<div class="status">
				<user-info></user-info>
				<div class="pre_msg">
					<div class="info_title">
						<span>
							<i></i>
							优惠快讯
						</span>
						<em>
							更多
							<i></i>
						</em>
					</div>
					<ul class="msg_list">
						<li>伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶伊利牛奶</li>
						<li>伊利牛奶</li>
						<li>伊利牛奶</li>
					</ul>
				</div>
				<recharge></recharge>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getHomePage,getCategory,getGuessLike,getActualFee} from '../../common/js/api'

import {errorInfo} from '../../common/js/common'
import userInfo from './userInfo'
import recharge from './recharge'
	export default{
		data(){
			return{
			    listBol: false,
			    banners: [],
			    category: [{name:''}],
			    fIndex: 0,
			    sIndex: 0,
        	    youLike: null
			}
		},
		
		components: {
			recharge,userInfo
		},
		methods:{
			goodDetail(item){
				let id = item.action.params[1].value;
				location.href = `detail.html?goods_id=${id}`;
			},
			homePage(){
				let params = {
					t: '5-web',
					postion: '0'
				};
				getHomePage(params).then(res=>{
					let {content} = res;
					this.banners = content.banners ;
 				});
			},
			categoryList(){
				getCategory().then(res=>{
					let {errcode,message,content} = res ;
					if (errcode !== 0 ) {
						errorInfo(errcode,message) ;
					} else{
						this.category = content;
					}
				})
			},
			guessLike(){
				let params = {
					category_id: 1
				}
				getGuessLike(params).then(res=>{
					let {errcode,message,content} = res;
					if (errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.youLike = content;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// 获取轮播图
				this.homePage();
				//  获取分类
				this.categoryList();
			})
		}
	}
</script>

<style scoped lang='scss'>
$primary:#c71724;
$theme: #d63d3f;
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		margin-top: 32px;
		.nav_wrap{
			width: 100%;
			height: 40px;
			background-color: #c81623;
			.nav_box{
				width: 1250px;
				margin: 0px auto;
				a{
					display: inline-block;
					width: 120px;
					font-size: 14px;
					font-weight: bolder;
					line-height: 40px;
					text-align: center;
					color: #fff;
				}
				a:first-child{
					background-color: #cd2a2c;
					width: 150px;
				}
			}
		}
		.con_wrap{
			width: 100%;
			.con_box{
				width: 1250px;
				margin: 0px auto;
				overflow: hidden;
				position: relative;
				img{
					cursor: pointer;
				}
				.con_list{
					width: 150px;
					background-color: #c81623;
					color: #fff;
					text-align: center;
					float: left;
					li{
						width: 100%;
						height: 50px;
						line-height: 50px;
						font-size: 14px;
						font-weight: bolder;
						cursor: pointer;
					}
					li:hover{
						background-color: #fff;
						color: #c81623;
					}
					img{
						width: 22px;
						vertical-align: -5px;
						margin-right: 10px;
					}
				}
				.content{
					position: absolute;
					top: 0px;
					left: 150px;
					width: 850px;
					height: 500px;
					overflow: hidden;
					background-color: #fff;
					z-index: 99;
					.detail_list{
						width: 600px;
						height: 500px;
						overflow-y: auto;
						overflow-x: hidden;
						padding-left: 20px;
						padding-top: 28px;
						float: left;
						.el-row{
							margin-bottom: 22px;
							.el-col-4{
								span{
									display: inline-block;
									width: 72px;
									text-align-last: justify;
								}
								em{
									margin-left: 6px;
								}
								
							}
							.el-col-16{
								overflow: hidden;
								padding-left: 6px;
								padding-bottom: 10px;
								border-bottom:  1px dashed #dcdcdc;
								span{
									float: left;
									margin-right: 16px;
									margin-bottom: 20px;
								}
							}
						}
					}
					.img_box{
						float: left;
						width: 250px;
						height: 500px;
						padding: 10px;
						background-color: #f2f2f2;
						img{
							width: 100%;
							height: 110px;
						}
						.small_img{
							border-bottom: 1px solid $border_color;
							overflow: hidden;
							li{
								float: left;
								width: 110px;
								margin-bottom: 10px;
								
							}
							.margin_left{
								margin-left: 10px;
							}
						}
						.big_img{
							width: 100%;
							li{
								width: 100%;
							    margin-top: 10px;
							}
						}
					}
				}
				.slide_show{
					width: 850px;
					height: 390px;
					float: left;
					dt{
						img{
							width: 100%;
							height: 390px;
						}
					}
					dd{
						width: 100%;
						height: 110px;
						overflow: hidden;
						position: relative;
						.cont{
							width: 100%;
							img{
								width: 25%;
								height: 110px;
								float: left;
							}
						}
						.left_btn,.right_btn{
							width: 24px;
							height: 60px;
							border-radius: 4px;
							background-color: rgba(0,0,0,.3);
							margin-top: 25px;
							color: #fff;
							position: absolute;
							top: 0px;
							bottom: 0px;
							margin-top: auto;
							margin-bottom: auto;
							z-index: 10;
						}
						.left_btn{
							left: 4px;
						}
						.right_btn{
							right: 4px;
						}
					}
				}
				.status{
					width: 250px;
					height: 500px;
					padding-left: 16px;
					padding-right: 16px;
					float: left;
					color: #000;
					background-color: #fff;
				}
				.pre_msg{
					width: 100%;
					height: 116px;
					.msg_list{
						li{
							color: $text_color;
							line-height: 20px;
							overflow: hidden; 
			                white-space: nowrap;
			                text-overflow: ellipsis;
			                -o-text-overflow: ellipsis;
						}
					}
				}
				
				
			}
		}
	}
</style>