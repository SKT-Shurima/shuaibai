<template>
	<div class="wrap">
		<h4 class="title">
			以下是您最近30天的浏览记录
		</h4>
		<ul class="recordList">
			<li v-for='item in 3'>
				<dl class="time">
					<dt>
						2017-04-13
					</dt>
					<dd>
						今天
					</dd>
				</dl>
				<dl class="progress">
					<dt></dt>
					<dd></dd>
				</dl>
				<ul>
					<li v-for="(item,index) in 8"m :class='{"isNoTop":index>4}'>
						<dl>
							<dt>
								<img src="">
							</dt>
							<dd>
								<span>{{98.00|currency}}</span>
								<em>{{198.00|currency}}</em>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script >
import {currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{

			}
		},
		filters:{
			currency
		},
		mounted(){

		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
	.wrap{
		width: 1030px;
		.title{
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-bottom: 46px;
			border-bottom: 1px solid $border_color;
			color: $primary;
		}
		.recordList{
			li{
				position: relative;
				overflow: hidden;
				height: 100%;
				.time,.progress,ul{
					float: left;
					overflow: hidden;
				}
				.time{
					padding-left: 28px;
					dt{
						width: 100px;
						font-size: 14px;
						line-height: 16px;
					}
					dd{
						font-size: 24px;
						line-height: 30px;
						font-weight: 600;
						color: $primary;
					}
				}
				.progress{
					position: absolute;
					left: 128px;
					width: 16px;
					padding: 0px 2px;
					height: 100%;
					dt{
						height: 12px;
						border-radius: 50%;
						background-color: $border_color;
					}
					dd{
						width: 2px;
						height: 100%;
						margin: 0px 5px;
						background-color: $border_color;
					}
				}
				ul{
					width: 846px;
					overflow: hidden;
					margin-left: 56px;
					li{
						float: left;
						width: 170px;
						height: 198px;
						padding: 10px;
						margin-right: -1px;
						border: 1px solid $border_color;
						dl{
							width: 100%;
							dt{
								width: 150px;
								height: 150px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							dd{
								margin-top: 6px;
								line-height: 28px;
								text-align: center;
								span{
									font-size: 16px;
									font-weight: 600;
									color: $primary;
								}
								em{
									text-decoration: line-through;
									font-size: 14px;
									color: $text_color;
								}
							}
						}
					}
					li:last-child{
						margin-right: 0px;
					}
					.isNoTop{
						margin-top: -1px;
					}
				}
			}
		}
	}
</style>