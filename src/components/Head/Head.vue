<template>
	<div class="wrap">
		<div class="head_wrap">
		    <div class="headTop">
		    	<v-headtop ref='headTop'></v-headtop>
		    </div>
		</div>
		<div class="headSearch">
			<v-headsearch ref='search'></v-headsearch>
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
		.head_wrap{
			width: 100%;
			height: 30px;
			line-height: 30px;
			background: #f7f7f7;
			border-bottom: #eee solid 1px;
			line-height: 30px;
			position: relative;
			z-index: 90;
			.headTop{
				width: 1250px;
				margin: 0px auto;
			}
		}
		.headSearch{
			width: 1250px;
			margin: 0px auto;
		}
	}
</style>