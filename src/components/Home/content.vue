<template>
	<div class="wrap">
	 	<el-row class="title">
	 		<el-col :span='7'>
	 			<div class="slider"></div>
	 		</el-col>
	 		<el-col :span='8' :offset='1'>
	 			<div class="text">
	 				<img src="">
	 				每日上新
	 			</div>
	 		</el-col>
	 		<el-col :span='7' :offset='1'>
	 			<div class="slider"></div>
	 		</el-col>
	 	</el-row>
	</div>
</template>

<script>
	
</script>

<style lang='scss' scoped>
$border_color: #ccc;
  .wrap{
  	width: 1194px;
  	margin: 20px auto 0px;
  	.title{
  		width: 348px;
  		height: 24px;
  		margin: 0px auto;
  		.el-col-7{
  			.slider{
  				width: 100%;
  				height: 1px;
  				margin-top: 14px;
  				background-color: $border_color;
  			}
  			
  		}
  		.el-col-8{
  			text-align: center;
  			.text{
  				color: #656565;
  				font-size: 20px;
  				font-weight: 600;
  				img{
	  				width: 24px;
	  				height: 24px;
	  				vertical-align: top;
	  			}
  			}
  		}
  	}
  }
</style>