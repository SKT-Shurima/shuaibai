<template>
	<div class="wrap">
		<div class="imgBox">
			<img src="">
		</div>
		<div class="container">
			<el-row class="themeTitle">
		 		<el-col :span='6'>
		 			<div class="slider"></div>
		 		</el-col>
		 		<el-col :span='10' :offset='1'>
		 			<div class="text">
		 				<img src="../../../static/themeImg/food.png" height="24" width="24">
		 				优惠快讯
		 			</div>
		 		</el-col>
		 		<el-col :span='6' :offset='1'>
		 			<div class="slider"></div>
		 		</el-col>
		 	</el-row>
		 	<ul class="infoList">
		 		<li>
		 			
		 		</li>
		 	</ul>
		 	<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		</div>
	</div>
</template>
<script>

import 'common/css/themeTitle.scss'
import {getInformations} from '../../common/js/api'
import pagination from '../Common/pagination'
	export default {
		data(){
			return{
				infoList:[],
				page: "1",
				pageSize: "1"
			}
		},
		components:{
			pagination
		},
		methods: {
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.initList();
			},
			initList(){
				let  params = {
					page: this.page 
				}
			}
		},
		created(){
			this.$nextTick(()=>{
				getInformations().then(res=>{
					let {errcode,message,content} = res ;
					if (errcode !== 0 ) {
						errorInfo(errcode,message) ;
					} else{
						// this.infoList = content.info;
						// this.pageSize = content.pageSize ;
					}
				})
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		.imgBox{
			width: 100%;
			height: 500px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.container{
			margin-top: 20px;
		}
	}
	
</style>