<template>
	<div class="eval-wrap">
		<div class="title" v-if='goods'>评价</div>
		<ul class="eval-list">
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
						<div class="first-eval" style="margin-bottom:20px;">
							<span>初次评论</span>
							<em v-text='goodItem.content'></em>
						</div>
						<ul class="first-eval-img" v-if='goodItem.images.length'>
							<li v-for='(imgItem,imgIndex) in goodItem.images'>
								<img :src="imgItem" alt="">
							</li>
						</ul>
						<dl>
							<dt>
								<div class="title-col">
									评价
								</div>
								<div class="con-col">
									<el-input type='textarea' v-model='goodItem.comment'></el-input>
								</div>
							</dt>
							<dd>
								<div class="title-col">
									上传照片
								</div>
								<div class="con-col">
									<ul class="img-list">
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
									<div class="upload-num">
										{{uploadList[index].imgList.length}}/5
									</div>
								</div>
							</dd>
						</dl>
					</el-col>
				</el-row>
			</li>
		</ul>
		<div class="eval-btn">
			<el-button type='primary' @click='sendComment' >发表评论</el-button>
		</div>
	</div>
</template>
<script >
import {getRequest,errorInfo,getCookie} from '../../common/js/common';
import {getCommnets,addComment} from '../../common/js/api';
import {MessageBox,Message} from  'element-ui';
import '../../common/css/eval.scss';
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
				let len = this.uploadList[this.uploadIndex].imgList.length ;
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
				let {errcode,message,content} = res ;
				if(errcode!==0) {
					errorInfo(errcode,message) ;
				}else{
					let len = this.uploadList[this.uploadIndex].imgList.length ;
					if (len < 5) {
						this.uploadList[this.uploadIndex].imgList.push(content[0]);
					}else{
						MessageBox.alert('最多上传5张照片', '提示', {
					          confirmButtonText: '确定'
				        });
					}
					
				}
			},
			removeImg(index,imgIndex){
				this.uploadList[index].imgList.splice(imgIndex,1);
			},
			sendComment(){
				let params = {
					access_token: getCookie('access_token'),
					order_sn: this.reqParams.order_sn
				}
				let comments = [],goods=this.goods;
				for(let i = 0 ; i <goods.length;i++){
					let obj = {} ;
					obj.comment_id = goods[i].comment_id ;
					obj.comment = goods[i].comment ;
					let images = '',imgList=this.uploadList[i].imgList;
					for(let j = 0 ; j<imgList.length ;j++){
						images += imgList[j].name + ',';
					}
					obj.images = images ;
					comments.push(obj);
				};
				comments = JSON.stringify(comments) ;
				params.comments = comments ;
				addComment(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
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
				let params = {
					access_token: getCookie('access_token'),
					order_sn: this.reqParams.order_sn
				}
				getCommnets(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.goods = content ;
						for(let i = 0 ;i < this.goods.length ; i++ ){
							this.goods[i].comment = "" ;
							let dataObj = {
								access_token: getCookie('access_token'),
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