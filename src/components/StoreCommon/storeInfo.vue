<template>
	<div class="storeInfo" v-if='shopInfo'>
		<div class="title">
			<div class="titleContent">
				<div class="slider"></div>
				<div class="name">帅柏直营</div>
				<div class="slider"></div>
			</div>
		</div>
		<div class="storeContent">
			<div class="storeName" @click='storeDetail' v-text='shopInfo.seller.shop_name'>
			</div>
			<div class="eval">
				<dl>
					<dt>商品</dt>
					<dd>{{(shopInfo.comment.goods_comment-0).toFixed(1)}}</dd>
				</dl>
				<dl>
					<dt>服务</dt>
					<dd>{{(shopInfo.comment.service_comment-0).toFixed(1)}}</dd>
				</dl>
				<dl>
					<dt>物流</dt>
					<dd>{{(shopInfo.comment.logistics_comment-0).toFixed(1)}}</dd>
				</dl>
			</div>
			<dl class="online">
				<dt>在线客服</dt>
				<dd  @click='kf' class="qqkf">
		            <img src ="../../../static/commonImg/qq.png" height="14" width="12">
		            客服
				</dd>
		        <dd>
		            <div  class="wxkf">
		            	<img src ="../../../static/commonImg/weixin.png" height="14" width="14">
		           		 客服
		            </div>
		         	<div>
		            	<img :src="kfInfo.weixin" style="width:100px;height: 100px;">
		          	</div>
		        </dd>
			</dl>
			<div class="collectBtn">
				<el-button type='text' size='small' @click='follow' :class='{"isView":shopInfo.is_follow}'>
					<img src="../../../static/detailImg/viewStoreOn.png" v-show='!shopInfo.is_follow'  height="14" width="14">
					<img src="../../../static/detailImg/viewStoreOff.png" v-show='shopInfo.is_follow' height="14" width="14">
					{{shopInfo.is_follow?'取消关注':'关注店铺'}}
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import '../../common/css/storeInfo.scss'
import {collectionGoods,addFollow,cancelFollow,getShopInfo,getKFInfo} from '../../common/js/api'
import {errorInfo,getCookie,getRequest} from '../../common/js/common'
	export default {
    	data(){
	      	return {
	        	shopInfo: null,
	        	reqParams: null,
	        	kfInfo: {
	        		qq:"",
	        		weixin: ""
	        	}
	      	}
    	},
   		methods: {
	        storeDetail(){
		        let id = this.reqParams.seller_id ;
		        window.open(`storeDetail.html?seller_id=${id}`) ;
	      	},
	     	kf(){
		        let qq = this.kfInfo.qq ;
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	      	},
			follow(){
				let fn ;
				if(this.shopInfo.is_follow){
					fn = cancelFollow;
				}else {
					fn = addFollow;
				}
				let params ={
					access_token: getCookie('access_token'),
					seller_id: this.reqParams.seller_id
				}
				fn(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.initInfo();
					}
				})
			},
			collection(){
				let params = {
					access_token: getCookie('access_token'),
					goods_id: this.goods.goods_id
				}
				collectionGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods.is_collection=!this.goods.is_collection;
	        			this.$emit('getCol');
					}
				})
			},
	      	initInfo(){
	         	let seller_id = this.reqParams.seller_id ;
	        	let params = {
	          		seller_id: seller_id,
	          		access_token: getCookie('access_token')
	        	}
	          	getShopInfo(params).then(res=>{
	            	let {errcode,message,content} = res ;
	            	if(errcode !== 0){
	              		errorInfo(errcode,message) ;
	            	}else {
	              		this.shopInfo = content ;
	           		}
	        	})
	      	}
		},
	    created(){
	      	this.reqParams = getRequest();
	      	this.initInfo();
	    },
       	mounted(){
      		this.$nextTick(()=>{
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