<template>
	<div class="wrap">
		<div class="box" v-if='expressInfo'>
			<h4>
				<div class="border-c color-primary title">物流信息</div>
			</h4>
			<div class="logistics-info">
				<div class="logistics-info-title">
					<el-row>
						<el-col :span='6'>发货方式：快递</el-col>
						<el-col :span='6'>物流公司：{{expressInfo.type}}</el-col>
						<el-col :span='6'>运单编号：{{expressInfo.number}}</el-col>
						<el-col :span='6'>客服电话：</el-col>
					</el-row>
				</div>
				<div class="logistics-info-detail">
					<el-row>
						<el-col :span='2' style='line-height:40px'>
							物流跟踪：
						</el-col>
						<el-col :span='22'>
							<ul>
								<li v-for='(item,index) in  expressInfo.list' :class='{"move-here":index===expressInfo.list.length-1}'>
									<div class="time-col">{{item.time}}</div>
									<dl class="slider-col">
										<dd :style='{opacity: index===0?0:1}'></dd>
										<dt></dt>
										<dd :style='{opacity: index===expressInfo.list.length-1?0:1}'></dd>
									</dl>
									<div class="info-col" v-html='item.status'>
									</div>
								</li>
							</ul> 
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {express} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
	export default{
		data(){
			return{
				expressInfo: null
			}
		},
		 props:{
	    	orderInfo: {
	    		type: Object,
	    		required: true
	    	}
	    },
	     watch: {
	   	  orderInfo :{
	   	  	handler(newVal,oldVal){
	   	  		console.log(this.orderInfo.order.express_sn)
	   	  		this.getEpress();
	   	  	}
	   	  }
	   }, 
	   methods:{
	   		getEpress(){
	   			let params = {
	   				access_token: getCookie('access_token'),
	   				type: "",
	   				number: this.orderInfo.order.express_sn
	   			}
	   			express(params).then(res=>{
	   				let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						content.list = content.list.reverse();
						this.expressInfo = content ;
					}
	   			})
	   		}	
	   }
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		.status{
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			margin-top:40px;
			margin-bottom: 24px;
		}
		h4{
			border-bottom: 1px solid #ccc;
			height: 40px;
			.title{
				float: left;
				width: 106px;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #fff;
				font-size: 18px;
				text-align: center;
			}
		}
	}
	.logistics-info{
		width: 100%;
		font-size: 16px;
		margin-bottom: 50px;
	}
	.logistics-info-title{
		width: 100%;
		margin-top: 46px;
		margin-bottom: 26px;
	}
	.logistics-info-detail{
		.el-row{
			width: 960px;
		}
		li{
			overflow: hidden;
			height: 100%;
		}
		.time-col,.slider-col,.info-col{
			float: left;
			line-height: 40px;
		}
		.time-col{
			width: 194px;
		}
		.slider-col{
			position: relative;
			width: 8px;
			height: 40px;
			dt{
				position: absolute;
				top: 0px;
				bottom: 0px;
				margin: auto;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: #ccc;
			}
			dd{
				width: 1px;
				height: 20px;
				margin: 0px auto;
				background-color: #ccc;
			}
		}
		.info-col{
			width: 556px;
			margin-left: 36px;
		}
		.move-here {
			color: #c71724;
			dt{
				width: 10px;
				height: 10px;
				left: -1px;
				background-color: #c71724;
			}
		}
	}
</style>