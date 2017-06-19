<template>
	<div class="wrap">
		<order-status :order-info='orderInfo'></order-status>
		<order-info @getInfo='getOrderInfo'></order-info>
	</div>
</template>
<script>
import orderStatus  from './orderStatus'
import orderInfo from '../OrderInfo/orderInfo'

	export default {
		data(){
	   	  return {
	   	  	  orderInfo: {}
	   	  }
	    },
		components:{
			orderStatus,
			orderInfo 
		},
		methods:{
			getOrderInfo(msg){
				this.orderInfo  = msg;
			}
	   }
	}
</script>