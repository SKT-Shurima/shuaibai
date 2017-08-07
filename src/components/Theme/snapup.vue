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
			 				<img src="../../../static/themeImg/snapup.png" height="24" width="24">
			 				一元抢购
			 			</div>
			 		</el-col>
			 		<el-col :span='6' :offset='1'>
			 			<div class="slider"></div>
			 		</el-col>
			 	</el-row>
			 	<ul class="list_box" v-if='goodsList'>
			 		<li class="list_unit" v-for='item in goodsList'>
			 		   <dl>
			 		   	    <dt>
			 		   	    	<div class="info_img">
			 		   	    		<img :src="item.cover" @click='goodDetail(item.goods_id)'>
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
			 		   	    			{{(item.date_start*1000 - nowTime) | countdown}}
			 		   	    		</span>
			 		   	    		<em>后开始</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn" @click='goodDetail(item.goods_id)'> 
			 		   	    		立即前往
			 		   	    	</div>
			 		   	    </dd>
			 		   	    <dd  class="end" v-show='item.date_start*1000 <= nowTime && item.date_end*1000 >= nowTime'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			{{(item.date_end*1000 - nowTime) | countdown}}
			 		   	    		</span>
			 		   	    		<em>后结束</em>
			 		   	    	</div>
			 		   	    	<div class="info_btn"  @click='goodDetail(item.goods_id)'> 
			 		   	    		立即抢购
			 		   	    	</div>
			 		   	    </dd>
			 		   	     <dd  class="over" v-show='item.date_end*1000 < nowTime'>
			 		   	    	<div class="info_time">
			 		   	    		<span>
			 		   	    			抢购结束
			 		   	    		</span>
			 		   	    	</div>
			 		   	    	<div class="info_btn"  @click='goodDetail(item.goods_id)'> 
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
import {MessageBox} from  'element-ui'
	export default {
		data(){
			return{
				currentPage: 1,
				pagesize: 1,
				goodsList: null,
				nowTime: 0 ,
				reqParams: null,
				url: ""
			}
		},
		filters:{
			currency,countdown
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
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			initList(){
				let _this = this ;
				let params = {
					type: "1",
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
						let special = content.special ;
						this.url = `${special[0].web_param}?goods_id=${special[0].params.goods_id}`;
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
	    		this.initTime();
	    	})
	    }
  }
</script>
<style scoped lang='scss'>
$border_color: #f0f0f0;
$linethrough_color: #999;
$btn_bg: #fff882;
$start_bg: #00bf8b;
$end_bg: #f13f4c;
$over_bg: #aaa;
$primary:#c71724;
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
.theme_box{
	width: 1250px;
	margin: 0px auto;
  	.list_box{
  		width: 100%;
  		overflow: hidden;
  		margin-top: 20px;
  		border-top: 1px solid $border_color ;
  		border-left: 1px solid $border_color;
  		.list_unit{
  			width: 25%;
  			float: left;
  			border: {
  				right:1px solid $border_color;
  				bottom:1px solid $border_color;
  			}
  			dt{
  				padding-top: 14px;
  				padding-left: 14px;
  				padding-right: 14px;
  				.info_img{
					width: 282px;
  					height: 282px;
					img{
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
  				}
  				.info_text{
					width: 100%;
					height: 36px;
					margin-top: 8px;
					margin-bottom: 8px;
					line-height: 18px;
					overflow: hidden;
				 	text-overflow: ellipsis;
				 	display: -webkit-box;
				 	-webkit-line-clamp: 3;
				 	-webkit-box-orient: vertical;

  				}
  				.info_price{
  					overflow: hidden;
  					height: 20px;
                    margin-bottom: 10px;
  					span{
  						color: $primary;
  						float: left;
  						font-size: 16px;
  					}
  					em{
  						color: #999;
  						float: right;
  						margin-top: 2px;
  					}
  				}
  			}
  			.start,.end,.over{
				width: 100%;
				height: 40px;
				padding-left: 14px;
				padding-right: 14px;
				overflow: hidden;
				margin-top: 10px;
				.info_time{
					line-height: 40px;
					color: #fff;
					float: left;
					span{
						font-size: 16px;
					}
					em{

					}
				}
				.info_btn{
					height: 26px;
					float: right;
					line-height: 26px;
					border-radius: 13px;
					margin-top: 8px;
					padding-left: 10px;
					padding-right: 10px;
					background-color: $btn_bg;
					color: $primary;
					text-align: center;
					cursor: pointer;
				}
				}
				.start{
					background: $start_bg;
				}
				.end{
					background-color: $end_bg;
  			    }
	  			.over{
	  				background-color: $over_bg;
	  			}
  			}
  			.list_unit:hover{
  				border-color: $border_color;
				box-shadow: 0 0 2px 2px $border_color;
  			}
  		}
	}
</style>