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
import {getRequest,errorInfo} from '../../common/js/common'
import {MessageBox} from  'element-ui'
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
			// 初始化获取商品详情
			init(){
				this.deliveryInfo.params = getRequest();
				let params = {
					access_token : sessionStorage.access_token,
					goods_id: this.deliveryInfo.params.goods_id
				}
				goodsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						content.goods.comment.goods_comment -= 0;
						content.goods.comment.logistics_comment -= 0;
						content.goods.comment.service_comment -= 0;
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