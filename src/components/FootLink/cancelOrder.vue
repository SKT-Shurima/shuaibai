<template>
	<div class="wrap">
		<v-nav></v-nav>
		<div class="footer-link-con" v-html='content'>
		</div>
	</div>
</template>
<script>
import vNav from '../Head/nav.vue'
import {b_cancel_order} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
	export default{
		data(){
			return {
				content: ""
			}
		},
		components:{
			vNav
		},
		methods:{
			// 转义
			escape2Html(a) {
			 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			 return a.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},
		},
		mounted(){
			this.$nextTick(()=>{
				b_cancel_order().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.content = this.escape2Html(content);
					}
				})
			})
		}
	}
</script>