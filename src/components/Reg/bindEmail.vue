<template>
	<div class="wrap">
		<div class="img_box">
			<img src="../../../static/loginImg/success.png" height="230" width="430">
		</div>
		<div style='width:100%;height:80px;line-height: 80px;text-align: center;'>
			<strong style="font-size: 16px;font-weight: 600;">注册成功，是否前往邮箱完成验证？</strong>
		</div>
		<div class="btn_box">
			<el-button type='primary' style='margin-right: 16px;'>去完成</el-button>
			<a href="index.html"><el-button type="primary">不，直接回首页</el-button></a>
			
		</div>
	</div>
</template>
<script>
  export default {
    }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
	.wrap{
		width: 430px;
		height: 546px;
		margin: 70px auto 0px;
	    .img_box{
	    	width: 100%;
	    	height: 230px;
	    	img{
	    		width: 100%;
	    		height: 100%;
	    	}
	    }
	    .btn_box{
	    	margin-top: 20px;
	    	width: 100%;
	    	text-align: center;
	    	button{
	    		width: 140px;
	    	}
	    }
	}
</style>