<template>
	<div class="wrap">
		<ul class="small_img">
		 	<li v-for='(sItem,index) in youLike' :class='{"margin_left":index%2}'>
		 		<img :src="sItem.cover">
		 	</li>
		 </ul>
		<!--  <ul class="big_img">
		 	<li v-for= '(bItem,index) in youLike' v-if='index>=4'>
		 		<img src="">
		 	</li>
		 </ul> -->
	</div>
</template>
<script>
import {getGuessLike} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
	export default {
		data(){
			return {
				youLike: null
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let  params = {
					category_id: 1
				}
				getGuessLike(params).then(res=>{
					let {errcode,message,content} = res ;
					if (errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.youLike = content ;
					}
				})
			})
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
	.wrap{
		img{
			width: 100%;
			height: 110px;
		}
		.small_img{
			border-bottom: 1px solid $border_color;
			overflow: hidden;
			li{
				float: left;
				width: 110px;
				margin-bottom: 10px;
				
			}
			.margin_left{
				margin-left: 10px;
			}
		}
		.big_img{
			width: 100%;
			li{
				width: 100%;
			    margin-top: 10px;
			}
		}
	}
</style>