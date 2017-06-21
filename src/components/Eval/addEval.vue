<template>
	<div class="wrap">
		<div class="title" v-if='goods'>
			评价
		</div>
		<ul class="evalList">
			<li v-for='(goodItem,index) in goods'>
				<el-row>
					<el-col :span="6">
						<dl>
							<dt>
								<img :src="goodItem.cover">
							</dt>
							<dd class="name" v-text='goodItem.name'></dd>
							<dd class="type">
								<span>规格：{{goodItem.option_name}}</span>
							</dd>
						</dl>
					</el-col>
					<el-col :span='12'>
						<div class="firstEval" style="margin-bottom:20px;">
							<span>初次评论</span>
							<em v-text='goodItem.content'></em>
						</div>
						<ul class="firstEvalImg" v-if='goodItem.images.length'>
							<li v-for='(imgItem,imgIndex) in goodItem.images'>
								<img :src="imgItem" alt="">
							</li>
						</ul>
						<dl>
							<dt>
								<div class="titleCol">
									评价
								</div>
								<div class="conCol">
									<el-input type='textarea' v-model='goodItem.comment'></el-input>
								</div>
							</dt>
							<dd>
								<div class="titleCol">
									上传照片
								</div>
								<div class="conCol">
									<ul class="imgList">
										<li v-for='(imgItem,imgIndex) in uploadList[index].imgList'>
											<img :src="imgItem.url" class="evalImg">
											<img src="../../../static/evalImg/remove.png" height="16" width="16" class="remove" @click='removeImg(index,imgIndex)'>
										</li>
									</ul>
									<div class="upload">
										<el-upload
										  action="http://shuaibo.zertone1.com/app/uploadAction/upload_mul_image"
										  :on-success='uploadSuccess'
										   :before-upload="beforeUpload"
										  :show-file-list='false'
										  :data="uploadData[index]"
										  multiple>
										  <img src="../../../static/evalImg/add.png" height="60" width="60" @click='uploadIndex=index'>
										</el-upload>
									</div>
									<div class="uploadNum">
										{{uploadList[index].imgList.length}}/5
									</div>
								</div>
							</dd>
						</dl>
					</el-col>
				</el-row>
			</li>
		</ul>
		<div class="evalBtn">
			<el-button type='primary' @click='sendComment' >发表评论</el-button>
		</div>
	</div>
</template>
<script >
import {getRequest} from '../../common/js/common'
import {getCommnets,addComment} from '../../common/js/api'
import {MessageBox,Message} from  'element-ui'
	export default{
		data(){
			return {
				reqParams: null,
				goods: null,
				uploadData:[],
				uploadList:[],
				uploadIndex: ''
			}
		},
		methods:{
			beforeUpload(file) {
				let _this = this ;
				let len = _this.uploadList[_this.uploadIndex].imgList.length ;
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (len === 5) {
		        	 MessageBox.alert('最多上传5张照片', '提示', {
			          confirmButtonText: '确定',
			          callback: action => {
			            return false ;
			          }
			        });
		        }else if (!isJPG) {
		          Message.error('上传头像图片只能是 JPG 格式!');
		        }else if (!isLt2M) {
		          Message.error('上传头像图片大小不能超过 2MB!');
		        }else{
		        	return isJPG && isLt2M;
		        }
	        },
			uploadSuccess(res,file,fileList){
				let _this = this ;
				let {errcode,message,content} = res ;
				if(errcode!==0) {
					if (errcode === 99) {
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
				          		if (action==='confirm') {
				          			window.location.href = 'login.html';
				          		}
				          	}
					    });
            		}else{
            			MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定'
					    });
            		}
				}else{
					let len = _this.uploadList[_this.uploadIndex].imgList.length ;
					if (len < 5) {
						_this.uploadList[_this.uploadIndex].imgList.push(content[0]);
					}else{
						MessageBox.alert('最多上传5张照片', '提示', {
					          confirmButtonText: '确定'
				        });
					}
					
				}
			},
			removeImg(index,imgIndex){
				let _this = this ;
				_this.uploadList[index].imgList.splice(imgIndex,1);
			},
			sendComment(){
				let _this = this ;
				let params = {
					access_token: sessionStorage.access_token,
					order_sn: _this.reqParams.order_sn
				}
				let comments = [];
				for(let i = 0 ; i <_this.goods.length;i++){
					let obj = {} ;
					obj.comment_id = _this.goods[i].comment_id ;
					obj.comment = _this.goods[i].comment ;
					let images = '';
					for(let j = 0 ; j<_this.uploadList[i].imgList.length ;j++){
						images += _this.uploadList[i].imgList[j].name + ',';
					}
					obj.images = images ;
					comments.push(obj);
				};
				comments = JSON.stringify(comments) ;
				params.comments = comments ;
				addComment(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		if (action==='confirm') {
					          			window.location.href = 'login.html';
					          		}
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else{
						MessageBox.alert('追加评论成功', '提示', {
				          	confirmButtonText: '确定',
				          	callback: action => {
				          		location.href = 'myOrder.html#view10'
				          	}
					    });
					}
				})
			},
			getComment(){
				let _this = this ;
				let params = {
					access_token: sessionStorage.access_token,
					order_sn: _this.reqParams.order_sn
				}
				getCommnets(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		if (action==='confirm') {
					          			window.location.href = 'login.html';
					          		}
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else{
						this.goods = content ;
						for(let i = 0 ;i < this.goods.length ; i++ ){
							this.goods[i].comment = "" ;
							let dataObj = {
								access_token: sessionStorage.access_token,
								cate: `eval${i}`
							}
							this.uploadData.push(dataObj);
							let imgObj = {imgList:[]};
							this.uploadList.push(imgObj);
						}
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest() ;
				this.getComment();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
	.wrap{
		width: 100%;
		.title{
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			font-weight: 600;
			border-bottom: 1px solid $border_color;
		}
		.evalList{
			width: 1152px;
			margin-top: 40px;
			border-bottom: 1px solid $border_color;
			li{
				margin-bottom: 72px;
				.el-row{
					.el-col-6{
						margin-top: 10px;
						border-right: 1px solid $border_color;
						dl{
							width: 130px;
							margin: 0px auto;
							dt{
								height: 130px;
								margin-bottom: 20px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.name{
								margin: 18px auto;
								line-height: 16px;
								overflow:hidden; 
								text-overflow:ellipsis;
								display:-webkit-box; 
								-webkit-box-orient:vertical;
								-webkit-line-clamp:2;
							}
							.type{
								overflow: hidden;
								color: $text_color;
								span{
									float: left;
								}
								em{
									float: right;
								}
							}
						}
					}
					.el-col-12{
						margin-left: 90px;
						dl{
							width: 560px;
							border-top: 1px solid $border_color;
							border-left: 1px solid $border_color;
							.titleCol,.conCol{
								border-right:1px solid $border_color;
								border-bottom: 1px solid $border_color;
							}
							.titleCol{
								float: left;
								width: 60px;
								text-align: center;
								padding:0px 14px;
								background-color: $bg_color;
							}
							.conCol{
								width: 499px;
								float: left;
								padding: 16px;
							}
							dt{
								height: 118px;
								overflow: hidden;
								.titleCol{
									height: 100%;
									padding-top: 54px;
								}
								.conCol{
									height: 100%;
								}
							}
							dd{
								height: 96px;
								overflow: hidden;
								.titleCol{
									height: 100%;
									padding-top: 26px;
								}
								.conCol{
									height: 100%;
									overflow: hidden;
								}
								.imgList,.upload,.uploadNum{
									float: left;
								}
								.uploadNum{
									line-height: 60px;
									margin-left: 20px;
									color: $text_color;
								}
								.imgList{
									overflow: hidden;
									li{
										float: left;
										position: relative;
										width: 60px;
										height: 60px;
										margin-right: 20px;
										margin-bottom: 0px;
										.evalImg{
											width: 100%;
											height: 100%;
										}
										.remove{
											position: absolute;
											top: 0px;
											right:0px;
											display: none;
										}
									}
									li:hover{
										.remove{
											display: inline-block;
										}
									}
								}
							}
						}
					}
				}
			}
			
		}
		.firstEval{
			span{
				margin-right: 20px;
				color: $text_color;
			}
		}
		.firstEvalImg{
			overflow: hidden;
			margin-bottom: 20px;
			li{
				float: left;
				margin-right: 20px;
				width: 60px;
				height: 60px;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.evalBtn{
			margin: 100px auto;
			text-align: center;
			.el-button{
				width: 190px;
				font-size: 20px;
				font-weight: 600;
			}
		}    
	}
</style>