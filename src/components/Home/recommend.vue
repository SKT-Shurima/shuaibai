<template>
	<div class="wrap">
		<!-- <div class="show_ad">
			<img src="">
		</div> -->
		<div class="theme_box" v-if='theme'>
			<div class="theme" v-for='(item,index) in theme' :class='{"marginLeft":index%2}'>
				<dl>
					<dt>
						<div class="title" :style='{background: `url(${item.img})`}'>
						</div>
					</dt>
					<dd>
						<div class="theme_left">
							<img :src="item.goods.goods[0].cover_l" @click='goodsDeatil(item.goods.goods[0].goods_id)'>
						</div>
						<ul class="theme_right">
							<li v-for='(childItem,index) in item.goods.goods' v-if='index!==0' @click='goodsDeatil(childItem.goods_id)'>
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
	import {getCategoryGoods} from "../../common/js/api"
	export default{
		data(){
			return{
			  theme: null
			}
		},
		methods:{
			goodsDeatil(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
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
        img{
        	cursor: pointer;
        }
        .theme_box{
        	overflow: hidden;
        	.marginLeft{
				margin-left: 26px;
			}
        	.theme{
				width: 612px;
				overflow: hidden;
				float: left;
				margin-top: 24px;
				dt{
        			width: 100%;
        			height: 40px;
        			border-radius: 20px;
        			.title{
	    				width: 100%;
	    				height: 40px;
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