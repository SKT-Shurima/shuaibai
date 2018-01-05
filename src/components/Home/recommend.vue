<template>
	<div class="wrap">
		<div class="theme-box" v-if='theme'>
			<div class="theme" v-for='(item,index) in theme' :class='{"margin-l":index%2}' v-if='item.goods.goods.length'>
				<dl>
					<dt>
						<div class="title" :style='{background: `url(${item.img})`}'>
						</div>
					</dt>
					<dd>
						<div class="theme-l">
							<img :src="item.goods.goods[0].cover_l" @click='goodsDeatil(item.goods.goods[0].goods_id)'>
						</div>
						<ul class="theme-r">
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
			    theme: [
			    	{
			    		goods: {
			    			goods: []
			    		}
			    	}
			    ]
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
	.wrap{
		width: 1250px;
		margin: 30px auto 0px;
        img{
        	cursor: pointer;
        }
    }
    .theme-box{
    	overflow: hidden;
    	.margin-l{
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
    			height: 424px;
    		}
    	}
		.theme-l{
			width: 252px;
			height: 424px;
			float: left;
			margin-top: 10px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.theme-r{
			width: 360px;
			float: left;
			overflow: hidden;
			margin-top: 10px;
			li{
				width: 180px;
				height: 210px;
				float: left;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
    }
</style>