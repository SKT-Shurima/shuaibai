<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip73")'>积分</span></h4>
		<dl class="amountInfo">
			<dt><span>当前积分</span><em>{{inteInfo.integration}}</em>
			</dt>
		</dl>
		<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">积分明细</span>
	 	</div>
	 	<ul class="moneyList" v-if='integrationList'>
	 		<li v-for='item in integrationList'>
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
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import {integration,integrationDetail} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
import {MessageBox} from  'element-ui'
  export default {
    data() {
      return {
      	inteInfo: {
      		integration: ''
      	},
      	integrationList: null
      };
    },
    filters:{
    	currency
    },
    methods: {
    	changeView(view){
	      	this.$store.commit('switchView',view);
	      	location.hash = view ;
	    }
    },
    created(){
        this.$nextTick(()=>{
        	let params = {
        		access_token : sessionStorage.access_token
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