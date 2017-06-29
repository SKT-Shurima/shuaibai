<template>
 <div class="wrap">
 	<el-carousel height="500px">
      <el-carousel-item v-for="item in special" :key="item">
       	<img :src="item.image" @click='goodDetail(item.params.goods_id)'>
      </el-carousel-item>
    </el-carousel>
 </div>
</template>
<script>
	export default {
		props: {
			special: {
				type: Array,
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
<style lang='scss'>
$primary:#c71724;
.wrap{
	.el-carousel{
		.el-carousel__item{
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
	}
	.el-carousel__button{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: $primary;
	}
}
	
</style>