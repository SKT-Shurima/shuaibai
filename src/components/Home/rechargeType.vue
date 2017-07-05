<template>
	<el-dialog
  title="选择支付方式"
  v-model='payBol'
  size="tiny"
  top='25%'
  :before-close="handleClose">
	<div class='typeBox'>
		<el-radio class="radio" v-model="typeRadio" label="4">支付宝</el-radio>
		<el-radio class="radio" v-model="typeRadio" label="5">微信</el-radio>
	</div>
	<div class="typeBtn">
		<el-button @click="handleClose" >取 消</el-button>
    	<el-button type="primary" @click="payFor">确 定</el-button>
	</div>
    
  </span>
</el-dialog>
</template>
<script>
import {rechargePay} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
  export default {
    data() {
      return {
        typeRadio: "4",
        showBol: false
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
			let access_token = sessionStorage.access_token ;
			let _this = this ;
			let params = {
				access_token: access_token?access_token:"",
				type: _this.typeRadio,
				orders: _this.order.order_sn 
			}
			rechargePay(params).then(res=>{
				let {errcode,message,content} = res ;
				if (errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					if (_this.typeRadio==='4') {
						document.write(content.html_text);
					}
					if (_this.typeRadio==='5') {
						let  code_url = content.code_url ;
						let  order_number = this.order.balance ;
						code_url = code_url.split("?");
						code_url = code_url.join("&");
						location.replace(`myOrder.html#vip700?code_url=${code_url}&order_number=${order_number}`);
					}
				}
			})
		}
    }
  };
</script>
<style lang='scss'>
	.typeBox,.typeBtn{
		text-align: center;
		margin-bottom: 20px;
	}
</style>