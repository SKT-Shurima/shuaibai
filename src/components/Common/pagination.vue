<template>
	<div class="page-wrap">
	    <div class="page-box">
	     	<div>
	     	     <span style='margin-left:40px;margin-right:12px;'>
	     	     	共{{pagesize}}页
	     	     </span>
	     	     <span style="margin-right:16px;">
	     	     	前往<input class='border-c' v-model='inputPage'/>页
	     	     </span>
		    	 <el-button type='text' style='width:82px;height: 36px;' @click='changePage(0)' :disabled='currentPage===pagesize'>
			    	下一页<i style="margin-left:6px;">&gt;</i>
		    	</el-button>
		    	<el-button type='text' style='width:60px;height:36px;' @click='jumpPage'>
		    		确定
		    	</el-button>
		    </div>
			<el-pagination
			    @current-change="handleCurrentChange"
			   	:current-page="currentPage"
			    :page-count='pagesize'
			    layout="pager">
		    </el-pagination>
		   <div>
	    		<el-button type='text' style='width:82px;height: 36px;'  @click='changePage(1)' :disabled='currentPage===1'>
					<i style="margin-right: 6px;">&lt;</i>上一页
				</el-button>
	    	</div>
		   
	    </div>
	</div>
</template>
<script>
	export default {
		data() {
	      return {
	        currentPage: 1,
	        inputPage: 1
	      }
	    },
	    props: {
	    	pagesize: {
	    		type: Number,
	    		require: true,
	    		default: 1
	    	}
	    },
	    watch: {
	    	currentPage(newVal,oldVal){
	    		if(newVal!==oldVal){
	    			this.$emit('changePage',newVal)
	    		}
	    	}
	    },
		methods: {
	      	handleCurrentChange(val) {
	        	this.currentPage = val;
	       		this.inputPage = val;
	      	},
	      	changePage(mask){
	      		if (mask) {
	      			this.currentPage--;
	      			if (this.currentPage<1) {
	      				this.currentPage = 1
	      			} 
	      		}else {
	      			this.currentPage++;
	      			if(this.currentPage>this.pagesize){
	      				this.currentPage = this.pagesize ;
	      			}
	      		}
	      	},
	      	jumpPage(){
		      	if(this.inputPage-0>this.pagesize){
		      		this.inputPage=this.pagesize;
		      		this.currentPage  = this.inputPage;
		      	}
	      	}
	    }
	}
</script>
<style lang='scss'>
	.page-wrap {
		width: 100%;
	    padding: 30px 0 80px;
	    overflow: hidden;
	    text-align: center;
	    .page-box{
	    	display: inline-block;
	    	div{
	    		float: right;
	    	}
			input{
				width: 36px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				border-radius: 4px;
				border: 1px solid #ccc;
				margin: 0px 6px;
			}
	    	.el-button{
	    		margin-top: 4px;
				border: 1px solid #ccc;
				color: #333;
				background-color: #f5f5f5;
				i{
					margin: 0px 2px;
				}
	    	}
	    	.el-pagination {
			    margin-left: 6px;
			    margin-top: 4px;
			    .el-pager li {
			    	width: 36px;
			    	height: 36px;
			    	line-height: 36px;
			    	text-align: center;
				    margin: 0 6px;
				    border-right:1px solid rgb(229, 211, 209);
				    background-color: #f5f5f5;
				}
				.el-pager li.active+li {
				    border-left: 1px solid #d1dbe5;
				}
				.el-pager li:hover {
				    color: #c71724;
				    border-color: #c71724;
				}
				.el-pager li.active {
				    background-color: transparent;
				    border-color: transparent;
				    color: #c71724;
				}
				.el-pager li.active:hover {
				    color: #c71724;
				}
				.el-pager li.active+li:hover {
				    border-left: 1px solid #c71724;
				}
			}
	    }
	}
</style>