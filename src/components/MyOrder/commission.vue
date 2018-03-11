<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip100")'>佣金明细</span></h4>
		<dl class="amount-info">
			<dt><span>店铺佣金</span><em class='color-primary'>{{commission|currency}}</em>
			</dt>
			<dd>
				<el-button class='border-primary' type='text' size='small' style='width:90px;' @click='changeView("vip101")'>提现</el-button>
			</dd>
		</dl>
		<div class="color f5-bg title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">佣金明细</span>
	 	</div>
	 	<ul class="money-list" v-if='commissionList'>
	 		<li v-for='item in commissionList'>
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
</template>
<script>
import {currency,dateStyle} from '../../common/js/filter'
import {commissionDetail,commission} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import pagination from '../Common/pagination'
  export default {
    data() {
      return {
      	page: "1",
      	pagesize: 1,
      	commissionList: null,
      	commission: "0"
      };
    },
    filters:{
    	currency,
    	dateStyle
    },
    components:{
		pagination
	},
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
			commissionDetail(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.commissionList = content;
				}
			})
		}
    },
    created(){
        this.$nextTick(()=>{
        	let access_token = getCookie('access_token');
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
    		let params = {
				access_token: getCookie('access_token')
			}
			commission(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.commission = content.commission ;
				}
			})
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
			width: 390px;
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
		    width: 640px;
		    padding: 4px 0px;
		    .el-button{
		    	margin-right: 20px;
		    	border-radius: 14px;
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
		}
	}
</style>