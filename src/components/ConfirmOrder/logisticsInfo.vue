<template>
	<div class="wrap">
		<div class="box">
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
							物流公司：圆通速递
						</el-col>
						<el-col :span='6'>
							运单编号：154651546431654
						</el-col>
						<el-col :span='6'>
							客服电话：16546131646164
						</el-col>
					</el-row>
				</div>
				<div class="logisticsInfoDetails">
					<el-row>
						<el-col :span='2'>
							物流跟踪：
						</el-col>
						<el-col :span='22'>
							<ul>
								<li v-for='(item,index) in  5'>
									<div class="timeCol">
										2017-05-03 18:38:34
									</div>
									<dl class="sliderCol">
										<dt></dt>
										<dd></dd>
									</dl>
									<div class="infoCol">
										杭州圆周率已收
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
import {currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{

			}
		},
		filters:{
			currency
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
							}
							.timeCol{
								width: 194px;
								padding-bottom: 22px;
							}
							.sliderCol{
								width: 6px;
								height: 40px;
								dt{
									width: 6px;
									height: 6px;
									margin-top: 4px;
									border-radius: 50%;
									background-color: $border_color;
								}
								dd{
									width: 1px;
									height: 30px;
									height: 100%;
									margin: 0px auto;
									background-color: $border_color;
								}
							}
							.infoCol{
								width: 556px;
								margin-left: 36px;
								padding-bottom: 22px;
							}
						}
					}
					
				}
			}
		}
		
	}
</style>