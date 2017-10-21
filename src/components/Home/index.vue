<template>
	<div class="wrap">
		<div class="nav_wrap">
			<nav class="nav_box">
				<a href="javascript:void(0)">全部商品分类</a>
				<a href="javascript: window.open('integral.html')">积分半价</a>
				<a href="javascript: window.open('shoppingCoin.html')">会员积分专区</a>
				<a href="javascript: window.open('cities.html')">百城万店</a>
				<a href="javascript: window.open('grandCeremony.html')">世尊印</a>
			</nav>
		</div>
		<div class="con_wrap">
		<div class="con_box">
			<ul class="con_list" @mouseenter='listBol=true' @mouseleave='listBol=false;listIndex=""'>
				<li v-for='(item,index) in category' :key='index' @mouseenter='listIndex=index;fIndex=index' :class='{"checkUnit":listIndex===index}' @click='checkGoods(index,item.category_id)'>
					<img :src="item.selected_icon" v-show='listBol&&listIndex===index'>
					<img :src="item.icon" v-show='!(listBol&&listIndex===index)'>
					{{item.name}}
				</li>
			</ul>
			<div class="content" v-show='listBol'  @mouseleave='listBol=false;listIndex=""' @mouseenter='listBol=true;listIndex=fIndex'>
				<div class="detail_list"> 
					<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2.category_id' v-if='item2.child_category.length'>
						<el-col :span='5'>
						    <span v-text='item2.name' @click='checkGoods(`${fIndex},${index2}`,item2.category_id)'></span>
						    <em>></em>
						</el-col>
						<el-col :span='16' :offset="1">
							<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3.category_id' v-text='item3.name' @click='checkGoods(`${fIndex},${index2},${index3}`,item3.category_id)'></span>
						</el-col>
					</el-row>
				</div>
				<div class="img_box">
					 <guess-like></guess-like>
				</div>
			</div>
			<dl class="slide_show">
				<dt>
					<el-carousel height="390px">
				      <el-carousel-item v-for="(item,index) in banners" :key="index">
				        <img :src="item.image" @click='detail(item.action)'>
				      </el-carousel-item>
				    </el-carousel>
				</dt>
				<dd>
					<div class="left_btn" @click='prev(0)'>
						<i class="el-icon-arrow-left"></i>
					</div>   
					<div class="cont" :style='{width:207.5*banners.length+"px",left: -207.5*sliderIndex+"px"}'>
						<img :src="item.image" alt="" v-for='(item,index) in banners' :key='index' @click='detail(item.action)'>
					</div>
					<div class="right_btn" @click='prev(1)'>
						<i class="el-icon-arrow-right"></i>
					</div>
				</dd>
			</dl>
			<div class="status">
				<user-info></user-info>
				<recharge></recharge>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getHomePage,getCategory,getGuessLike,getActualFee,getUserInfo} from '../../common/js/api'
import {getRequest,errorInfo,getCookie,delCookie,setCookie} from '../../common/js/common'
import guessLike from '../Common/guessLike'
import userInfo from './userInfo'
import recharge from './recharge'
	export default{
		data(){
			return{
			    listBol: false,
			    listIndex: "",
			    banners: [],
			    category: [{name:''}],
			    fIndex: 0,
        	    youLike: null,
        	    reqParams: {result:null},
        	    sliderIndex: 0
			}
		},
		components: {
			recharge,userInfo,guessLike 
		},
		methods:{
			prev(mask){
				let len = this.banners.length ;
				if (mask) {
					this.sliderIndex = this.sliderIndex>0?--this.sliderIndex:0;
				}else{
					this.sliderIndex = this.sliderIndex<(len-4)?++this.sliderIndex:(len-4);
				}
			},
			detail(action){
				if (action.jump) {
					let params = action.params;
					let  u = "";
					if (params) {
						for( let i = 0 ; i < params.length;i++){
							u += `${params[i].key}=${params[i].value}&` ;
						}
					}
					window.open(`/module${action.jump}?${u}`);
				}
				
			},
			checkGoods(index,id){
	     		window.open(`relatedGoods.html?cat=${index}&category_id=${id}`) ;
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
		created(){
			this.$nextTick(()=>{
				// 获取轮播图
				this.homePage();
				//  获取分类
				this.categoryList();
				this.reqParams = getRequest();
				let  result = this.reqParams.result ;
				let  access_token = this.reqParams.access_token ;
				if (access_token) {
					delCookie('access_token');
					setCookie('access_token',access_token,.5);
					location.replace('index.html');
				}
				if (result==='false') {
					let wx_web_openid = this.reqParams.wx_web_openid ;
					let wx_unionid = this.reqParams.wx_unionid ;
					let qq_open_id = this.reqParams.qq_open_id ;
					if (wx_web_openid) {
						location.replace(`reg.html#view3?wx_web_openid=${wx_web_openid}&wx_unionid=${wx_unionid}`);
					}
					if (qq_open_id) {
						location.replace(`reg.html#view3?qq_open_id=${qq_open_id}`);
					}
				}
			})
		}
	}
</script>

<style scoped lang='scss'>
$primary:#c71724;
$theme: #d63d3f;
$border_color: #f0f0f0;
$text_color: #666;
	.wrap{
		width: 100%;
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
					text-indent: 16px;
					float: left;
					li{
						width: 100%;
						height: 45.46px;
						line-height: 45.46px;
						font-size: 14px;
						font-weight: bolder;
						cursor: pointer;
					}
					.checkUnit{
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
					width: 830px;
					height: 500px;
					overflow: hidden;
					background-color: #fff;
					z-index: 99;
					.detail_list{
						width: 580px;
						height: 500px;
						overflow-y: auto;
						overflow-x: hidden;
						padding-left: 20px;
						padding-top: 28px;
						float: left;
						.el-row{
							margin-bottom: 22px;
							.el-col-5{
								font-weight: 600;
								span{
									display: inline-block;
									width: 72px;
									text-align-last: justify;
									cursor: pointer;
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
									cursor: pointer;
									margin-right: 16px;
									margin-bottom: 20px;
									color: $text_color;
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
					}
				}
				.slide_show{
					width: 830px;
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
							position: absolute;
							height: 110px;
							transition: all .5s;
							img{
								width: 207.5px;
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
							cursor: pointer;
							i{
								font-size: 24px;
								line-height: 56px;
							}
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
					width: 270px;
					height: 500px;
					padding-left: 16px;
					padding-right: 16px;
					float: left;
					color: #000;
					background-color: #fff;
					border: 1px solid $border_color;
				}
			}
		}
	}
</style>