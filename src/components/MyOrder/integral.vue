<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip9")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip93")'>积分</span></h4>
		<dl class="amount-info">
			<dt><span>当前积分</span><em class='color-primary'>{{inteInfo.integration}}</em>
			</dt>
		</dl>
		<div class="f5-bg color-6 title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">积分明细</span>
	 	</div>
	 	<div v-if='integrationList.length'>
	 		<ul class="money-list" >
		 		<li v-for='item in integrationList'>
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
			暂无积分明细
		</div>
	</div>
</template>
<script>
import {integration,integrationDetail} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
  export default {
    data() {
      return {
      	inteInfo: {
      		integration: ''
      	},
      	integrationList: [],
      	page: "1"
      };
    },
    methods: {
    	 // 改变页数
		changePage(page){
			this.page = page + "" ;
			this.initList();
		},
    	changeView(view){
	      	this.$store.commit('switchView',view);
	      	location.hash = view ;
	    },
	    initList(){
	    	let params = {
	    		access_token: getCookie('access_token'),
	    		page: this.page
	    	}
	    	integrationDetail(params).then(res=>{
	    		let {errcode,message,content} = res;
        		if (errcode !== 0) {
        			errorInfo(errcode,message) ;
        		}else {
        			this.integrationList = content ;
        		}
	    	})
	    }
    },
    created(){
        this.$nextTick(()=>{
        	let params = {
        		access_token: getCookie('access_token')
        	}
        	integration(params).then(res=>{
        		let {errcode,message,content} = res;
        		if (errcode !== 0) {
        			errorInfo(errcode,message) ;
        		}else {
        			this.inteInfo = content ;
        		}
        	})
        })
    },
    mounted(){
    	this.$emit('hasGuess',false);
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