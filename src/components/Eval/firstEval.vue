<template>
	<div class="eval-wrap">
		<div class="title">评价</div>
		<ul class="eval-list" v-if='scores.length'>
			<li v-for='(goodItem,index) in order.goods'>
				<el-row>
					<el-col :span="6">
						<dl>
							<dt>
								<img :src="goodItem.image">
							</dt>
							<dd class="name" v-text='goodItem.name'></dd>
							<dd class="type">
								<span>规格：{{goodItem.option_name}}</span>
							</dd>
						</dl>
					</el-col>
					<el-col :span='12'>
						<div class="rate" style="margin-bottom:20px;">
							<div>商品满意度</div>
							<el-rate v-model='scores[index].score'></el-rate>
						</div>
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
		<div class="sevice-rate">
			<ul>
				<li class="rate">
					<div>服务满意度</div><el-rate v-model='service_score'></el-rate>
				</li>
				<li class="rate">
					<div>服务满意度</div><el-rate v-model='logistics_score'></el-rate>
				</li>
			</ul>
		</div>
		<div class="eval-btn">
			<el-button type='primary' @click='sendComment' >发表评论</el-button>
		</div>
	</div>
</template>
<script >
import {getRequest,errorInfo,getCookie} from '../../common/js/common'
import {commentGoods} from '../../common/js/api'
import {MessageBox,Message} from  'element-ui';
import '../../common/css/eval.scss';
	export default{
		data(){
			return {
				reqParams: null,
				goods: null,
				service_score: 0,
				logistics_score: 0,
				scores:[],
				uploadData:[],
				uploadList:[],
				uploadIndex: ''
			}
		},
		props:{
			order:{
				type: Object,
				required: true
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
					order_sn: this.reqParams.order_sn,
					service_score: this.service_score,
					logistics_score: this.logistics_score
				}
				let comments = [],goods=this.goods;
				for(let i = 0 ; i <goods.length;i++){
					let obj = {} ;
					obj.goods_id = goods[i].goods_id ;
					obj.comment = goods[i].comment ;
					obj.score = scores[i].score;
					let images = '',imgList=this.uploadList[i].imgList;
					for(let j = 0 ; j<imgList.length ;j++){
						images += imgList[j].name ;
					}
					obj.images = images ;
					comments.push(obj);
				};
				comments = JSON.stringify(comments) ;
				params.comments = comments ;
				commentGoods(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						location.reload();
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.reqParams = getRequest() ;
				let goods = this.order.goods ;
				for(let i = 0 ;i < goods.length ; i++ ){
					goods[i].comment = "" ;
					let obj = {
						score: 0
					}
					this.scores.push(obj);
					let dataObj = {
						access_token: getCookie('access_token'),
						cate: `eval${i}`
					}
					this.uploadData.push(dataObj);
					let imgObj = {imgList:[]};
					this.uploadList.push(imgObj);
				}
				this.goods = goods;
			})
		}
	}
</script>
