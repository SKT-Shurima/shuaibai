<template>
	<div class="wrap">
		<div class="head-wrap">
		    <div class="headTop">
		    	<v-headtop></v-headtop>
		    </div>
		</div>
		<div class="logo-wrap">
			<div class="head-con-box">
				<div class="logo">
					<a href="index.html">
						<img src="../../../static/headImg/logo.png" height="39" width="269">
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vHeadtop from './headTop.vue'
	export default{
		components:{
			vHeadtop
		}
	}
</script>

<style scoped lang='scss'>
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
	.logo-wrap{
		width: 1250px;
		margin: 0px auto;
	}
	.head-con-box{
		width: 1250px;
		height: 130px;
		margin: 0px auto;
		padding-top: 45px;
		padding-bottom: 45px;
		.logo{
			width: 270px;
			height: 40px;
			float: left;
			img{
				width: 100%;
			}
		}
	}
</style>