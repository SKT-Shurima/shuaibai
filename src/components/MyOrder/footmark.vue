<template>
	<div class="wrap" ref='box'>
		<div class="box" v-if='markList.length'>
			<h4 class="title">
				以下是您最近30天的浏览记录
			</h4>
			<ul class="recordList">
				<li v-for='(dayItem,index) in markList' :key='item'>
					<dl class="time">
						<dt>
							{{dayItem[0].date_add*1000|dateStyle}}
						</dt>
						<dd>
						   {{dayItem[0].date_add-0 === todayTime?"今天":dayItem[0].date_add-0 ===todayTime-86400?'昨天':dayItem[0].date_add-0 === todayTime-86400*2?'前天':""}}
						</dd>
					</dl>
					<dl class="progress">
						<dt></dt>
						<dd></dd>
					</dl>
					<ul>
						<li v-for="(item,index) in dayItem" :class='{"isNoTop":index>4}'>
							<dl>
								<dt>
									<img :src="item.cover" @click='goodDetail(item.goods_id)'>
								</dt>
								<dd>
									<span>{{item.sale_count|currency}}</span>
									<!-- <em>{{198.00|currency}}</em> -->
								</dd>
							</dl>
						</li>
					</ul>
				</li>
			</ul>
			<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		</div>
		<div v-else style='font-size:16px;'>
			暂无足迹
		</div>
	</div>
</template>
<script >
import {currency,dateStyle} from '../../common/js/filter'
import {footmark,delFoots} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import pagination from '../Common/pagination'
	export default{
		data(){
			return{
				markList: [],
				todayTime: new Date(new Date().setHours(0, 0, 0, 0)) / 1000,
				page: "1",
				pagesize: 1 ,// 总页数
			}
		},
		filters:{
			currency,dateStyle
		},
		components: {
			pagination
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)  ;
			},
			deleteFoots(id){
				MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let params = {
						access_token: getCookie('access_token'),
						ids: id
					};
		         	delFoots(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							 Message.success({
					            message: '删除成功',
					            type: 'success'
					        });
						}
					})
		        }).catch(() => {        
		        	return false   
   				});
			},
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.getList();
			},
			initList(list){
				let _this = this ;
				let oldTime = new Date(new Date(list[0].date_add *1000 ).setHours(0,0,0,0));
				oldTime  = oldTime.getTime();
				let j = 0;
				let dbArr = [];
				let arr ;
				for(let i = 0 ;i < list.length ;i++){
					let time = list[i].date_add *1000;
					let timer = new Date(new Date(time).setHours(0,0,0,0));
					timer = timer.getTime();
					if(i===j){
						if (i!==0) {
							dbArr.push(arr);
						}
						arr =[];
					};
					if (timer == oldTime) {
						arr.push(list[i]);
					}else{
						oldTime = timer;
						j = i;
						i--;
					}
					if (i===list.length-1) {
						dbArr.push(arr);
					}
				}
				_this.markList = dbArr;
				_this.pagesize = parseInt(_this.markList /10 ) +1;
			},
			getList(){
				let _this = this ;
				let params  ={
					access_token: getCookie('access_token'),
					page: _this.page
				}
				footmark(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.initList(content) ;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
	    		this.getList();
    		})
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #f0f0f0;
$primary:#c71724;
$text_color: #666;
	.wrap{
		width: 1030px;
		.title{
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-bottom: 46px;
			border-bottom: 1px solid $border_color;
			color: $primary;
		}
		.recordList{
			padding-bottom: 2px;
			li{
				position: relative;
				overflow: hidden;
				height: 100%;
				.time,.progress,ul{
					float: left;
					overflow: hidden;
				}
				.time{
					padding-left: 28px;
					dt{
						width: 100px;
						font-size: 14px;
						line-height: 16px;
					}
					dd{
						font-size: 24px;
						line-height: 30px;
						font-weight: 600;
						color: $primary;
					}
				}
				.progress{
					position: absolute;
					left: 128px;
					width: 16px;
					padding: 0px 2px;
					height: 100%;
					dt{
						height: 12px;
						border-radius: 50%;
						background-color: $border_color;
					}
					dd{
						width: 2px;
						height: 100%;
						margin: 0px 5px;
						background-color: $border_color;
					}
				}
				ul{
					width: 846px;
					overflow: hidden;
					margin-left: 56px;
					padding-bottom: 20px;
					li{
						float: left;
						width: 170px;
						height: 198px;
						padding: 10px;
						margin-right: -1px;
						border: 1px solid $border_color;
						dl{
							width: 100%;
							dt{
								width: 150px;
								height: 150px;
								img{
									width: 100%;
									height: 100%;
									cursor: pointer;
								}
							}
							dd{
								margin-top: 6px;
								line-height: 28px;
								text-align: center;
								span{
									font-size: 16px;
									font-weight: 600;
									color: $primary;
								}
								em{
									text-decoration: line-through;
									font-size: 14px;
									color: $text_color;
								}
							}
						}
					}
					li:last-child{
						margin-right: 0px;
					}
					.isNoTop{
						margin-top: -1px;
					}
				}
			}
		}
	}
</style>