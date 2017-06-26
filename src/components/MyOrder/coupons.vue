<template>
	<div class="wrap">
		<h4 class="title">
			我的优惠券
		</h4>
		<ul class="couponsListBox" v-if='couponsList'>
			<li v-for='(item,index) in couponsList' :class='{"noMarginRight":(index+1)%3===0}' class="couponsList">
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
						<li>使用范围：电脑</li>
						<li>发行店铺：{{item.name}}</li>
						<li>有效时间：{{(item.date_start-0)*1000|dateStylePoint}}-{{(item.date_end-0)*1000|dateStylePoint}}</li>
					</ul>
				</div>
				<div class="opera">
					<button>进店看看</button>
					<button>删除优惠券</button>
				</div>
			</li>
		</ul>
		<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	</div>
</template>
<script >
import {currency,dateStylePoint} from '../../common/js/filter'
import {getCoupons} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
import pagination from '../Common/pagination'
	export default{
		data(){
			return{
				couponsList: null,
				pagesize: 1 ,// 总页数
				page: "1"
			}
		},
		filters:{
			currency,
			dateStylePoint
		},
		components: {
			pagination
		},
		methods:{
			// 改变页数
			changePage(page){
				let _this = this ;
				_this.page = page ;
				_this.getList();
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let params  ={
					access_token : sessionStorage.access_token
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
$border_color: #ccc;
$primary:#c71724;
$text_color: #666;
$bg_color: #e84848;
	.wrap{
		width: 1080px;
		.title{
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-bottom: 16px;
			border-bottom: 1px solid $border_color;
		}
		.couponsListBox{
			width: 100%;
			overflow: hidden;
			.couponsList{
				float: left;
				width: 350px;
				margin-right: 15px;
				margin-top: 24px;
				color: #fff;
				.info{
					width: 100%;
					height: 120px;
					background-color: $bg_color;
					.limit{
						float: left;
					    width: 120px;
					    height: 120px;
					    padding: 10px;
					    border-right: 1px dashed #fff;
					    dl{
					    	overflow: hidden;
					    	padding: 10px;
					    	dt{
					    		float: left;
					    		font-size: 14px;
					    		line-height: 32px;
					    	}
					    	dd{
					    		float: left;
					    		font-size: 40px;
					    		font-weight: 600;
					    	}
					    }
					    div{
					    	text-align: center;
					    	font-size: 16px;
					    	font-weight: 600;
					    }
					}
					ul{
						float: left;
						width: 230px;
						padding: 18px;
						li{
							line-height: 28px;
						}
					}
				}
				.opera{
					line-height: 36px;
					button{
						border: none;
						background-color: transparent;
						outline: none;
						padding: 0px 14px;
						color: $text_color;
					}
				}
			}
			.noMarginRight{
				margin-right: 0px;
			}
		}
	}
</style>