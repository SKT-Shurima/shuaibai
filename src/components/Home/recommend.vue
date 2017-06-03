<template>
	<div class="wrap">
		<div class="show_ad">
			<img src="">
		</div>
		<div class="theme_box" v-if='theme'>
			<div class="theme" v-for='item in theme'>
				<dl>
					<dt>
						<div class="title_box">
							<div class="slider"></div>
							<div class="title_text" :style='{background: `url(${item.img})`}'></div>
							<div class="slider"></div>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img :src="item.goods.goods[0].cover">
						</div>
						<ul class="theme_right">
							<li v-for='(childItem,index) in item.goods.goods' v-if='index!==0'>
								<img :src="childItem.cover">
							</li>
						</ul>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
	import {getCategoryGoods} from "../../common/js/api.js"
	export default{
		data(){
			return{
			  theme: null
			}
		},
		mounted(){
			this.$nextTick(()=>{
				getCategoryGoods().then(res=>{
					this.theme = res;
				})
			})
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
        	.theme{
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
        }
	}
</style>