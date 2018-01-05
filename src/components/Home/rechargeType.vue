<template>
	<el-dialog
  		title="选择支付方式"
  		v-model='payBol'
  		size="tiny"
  		top='25%'
  		:before-close="handleClose">
	<div class='type-box'>
		<el-radio class="radio" v-model="typeRadio" label="4">支付宝</el-radio>
		<el-radio class="radio" v-model="typeRadio" label="5">微信</el-radio>
	</div>
	<div class="type-btn">
		<el-button @click="handleClose" >取 消</el-button>
    	<el-button type="primary" @click="payFor">确 定</el-button>
	</div>
    
  </span>
</el-dialog>
</template>
<script>
import {rechargePay} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
  export default {
    data() {
      return {
        typeRadio: "4"
      };
    },
    props:{
    	payBol:{
    		type: Boolean,
    		required: true 
    	},
    	order:{
    		type: Object,
    		required: true
    	}
    },
    methods: {
    	handleClose(done) {
	        this.$emit('close');
	     },
    	payFor(){
			let access_token = getCookie('access_token') ;
			let params = {
				access_token: access_token?access_token:"",
				type: this.typeRadio,
				orders: this.order.order_sn 
			}
			rechargePay(params).then(res=>{
				let {errcode,message,content} = res ;
				if (errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					if (this.typeRadio==='4') {
						document.write(content.html_text);
					}
					if (this.typeRadio==='5') {
						let  code_url = content.code_url ;
						let  order_number = this.order.balance ;
						code_url = code_url.split("?");
						code_url = code_url.join("&");
						let count = this.order.price ;
						location.href = `myOrder.html#vip700?code_url=${code_url}&order_number=${order_number}&count=${count}`;
					}
				}
			})
		}
    }
  };
</script>
<style lang='scss'>
	.type-box,.type-btn{
		text-align: center;
		margin-bottom: 20px;
	}
</style>