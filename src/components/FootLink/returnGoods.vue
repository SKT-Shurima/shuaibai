<template>
	<div class="wrap">
		<v-nav></v-nav>
		<div class="container" v-html='content'>
		</div>
	</div>
</template>
<script>
import vNav from '../Head/nav.vue'
import {b_return_goods} from '../../common/js/api'
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
				b_return_goods().then(res=>{
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
<style lang='scss' scoped>
$border_color: #ddd;
	.wrap{
		width: 100%;
		.container{
			width: 1250px;
			margin: 0px auto;
		}
	}
</style>