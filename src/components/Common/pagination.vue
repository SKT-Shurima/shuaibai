<template>
	<div class="paginationWrap">
	    <div class="paginationBox">
	     	<div>
	     	     <span style='margin-left:40px;margin-right:12px;'>
	     	     	共{{pagesize}}页
	     	     </span>
	     	     <span style="margin-right:16px;">
	     	     	前往<input v-model='inputPage'/>页
	     	     </span>
		    	 <el-button type='text' style='width:82px;height: 36px;' @click='changPage(0)' :disabled='currentPage===pagesize'>
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
	    		<el-button type='text' style='width:82px;height: 36px;'  @click='changPage(1)' :disabled='currentPage===1'>
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
	    		let _this = this ;
	    		if(newVal!==oldVal){
	    			_this.$emit('changePage',newVal)
	    		}
	    	}
	    },
		 methods: {
	      handleCurrentChange(val) {
	        let _this = this ;
	        _this.currentPage = val;
	        _this.inputPage = val;
	      },
	      changPage(mask){
	      	let _this = this ;
	      	if (mask) {
	      		_this.currentPage--;
	      		if (_this.currentPage<1) {
	      			_this.currentPage = 1
	      		} 
	      	}else {
	      		_this.currentPage++;
	      		if(_this.currentPage>_this.pagesize){
	      			_this.currentPage = _this.pagesize ;
	      		}
	      	}
	      },
	      jumpPage(){
	      	let _this = this;
	      	if(_this.inputPage-0>_this.pagesize){
	      		_this.inputPage=_this.pagesize;
	      		_this.currentPage  = _this.inputPage;
	      	}
	      }
	    }
	}
</script>
<style lang='scss'>
$primary:#c71724;
$border_color: #ccc;
$bg_color: #f5f5f5;
.paginationWrap {
    padding: 30px 0 80px;
    overflow: hidden;
    .paginationBox{
    	float: right;
    	div{
    		float: right;
    		span{
    			input{
    				width: 36px;
    				height: 36px;
    				line-height: 36px;
    				text-align: center;
    				border-radius: 4px;
    				border: 1px solid $border_color;
    				margin: 0px 6px;
    			}
    		}
    	}
    	.el-button{
    		margin-top: 4px;
			border: 1px solid $border_color;
			color: #333;
			background-color: $bg_color;
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
			    background-color: $bg_color;
			}
			.el-pager li.active+li {
			    border-left: 1px solid #d1dbe5;
			}
			.el-pager li:hover {
			    color: $primary;
			    border-color: $primary;
			}
			.el-pager li.active {
			    background-color: transparent;
			    border-color: transparent;
			    color: $primary;
			}
			.el-pager li.active:hover {
			    color: $primary;
			}
			.el-pager li.active+li:hover {
			    border-left: 1px solid $primary;
			}
		}
    }
}
</style>