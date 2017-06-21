<template>
	<div class="wrap">
		<!-- 分类 -->
		<ul class="navList">
			<li><div class="title">查看全部分类</div></li>
			<li><div class="title">店铺热卖</div></li>
			<li><div class="title">掌柜推荐</div></li>
			<li><div class="title">护肤品 
				<img src="../../../static/detailImg/close.png" height="14" width="14">
			</div>
				<ul>
					<li v-for='item in 4'>面膜</li>
				</ul>
			</li>
			<li><div class="title">护肤品
					<img src="../../../static/detailImg/close.png" height="14" width="14">
				</div>
				<ul>
					<li v-for='item in 4'>面膜</li>
				</ul>
			</li>
			<li><div class="title">护肤品
					<img src="../../../static/detailImg/close.png" height="14" width="14">
				</div>
				<ul>
					<li v-for='item in 4'>面膜</li>
				</ul>
			</li> 
		</ul> 
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
$bg_title: #f5f5f5;
	.wrap{
		.navList{
			width: 220px;
			margin-left: 10px;
			border-left: 1px solid $border_color;
			border-right: 1px solid $border_color;
			border-top: 1px solid $border_color;
			.title{
				position: relative;
				background-color: $bg_title;
				padding-left: 16px;
				line-height: 40px;
				font-weight: 600;
				font-size: 14px;
				border-bottom: 1px solid $border_color;
				img{
					position: absolute;
					top: 0px;
					bottom: 0px;
					right: 10px;
					margin: auto;

				}
			}
			ul{
				border-bottom: 1px solid $border_color;
				li{
					color: $text_color;
					line-height: 36px;
					padding-left: 10px;
					font-weight: 400;
				}
			}
		}
	}
</style>