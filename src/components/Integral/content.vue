<template>
	<div class="wrap">
		<div class="box">
			<div class="theme_img">
				<img src="">
			</div>
			<div class="theme_box">
				<div class="theme_0">
					<div class="theme_title">
						<div>精品优质店铺</div>
					</div>
					<ul class="store_list">
						<li :class="{'has_margin': (index+1)%3}" v-for='(item,index) in 9'>
							<img src="">
						</li>
					</ul>
				</div>
				<div class="theme_1">
					<div class="theme_title">
						<div>精品优质单品</div>
					</div>
					<ul class="single_list">
						<li :class="{'has_margin': (index+1)%3}" v-for='(item,index) in 30'>
							<dl>
								<dt>
									<img src="">
								</dt>
								<dd>
									<div class="price_info">
										<em>&yen;</em>
										<span>1800</span>
									</div>
									<div class="price_info">
										<div style="text-decoration: line-through;">{{3600|currency}}</div>
										<div>积分半价优惠</div>
									</div>
									<div class="begin">
										立即开抢
									</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {currency} from '../../common/js/filter'
import pagination from '../../components/Common/pagination'
	export default {
		data(){
			return {
				pagesize: 1
			}
		},
		filters:{
			currency
		},
		components:{
			pagination
		},
		methods: {
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.getOrderList(_this.state,page);
			}
		}
  }
</script>
<style scoped lang='scss'>
$page_bg: #f5f5f5;
$page_border: #ddd;
$primary:#c71724;
$red_color: #f24450;
$border_list: #f0f0f0;
$pink_color: #f61d4a;
$text_color: #ffd3d8;
	.wrap{
		width: 100%;
		.box{
			width: 1210px;
			margin: 0px auto;
			.theme_img{
				width: 100%;
				height: 500px;
				img{
					width: 100%;
					height: 500px;
				}
			}
			.theme_box{
				width: 100%;
				.theme_0,.theme_1{
					width: 100%;
					margin-top: 18px;
					.theme_title{
						width: 100%;
						border-bottom: 2px solid $red_color;
						overflow: hidden;
						div{
							float: left;
							width: 180px;
							height: 40px;
							line-height: 40px;
							color: #fff;
							font-size: 20px;
							text-align: center;
							border-top-right-radius: 8px;
							background-color: $red_color;
						}
					}
					.store_list{
						width: 100%;
						overflow: hidden;
						li{
							width: 400px;
							height: 200px;
							margin-top: 12px;
							float: left;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
					.has_margin{
						margin-right: 5px;
					}
					.single_list{
						width: 100%;
						overflow: hidden;
						margin-bottom: 70px;
						li{
							width: 398px;
							height: 356px;
							border: 1px solid $border_list;
							margin-top: 12px;
							float: left;
							dl{
								width: 396px;
								dt{
									width: 100%;
									height: 294px;
									img{
										width: 100%;
										height: 100%;
									}
								}
								dd{
									width: 100%;
									height: 60px;
									background-color: $pink_color;
									.price_info{
										float: left;
										color: #fff;
										height: 40px;
										em{
											font-size: 14px;
											vertical-align: baseline;
										}
										span{
											font-size: 28px;
											line-height: 60px;
										}
										div{
											color: $text_color;
											line-height: 20px;
											height: 20px;
											margin-left: 10px;
											padding-top: 10px;
										}
									}
									.begin{
										float: right;
										width: 116px;
										line-height: 60px;
										font-size: 20px;
										text-align: center;
										color: $red_color;
										background-color: yellow;
									}
								}
							}
						}
					}
				}
				
			}
		}
	}

</style>