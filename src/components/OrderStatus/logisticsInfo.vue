<template>
	<div class="wrap">
		<div class="box" v-if='expressInfo'>
			<h4>
				<div class="title">
					物流信息
				</div>
			</h4>
			<div class="logisticsInfo">
				<div class="logisticsInfoTitle">
					<el-row>
						<el-col :span='6'>
							发货方式：快递
						</el-col>
						<el-col :span='6'>
							物流公司：{{expressInfo.type}}
						</el-col>
						<el-col :span='6'>
							运单编号：{{expressInfo.number}}
						</el-col>
						<el-col :span='6'>
							客服电话：
						</el-col>
					</el-row>
				</div>
				<div class="logisticsInfoDetails">
					<el-row>
						<el-col :span='2' style='line-height:40px'>
							物流跟踪：
						</el-col>
						<el-col :span='22'>
							<ul>
								<li v-for='(item,index) in  expressInfo.list' :class='{"moveHere":index===expressInfo.list.length-1}'>
									<div class="timeCol">
										{{item.time}}
									</div>
									<dl class="sliderCol">
										<dd :style='{opacity: index===0?0:1}'></dd>
										<dt></dt>
										<dd :style='{opacity: index===expressInfo.list.length-1?0:1}'></dd>
									</dl>
									<div class="infoCol" v-html='item.status'>
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
	   	  		let _this = this ;
	   	  		_this.getEpress();
	   	  	}
	   	  }
	   }, 
	   methods:{
	   		getEpress(){
	   			let _this = this ;
	   			let params = {
	   				access_token: getCookie('access_token'),
	   				type: "",
	   				number: _this.orderInfo.order.express_sn
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
	$primary:#c71724;
	$text_color: #666;
	$border_color: #ddd;
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
			border-bottom: 1px solid $border_color;
			height: 40px;
			.title{
				float: left;
				width: 106px;
				height: 40px;
				line-height: 40px;
				border-top: 1px solid $border_color;
				border-right: 1px solid $border_color;
				border-left: 1px solid $border_color;
				border-bottom: 1px solid #fff;
				font-size: 18px;
				text-align: center;
				color: $primary;
			}
		}
		.logisticsInfo{
			width: 100%;
			font-size: 16px;
			margin-bottom: 50px;
			.logisticsInfoTitle{
				width: 100%;
				margin-top: 46px;
				margin-bottom: 26px;
			}
			.logisticsInfoDetails{
				.el-row{
					width: 960px;
					ul{
						li{
							overflow: hidden;
							height: 100%;
							.timeCol,.sliderCol,.infoCol{
								float: left;
								line-height: 40px;
							}
							.timeCol{
								width: 194px;
							}
							.sliderCol{
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
									background-color: $border_color;
								}
								dd{
									width: 1px;
									height: 20px;
									margin: 0px auto;
									background-color: $border_color;
								}
							}
							.infoCol{
								width: 556px;
								margin-left: 36px;
							}
						}
						.moveHere {
							color: $primary;
							.sliderCol{
								dt{
									width: 10px;
									height: 10px;
									left: -1px;
									background-color: $primary;
								}
							}
						}
					}
					
				}
			}
		}
		
	}
</style>