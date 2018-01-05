<template>
	<div class="wrap">
		<div class="title">
			<ul>
				<li v-for='(item,index) in listTitle' v-text='item.name' :class='{"is-tab":currentIndex===index}' :style='{zIndex:index*10,left: (340-16)*index + "px"}'></li>
			</ul>
		</div>
		<div class="container">
			<dl class="box">
				<dt class="info-col con-title">商品信息</dt>
				<dd class="con-col con-title">售后申请</dd>
			</dl>
			<dl class="box">
				<dt class="info-col" style="min-height: 600px;">
					<order-info></order-info>
				</dt>
				<dd class="con-col" style="min-height: 600px;">
					<keep-alive>
						<component :is='currentView'></component>
					</keep-alive>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {getHashReq} from '../../common/js/common'
import orderInfo from '../AfterSaleCommon/orderInfo'
import seller from '../AfterSaleCommon/seller'
import editGoodsReturn from './editGoodsReturn'
import {MessageBox} from  'element-ui'
export default {
	data() {
		window.addEventListener("popstate",()=>{
	 		this.init();
	 	})
		return {
			orderInfo: {},
			currentView:"",
			currentIndex: "",
			listTitle: [
				{name:'1.申请售后'},
				{name:'2.卖家处理'},
				{name:'3.退回商品'},
				{name:'4.确认结果'}
			],
			reqParams: null
		}
	},
	components:{
		orderInfo,seller,editGoodsReturn,
		goodsReturn:seller
	},
	methods:{
		getOrderInfo(info){
			this.orderInfo = info;
		},
		init(){
	      	let hash = location.hash.split("?")[0] ;
	      	let view = hash.slice(1) ;
		    this.reqParams = getHashReq();
		    switch (view){
		    	case 'seller':
		    		this.currentIndex = 1 ;
	 		    	this.currentView = view ;
		    	break;
		    	case 'editGoodsReturn':
		    		this.currentIndex = 1 ;
	 		    	this.currentView = view ;
		    	break;
		    	case 'result':
		    		this.currentIndex = 3 ;
	 		    	this.currentView = 'seller' ;
		    	break;
		    	case 'goodsReturn':
		    		this.currentIndex = 2 ;
	 		    	this.currentView = 'goodsReturn' ;
		    	break;
		    	default:
			    	this.currentIndex = 0 ;
	 		    	this.currentView = 'seller' ;
 		    	break;
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
			ul{
				position: absolute;
				top: 0px;
				transform: translateX(-22px);
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				text-align: center;
			}
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
			.is-tab{
				color: #fff;
				background: url('../../../static/commonImg/progressThis.png')  100% 100%;
				background-size: 100% 100%;
			}
		}
		.container{
			margin-top: 6px;
			margin-bottom: 400px;
			.box{
				overflow: hidden;
			}
			.info-col.con-title,.con-col.con-title{
				height: 54px;
				font-size: 14px;
				font-weight: 600;
				color: #c71724;
				border: none;
			}
			.info-col,.con-col{
				float: left;
				border: 1px solid #ddd;
			}
			.info-col{
				width: 240px;
				padding: 20px;
			}
			.con-col{
				width: 1010px;
				padding: 20px 30px;
				margin-left: -1px;
			}
		}
	}
</style>