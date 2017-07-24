<template>
	<div>
		<info-con :delivery-info='deliveryInfo'></info-con>
		<eval-con :delivery-info='deliveryInfo'></eval-con>
	</div>
</template>
<script>
import infoCon from './infoCon'
import evalCon from './evalCon'
import {goodsDetail} from '../../common/js/api'
import {getRequest,errorInfo,getCookie} from '../../common/js/common'
	export default {
		data() {
			return {
				deliveryInfo: {
					goodsInfo: null,
					params: ""
				}
			}
		},
		components:{
			infoCon,evalCon
		},
		methods:{
			init(){
				this.deliveryInfo.params = getRequest();
				let params = {
					access_token: getCookie('access_token'),
					goods_id: this.deliveryInfo.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.deliveryInfo.goodsInfo = content ;
					}
				})
			}
		},
	    created(){
			this.$nextTick(()=>{
				this.init();
			})
		}
	}
</script>