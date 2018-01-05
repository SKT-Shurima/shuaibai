<template>
	<el-dialog
  		title="选择优惠券"
  		v-model='couponBol'
  		size="tiny"
  		top='25%'
  		:before-close="handleClose">
		<ul class="coupons-list-box" v-if='couponsList'>
			<li v-for='(item,index) in couponsList' :class='{"no-margin-r":(index+1)%3===0,"checked":checkIndex===index}' class="coupons-list" @click='checkIndex=index'>
				<div class="info">
					<div class="limit">
						<dl>
							<dt>￥</dt>
							<dd v-text='Math.floor(item.amount-0)'></dd>
						</dl>
						<div>满{{Math.floor(item.limit-0)}}可用</div>
					</div>
					<ul>
						<li>{{item.name}}</li>
						<li>发行方：{{item.issuer}}</li>
						<li>有效时间：{{(item.date_start-0)*1000|dateStylePoint}}-{{(item.date_end-0)*1000|dateStylePoint}}</li>
					</ul>
				</div>
			</li>
		</ul>
	<div class="type-btn">
		<el-button @click="handleClose" >取 消</el-button>
    	<el-button type="primary" @click="ensure">确 定</el-button>
	</div>
</el-dialog>
</template>
<script>
import {dateStylePoint} from '../../common/js/filter'
import {rechargePay} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
  export default {
    data() {
      return {
        typeRadio: "4",
        checkIndex:""
      };
    },
    filters:{
    	dateStylePoint
    },
    props: {
    	couponBol: {
    		type: Boolean,
    		required: true
    	},
    	couponsList: {
    		type: Array,
    		required: true
    	}
    },
    watch:{
    	couponBol:{
    		handler(){
    			if (!this.couponBol) {
    				this.checkIndex ="";
    			}
    		},
    		deep: true
    	}
    },	
    methods: {
    	handleClose(done) {
	        this.$emit('close');
	     },
    	ensure(){
    		let checkIndex = this.checkIndex ;
    		if (!checkIndex) {
    			MessageBox.alert('请选择优惠券', '提示', {
		          	confirmButtonText: '确定'
			    });
    		}else{
    			this.$emit('sendIndex',this.checkIndex) ;
    		}
    	}
    }
  };
</script>
<style lang='scss'>
	.el-dialog.el-dialog--tiny{
		width: 1210px;
	}
	.coupons-list-box{
		width: 100%;
		overflow: hidden;
		padding-left: 42px;
		.coupons-list{
			float: left;
			width: 346px;
			margin-right: 15px;
			margin-top: 24px;
			cursor: pointer;
			color: #fff;
			border: 2px solid transparent;
		}
		.info{
			width: 100%;
			height: 120px;
			background-color: #e84848;
			ul{
				float: left;
				width: 222px;
				padding: 18px 12px;
				font-size: 12px;
				li{
					line-height: 28px;
				}
			}
		}
		.limit{
			float: left;
		    width: 120px;
		    height: 120px;
		    padding: 10px;
		    border-right: 1px dashed #fff;
		    dl{
		    	overflow: hidden;
		    	padding: 10px;
		    }
	    	dt{
	    		float: left;
	    		font-size: 14px;
	    		line-height: 32px;
	    	}
	    	dd{
	    		float: left;
	    		font-size: 34px;
	    		font-weight: 600;
	    	}
		    div{
		    	text-align: center;
		    	font-size: 16px;
		    	font-weight: 600;
		    }
		}
		.opera{
			line-height: 36px;
			button{
				border: none;
				background-color: transparent;
				outline: none;
				padding: 0px 14px;
				color:  #666;
			}
		}
		.checked{
			border-color: #c71724;
		}
		.no-margin-r{
			margin-right: 0px;
		}
		.type-box,.type-btn{
			text-align: center;
			margin-bottom: 20px;
		}
	}
</style>