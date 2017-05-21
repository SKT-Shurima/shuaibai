<template>
	<div class="wrap">
		<pay></pay>
		<order-status></order-status>
		<logistics-info></logistics-info>
		<order-info></order-info>
	</div>
</template>
<script>
	import pay from './pay'
	import  orderStatus from './orderStatus'
	import  logisticsInfo from './logisticsInfo'
	import orderInfo from './orderInfo'
	export default{
		components:{
			pay,
			orderStatus,
			logisticsInfo,
			orderInfo
		}
	}
</script>