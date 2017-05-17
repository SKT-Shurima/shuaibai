<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view20")'>消息</span></h4>
		<ul class="orderMsg">
			<li v-for='item in 3' :key='item'>
				<el-row>
					<el-col :span='4'>
						订单消息
					</el-col>
					<el-col :span='10'>
						您的订单有新的动态
					</el-col>
					<el-col :span='6'>
						4小时前
					</el-col>
				</el-row>
				<dl>
					<dt>
						<img src="">
					</dt>
					<dd style="width:140px;line-height:70px;">
						订单号:4116131461316
					</dd>
					<dd style="width:80px;line-height:70px;">
						卖家已经发货
					</dd>
					<dd style="padding-top:24px; ">
						<el-button size='mini' type='primary'>
							去看看
						</el-button>
					</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 sessionStorage.currentView = view;
		    }
		},
		created(){
        this.$nextTick(()=>{
        	
        })
    }
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid $border_color;
			color: $text_color;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.orderMsg{
			li{
				width: 100%;
				height: 144px;
				padding: 18px 4px;
				border-bottom: 1px solid $border_color;
				.el-row{
					width: 420px;
					line-height: 22px;
					margin-bottom: 16px;
					.el-col-4{
						font-size: 14px;
						font-weight: 600;
						color: $primary;
					}
					.el-col-6{
						color: $text_color;
					}
				}
				dl{
					overflow: hidden;
					dt{
						float: left;
						width: 70px;
						height: 70px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					dd{
						float: left;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>