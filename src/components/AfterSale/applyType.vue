<template>
	<div class="wrap">
		<ul>
			<li v-for='(item,index) in type' :key='item' v-text='item.name' @click='chooseType(index)'></li>
		</ul>
	</div>
</template>
<script>
import {getHashReq} from '../../common/js/common'
import {MessageBox} from  'element-ui'
	export default{
		data(){
			return {
				reqParams: null,
				type: [{name:'我要退款'},{name:'我要退货'},{name:'我要换货/维修'}],
				req: location.hash.split('?')[1]
			}
		},
		methods:{
			chooseType(index){
				let _this = this ;
				let type = '';
				switch (index){
					case 0 :
					  type = 'moneyReturn';
					break ;
					case 1 :
					  type = 'goodsReturn';
					break ;
					case 2 :
					  type = 'maintain';
					break ;
				}
				location.hash = `${type}?${_this.req}`;
			}
		}
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