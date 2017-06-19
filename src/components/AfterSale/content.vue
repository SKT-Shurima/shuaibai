<template>
	<div class="wrap">
		<div class="title">
			
		</div>
		<div class="container">
			<dl class="box">
				<dt class="infoCol conTitle">商品信息</dt>
				<dd class="conCol conTitle">售后申请</dd>
			</dl>
			<dl class="box">
				<dt class="infoCol" style="min-height: 600px;">
					
				</dt>
				<dd class="conCol" style="min-height: 600px;">
					<keep-alive>
						<component :is='currentView'></component>
					</keep-alive>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
import seller from './seller'
import moneyReturn from './moneyReturn'
import goodsReturn from './goodsReturn'
export default {
	data() {
		return {
			currentView:"view1"
		}
	},
	filters: {
		currency
	},
	components:{
		"view0": seller,
		"view1": moneyReturn,
		"view2": goodsReturn
	}
}
	
</script>
<style lang='scss' scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			width: 100%;
			height: 60px;
			background-color: $primary;
		}
		.container{
			margin-top: 6px;
			margin-bottom: 400px;
			.box{
				overflow: hidden;
				.infoCol.conTitle,.conCol.conTitle{
					height: 54px;
					font-size: 14px;
					font-weight: 600;
					color: $primary;
					border: none;
				}
				.infoCol,.conCol{
					float: left;
					border: 1px solid $border_color;
				}
				.infoCol{
					width: 240px;
					padding: 20px;
				}
				.conCol{
					width: 1010px;
					padding: 20px 30px;
					margin-left: -1px;
				}
			}
		}
	}
</style>