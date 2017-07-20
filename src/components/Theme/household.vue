<template>
	<div class="wrap">
		<div class="box">
			<div class="theme_img" v-if='special'>
				<a :href="url"><img :src="special[0].image"></a>
			</div>
			<div class="theme_box">
				<el-row class="themeTitle">
			 		<el-col :span='6'>
			 			<div class="slider"></div>
			 		</el-col>
			 		<el-col :span='10' :offset='1'>
			 			<div class="text">
			 				<img src="../../../static/themeImg/smart.png" height="24" width="24">
			 				家居百货
			 			</div>
			 		</el-col>
			 		<el-col :span='6' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<goods-list :goods='goods'></goods-list>
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
				goods: new Array,
				url: ""
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
					type: "4",
					page: _this.currentPage 
				}
				getThematicActivities(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0 ){
						errorInfo(errcode,message);
					}else{
						this.goods = content.goods.goods ;
						this.pagesize = content.goods.pagesize ;
						this.special = content.special ;
						let special = content.special ;
						this.url = `${special[0].web_param}?goods_id=${special[0].params.goods_id}`;
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