<template>
	<div class="wrap">
		<component :is='currrentView'></component>
	</div>
</template>
<script>
import infoList from './infoList'
import infoDetail from './infoDetail'
	export default {
		data(){
			return {
				currrentView:  "infoList"
			}
		},
		components: {
			infoDetail,infoList
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1250px;
		margin: 0px auto;
	}
</style>