<template>
	<div class="wrap">
		<div class="box">
			<div class="theme_img" v-if='special'>
				<img :src="special[0].image" @click='goodDetail(special[0].params.goods_id)'>
			</div>
			<div class="theme_box">
				<el-row class="themeTitle">
			 		<el-col :span='7'>
			 			<div class="slider"></div>
			 		</el-col>
			 		<el-col :span='10'>
			 			<div class="text">
			 				<img src="../../../static/themeImg/smart.png" height="24" width="24">
			 				家居百货
			 			</div>
			 		</el-col>
			 		<el-col :span='7' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<goods-list :goods-list='goodsList'></goods-list>
			 	<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
			</div>
		</div>
	</div>
</template>
<script>
import 'common/css/goodsList.scss'
import 'common/css/themeTitle.scss'
import {getRequest,errorInfo} from '../../common/js/common'
import {getThematicActivities} from '../../common/js/api'
import goodsList from './goodsList'
import pagination from '../Common/pagination'
	export default {
		data(){
			return{
				currentPage: 1,
				pagesize: 1,
				reqParams: null,
				special: null,
				goodsList: new Array
			}
		},
		components:{
			goodsList,pagination
		},
	   	methods: {
	      	changePage(page){
				let _this = this ;
				_this.currentPage = page ;
				_this.initList();
			},
			initList(){
				let _this = this ;
				let params = {
					type: _this.reqParams.type,
					page: _this.currentPage 
				}
				getThematicActivities(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0 ){
						errorInfo(errcode,message);
					}else{
						this.goodsList = content.goods.goods ;
						this.pagesize = content.goods.pagesize ;
						this.special = content.special ;
					}
				})
			}
	    },
	    mounted(){
	    	this.$nextTick(()=>{
	    		this.reqParams = getRequest() ;
	    		this.initList();
	    	})
	    }
  }
</script>
<style scoped lang='scss'>
	.wrap{
		width: 100%;
		.box{
			width: 1250px;
			margin: 0px auto;
			.theme_img{
				width: 100%;
				height: 500px;
				img{
					width: 100%;
					height: 500px;
				}
			}
		}
	}
	.theme_box{
		width: 1246px;
		margin: 20px auto;
	}
</style>