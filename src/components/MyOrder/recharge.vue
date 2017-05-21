<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view37")'>资金管理</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view370")'>充值</span></h4>
		<el-row>
			<el-col :span='4'>
				充值金额
			</el-col>
			<el-col :span='19' :offset="1">
				<el-input size='small' style='width:200px;'></el-input>&nbsp;元&nbsp;人民币
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				付款方式
			</el-col>
			<el-col :span='19' style='line-height:30px;' :offset='1'>
				<el-radio class="radio" v-model="radio" label="1"><span style='font-size:12px;'>支付宝支付</span></el-radio>
	  			<el-radio class="radio" v-model="radio" label="2"><span style='font-size:12px;'>微信支付</span></el-radio>
			</el-col>
		</el-row>
		<el-row style='margin-top: 30px;'>
			<el-col :span='19' :offset='5'>
				<el-button type='primary' size='small' style='width:94px;'>确认支付</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
	export default{
		data(){
			return{
				radio: "1"
			}
		},
		methods:{
			changeView(view){
		      	this.$store.commit('switchView',view);
		      	sessionStorage.currentView = this.currentView ;
		    }
		},
		mounted(){
			this.$emit('hasGuess',false);
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
$bg_color: #e84848;
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			margin-bottom: 46px;
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
			width: 420px;
			margin-bottom: 16px;
			padding-left: 30px;
			.el-col-4{
				text-align: center;
				line-height: 30px;
				font-size: 14px;
			}
		}
	}
</style>