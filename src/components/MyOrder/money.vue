<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip9")'>资金管理</span></h4>
		<dl class="amount-info">
			<dt><span>账户余额</span><em class='ellipsis-1 color-primary'>{{userInfo.account|currency}}</em>
			</dt>
			<dd>
				<el-button  type='text' size='small' style='width:90px;' @click='changeView("vip90")'>充值</el-button>
				<el-button  type='text' size='small' style='width:90px;' @click='changeView("vip91")'>提现</el-button>
				<el-button  type='text' size='small' style='width:90px;' @click='changeView("vip94")'>钱包</el-button>
				<el-button  type='text' size='small' style='width:108px;' @click='changeView("vip92")'>购物积分</el-button>
				<el-button  type='text' size='small' style='width:108px;' @click='changeView("vip95")'>鸿府积分</el-button>
				<el-button  type='text' size='small' style='width:92px;' @click='changeView("vip93")'>积分</el-button>
			</dd>
		</dl>
		<div class="color-6 f5-bg title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">资金明细</span>
	 	</div>
	 	<div v-if='financeList.length'>
	 		<ul class="money-list">
		 		<li v-for='item in financeList'>
		 			<el-row>
		 				<el-col :span='4'>
		 					{{item.date_add*1000 | dateStyle}}
		 				</el-col>
		 				<el-col :span='4'>
		 					<span :class='{"color-primary":item.title-0<0}'>{{item.title}}</span>
		 				</el-col>
		 				<el-col :span='16'>
		 					{{item.comments}}
		 				</el-col>
		 			</el-row>
		 		</li>
		 	</ul>
		 	<pagination :pagesize='pagesize' @changePage='changePage' ref='pagination'></pagination>
	 	</div>
	 	<div v-else style='font-size:16px;margin-top: 16px;'>
			暂无资金明细
		</div>
	</div>
</template>
<script>
import {currency,dateStyle} from '../../common/js/filter'
import {finance} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import pagination from '../Common/pagination'
  export default {
    data() {
      return {
      	userInfo: {
      		account: ''
      	},
      	page: "1",
      	pagesize: 1,
      	financeList: []
      };
    },
    filters:{
    	currency,
    	dateStyle
    },
    components:{
		pagination
	},
	mixins: [userInfo], 
    methods: {
    	changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	    },
	    // 改变页数
		changePage(page){
			this.page = page + "" ;
			this.initList();
		},
		initList(){
			let params  ={
				access_token: getCookie('access_token'),
				page: this.page
			}
			finance(params).then(res=>{
				let {errcode,message,content,pageSize} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.financeList = content;
					this.pagesize  = pageSize-0 ;
				}
			})
		}
    },
    created(){
        this.$nextTick(()=>{
        	let access_token = getCookie('access_token') ;
        	if (!access_token) {
				location.href = "login.html";
			}
        })
    },
    mounted(){
    	this.$nextTick(()=>{
    		// 是否含有‘猜你喜欢’
    		this.$emit('hasGuess',false);
    		this.initList();
    	})
    }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
	}
	.amount-info{
		overflow: hidden;
		padding: 46px 0px;
		dt,dd{
			float: left;
		}
		dt{
			width: 330px;
			height: 36px;
			line-height: 36px;
			span{
				padding-left: 20px;
				padding-right: 10px;
				vertical-align: top;
			}
			em{
				font-size: 28px;
				font-weight: 600;
			}
		}
		dd{
		    width: 700px;
		    padding: 4px 0px;
		    .el-button{
		    	border-radius: 14px;
		    	border: 1px solid #c71724;
		    }
		    .el-button:hover{
		    	color: #fff;
				background-color: #c71724;
		    }
		}
	}
	.title{
		width: 100%;
		height: 40px;
		padding: 10px;
		line-height: 20px;
		.icon{
			display: inline-block;
			width: 8px;
			height: 20px;
		}
		span{
			font-size: 16px;
			font-weight: 600;
		}
	}
	.money-list{
		width: 840px;
		margin-left: 20px;
		margin-top: 10px;
		li{
			height: 40px;
			line-height: 40px;
		}
		.el-col-4{
			span{
				font-weight: 600;
				color: #008903;
			}
			.color-primary{
				color: #c71724;
			}
		}
	}
</style>