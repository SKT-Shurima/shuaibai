<template>
	<div class="wrap">
		<h4 class="title">
			以下是您最近30天的浏览记录
		</h4>
		<ul class="recordList" v-if='markList'>
			<li v-for='item in markList'>
				<dl class="time">
					<dt>
						{{markList.date_add*1000|dateStyle}}
					</dt>
					<dd>
					   {{markList.date_add > todayTime?"今天":markList.date_add>todayTime-86400?'昨天':markList.date_add>todayTime-86400*2?'前天':""}}
					</dd>
				</dl>
				<dl class="progress">
					<dt></dt>
					<dd></dd>
				</dl>
				<ul>
					<li v-for="(item,index) in 8"m :class='{"isNoTop":index>4}'>
						<dl>
							<dt>
								<img src="">
							</dt>
							<dd>
								<span>{{98.00|currency}}</span>
								<em>{{198.00|currency}}</em>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script >
import {currency,dateStyle} from '../../common/js/filter.js'
import {footmark,delFoots} from '../../common/js/api.js'
	export default{
		data(){
			return{
				markList: null,
				todayTime: 0
			}
		},
		filters:{
			currency,dateStyle
		},
		mothods:{
			deleteFoots(id){
				MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let params = {
						access_token : sessionStorage.access_token,
						ids: id
					};
		         	delFoots(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode !== 0){
							if (errcode === 99) {
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
						          		window.location.href = 'login.html';
						          	}
							    });
		            		}else{
		            			MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
		            		}
						}else {
							
						}
					})
		        }).catch(() => {          
   				});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.todayTime =  new Date(new Date().setHours(0, 0, 0, 0)) / 1000;;
	    		let params  ={
					access_token : sessionStorage.access_token,
					page: "0"
				}
				footmark(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		window.location.href = 'login.html';
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else {
						this.markList = content;
					}
				})
    	})
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
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