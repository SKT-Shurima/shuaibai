<template>
	<div class="wrap">
		<h4 class="title">投诉</h4>
		<div class="color-primary add-info">填写投诉信息</div>
		<el-row>
			<el-col :span='4'>
				投诉类型
			</el-col>
			<el-col :span='20'>
				<el-input
				  type="text"
				  v-model='title'
				  placeholder="请输入标题"
				  >
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				投诉内容
			</el-col>
			<el-col :span='20'>
				<el-input
				  type="textarea"
				  v-model='content'
				  :autosize="{ minRows: 2, maxRows: 4}"
				  placeholder="请输入内容"
				  >
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='20' :offset='4'>
				<el-button type='primary' size='small' style='width:94px;' @click = 'submit'>提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
import {complain} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {Message} from  'element-ui'
	export default{
		data(){
			return{
		        title: '',
		        content: ""
			}
		},
		methods:{
			submit(){
				let params = {
					access_token: getCookie('access_token'),
					title : this.title,
					content: this.content
				}
				complain(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						 Message.success({
				            message: '投诉成功',
				            type: 'success'
				        });
						 this.title = "" ;
						 this.content = "";
					}
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1080px;
		.title{
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-bottom: 30px;
			border-bottom: 1px solid #ccc;
		}
		.add-info{
			height: 58px;
			line-height: 58px;
			font-weight: 600;
			font-size: 14px;
		}
		.el-row{
			width: 420px;
			margin-bottom: 16px;
			.el-col-4{
				text-align: center;
				line-height: 30px;
			}
		}
	}
</style>