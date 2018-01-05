<template>	
	 <div class="wrap">
	 	<div class="box" v-if='colList.length'>
	 		<ul class='list-box'>
		 		<li class='border-f0' v-for='(item,index) in colList'>
		 			<dl>
						<dt>
							<div class="img-box">
								<img :src="item.cover" @click='goodDetail(item.goods_id)'>
							</div>
							<div class="edit-box">
								<div @click="delColGood(item.collection_id)">
								<i class="el-icon-delete"></i>删除</div>
							</div>
						</dt>
						<dd>
							<div class="sell-info">{{item.name}}</div>
							<div class="price-info" >
								<span class='color-primary'>{{item.price|currency}}</span>
								<em class='color-9'>{{item.sale_count}}人付款</em>
							</div>
							<div class="update" v-show='false'>
								<div>
									<img src="" alt="">商品已失效
								</div>
							</div>
						</dd>
					</dl>
		 		</li>
		 	</ul>
			<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	 	</div>
	 	<div v-else style='font-size:16px;'>
			暂无商品收藏
		</div>
	 </div>
</template>
<script>
	import {currency} from '../../common/js/filter'
	import {collection,cancelCollections} from '../../common/js/api'
	import {errorInfo,getCookie} from '../../common/js/common'
	import {MessageBox} from  'element-ui'
	import pagination from '../Common/pagination'
	export default {
		data(){
			return{
				colList: [],
				pagesize: 1 ,// 总页数
				page: "1"
			}
		},
		filters:{
			currency
		},
		components: {
			pagination
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 取消收藏
			delColGood(ids){
				MessageBox.confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
			        let params = {
			        	access_token: getCookie('access_token'),
			        	ids: ids
			        }
			        cancelCollections(params).then(res=>{
			        	let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							this.initList();
						}
			        })
		        }).catch(() => {
		            return false;          
		        });

			},
			// 改变页数
			changePage(page){
				this.page = page ;
				this.initList();
			},
			initList(){
				let params  ={
					access_token: getCookie('access_token'),
					page: this.page
				}
				collection(params).then(res=>{
					let {errcode,message,content,pageSize} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.colList = content;
						this.pagesize = pageSize ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.list-box{
		width: 100%;
		margin-top: 14px;
		overflow: hidden;
		border-top: 1px solid #f0f0f0;
		li{
			float: left;
			width: 210px;
			padding: 14px;
			margin-right: -1px;
			margin-top: -1px;
		}
		dt{
			position: relative;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border: 1px solid transparent;
		}
		dt:hover{
			border: 1px solid #c71724;
			.edit-box{
				bottom: 0px;
			}
		}
		.img-box{
			width: 100%;
			height: 100%;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer; 
			}
		}
		.edit-box{
			position: absolute;
			bottom: -30px;
			width: 100%;
			text-align: center;
			overflow: hidden;
			transition: all .3s;
			color: #fff;
			background-color: rgba(205,42,44,0.5);
			div{
				float: right;
				width: 50%;
				line-height: 30px;
				cursor: pointer;
				margin: 0px;
			}
			.el-icon-delete{
				margin-right: 10px;
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
		}
		.sell-info{
			height: 36px;
			line-height: 18px;
			margin: 8px 0px;
		}
		.price-info{
			line-height: 18px;
			span{
				font-size: 16px;
				font-weight: 600;
			}
			em{
				margin-top: 4px;
				float: right;
			}
		}
		.update{
			div{
				width: 94px;
				height: 22px;
				line-height: 22px;
				margin: 0px auto;
				text-align: center;
				border-radius: 2px;
				background-color: #aaa;
				color: #fff;
			}
		}
	}
</style>