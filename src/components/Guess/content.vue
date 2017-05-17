<template>	
	 <div class="recommend" style="margin-top:60px;">
	 	<div class="title">
	 		<i class="icon"></i>
	 		<span style="vertical-align: 4px;">猜你喜欢</span>
	 		<strong>换一组<i></i></strong>
	 	</div>
	 	<ul class="youLove">
	 		<li class="infoList" v-for='item in 6'>
	 			<dl>
					<dt>
						<img src="">
					</dt>
					<dd>
						<div class="sellInfo">
							9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
						</div>
						<div class="priceInfo">
							<span>
								{{168.00|currency}}
							</span>
							<em>
								{{2017}}人付款
							</em>
						</div>
					</dd>
				</dl>
	 		</li>
	 	</ul>
	 </div>
</template>
<script>
	import {currency} from '../../common/js/filter.js'
	export default {
		filters:{
			currency
		},
		methods:{
			init(){

			}
		},
		mounted(){
			this.$nextTick(()=>{

			})
		}
	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
	 .recommend{
	 	width: 100%;
	 	overflow: hidden;
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
			strong{
				float: right;
				font-size: 14px;
			}
		}
		.youLove{
			width: 100%;
			margin-top: 14px;
			overflow: hidden;
			.infoList{
				float: left;
				width: 209px;
				padding: 14px;
				margin-right: -1px;
				border: 1px solid #f0f0f0;
				dl{
					dt{
						width: 180px;
						height: 180px;
						img{
							width: 100%;
							height: 100%; 
						}
					}
					dd{
						width: 100%;
						overflow: hidden;
						.sellInfo{
							line-height: 18px;
							font-weight: 600;
							margin-top: 10px;
						}
						.priceInfo{
							margin-top: 6px;
							span{
								font-size: 18px;
								font-weight: 600;
								color: $primary;
							}
							em{
								margin-top: 4px;
								float: right;
								color: #999;
							}
						}
					}	 
				}
			}
		}
 }
</style>