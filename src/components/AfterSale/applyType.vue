<template>
	<div class="wrap">
		<ul>
			<li>
				我要退款
			</li>
			<li>
				我要退货
			</li>
			<li>
				我要换货/维修
			</li>
		</ul>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang='scss' scoped>
$border_color: #ddd;
	.wrap{
		width: 100%;
		ul{
			width: 320px;
			margin-left: 200px;
			margin-top: 106px;
			li{
				width: 300px;
				height: 58px;
				border: 1px solid $border_color ;
				text-align: center;
				line-height: 58px;
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 20px;
				cursor: pointer;	
			}
		}
	}
</style>