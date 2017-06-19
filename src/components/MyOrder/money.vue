<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("vip7")'>资金管理</span></h4>
		<dl class="amountInfo">
			<dt><span>账户余额</span><em>{{userInfo.account|currency}}</em>
			</dt>
			<dd>
				<el-button type='text' size='small' style='width:90px;' @click='changeView("vip70")'>充值</el-button>
				<el-button type='text' size='small' style='width:90px;' @click='changeView("vip71")'>提现</el-button>
				<el-button type='text' size='small' style='width:108px;' @click='changeView("vip72")'>购物币详情</el-button>
				<el-button type='text' size='small' style='width:92px;' @click='changeView("vip73")'>积分详情</el-button>
			</dd>
		</dl>
		<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">资金明细</span>
	 	</div>
	 	<ul class="moneyList" v-if='financeList'>
	 		<li v-for='item in financeList'>
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
import {currency,dateStyle} from '../../common/js/filter'
import {finance} from '../../common/js/api'
import {MessageBox} from  'element-ui'
  export default {
    data() {
      return {
      	userInfo: {
      		account: ''
      	},
      	financeList: null
      };
    },
    filters:{
    	currency,
    	dateStyle
    },
    methods: {
    	changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
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
    	this.$nextTick(()=>{
    		// 是否含有‘猜你喜欢’
    		this.$emit('hasGuess',false);
    		let params  ={
				access_token : sessionStorage.access_token,
				page: "0"
			}
			finance(params).then(res=>{
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
					this.financeList = content;
				}
			})
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
			dd{
			    width: 640px;
			    padding: 4px 0px;
			    .el-button{
			    	margin-right: 20px;
			    	border-radius: 14px;
					border: 1px solid $primary;
			    }
			    .el-button:hover{
			    	color: #fff;
					background-color: $primary;
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