<template id='container'>
	<div class="wrap">
		<div class="title">
			<ul>
				<li v-for='(item,index) in listTitle' v-text='item.name' :class='{"isTab":currentIndex===index}' :style='{zIndex:index*10,left: (340-16)*index + "px"}'></li>
			</ul>
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
import Vue from 'vue'
const routes = {
  '#/': 'submitOrder'
}

	export default{
		 data(){
			return {
				currentIndex: 0,
				listTitle: [
					{name:'1.提交订单'},
					{name:'2.付款'},
					{name:'3.卖家发货'},
					{name:'4.确认收货'}
				],
				orderInfo: null,
				currentRoute: window.location.hash
			}
		},
		components:{
			submitOrder,closeOrder
		},
		computed: {
		  	currentView () {
		      return routes[this.currentRoute]
		    }
		},
		mounted(){
			this.$nextTick(()=>{
				if(sessionStorage.orderInfo){
					this.orderInfo = sessionStorage.orderInfo;
				} else{
					window.history.go(-1);
				}
			})
		}
	}
	window.addEventListener('popstate',()=>{
		app.currentRoute = window.location.hash
	})
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			position: relative;
			width: 100%;
			height: 60px;
			overflow: hidden;
			color: #000;
			ul{
				position: absolute;
				top: 0px;
				transform: translateX(-22px);
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				font-weight: 600;
				text-align: center;
				li{
					position: absolute;
					top: 0px;
					width: 340px;
					text-align: center;
					background: url('../../../static/commonImg/progressNone.png')  100% 100% ;
					background-size: 100% 100%;
				}
				li:last-child{
					text-align: left;
					text-indent: 96px;
				}
				.isTab{
					color: #fff;
					background: url('../../../static/commonImg/progressThis.png')  100% 100%;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>