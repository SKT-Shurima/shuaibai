<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span></h4>
		<div v-show='reqParams.status==="101"' class="status">
			审核中
		</div>
		<div v-show='reqParams.status==="102"' class="status">
			审核拒绝
		</div>
		<div v-show='reqParams.status==="103"' class="status">
			<el-row>
				<el-col :span='6'>
					缴纳金额
				</el-col>
				<el-col :span='18'>
					<el-input size='small' v-model='account'></el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='6'>
					支付方式
				</el-col>
				<el-col :span='18'>
					  <el-radio class="radio" v-model="radio" label="4">支付宝</el-radio>
					  <el-radio class="radio" v-model="radio" label="5">微信</el-radio>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset='6'>
					<el-button type='primary' size='small' @click='payFor'>确定 </el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import {bail} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {getHashReq} from '../../common/js/common'
import {MessageBox} from  'element-ui'
  export default {
  	data(){
  		return {
  			reqParams: {status:""},
  			radio:"4",
  			account: ""
  		}
  	},
    methods: {
    	changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	    },
	    payFor(){
	    	if (!this.account) {
	    		MessageBox.alert('请输入缴纳金额', '提示', {
		          	confirmButtonText: '确定'
			    });
			    return ;
	    	}
	    	let  params = {
	    		access_token: getCookie('access_token'),
	    		type: this.radio ,
	    		account: this.account
	    	}
	    	bail(params).then(res=>{
	    		let {errcode,message,content} = res;
		 		if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					if (this.radio==='4') {
						document.write(content.html_text);
					}
					if (this.radio==='5') {
						let  code_url = content.code_url ;
						let  order_number = content.order_number ;
						let count = this.account;
						code_url = code_url.split("?");
						code_url = code_url.join("&");
						location.replace(`myOrder.html#vip700?code_url=${code_url}&order_number=${order_number}&count=${count}`);
					}
				}
	    	})
	    }
    },
    mounted(){
    	this.$nextTick(()=>{
    		this.reqParams = getHashReq() ;
    	})
    }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.status{
			margin-top: 40px;
			font-size: 16px;
			.el-row{
				width: 360px;
				margin-bottom: 20px;
			}
		}
	}
</style>