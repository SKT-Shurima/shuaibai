<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view13")'>邮箱绑定</span></h4>
		<el-row class="bindInfo">
			<el-col :span='6' :offset='1'>
				当前绑定邮箱：
			</el-col>
			<el-col :span='10' v-text='this.userInfo.has_email?this.userInfo.email:"无"'>
			</el-col>
			<el-col :span='6'>
				<el-button type='primary' size='mini' v-text='!this.userInfo.has_email?"解绑":"绑定"' @click='clickBtn'></el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				userInfo: {
					has_email: false,
					email: ""
				}
			}
		},
		methods:{
			changeView(view){
		      	 this.$store.commit('switchView',view);
		      	 sessionStorage.currentView = view;
		    },
		    clickBtn(){
		    	if (!this.userInfo.has_email) {
		    		this.changeView("view131");
		    	}else{
		    		this.changeView("view130");
		    	}
		    }
		},
		created(){
        this.$nextTick(()=>{
        	if (sessionStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(sessionStorage.userInfo);
			}
        })
    }
	}
</script>
<style lang='scss' scoped>
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
		.el-row{
			width: 380px;
			margin-top: 40px;
			line-height: 28px;
			.el-button{
				padding: 4px 18px;
			}
		}
	}
</style>