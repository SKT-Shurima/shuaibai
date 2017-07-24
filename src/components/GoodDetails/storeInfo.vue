<template>
	<div class="storeInfo">
		<div class="title">
			<div class="titleContent" @click='storeDetail'>
				<div class="slider"></div>
				<div class="name">{{goods.shop_name}}</div>
				<div class="slider"></div>
			</div>
		</div>
		<div class="storeContent">
			<div class="storeName" @click='storeDetail'>
				{{goods.name}}
			</div>
			<div class="eval">
				<dl>
					<dt>商品</dt>
					<dd>{{(goods.comment.goods_comment-0).toFixed(1)}}</dd>
				</dl>
				<dl>
					<dt>服务</dt>
					<dd>{{(goods.comment.service_comment-0).toFixed(1)}}</dd>
				</dl>
				<dl>
					<dt>物流</dt>
					<dd>{{(goods.comment.logistics_comment-0).toFixed(1)}}</dd>
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
				<el-button type='text' size='small' @click='follow' :class='{"isView":goods.is_seller_collection}'>
					<img src="../../../static/detailImg/viewStoreOn.png" v-show='!goods.is_seller_collection'  height="14" width="14">
					<img src="../../../static/detailImg/viewStoreOff.png" v-show='goods.is_seller_collection' height="14" width="14">
					{{goods.is_seller_collection?'取消关注':'关注店铺'}}
				</el-button>
				<el-button type='text'  size='small' style='margin-left:0px;' @click='collection' :class='{"isView":goods.is_collection}'>
					<img src="../../../static/detailImg/colGoodOn.png" v-show='!goods.is_collection' height="14" width="14">
					<img src="../../../static/detailImg/colGoodOff.png" v-show='goods.is_collection' height="14" width="14">
					{{goods.is_collection?'取消收藏':'收藏商品'}}
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import '../../common/css/storeInfo.scss'
import {collectionGoods,addFollow,cancelFollow,getKFInfo} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
	export default {
    	data(){
	      	return {
	        	kfInfo: {
	          		qq:"",
	          		weixin: ""
	        	}
	        }
    	},
		props: {
		 	goods: {
		 		type: Object,
		 		required: true 
		 	}
		},
		methods: {
	        storeDetail(){
		        let _this = this ;
		        let id = _this.goods.seller_id ;
		        location.href = `storeDetail.html?seller_id=${id}` ;
	        },
	        kf(){
		        let _this =this ;
		        let qq = _this.kfInfo.qq ;
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	      	},
			follow(){
				let _this = this ;
				let fn ;
				if(_this.goods.is_seller_collection){
					fn = cancelFollow;
				}else {
					fn = addFollow;
				}
				let params ={
					access_token: getCookie('access_token'),
					seller_id: _this.goods.seller_id
				}
				fn(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods.is_seller_collection=!this.goods.is_seller_collection
					}
				})
			},
			collection(){
				let _this = this;
				let params = {
					access_token: getCookie('access_token'),
					goods_id: _this.goods.goods_id
				}
				collectionGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.goods.is_collection=!this.goods.is_collection;
           				this.$store.commit('switchCol');
					}
				})
			}
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
<style lang='scss' scoped>
.storeInfo{
  float: left;
}
</style>