<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view20")'>消息</span></h4>
		<div v-if='msgList!==""'>
			<ul class="orderMsg" v-if='msgList.length>0'>
				<li v-for='(item,index) in msgList' :key='item'>
					<el-row>
						<el-col :span='4'>
							订单消息
						</el-col>
						<el-col :span='10'>
							您的订单有新的动态
						</el-col>
						<el-col :span='10' style='text-align: right;padding-right: 34px;'>
							{{item.date_add*1000 | timeTrans}}
						</el-col>
					</el-row>
					<dl>
						<dt>
							<img :src="item.goods_cover">
						</dt>
						<dd style="width:240px;line-height:70px;">
							订单号: {{item.order_sn}}
						</dd>
						<dd style="width:80px;line-height:70px;" v-text='item.state_name'></dd>
						<dd style="padding-top:24px; ">
							<el-button size='mini' type='primary' @click='checkDetail(item.order_sn)'>
								去看看
							</el-button>
						</dd>
					</dl>
				</li>
			</ul>
			<div v-else class="noMsg">
				暂无消息
			</div>
		</div>
		<div v-else class="noMsg">
			正在请求数据请稍后。。。
		</div>
		<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	</div>
</template>
<script>
import {timeTrans} from '../../common/js/filter'
import {getExpressMessages} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import pagination from '../Common/pagination'
	export default {
		data(){
			return {
				msgList: "",
				page: "1",
				pagesize: 1 ,// 总页数
			}
		},
		components: {
			pagination
		},
		filters: {
			timeTrans
		},
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 location.hash = view ;
		    },
		    checkDetail(order_sn){
		    	window.open(`orderDetail.html#?order_sn=${order_sn}`) ; 
		    },
		    // 改变页数
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.getList();
			},
			initList(){
				let _this = this ;
				let params = {
					access_token: getCookie('access_token'),
					page: _this.page,
					t: " 4" 
				}
				getExpressMessages(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.msgList = content.content ;
						this.pagesize = content.pageSize ;
					}
				})
			}
		},
		created(){
	        this.$nextTick(()=>{
	        	this.initList();
	        })
	    }
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid $border_color;
			color: $text_color;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.orderMsg{
			li{
				width: 100%;
				height: 144px;
				padding: 18px 4px;
				border-bottom: 1px solid $border_color;
				.el-row{
					width: 500px;
					line-height: 22px;
					margin-bottom: 16px;
					overflow: hidden;
					.el-col-4{
						font-size: 14px;
						font-weight: 600;
						color: $primary;
					}
					.el-col-6{
						color: $text_color;
					}
				}
				dl{
					width: 500px;
					overflow: hidden;
					dt{
						float: left;
						width: 70px;
						height: 70px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					dd{
						float: left;
						margin-left: 10px;
					}
				}
			}
		}
		.noMsg{
			font-size: 16px;
			margin-top: 20px;
		}
	}
</style>