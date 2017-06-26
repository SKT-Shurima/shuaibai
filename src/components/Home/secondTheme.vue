<template>
	<div class="theme">
		<ul v-if='theme.goods'>
			<li v-for='item in theme.goods.goods' @click='goodDetail(item.goods_id)'>
				<dl>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd class="show_info" v-text='item.name'>
					</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			theme: {
				type: Object,
				required: true ,
				default(){
					return {
						goods: null
					}
				}
			}
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		}
	}
</script>
<style lang='scss' scoped>
$border_list: #f0f0f0;
	.theme{
		width: 100%;
		margin-left: 26px;
		img{
			cursor: pointer;
		}
		ul{
			margin-top: 10px;
			overflow: hidden;
			border-top: 1px solid $border_list;
			border-left: 1px solid $border_list;
			li{
				width: 202px;
				height: 249px;
				float: left;
				border-right: 1px solid $border_list;
				border-bottom: 1px solid $border_list;
				dl{
					width: 100%;
					padding: 10px;
					dt{
						width: 180px;
						height: 180px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					dd{
						margin-top: 8px;
						line-height: 18px;
					}
				}
			}
		}
	}
</style>