<template>
	<div class="wrap">
		<div class="head-wrap">
		    <div class="head-top">
		    	<v-headtop></v-headtop>
		    </div>
		</div>
		<div class="head-search">
			<v-headsearch></v-headsearch>
		</div>
	</div>
</template>

<script>
import vHeadtop from './headTop.vue'
import vHeadsearch from './headSearch.vue'
	export default{
		components:{
			vHeadtop,
			vHeadsearch
		}
	}
</script>

<style scoped lang='scss'>
	.wrap{
		width: 100%;
		margin-bottom: 32px;
	}
	.head-wrap{
		width: 100%;
		height: 30px;
		line-height: 30px;
		background: #f7f7f7;
		border-bottom: #eee solid 1px;
		line-height: 30px;
		position: relative;
		z-index: 90;
	}
	.head-top{
		width: 1250px;
		margin: 0px auto;
	}
	.head-search{
		width: 1250px;
		margin: 0px auto;
	}
</style>