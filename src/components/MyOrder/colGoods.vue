<template>	
	 <div class="wrap">
	 	<ul>
	 		<li v-for='(item,index) in 16'>
	 			<dl>
					<dt>
						<div class="imgBox">
							<img src="">
						</div>
						<div class="editBox">
							<div class="edit">加入购物车</div>
							<div class="edit" style="margin-left: 1px;margin-right:-1px;">删除</div>
						</div>
					</dt>
					<dd>
						<div class="sellInfo">
							9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮9.9包邮
						</div>
						<div class="priceInfo" v-show='index%4===0'>
							<span>
								{{168.00|currency}}
							</span>
							<em>
								{{2017}}人付款
							</em>
						</div>
						<div class="update" v-show='index%4!==0'>
							<div>
								<img src="" alt="">商品已失效
							</div>
						</div>
					</dd>
				</dl>
	 		</li>
	 	</ul>
	 </div>
</template>
<script>
	import {currency} from '../../common/js/filter.js'
	export default {
		filters:{
			currency
		},
		methods:{
			init(){

			}
		},
		mounted(){
			this.$nextTick(()=>{

			})
		}
	}
</script>
<style lang='scss' scoped>
$text_color: #666;
$border_color: #ccc;
$primary:#c71724;
.wrap{
	width: 100%;
	ul{
		width: 100%;
		margin-top: 14px;
		overflow: hidden;
		border-top: 1px solid #f0f0f0;
		li{
			float: left;
			width: 210px;
			padding: 14px;
			margin-right: -1px;
			margin-top: -1px;
			border: 1px solid #f0f0f0;
			dl{
				dt{
					position: relative;
					width: 180px;
					height: 180px;
					overflow: hidden;
					border: 1px solid transparent;
					.imgBox{
						width: 100%;
						height: 100%;
						img{
							width: 100%;
							height: 100%; 
						}
					}
					.editBox{
						position: absolute;
						bottom: -30px;
						width: 100%;
						text-align: center;
						overflow: hidden;
						transition: all .3s;
						.edit{
							float: left;
							width: 50%;
							line-height: 30px;
							cursor: pointer;
							margin: 0px;
							color: #fff;
							background-color: rgba(205,42,44,0.5);
						}
					}
				}
				dt:hover{
					border: 1px solid $primary;
					.editBox{
						bottom: 0px;
					}
				}
				dd{
					width: 100%;
					overflow: hidden;
					.sellInfo{
						line-height: 16px;
						margin: 8px 0px;
					}
					.priceInfo{
						line-height: 18px;
						span{
							font-size: 16px;
							font-weight: 600;
							color: $primary;
						}
						em{
							margin-top: 4px;
							float: right;
							color: #999;
						}
					}
					.update{
						div{
							width: 94px;
							height: 22px;
							line-height: 22px;
							margin: 0px auto;
							text-align: center;
							border-radius: 2px;
							background-color: #aaa;
							color: #fff;
						}
					}
				}	 
			}
		}
	}
}
</style>