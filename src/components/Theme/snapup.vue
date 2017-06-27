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
			 				<img src="../../../static/themeImg/snapup.png" height="24" width="24">
			 				一元抢购
			 			</div>
			 		</el-col>
			 		<el-col :span='7' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<ul class="list_box" v-if='goodsList'>
			 		<li class="list_unit" v-for='item in goodsList'>
			 		   <dl>
			 		   	    <dt>
			 		   	    	<div class="info_img">
			 		   	    		<img :src="item.cover">
			 		   	    	</div>
			 		   	    	<div class="info_text" v-text='item.name'></div>
			 		   	    	<div class="info_price">
			 		   	    		<span>
			 		   	    			{{item.kill_price|currency}}
			 		   	    		</span>
			 		   	    		<em style="text-decoration: line-through;">
			 		   	    			{{item.shop_price|currency}}
			 		   	    		</em>	
			 		   	    	</div>
			 		   	    </dt>
			 		   	    <dd class="start" v-show='item.date_start*1000 > nowTime'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			{{item.date_start*1000 - nowTime | countdown}}
			 		   	    		</span>
			 		   	    		<em>后开始</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn"> 
			 		   	    		立即前往
			 		   	    	</div>
			 		   	    </dd>
			 		   	    <dd  class="end" v-show='item.date_start*1000 <= nowTime && item.date_end*1000 >= nowTime'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			{{item.date_start*1000 - nowTime | countdown}}
			 		   	    		</span>
			 		   	    		<em>后结束</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn"> 
			 		   	    		立即抢购
			 		   	    	</div>
			 		   	    </dd>
			 		   	     <dd  class="over" v-show='item.date_end*1000 < nowTime'>
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
import 'common/css/themeTitle.scss'
import {currency,countdown} from '../../common/js/filter'
import {getRequest,errorInfo} from '../../common/js/common'
import {getThematicActivities} from '../../common/js/api'
import pagination from '../Common/pagination'
	export default {
		data(){
			return{
				currentPage: 1,
				pagesize: 1,
				goodsList: null,
				nowTime: 0 ,
				reqParams: null
			}
		},
		filters:{
			currency
		},
		components:{
			pagination
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
			},
			initTime(){
				setInterval(()=>{
					this.nowTime = new Date().getTime() ;
				},1000) ;
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
			.theme_box{
				margin-top: 20px;
			}
		}
	}
</style>