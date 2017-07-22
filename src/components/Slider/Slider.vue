<template>
	<div class="wrap" v-if='userInfo'>
		<div class="container">
			<ul>
				<li class="avater" style='padding:0px;'>
					<div style="width: 28px;height: 28px;margin:0px auto;">
						<img :src="userInfo.avater" style="width:100%;height: 100%;" v-if='userInfo.avater' @click='check("vip0")'>
						<img src="../../../static/centerImg/avaterDefault.jpg" style="width:100%;height: 100%;" v-else>
					</div>
				</li>
				<li @click='kf'>
					在线客服
				</li>
				<li @click='check("vip3")'>
					<dl>
						<dt class="singleCol">
							<img src="../../../static/headImg/shopCar.png" height="16" width="16" style="border-radius: 50%;">
						</dt>
						<dd>
							<div class="singleCol">
								购物车
							</div>
							<div style="margin-top:10px;">
								<span style="background-color:cd2928;padding: 0px 4px;border-radius: 8px;background-color:#c81623;" v-show='userInfo.cart_num-0'>
									{{userInfo.cart_num}}
								</span>
							</div>
						</dd>
					</dl>
				</li>
				<li @click='check("vip5")'>
					<div class="singleCol">
						<img src="../../../static/headImg/privilege.png" height="16" width="16">
					</div>
					<div class="singleCol">
						优惠券
					</div>
				</li>
				<li @click='check("vip2")'>
					<div class="singleCol">
						<img src="../../../static/headImg/view.png" height="16" width="16">
					</div>
					<div>关注</div>
				</li>
				<li @click='check("vip1")'>
					<div class="singleCol">
						<img src="../../../static/headImg/collection.png" height="16" width="16">
					</div>
					<div>
						收藏
					</div>
				</li>
				<li>
					<div class="singleCol">
						<img src="../../../static/headImg/QRcode.png" height="18" width="18">
					</div>
					<div>
						扫码下载APP
					</div>
				</li>
			</ul>
			<dl class="bakcTop" @click='gotoTop'>
				<dt>
					<img src="../../../static/headImg/backTop.png" height="27" width="18">
				</dt>
				<dd class="singleCol">
					回顶部
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {getKFInfo} from '../../common/js/api'
	export default{
		data(){
			return{
				userInfo: null,
				kfInfo: {
		        	qq:"",
		        	weixin: ""
		        }
			}
		},
		methods:{
			gotoTop(acceleration,stime){
			   acceleration = acceleration || 0.1;
			   stime = stime || 100;
			   let x1 = 0;
			   let y1 = 0;
			   let x2 = 0;
			   let y2 = 0;
			   let x3 = 0;
			   let y3 = 0; 
			   if (document.documentElement) {
			       x1 = document.documentElement.scrollLeft || 0;
			       y1 = document.documentElement.scrollTop || 0;
			   }
			   if (document.body) {
			       x2 = document.body.scrollLeft || 0;
			       y2 = document.body.scrollTop || 0;
			   }
			   x3 = window.scrollX || 0;
			   y3 = window.scrollY || 0;
			 
			   // 滚动条到页面顶部的水平距离
			   let x = Math.max(x1, Math.max(x2, x3));
			   // 滚动条到页面顶部的垂直距离
			   let y = Math.max(y1, Math.max(y2, y3));
			 
			   // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
			   let speeding = 1 + acceleration;
			   window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
			 
			   // 如果距离不为零, 继续调用函数
			   if(x > 0 || y > 0) {
			       window.setTimeout(this.gotoTop(acceleration,stime), stime);
			   }
			},
			check(view){
				window.open(`myOrder.html#${view}`);
			},
			kf(){
		        let _this =this ;
		        let qq = _this.kfInfo.qq ;
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	      	}
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
				getKFInfo().then(res=>{
		          let {errcode,message,content} = res ;
		          if(errcode !== 0){
		            errorInfo(errcode,message) ;
		          }else {
		            this.kfInfo=content; 
		          }
		        })
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		position: fixed;
		right: 0px;
		top: 0px;
		bottom: 0px;
		z-index: 100;
		margin: auto;
		width: 40px;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
		.container{
			height: 100%;
			color: #fff;
			text-align: center;
			position: relative;
			top: 18%;
			.singleCol{
				width: 20px;
			}
			.singleCol,dt,dd{
				margin: 0px auto;
			}
			img{
				margin-bottom: 12px;
			}
			ul{
				margin:0px 6px ;
				li{
					cursor: pointer;
					padding: 16px 2px;
					border-bottom: 1px solid #555;
				}
			}
			.bakcTop{
				width: 40px;
				height: 110px;
				padding: 10px 0px;
				margin-top: 10px;
				cursor: pointer;
				background-color: #c81623;
			}
		}
	}
</style>