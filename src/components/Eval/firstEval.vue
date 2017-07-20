<template>
	<div class="wrap">
		<div class="title">
			评价
		</div>
		<ul class="evalList" v-if='scores.length'>
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
		<div class="seviceRate">
			<ul>
				<li class="rate">
					<div>服务满意度</div><el-rate v-model='service_score'></el-rate>
				</li>
				<li class="rate">
					<div>服务满意度</div><el-rate v-model='logistics_score'></el-rate>
				</li>
			</ul>
		</div>
		<div class="evalBtn">
			<el-button type='primary' @click='sendComment' >发表评论</el-button>
		</div>
	</div>
</template>
<script >
import {getRequest,errorInfo,getCookie} from '../../common/js/common'
import {commentGoods} from '../../common/js/api'
import {MessageBox,Message} from  'element-ui'
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
					errorInfo(errcode,message) ;
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
					access_token: getCookie('access_token'),
					order_sn: _this.reqParams.order_sn,
					service_score: _this.service_score,
					logistics_score: _this.logistics_score
				}
				let comments = [];
				for(let i = 0 ; i <_this.goods.length;i++){
					let obj = {} ;
					obj.goods_id = _this.goods[i].goods_id ;
					obj.comment = _this.goods[i].comment ;
					obj.score = _this.scores[i].score;
					let images = '';
					for(let j = 0 ; j<_this.uploadList[i].imgList.length ;j++){
						images += _this.uploadList[i].imgList[j].name ;
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
		.rate{
			overflow: hidden;
			div{
				float: left;
			}
			.el-rate{
				margin-left: 30px;
			}
		}
		.seviceRate{
			margin-top: 56px;
			margin-left: 378px;
			li{
				margin-bottom: 46px;
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