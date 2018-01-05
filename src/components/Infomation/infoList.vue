<template>
	<div class="wrap">
		<div class="img-box">
			<img :src="image">
		</div>
		<div class="container">
			<el-row class="theme-title">
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
		 	<ul class="info-list">
		 		<li v-for='(item,index) in infoList' :key='index'>
		 			<dl>
		 				<dt>
		 					<img :src="item.image">
		 				</dt>
		 				<dd>
		 					<h2 v-text='item.name'><span>{{item.date_add|dateStyle}}&nbsp;{{item.date_add|timeStyle}}</span></h2>
		 					<p>{{item.mini_content}}<em @click='infoDetail(item.id,index)'>查看详情&nbsp;&gt;&gt;</em></p>
		 				</dd>
		 			</dl>
		 		</li>
		 	</ul>
		 	<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		</div>
	</div>
</template>
<script>

import 'common/css/themeTitle.scss'
import {getInformationsDetail,getInformations} from '../../common/js/api'
import {dateStyle,timeStyle} from '../../common/js/filter'
import {errorInfo} from '../../common/js/common'
import pagination from '../Common/pagination'
	export default {
		data(){
			return{
				infoList: [],
				image: '',
				page: "1",
				pageSize: "1"
			}
		},
		components:{
			pagination
		},
		filters: {
			dateStyle,timeStyle
		},
		methods: {
			changePage(page){
				this.page = page ;
				this.initList();
			},
			infoDetail(id,index){
				let page = this.page ;
				location.hash=`#infoDetail?id=${id}&index=${index}&page=${page}` ;
			},
			initList(){
				let  params = {
					page: this.page 
				}
				getInformations().then(res=>{
					let {errcode,message,content} = res ;
					if (errcode !== 0 ) {
						errorInfo(errcode,message) ;
					} else{
						this.infoList = content.infos;
						this.pagesize = content.pageSize ;
						this.image = content.image;
					}
				});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList() ;
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1250px;
		margin: 0px auto;
	}
	.img-box{
		height: 500px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.container{
		margin-top: 20px;
	}
	.info-list{
		margin-top: 20px;
		border-top: 1px solid #f1f1f1;
		li{
			padding: 28px 20px;
			border-bottom: 1px solid #f1f1f1;
		}
		dl{
			overflow: hidden;
		}
		dt,dd{
			float: left;
		}
		dt{
			width: 200px;
			height: 120px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		dd{
			margin-left: 20px;
			width: 980px;
			h2{
				overflow: hidden;
				span{
					color: #999;
					float: right;
					font-size: 14px;
				}
			}
			p{
				margin-top: 20px;
				line-height: 24px;
				color: #000;
				em{
					margin-left: 10px;
					cursor: pointer;
					color: #c71724;
				}
			}
		}
	}
	
</style>