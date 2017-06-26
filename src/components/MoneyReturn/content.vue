<template>
	<div class="wrap">
		<div class="title">
			<ul>
				<li v-for='(item,index) in listTitle' v-text='item.name' :class='{"isTab":currentIndex===index}' :style='{zIndex:index*10,left: (448-16)*index + "px"}'></li>
			</ul>
		</div>
		<div class="container">
			<dl class="box">
				<dt class="infoCol conTitle">商品信息</dt>
				<dd class="conCol conTitle">售后申请</dd>
			</dl>
			<dl class="box">
				<dt class="infoCol" style="min-height: 600px;">
					<order-info  @sendGoodsInfo='getGoodsInfo'></order-info>
				</dt>
				<dd class="conCol" style="min-height: 600px;">
					<component :is='currentView' :goods-info='goodsInfo' ></component>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {getHashReq} from '../../common/js/common'
import orderInfo from '../AfterSaleCommon/orderInfo'
import seller from '../AfterSaleCommon/seller'
import editMoneyReturn from './editMoneyReturn'
export default {
	data() {
		window.addEventListener("popstate",()=>{
	 		this.init();
	 	})
		return {
			goodsInfo: {},
			currentView:"",
			currentIndex: "",
			listTitle: [
				{name:'1.申请售后'},
				{name:'2.卖家处理'},
				{name:'3.确认结果'}
			],
			reqParams: null
		}
	},
	components:{
		orderInfo,seller,editMoneyReturn
	},
	methods:{
		getGoodsInfo(info){
			this.goodsInfo = info;
		},
		init(){
			let _this = this;
	      	let hash = location.hash.split("?")[0] ;
	      	let view = hash.slice(1) ;
		    _this.reqParams = getHashReq();
		    switch (view){
		    	case 'seller':
		    		_this.currentIndex = 1 ;
	 		    	_this.currentView = view ;
		    	break;
		    	case 'editMoneyReturn':
		    		_this.currentIndex = 1 ;
	 		    	_this.currentView = view ;
		    	break;
		    	case 'result':
		    		_this.currentIndex = 2 ;
	 		    	_this.currentView = 'seller' ;
		    	break;
		    	default:
			    	_this.currentIndex = 0 ;
	 		    	_this.currentView = 'seller' ;
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
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
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
				transform: translateX(-30px);
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				font-weight: 600;
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