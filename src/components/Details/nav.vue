<template>
	<div class="wrap">
		<div class="box">
			<dl>
				<dt @mouseleave='listBol=false;listConBol=false'>
					<div @mouseenter='listBol=true;listConBol=false' style="cursor: pointer">全部商品分类<i></i></div>
					<ul class="con_list" v-show='listBol' @mouseenter='listConBol=true'>
						<li>居家百货</li>
						<li>食品特产</li>
						<li>世尊生活</li>
						<li>滋补保健</li>
						<li>个护美妆</li>
						<li>成人用品</li>
						<li>茶油生鲜</li>
						<li>男女服饰</li>
						<li>手机数码</li>
						<li>腕表首饰</li>
					</ul>
					<div class="list_con" v-show='listConBol'>
						
					</div>
				</dt>
				<dd><a href="index.html">返回首页</a></dd>
				<dd><a href="index.html">店铺热卖</a></dd>
				<dd><a href="index.html">掌柜推荐</a></dd>
			</dl>
		</div>
	</div>
</template>
<script>
  export default {
     data(){
     	return{
     		listBol: false,
     		listConBol: false
     	}
     },
     mounted(){
     	this.$nextTick(()=>{
     	})
     }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.wrap{
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
							font-size: 14px;
							font-weight: bolder;
							cursor: pointer;
						}
						li:hover{
							background-color: #fff;
							color: #c81623;
						}
					}
					.list_con{
						position: absolute;
						left: 150px;
						top: 40px;
						width: 500px;
						height: 500px;
						border: 1px solid $primary;
					}
				}
				a{
					color: #fff;
				}
			}
			
		}
	}
</style>