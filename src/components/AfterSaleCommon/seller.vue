<template>
	<div class="wrap">
		<div class="apply-info" v-if='refundInfo'>
			<el-row>
				<el-col :span='2'>申请时间：</el-col>
				<el-col :span='22'>
					{{refundInfo.date_add*1000|dateStyle}}&nbsp;{{refundInfo.date_add*1000|timeStyle}}
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>申请原因：</el-col>
				<el-col :span='22' v-text='refundInfo.reason'>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>退款金额：</el-col>
				<el-col :span='22'>
					{{refundInfo.price|currency}}
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>申请说明：</el-col>
				<el-col :span='22' v-text='refundInfo.content'>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='22' :offset='2'>
					<ul class="img-list">
						<li v-for='(item,index) in refundInfo.images' :key='index'>
							<img :src="item">
						</li>
					</ul>
				</el-col>
			</el-row>
		</div>
		<ul class="dialogue" v-if='refundInfo'>
			<li v-for='(item,index) in refundInfo.messages' :key='index'>
				<el-row>
					<el-col :span='3'>
						{{item.date_add*1000|dateStyle}}&nbsp;{{item.date_add*1000|timeStyle}}
					</el-col>
					<el-col :span='20' :offset='1'>
						{{item.title}}&nbsp;{{item.content}}
					</el-col>
				</el-row>
			</li>
		</ul>
		<div class="opera" v-if='refundInfo'>
			<div v-if='refundInfo.refund_state==="1"'>
				<el-button type='primary' size='small' @click='editApply'>修改申请</el-button>
				<el-button type='primary' size='small' @click='removeRefund'>撤销申请</el-button>
				<el-button type='primary' size='small' @click='msgBol=true'>留言</el-button>
			</div>
			<div v-if='refundInfo.refund_state==="3"'>
				<el-button type='primary' size='small' @click='expressBol=true'>填写退货单号</el-button>
				<el-button type='primary' size='small' @click='msgBol=true'>留言</el-button>
			</div>
		</div>
		<transition name='fade'>
			<div v-show='expressBol' class="mask">
				<div class="add-goods-info">
					<div class="add-title">退货物流信息<i class="el-icon-close" @click='expressBol=false;'></i></div>
					<el-form :model="form" label-width="70px" ref='expressForm'>
					    <el-form-item label="物流公司">
						    <select v-model="expressForm.name" placeholder="请选择" size='small' style='width:100%;' class="el-select">
						        <option :label='item.express_name' :value="item.code" v-for='(item,index) in express' :key='index'></option>
						    </select>
				        </el-form-item>
				        <el-form-item label="物流单号">
					        <el-input v-model="expressForm.num" size='small'></el-input>
					    </el-form-item>
					</el-form>
					<div class="ensure-btn">
						<el-button type='primary' size='small' @click="expressFormFn('expressForm')">确定</el-button>
					</div>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div v-show='msgBol' class="mask">
				<div class="add-goods-info">
					<div class="add-title">留言<i class="el-icon-close" @click='msgBol=false;'></i></div>
					<el-form :model="leaveMsgForm" label-width="70px"  ref='leaveMsgForm'>
					    <el-form-item label="留言内容">
						    <el-input type='textarea' v-model='leaveMsgForm.content'></el-input>
				        </el-form-item>
					</el-form>
					<div class="ensure-btn">
						<el-button type='primary' size='small' @click="leaveMsgFormFn('leaveMsgForm')">确定</el-button>
					</div>
				</div>
			</div>
		</transition>
		
	</div>
</template>
<script>
import {currency,dateStyle,timeStyle} from '../../common/js/filter'
import {supportDetail,revokerRefund,getExpress,writeReturnNote,refundMessage} from '../../common/js/api'
import {getHashReq,errorInfo,getCookie} from '../../common/js/common'
import {MessageBox,Message} from  'element-ui'
	export default{
		data(){
			var checkName = (rule,value,callback) => {
		     	if (this.form.account-0 > this.goodsInfo.price-0) {
		     		callback(new Error('超出最大退货金额'));
		     	}else if(this.form.account===''){
		     		callback(new Error('请输入退货金额'));
		     	}else{
		     		callback();
		     	} 
		     };
			return{
		        expressBol: false,
		        msgBol: false,
		        express: null,
		        expressForm: {
		          name: '',
		          num: ''
		        },
		        leaveMsgForm:{
		        	content: ""
		        },
		        formLabelWidth: '120px',
		        reqParams: null,
		        refundInfo: null
			}
		},
		filters:{
			currency,dateStyle,timeStyle
		},
		methods:{
			// 获取物流信息
			getExpressFn(){
				getExpress().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.express = content ;
					}
				})
			},
			// 修改申请
			editApply(){
				let refund_sn = this.refundInfo.refund_sn ; 
				location.hash = `editMoneyReturn?refund_sn=${refund_sn}` ;
			},
			// 撤销申请
			removeRefund(){
				 MessageBox.confirm('是否撤销申请?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params = {
						access_token: getCookie('access_token'),
						refund_sn: this.reqParams.refund_sn
					}
					revokerRefund(params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							Message.success({
					            message: '撤销成功',
					            type: 'success'
					        });
						}
					})
		        }).catch(() => {
                    Message.success({
			            message: message,
			            type: 'success'
			        });
		        });
				
			},
			// 留言
			leaveMsgFormFn(formName) {
				let content = this.leaveMsgForm.content ;
				content = content.trim() ;
				if (!content) {
					MessageBox.alert('请输入留言', '提示', {
			          	confirmButtonText: '确定'
				    });
				    return ;
				}
	        	this.$refs[formName].validate((valid) => {
		            if (valid) {
			            let params = {
			            	access_token: getCookie('access_token'),
			            	refund_sn: this.reqParams.refund_sn,
			            	content: this.leaveMsgForm.content
			            }
			            refundMessage(params).then(res=>{
			            	let {errcode,message,content} = res ;
							if(errcode!==0) {
								errorInfo(errcode,message) ;
							}else{
							    Message.success({
						            message: message,
						            type: 'success'
						        });
						       this.msgBol = false;
						       setTimeout(()=>{
						       	  location.reload();
						       },1000)
							}
			            })
		            } else {
			            console.log('error submit!!');
			            return false;
		            }
	        	});
	    	},
			// 提交退货单号
			expressFormFn(formName) {
	        	this.$refs[formName].validate((valid) => {
		            if (valid) {
			            let params = {
			            	access_token: getCookie('access_token'),
			            	refund_sn: this.reqParams.refund_sn,
			            	express: this.expressForm.name,
			            	express_sn: this.expressForm.num
			            }
			            writeReturnNote(params).then(res=>{
			            	let {errcode,message,content} = res ;
							if(errcode!==0) {
								errorInfo(errcode,message) ;
							}else{
							    Message.success({
						            message: message,
						            type: 'info'
						        });
						        this.expressBol=false; 
							}
			            })
		            } else {
			            console.log('error submit!!');
			            return false;
		            }
	        	});
	    	},
	    	init(){
	    		this.reqParams = getHashReq();
	    		let  refund_sn = this.reqParams.refund_sn ;
			    let params = {
			    	access_token: getCookie('access_token'),
			    	refund_sn: refund_sn
			    }
			    supportDetail(params).then(res=>{
			    	let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.refundInfo = content ;
						let state = this.refundInfo.refund_state ;
						if (state=="2"||state=='5'||state=='6') {
							location.hash=`result?refund_sn=${refund_sn}` ;
						}else if(state=="3"){
							location.hash=`goodsReturn?refund_sn=${refund_sn}` ;
						}
					}
			    })
	    	}
		},
		mounted(){
			this.$nextTick(()=>{
			    this.init();
			    this.getExpressFn();
			})
		}
	}
</script>
<style lang='scss'  scoped>
	.apply-info{
		padding: 30px;
		background-color: #f5f5f5;
		.el-row{
		   	width: 846px;
		   	margin-bottom: 20px;
		   	.el-col-2{
		   		color: #666;
		   	}
		}
		.el-row:last-child {
			margin-bottom : 0px;
		}
		.img-list{
			overflow: hidden;
			li{
				float: left;
				margin-right: 10px;
				width: 60px;
				height: 60px;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.dialogue{
		width: 1080px;
		margin-top: 44px;
		margin-bottom: 10px;
		li{
			font-size: 14px;
			line-height: 16px;
			margin-bottom: 32px;
		}
		.el-col-3{
			color: #666;
		}
		.el-col-21{
			font-weight: 600;
		}
	}
	.opera{
		margin-left: 136px;
		.el-button{
			width: 100px;
		}
	}
	.mask{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: rgba(0,0,0,.7);
		.add-goods-info{
			width: 360px;
			height: 240px;
			position: absolute;
			top: 15%;
			left: 0px;
			right: 0px;
			margin: auto;
			padding-top: 24px;
			padding-left: 24px;
			padding-right: 40px;
			padding-bottom: 24px;
			border-radius: 4px;
			background-color: #fff;
			.add-title{
				position: relative;
				text-align: center;
				font-weight: 600;
				font-size: 14px;
				margin-bottom: 28px;
				i{
					position: absolute;
					top: -10px;
					right: -10px;
					cursor: pointer;
				}
			}
			.el-form{
				.el-form-item{
					margin-bottom: 18px;
				}
				select{
			    	background-color: #fff;
				    background-image: none;
				    border-radius: 4px;
				    border: 1px solid rgb(217, 193, 191);
				    box-sizing: border-box;
				    color: rgb(61, 33, 31);
				    display: block;
				    font-size: inherit;
				    height: 30px;
				    line-height: 1;
				    outline: none;
				    padding: 3px 10px;
				    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				    width: 100%;
			    }
			}
			.ensure-btn{
				text-align: center;
				.el-button{
					width: 118px;
				}
			}
		}
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		  	opacity: 0
	}
</style>