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
				<dd  @click='kf(goods.kf_qq)'>
          <img src ="../../../static/commonImg/qq.png" height="14" width="12">
          客服天天
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
import {collectionGoods,addFollow,cancelFollow} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
	export default {
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
      kf(qq){
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
            this.$emit('getCol');
					}
				})
			}
		 }
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$text_color: #666;
$red_color: #f24450;
	.storeInfo{
  		float: left;
  		width: 200px;
  		height: 340px;
  		border: 1px solid $border_color;
  		.title{
  			width: 198px;
  			height: 40px;
  			padding-top: 10px;
  			overflow: hidden;
  			background: -webkit-linear-gradient(top,#cd2b2d,#cd4b2a) ;
  			.titleContent{
  				width: 156px;
  				margin: 0px auto;
          cursor: pointer;
  				.slider{
      				float: left;
      				width: 28px;
      				height: 1px;
      			    margin-top: 10px;
      				background-color: #fff;
      			}
      			.name{
      				float: left;
      				width: 100px;
      				padding: 0px 10px;
      				text-align: center;
      				color: #fff;
      				font-size: 20px;
      			}
  			}
  		}
  		.storeContent{
  			width: 198px;
  			padding: 0px 10px;
  			.storeName{
  				height: 56px;
  				line-height: 56px;
  				font-size: 16px;
  				text-align: center;
  				overflow: hidden;
  				text-overflow: ellipsis;
  				white-space: nowrap ;
  				border-bottom: 1px solid $border_color;
          cursor: pointer;
  			}
  			.eval{
  				padding: 16px 0px;
  				text-align: center;
  				overflow: hidden;
  				border-bottom: 1px solid $border_color;
  				dl{
  					float: left;
  					width: 33.33%;
  					border-right: 1px solid $border_color;
  					dt{
  						font-size: 14px;
      					color: $text_color;
      					margin-bottom: 14px;
      				}
      				dd{
      					font-size: 16px;
      					color: $red_color;
      				}
  				}
  				dl:last-child{
  					border-right: none;
  				}
  			}
  			.online{
  				padding: 8px 0px 24px;
  				text-align: center;
  				border-bottom: 1px solid $border_color;
  				dt{
  					height: 40px;
  					line-height: 40px;
  				}
  				dd{
  					width: 80px;
  					height: 24px;
  					line-height: 24px;
  					margin: 0px auto; 
  					border-radius: 12px;
            cursor: pointer;
  					background-color: #38b8fc;
  					color: #fff;
  				}
  			}
  			.collectBtn{
  				margin-top: 24px;
  				text-align: center;
  				.el-button{
  					border: 1px solid $red_color;
  					padding: 6px;
  				}
  				.isView{
  					color: #666;
  				}
  			}
  		}
  		
  	} 
</style>