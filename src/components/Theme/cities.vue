<template>
	<div class="wrap">
		<div class="box">
			<div class="theme-img">
				<a href=""><img src="http://static.strongmall.net/upload/banner/2017_11_09/6ca3e4508cf7982ce079202c54741fe1b73eec83.jpg"></a>
			</div>
			<div class="theme-box">
				<el-row class="theme-title">
			 		<el-col :span='6'>
			 			<div class="slider"></div>
			 		</el-col>
			 		<el-col :span='10' :offset='1'>
			 			<div class="text">
			 				<img src="../../../static/themeImg/start.png" height="24" width="24">
			 				优秀店铺
			 				<img src="../../../static/themeImg/start.png" height="24" width="24" style="tranform: rotateZ(30deg)">
			 			</div>
			 		</el-col>
			 		<el-col :span='6' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<ul class="excellent-shops">
			 		<li v-for='(shopItem,shopIndex) in 12' :key='shopIndex'>
			 			<img src="http://static.strongmall.net/upload/banner/2017_11_09/6ca3e4508cf7982ce079202c54741fe1b73eec83.jpg" style="width:100%;height:100%">
			 		</li>
			 	</ul>
			 	<el-row class="theme-title">
			 		<el-col :span='6'>
			 			<div class="slider"></div>
			 		</el-col>
			 		<el-col :span='10' :offset='1'>
			 			<div class="text">
			 				<img src="../../../static/themeImg/new.png" height="24" width="24">
			 				最新产品
			 			</div>
			 		</el-col>
			 		<el-col :span='6' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<ul class="new-goods">
			 		<li v-for='(goodItem,goodIndex) in 12'>
			 			<dl>
			 				<dt>
			 					<img src="http://static.strongmall.net/upload/goods/2018_01_15/6188f522e576effe370c69b7cb6293027a208e90.jpg">
			 				</dt>
			 				<dd>
			 					<div class='ellipsis-1'>真版字画</div>
			 					<div class='ellipsis-1'>【杭州地区】</div>
			 				</dd>
			 			</dl>
			 		</li>
			 	</ul>
			</div>
		</div>
	</div>
</template>
<script>
import 'common/css/themeTitle.scss'
import {getRequest,errorInfo} from '../../common/js/common'
import {getThematicActivities} from '../../common/js/api'
	export default {
		data(){
			return{
				reqParams: null,
				specialImg: '',
				goods: new Array,
				url: ""
			}
		},
	   	methods: {
	      	changePage(page){
				this.currentPage = page ;
				this.initList();
			},
			initList(){
				let params = {
					type: "2",
					page: this.currentPage 
				}
				// getThematicActivities(params).then(res=>{
				// 	let {errcode,message,content} = res ;
				// 	if(errcode !== 0 ){
				// 		errorInfo(errcode,message);
				// 	}else{
				// 		this.goods = content.goods.goods ;
				// 		this.pagesize = content.goods.pagesize ;
				// 		let special = content.special ;
				// 		this.specialImg = special[0].image;
				// 		this.url = `${special[0].web_param.slice(1)}?goods_id=${special[0].params.goods_id}`;
				// 	}
				// })
			}
	    },
	    mounted(){
	    	this.$nextTick(()=>{
	    		this.reqParams = getRequest();
	    		this.initList();
	    	})
	    }
  }
</script>
<style scoped lang='scss'>
	.wrap{
		width: 100%;
	}
	.box{
		width: 1250px;
		margin: 0px auto;
	}
	.theme-img{
		width: 100%;
		height: 500px;
		img{
			width: 100%;
			height: 500px;
		}
	}
	.theme-box{
		width: 1246px;
		margin: 20px auto;
	}
	.excellent-shops{
		margin: 20px 0;
		border-top: 1px solid #f0f0f0;
		border-left: 1px solid #f0f0f0;
		overflow: hidden;
		li{
			float: left;
			width: 50%;
			height: 230px;
			border-top: 1px solid #f0f0f0;
			border-left: 1px solid #f0f0f0;
		}
	}
	.new-goods{
		margin: 20px 0; 
		overflow: hidden;
		li{
			float: left;
			width: 25%;
			text-align: center;
			padding: 10px 5px 0;
		}
		img{
			width: 100%;
			height: 100%;
		}
		dd{
			font-size: 16px;
			line-height: 24px;
			padding-top: 6px;
		}
	}
</style>