<template>
	<div class="wrap">
		<h4 class="color-6">我的推广</h4>
		<div class='recommend-box' v-if='lists.length'>
			<table cellpadding="10px" cellspacing="0" class="table">
				<tr class="f5-bg">
					<th>下级ID</th>
					<th>下级编号</th>
				</tr>
				<tr v-for='(item,index) in lists' :key='index'>
					<td v-text='item.nickname'></td>
					<td v-text='item.phone'></td>
				</tr>
			</table>
			<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		</div>
		<div v-else style='font-size:16px;'>
			暂无下级列表
		</div>
	</div>
</template>
<script>
import pagination from '../Common/pagination'
import {extendPerson} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {MessageBox} from  'element-ui'
  	export default {
    	data() {
      		return {
      			page: 1,
      			pagesize: 1,
      			lists: []
	    	}  	
    	},
    	components: {
			pagination
		},
	    methods: {
	    	changePage(page){
				this.page = page ;
				this.getList();
			},
			getList(){
				let params ={
					access_token: getCookie('access_token'),
					page: this.page
				}
				extendPerson(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.lists= content.person;
						this.pagesize = content.pageSize;
					}
				})
			}
	    },
	    created(){
	    	this.$nextTick(()=>{
	    		this.getList();
	    	})
	    }
  	}
</script>
<style lang='scss' scoped>
	.wrap{
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
		}
	}
	.table {
          width: 500px;
          margin-top: 18px;
          border-collapse:collapse;
          th,td{
          	font-size: 14px;
          	border:1px solid #dfe6ec;
          	text-align: center;
          }
	}
</style>