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
			 				一元抢购
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
			 		   	    		<em style="text-decoration: line-through;">
			 		   	    			{{128.00|currency}}
			 		   	    		</em>	
			 		   	    	</div>
			 		   	    </dt>
			 		   	    <dd class="start" v-show='false'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			08:11:02
			 		   	    		</span>
			 		   	    		<em>后开始</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn"> 
			 		   	    		立即前往
			 		   	    	</div>
			 		   	    </dd>
			 		   	    <dd  class="end" v-show='false'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			08:11:02
			 		   	    		</span>
			 		   	    		<em>后结束</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn"> 
			 		   	    		立即抢购
			 		   	    	</div>
			 		   	    </dd>
			 		   	     <dd  class="over" >
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			抢购结束
			 		   	    		</span>
			 		   	    	</div>
			 		   	    	<div class="info_btn"> 
			 		   	    		请期待下一轮
			 		   	    	</div>
			 		   	    </dd>
			 		   </dl>	

			 		</li>
			 	</ul>
			 	<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
	export default {
		data(){
			return{
				currentPage: 1,
				pagesize: 1
			}
		},
		filters:{
			currency
		},
	   methods: {
	        // 改变页数
			changePage(page){
				let _this = this ;
				_this.getOrderList(_this.state,page);
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
		}
	}
</style>