<template>
	<div class="wrap">
		<div class="title">
			<span @click='backInfoHome'>优惠快讯</span>
			<i>&gt;</i>
			<span>正文</span>
		</div>
		<div class="container" v-if='main'>
			<h1 v-text='main.name'></h1>
			<div class="time">{{main.date_add*1000|dateStyle}}&nbsp;{{main.date_add*1000|timeStyle}}</div>
			<div class="main" v-html='main.content'>
			</div>
			<dl class="page" v-if='infoList.length'>
				<dt v-if='(index-0)>0' @click='changeMain(0)'>
				   <i style="transform:rotateZ(180deg)"></i>
				   <em>上一篇</em>
				   <span v-text='infoList[index-1].name'></span>
				</dt>
				<dd v-if='(index-0)<(infoList.length-1)' @click='changeMain(1)'>
					<span v-text='infoList[(index-0)+1].name' style="text-align: right;"></span>
					<em>下一篇</em>
					<i></i>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import {getInformationsDetail,getInformations} from '../../common/js/api'
import {dateStyle,timeStyle} from '../../common/js/filter'
import {errorInfo,getHashReq} from '../../common/js/common'
	export default {
		data(){
			return {
				infoList: [],
				id: "",
				index: "0",
				reqParams: {},
				main: null 
			}
		},
		filters: {
			dateStyle,timeStyle
		},
		methods:{
			// 转义
			escape2Html(a) {
			    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			    return a.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},
			backInfoHome(){
				location.hash = '' ;
			},
			changeMain(mask){
				mask ? ++this.index :--this.index ;
				this.id = this.infoList[this.index].id ;
				location.hash=`#infoDetail?id=${this.id}&index=${this.index}&page=${this.reqParams.page}` ;
				this.initInfo() ;
			},	
			initInfo(){
				let params = {
					id: this.id
				}
				getInformationsDetail(params).then(res=>{
					let {errcode,message,content} = res ;
					if (errcode !== 0 ) {
						errorInfo(errcode,message) ;
					} else{
						content.content = this.escape2Html(content.content) ;
						this.main = content ;
					}
				})
			},
			initList(){
				let  params = {
					page: this.reqParams.page
				}
				getInformations().then(res=>{
					let {errcode,message,content} = res ;
					if (errcode !== 0 ) {
						errorInfo(errcode,message) ;
					} else{
						this.infoList = content.infos;
					}
				});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getHashReq() ;
				this.index = this.reqParams.index ;
				this.id = this.reqParams.id ;
				this.initInfo(); 
				this.initList();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #f1f1f1;
$text_color: #999;
.wrap{
	width: 1250px;
	margin: 0px auto;
	.title{
		width: 100%;
		height: 50px;
		padding: 14px 0px 20px 0px;
		color: $text_color;
		border-bottom: 1px solid $border_color;
		span{
			cursor: pointer;
			&:hover{
				color: $primary;
			}
		}
	}
	.container{
		margin-top: 40px;
	}
	.time{
		margin-top: 24px;
		color: $text_color;
	}
	.page{
		margin-top: 100px;
		overflow: hidden;
		i,span{
			display: inline-block;
		}
		i{
			width: 14px;
			height: 14px;
			background: url('../../../static/themeImg/r.png') no-repeat;
		}
		em{
			vertical-align: top;
			margin: 0px 10px;
		}
		span{
			width: 150px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #005b9a;
		}
		dt,dd{
			cursor: pointer;
		}
		dt{
			float: left;
		}
		dd{
			float: right;
		}
	}
}
</style>