<template id='container'>
	<div class="wrap">
		<div class="title">
			<ul class="list-box">
				<li v-for='(item,index) in listTitle' v-text='item.name' :class='{"isTab":currentIndex===index}' :style='{zIndex:index*10,left: (448-16)*index + "px"}'></li>
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
import payfor from  './payfor'
import payResult from './payResult'
import scode from './scode'
import {MessageBox} from  'element-ui'
window.onpopstate = function() {  
       location.reload() ;
 }; 
	export default{
		 data(){
			return {
				currentIndex: "",
				listTitle: [
					{name:'1.确认订单信息'},
					{name:'2.付款'},
					{name:'3.支付结果'}
				]
			}
		},
		components:{
			submitOrder,
			payfor,
			scode,
			payResult
		},
		computed: {
		  	currentView () {
		      return this.$store.state.view;
		    }
		},
		methods: {
			init(){
				let hash = location.hash.split("?")[0] ;
				let view = '';
				if (hash) {
					view = hash.slice(1) ;
					this.$store.commit('switchView',view);
				}
				switch (view) {
					case "submitOrder" : 
						this.currentIndex = 0 ;
					break ;
					case "payfor" : 
						this.currentIndex = 1 ;
					break ;
					case "scode" : 
						this.currentIndex = 1 ;
					break ;
					case "payResult" : 
						this.currentIndex = 2 ;
					break ;
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			position: relative;
			width: 100%;
			height: 60px;
			overflow: hidden;
			color: #000;
		}
		.list-box{
			position: absolute;
			top: 0px;
			transform: translateX(-30px);
			height: 60px;
			line-height: 60px;
			font-size: 20px;
			text-align: center;
			li{
				position: absolute;
				top: 0px;
				width: 448px;
				text-align: center;
				background: url('../../../static/commonImg/progressNone.png')  100% 100% ;
				background-size: 100% 100%;
			}
			li:last-child{
				text-align: left;
				text-indent: 160px;
			}
			.isTab{
				color: #fff;
				background: url('../../../static/commonImg/progressThis.png')  100% 100%;
				background-size: 100% 100%;
			}
		}
	}
</style>