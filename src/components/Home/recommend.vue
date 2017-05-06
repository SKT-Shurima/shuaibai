<template>
	<div class="wrap">
		<div class="show_ad">
			<img src="">
		</div>
		<div class="theme_box">
			<div class="theme_0">
				<dl>
					<dt>
						<div class="title_box">
							<div class="slider"></div>
							<div class="title_text">
								<img src="">
								个护美妆
							</div>
							<div class="slider"></div>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img src="">
						</div>
						<ul class="theme_right">
							<li v-for='item in 4'>
								<img src="">
							</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div class="theme_1">
				<dl>
					<dt>
						<div class="title_box">
							<div class="slider"></div>
							<div class="title_text">
								<img src="">
								个护美妆
							</div>
							<div class="slider"></div>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img src="">
						</div>
						<ul class="theme_right">
							<li v-for='item in 4'>
								<img src="">
							</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div class="theme_2">
				<dl>
					<dt>
						<div class="title_box">
							<div class="slider"></div>
							<div class="title_text">
								<img src="">
								个护美妆
							</div>
							<div class="slider"></div>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img src="">
						</div>
						<ul class="theme_right">
							<li v-for='item in 4'>
								<img src="">
							</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div class="theme_3">
				<dl>
					<dt>
						<div class="title_box">
							<div class="slider"></div>
							<div class="title_text">
								<img src="">
								个护美妆
							</div>
							<div class="slider"></div>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img src="">
						</div>
						<ul class="theme_right">
							<li v-for='item in 4'>
								<img src="">
							</li>
						</ul>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style lang='scss' scoped>
$border_list: #f0f0f0;
	.wrap{
		width: 1250px;
		margin: 30px auto 0px;
        .show_ad{
			width: 100%;
			img{
				width: 100%;
				height: 70px;
			}
        }
        .theme_box{
        	overflow: hidden;
        	.theme_0,.theme_1,.theme_2,.theme_3{
				width: 612px;
				overflow: hidden;
				float: left;
				margin-top: 24px;
				dt{
        			width: 100%;
        			height: 40px;
        			border-radius: 20px;
        			.title_box{
	    				width: 342px;
	    				height: 40px;
	    				margin: 0px auto;
	    				overflow: hidden;
	    				.slider{
	    					width: 100px;
	    					height: 1px;
	    					margin-top: 18px;
	    					background-color: #fff;
	    					float: left;
	    				}
	    				.title_text{
	    					width: 142px;
	    					float: left;
	    					font-size: 16px;
	    					text-align: center;
	    					color: #fff;
	    					line-height: 40px;
	    					padding-left: 20px;
	    					padding-right: 20px;
	    				}
        			}
        		}
        		dd{
        			overflow: hidden;
        			height: 507px;
	        		.theme_left{
						width: 248px;
						height: 498px;
						float: left;
						border: 1px solid $border_list;
						margin-top: 10px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.theme_right{
						width: 360px;
						float: left;
						overflow: hidden;
						margin-top: 10px;
						li{
							width: 180px;
							height: 249px;
							float: left;
							border-top: 1px  solid $border_list;
							border-right: 1px solid $border_list;
							border-bottom: 1px solid $border_list;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
        		}
        	}
        	.theme_0{
				dt{
					background: -webkit-linear-gradient(left,#df3388,#ee3f7f,#fc4977);
				}
        	}
        	.theme_1{
        		margin-left: 26px;
				dt{
					background: -webkit-linear-gradient(left,#8f36c2,#ae44cf,#cd53dc);
				}
        	}
        	.theme_2{
				dt{
					background: -webkit-linear-gradient(left,#2b94d6,#5391e5,#7a8ef3);
				}
        	}
        	.theme_3{
        		margin-left: 26px;
				dt{
					background: -webkit-linear-gradient(left,#00a76b,#1fc488,#3de0a4);
				}
        	}
        }
	}
</style>