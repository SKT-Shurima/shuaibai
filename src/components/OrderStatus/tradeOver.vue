<template>
	<div class="wrap">
		<order-status :order-info='orderInfo'></order-status>
		<logistics-info :order-info='orderInfo'></logistics-info>
		<order-info @getInfo='getOrderInfo'></order-info>
	</div>
</template>
<script>
import orderStatus from './orderStatus'
import logisticsInfo from './logisticsInfo'
import orderInfo from '../OrderInfo/orderInfo'
	export default {
		data(){
	   	  return {
	   	  	  orderInfo: {}
	   	  }
	    },
		components: {
			orderStatus,logisticsInfo,orderInfo
		},
		methods:{
			getOrderInfo(msg){
				this.orderInfo  = msg;
			}
	   }
	}
</script>