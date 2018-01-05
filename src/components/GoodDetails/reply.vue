<template>
	<el-dialog title="请输入回复内容" v-model="replyInfo.replyBol" style='text-align: center;' top='20%'>
	  <div style='text-align:left;'>
	  	<el-input
			type="textarea"
			:autosize="{ minRows: 3, maxRows: 4}"
			placeholder="请输入内容"
			v-model="replyContent">
		</el-input>
	  </div>
	  <div slot="footer" class="dialog-footer" style="text-align: center;">
	    <el-button type="primary" @click="reply" size='small' style='width:116px;'>确 定</el-button>
	  </div>
	</el-dialog>
</template>
<script >
import {replyComment} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {Message} from  'element-ui'
	export default {
		data(){
			return {
				replyContent: '', // 回复内容
			}
		},
		props:{
			replyInfo:{
				type: Object,
				require: true,
				default: ()=>{
					return {
						replyBol: false
					}
				}
			}
		},
		methods:{
			// 回复
			reply(){
				let params = {
					access_token: getCookie('access_token'),
					content: this.replyContent,
					id: this.replyInfo.replyId
				}
				replyComment(params).then(res=>{
					let {errcode,message,content} = res ;
						if(errcode !== 0){
							errorInfo(errcode,message) ;
						}else {
							Message.success({
					          message: '回复成功',
					          type: 'success'
					        });
					        // 回复成功后向父组件传递成功回调  重新加载回复列表
					        this.$emit('reply-success',true);
					        this.replyInfo.replyBol = false;
						}
				})
			},
		}
	}
</script>
<style lang='scss'>
.el-dialog__wrapper{
	.el-dialog {
		width: 400px;
		box-shadow: 0px 0px;
		border-radius: 4px;
	}
}
</style>