<template>
	<div class="wrap">
		<h4 class="title">
			我的优惠券
		</h4>
		<ul class="coupons-list-box" v-if='couponsList.length'>
			<li v-for='(item,index) in couponsList' :class='{"no-marigin-r":(index+1)%3===0}' class="coupons-list">
				<div class="info">
					<div class="limit">
						<dl>
							<dt>￥</dt>
							<dd v-text='Math.floor(item.amount-0)'></dd>
						</dl>
						<div>
							满{{Math.floor(item.limit-0)}}可用
						</div>
					</div>
					<ul>
						<li>{{item.name}}</li>
						<li>发行方：{{item.issuer}}</li>
						<li>有效时间：{{(item.date_start-0)*1000|dateStylePoint}}-{{(item.date_end-0)*1000|dateStylePoint}}</li>
					</ul>
				</div>
			</li>
		</ul>
		<div v-else style='font-size:16px;'>
			暂无优惠券
		</div>
	</div>
</template>
<script >
import {dateStylePoint} from '../../common/js/filter'
import {getCoupons} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
	export default{
		data(){
			return{
				couponsList: []
			}
		},
		filters:{
			dateStylePoint
		},
		mounted(){
			this.$nextTick(()=>{
				let params  ={
					access_token: getCookie('access_token')
				}
				getCoupons(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.couponsList = content;
					}
				})
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1080px;
	}
	.title{
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		margin-bottom: 16px;
		border-bottom: 1px solid #ccc;
	}
	.coupons-list-box{
		width: 100%;
		overflow: hidden;
	}
	.coupons-list{
		float: left;
		width: 350px;
		margin-right: 15px;
		margin-top: 24px;
		color: #fff;
		.info{
			width: 100%;
			height: 120px;
			background-color: #e84848;
			ul{
				float: left;
				width: 230px;
				padding: 18px;
				li{
					line-height: 28px;
				}
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
	.no-marigin-r{
		margin-right: 0px;
	}
</style>