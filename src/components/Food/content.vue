<template>
	<div class="wrap">
		<div class="box">
			<div class="theme_img">
				<img src="">
			</div>
			<div class="theme_box">
				<el-row class="title">
			 		<el-col :span='7'>
			 			<div class="slider"></div>
			 		</el-col>
			 		<el-col :span='8' :offset='1'>
			 			<div class="text">
			 				<img src="">
			 				舌尖美食
			 			</div>
			 		</el-col>
			 		<el-col :span='7' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<ul class="list_box">
			 		<li class="list_unit" v-for='item in 20'>
			 		   <dl>
			 		   	    <dt>
			 		   	    	<div class="info_img">
			 		   	    		<img src="">
			 		   	    	</div>
			 		   	    	<div class="info_text">
			 		   	    		如果你是我眼中的一滴泪你会怎么让我哭如果你是我眼中的一滴泪你会怎么让
			 		   	    	</div>
			 		   	    	<div class="info_price">
			 		   	    		<span>
			 		   	    			{{1.00|currency}}
			 		   	    		</span>
			 		   	    		<em>
			 		   	    			{{128.00|currency}}
			 		   	    		</em>	
			 		   	    	</div>
			 		   	    </dt>
			 		   </dl>	

			 		</li>
			 	</ul>
			 	<div class="pagination_wrap">
			 		<div class="pagination_box">
				 	    <el-button type='text' size='small'><i></i>上一页</el-button>
				 		<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="currentPage"
					      :page-size="2"
					      layout="pager"
					      :total="100">
					    </el-pagination>
					    <el-button type='text' size='small'><i></i>下一页</el-button>
					    <span>
					    	共{{100}}页
					    </span>
					    <em>
					    	到第
					    	<el-input size='small' style='width:30px;'></el-input>
					    	页
					    </em>
					    <el-button type='primary' size='small'>确定</el-button>
					</div>
			 	</div>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
	export default {
		data(){
			return{
				currentPage: 1
			}
		},
		filters:{
			currency
		},
	   methods: {
	      handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      }
	    }
  }
</script>
<style scoped lang='scss'>
@import '../../common/css/common.scss';
$page_bg: #f5f5f5;
$page_border: #ddd;
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
			.pagination_wrap{
			  		overflow: hidden;
			  		margin-top: 20px;
			  		margin-bottom: 90px;
			  		.el-pager{
			  			background-color: red;
			  		}
			  		.pagination_box{
			  			float: right;
			  			line-height: 30px;
			  			font-size: 14px;
			  			.el-button{
			  				background-color: $page_bg;
			  				padding: 6px 10px;
			  				font-size: 14px;
			  				border: 1px solid $page_border;
			  				color: #000;
			  			}
			  			.el-pagination{
			  				display: inline-block;
			  				padding: 0px;
			  				ul{
			  					background-color: red;
			  				}
			  				.number{
			  					background-color: red;
			  				}
			  				.el-pager li.active{
			  					background-color: transparent !important;
			  					color: $primary !important;
			  					border-color: transparent !important;
			  				}
			  			}
			  			.el-input{
			  				border-color: $page_border;
			  			}
			  		}
			  	}
		}
	}
</style>