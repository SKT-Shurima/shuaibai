<template>
	<div class="wrap">
		<div class="title">
			评价
		</div>
		<ul class="evalList">
			<li>
				<el-row>
					<el-col :span="6">
						<dl>
							<dt>
								<img src="">
							</dt>
							<dd class="name">
								买不起买不起买不起买不起买不起买不起买不起买不起买不起买不起
							</dd>
							<dd class="type">
								<span>颜色：红色</span>
								<em>大小：L</em>
							</dd>
						</dl>
					</el-col>
					<el-col :span='12'>
						<div class="rate" style="margin-bottom:20px;">
							<div>商品满意度</div>
							<el-rate></el-rate>
						</div>
						<dl>
							<dt>
								<div class="titleCol">
									评价
								</div>
								<div class="conCol">
									<el-input type='textarea'>
										
									</el-input>
								</div>
							</dt>
							<dd>
								<div class="titleCol">
									上传照片
								</div>
								<div class="conCol">
								</div>
							</dd>
						</dl>
					</el-col>
				</el-row>
			</li>
		</ul>
		<div class="seviceRate">
			<ul>
				<li class="rate">
					<div>服务满意度</div><el-rate></el-rate>
				</li>
				<li class="rate">
					<div>服务满意度</div><el-rate></el-rate>
				</li>
			</ul>
		</div>
		<div class="evalBtn">
			<el-button type='primary'>发表评论</el-button>
		</div>
	</div>
</template>
<script >
	export default{

	}
</script>
<style lang='scss' scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
	.wrap{
		width: 1250px;
		margin: 0px auto;
		.title{
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			font-weight: 600;
			border-bottom: 1px solid $border_color;
		}
		.evalList{
			width: 1152px;
			margin-top: 40px;
			border-bottom: 1px solid $border_color;
			li{
				margin-bottom: 72px;
				.el-row{
					.el-col-6{
						margin-top: 10px;
						border-right: 1px solid $border_color;
						dl{
							width: 130px;
							margin: 0px auto;
							dt{
								height: 130px;
								margin-bottom: 20px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.name{
								margin: 18px auto;
								line-height: 16px;
								overflow:hidden; 
								text-overflow:ellipsis;
								display:-webkit-box; 
								-webkit-box-orient:vertical;
								-webkit-line-clamp:2;
							}
							.type{
								overflow: hidden;
								color: $text_color;
								span{
									float: left;
								}
								em{
									float: right;
								}
							}
						}
					}
					.el-col-12{
						margin-left: 90px;
						dl{
							width: 560px;
							border-top: 1px solid $border_color;
							border-left: 1px solid $border_color;
							.titleCol,.conCol{
								border-right:1px solid $border_color;
								border-bottom: 1px solid $border_color;
							}
							.titleCol{
								float: left;
								width: 60px;
								text-align: center;
								padding:0px 14px;
								background-color: $bg_color;
							}
							.conCol{
								width: 499px;
								float: left;
								padding: 16px;
							}
							dt{
								height: 118px;
								overflow: hidden;
								.titleCol{
									height: 100%;
									padding-top: 54px;
								}
								.conCol{
									height: 100%;
								}
							}
							dd{
								height: 96px;
								overflow: hidden;
								.titleCol{
									height: 100%;
									padding-top: 26px;
								}
								.conCol{
									height: 100%;
								}
							}
						}
					}
				}
			}
			
		}
		.rate{
			overflow: hidden;
			div{
				float: left;
			}
			.el-rate{
				margin-left: 30px;
			}
		}
		.seviceRate{
			margin-top: 56px;
			margin-left: 378px;
			li{
				margin-bottom: 46px;
			}
		}
		.evalBtn{
			margin: 100px auto;
			text-align: center;
			.el-button{
				width: 190px;
				font-size: 20px;
				font-weight: 600;
			}
		}    
	}
</style>