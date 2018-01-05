<template>
 <div class="special-wrap">
 	<el-carousel height="500px">
      	<el-carousel-item v-for="(item,index) in special" :key="index">
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