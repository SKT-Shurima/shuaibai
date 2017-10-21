<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip72")'>会员积分</span></h4>
		<dl class="amountInfo">
			<dt><span>当前会员积分</span><em v-text='shoppingCoinInfo.shopping_coin'></em>
			</dt>
		</dl>
		<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">会员积分明细</span>
	 	</div>
	 	<div v-if='shopCoinList.length'>
	 		<ul class="moneyList">
		 		<li v-for='item in shopCoinList'>
		 			<el-row>
		 				<el-col :span='4'>
		 					{{item.date_add*1000 | dateStyle}}
		 				</el-col>
		 				<el-col :span='4'>
		 					<span :class='{"expent":item.title-0<0}'>{{item.title}}</span>
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
			暂无会员积分明细
		</div>
	</div>
</template>
<script>
import {dateStyle} from '../../common/js/filter'
import {shoppingCoin,shoppingCoinDetail} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import pagination from '../Common/pagination'
  export default {
    data() {
      return {
      	shoppingCoinInfo: {
      		shopping_coin:''
      	},
      	shopCoinList: null,
      	page: "1",
      	pagesize: 1,
      };
    },
    filters:{
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
			let _this = this ;
			_this.page = page + "" ;
			_this.initList();
		},
		initList(){
			let params  ={
				access_token: getCookie('access_token'),
				page: this.page
			}
			shoppingCoinDetail(params).then(res=>{
				let {errcode,message,content,pageSize} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.shopCoinList = content;
					this.pagesize = pageSize
				}
			})
		}
    },
    created(){
        this.$nextTick(()=>{
        	let params = {
        		access_token: getCookie('access_token')
        	}
        	shoppingCoin(params).then(res=>{
        		let {errcode,message,content} = res;
        		if (errcode !== 0) {
        			errorInfo(errcode,message) ;
        		}else {
        			this.shoppingCoinInfo = content ;
        		}
        	})
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
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
$bg_title: #f5f5f5;
	.wrap{
		width: 1030px;
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
		.amountInfo{
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
					color: $primary;
				}
			}
		}
		.title{
			width: 100%;
			height: 40px;
			padding: 10px;
			line-height: 20px;
			color: $text_color;
			background-color: $bg_title;
			.icon{
				display: inline-block;
				width: 8px;
				height: 20px;
				background-color: $primary;
			}
			span{
				font-size: 16px;
				font-weight: 600;
			}
		}
		.moneyList{
			width: 840px;
			margin-left: 20px;
			margin-top: 10px;
			li{
				height: 40px;
				line-height: 40px;
				.el-col-4{
					span{
						font-weight: 600;
						color: #008903;
					}
					.expent{
						color: $primary;
					}
				}
			}
		}
	}
</style>