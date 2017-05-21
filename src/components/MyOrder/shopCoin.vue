<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view37")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view372")'>购物币</span></h4>
		<dl class="amountInfo">
			<dt><span>当前购物币</span><em>200</em>
			</dt>
		</dl>
		<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">购物币明细</span>
	 	</div>
	 	<ul class="moneyList">
	 		<li v-for='item in 20'>
	 			<el-row>
	 				<el-col :span='4'>
	 					2017-01-01
	 				</el-col>
	 				<el-col :span='4'>
	 					<span>+10000.00</span>
	 				</el-col>
	 				<el-col :span='16'>
	 					信息
	 				</el-col>
	 			</el-row>
	 		</li>
	 	</ul>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
import {} from '../../common/js/api.js'
import {MessageBox} from  'element-ui'
  export default {
    data() {
      return {
      };
    },
    filters:{
    	currency
    },
    methods: {
    	changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 sessionStorage.currentView = view ;
	      }
    },
    created(){
        this.$nextTick(()=>{
        	if (sessionStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(sessionStorage.userInfo);
			}else{
				window.location.href = "login.html";
			}
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
						/*color: $primary;*/
						color: #008903;
					}
				}
			}
		}
	}
</style>