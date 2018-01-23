<template>
	<div class="theme">
		<ul>
			<li v-for='item in theme.goods.goods' @click='goodDetail(item.goods_id)'>
				<dl>
					<dt>
						<img :src="item.cover">
					</dt>
					<dd class="ellipsis-2" v-text='item.name'>
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
				required: true 
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
	.theme{
		width: 100%;
		height: 498px;
		img{
			cursor: pointer;
		}
		ul{
			margin-top: 10px;
			overflow: hidden;
			border-top: 1px solid #f0f0f0;
			border-left: 1px solid #f0f0f0;
			padding-left: 1px;
		}
		li{
			width: 203px;
			height: 249px;
			float: left;
			border-right: 1px solid #f0f0f0;
			border-bottom: 1px solid #f0f0f0;
			dl{
				width: 100%;
				padding: 10px;
			}
			dt{
				width: 180px;
				height: 180px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			dd{
				width: 100%;
				margin-top: 8px;
				line-height: 18px;
			}
		}
	}
</style>