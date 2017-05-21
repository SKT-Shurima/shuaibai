<template>
	<div class="wrap">
		<div class="title">
			
		</div>
		<div>
			<keep-alive>
				<component :is='currentView'></component>
		    </keep-alive>
		</div>
	</div>
</template>
<script>
import submitOrder from './submitOrder'
import closeOrder from './closeOrder'
	export default{
		data(){
			return {
				currentView: 'view1'
			}
		},
		components:{
			"view0": submitOrder,
			"view1": closeOrder
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			width: 100%;
			height: 40px;
			background-color: $primary;
		}
	}
</style>