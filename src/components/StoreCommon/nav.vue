<template>
	<div class="wrap">
		<div class="storeLogoWrap">
			<div class="storeLogoBox">
				<img :src="shopHeader.shop_header">
			</div>
		</div>
		<div class="navWrap">
			<div class="box">
				<dl>
					<dt @mouseleave='listBol=false;listConBol=false'>
						<div @mouseenter='listConBol=true' @mouseleave='listConBol=false' style="cursor: pointer">全部商品分类<i></i></div>
						<ul class="con_list" @mouseenter='listBol=true;listConBol=true' @mouseleave='listBol=false;listConBol=false' v-if='listConBol'>
							<li v-for='(item,index) in category' :key='item' @mouseenter='listIndex=index;fIndex=index'
							@click='checkGoods(index,item.name)'>
								<img :src="item.selected_icon" v-show='listConBol&listIndex===index'>
								<img :src="item.icon" v-show='!(listConBol&listIndex===index)'>
								{{item.name}}
							</li>
						</ul>
						<div class="content" v-show='listBol'  @mouseleave='listBol=false;listConBol=false' @mouseenter='listBol=true;listConBol=true'>
							<div class="detail_list">
								<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2'>
									<el-col :span='4'>
									    <span v-text='item2.name' @click='checkGoods(`${fIndex},${index2}`,item2.name)'></span>
									    <em>></em>
									</el-col>
									<el-col :span='16' :offset="1">
										<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3' v-text='item3.name' @click='checkGoods(`${fIndex},${index2},${index3}`,item3.name)'></span>
									</el-col>
								</el-row>
							</div>
							<div class="img_box">
								<guess-like></guess-like>
							</div>
						</div>
					</dt>
					<dd><a href="index.html">首页</a></dd>
					<dd @click='checkStore'>店铺热卖</dd>
					<dd @click='checkStore'>掌柜推荐</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
import {getCategory} from '../../common/js/api'
import guessLike from '../Common/guessLike'
  export default {
     data(){
     	return{
     		listBol: false,
     		listConBol: false,
     		listIndex: "",
     		category: [{name:''}],
     		fIndex: 0,
			sIndex: 0
     	}
     },
     props:{
     	shopHeader:{
     		type: Object,
     		required: true
     	}
     },
     components:{
     	guessLike
     },
     methods:{
     	checkGoods(index,name){
     		location.href = `relatedGoods.html?cat=${index}&keyword=${name}` ;
     	},
     	checkStore(){
     		let id = this.shopHeader.seller_id ;
     		location.href = `storeDetail.html?seller_id=${id}&is_recommend=1` ;
     	}
     },
     mounted(){
     	this.$nextTick(()=>{
			getCategory().then(res=>{
				let {errcode,content} = res ;
				if (errcode === 0 ) {
					this.category = content;
				}
			})
     	})
     }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
.wrap{
	margin-top: 36px;
	.storeLogoWrap{
      	width: 100%;
      	background-color: #f2f2f2;
      	.storeLogoBox{
      		width: 1250px;
      		margin: 0px auto;
      		img{
      			width: 100%;
      			/*height: 150px;*/
      		}
      	}
    }
    .navWrap{
		width: 100%;
		height: 40px;
		background-color: $primary;
		.box{
			width: 1250px;
			margin: 0px auto;
			dl{
				dt,dd{
					width: 150px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					font-size: 14px;
					font-weight: 600;
					text-align: center;
					float: left;
				}
				dt{
					position: relative;
					.con_list{
						position: absolute;
						width: 150px;
						height: 500px;
						background-color: #c81623;
						color: #fff;
						text-align: center;
						z-index: 100;
						li{
							width: 100%;
							height: 50px;
							line-height: 50px;
							font-weight: bolder;
							cursor: pointer;
						}
						li:hover{
							background-color: #fff;
							color: #c81623;
						}
						img{
							width: 22px;
							vertical-align: -5px;
							margin-right: 10px;
						}
					}
					.content{
						position: absolute;
						top: 40px;
						left: 150px;
						width: 900px;
						height: 500px;
						font-size: 12px;
						font-weight: 400;
						overflow: hidden;
						background-color: #fff;
						z-index: 99;
						color: #000;
						.detail_list{
							width: 600px;
							height: 500px;
							overflow-y: auto;
							overflow-x: hidden;
							padding-left: 20px;
							padding-top: 28px;
							float: left;
							.el-row{
								margin-bottom: 22px;
								.el-col-4{
									span{
										display: inline-block;
										width: 72px;
										text-align-last: justify;
									}
									em{
										margin-left: 6px;
									}
									
								}
								.el-col-16{
									overflow: hidden;
									padding-left: 6px;
									padding-bottom: 10px;
									border-bottom:  1px dashed #dcdcdc;
									span{
										float: left;
										margin-right: 16px;
										margin-bottom: 20px;
									}
								}
							}
						}
						.img_box{
							float: left;
							width: 250px;
							height: 500px;
							padding: 10px;
							background-color: #f2f2f2;
							img{
								width: 100%;
								height: 110px;
							}
							.small_img{
								border-bottom: 1px solid $border_color;
								overflow: hidden;
								li{
									float: left;
									width: 110px;
									margin-bottom: 10px;
									
								}
								.margin_left{
									margin-left: 10px;
								}
							}
							.big_img{
								width: 100%;
								li{
									width: 100%;
								    margin-top: 10px;
								}
							}
						}
					}
				}
				a{
					color: #fff;
				}
				dd{
					cursor: pointer;
				}
			}
			
		}
	}
}
	
</style>