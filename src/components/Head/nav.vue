<template>
	<div class="wrap">
		<div class="primary-bg nav-wrap">
			<div class="box">
				<dl>
					<dt @mouseleave='listBol=false;listConBol=false'>
						<div @mouseenter='listConBol=true' @mouseleave='listConBol=false' style="cursor: pointer">全部商品分类<i></i></div>
						<ul class="con-list" @mouseenter='listBol=true;listConBol=true' @mouseleave='listBol=false;listConBol=false' v-show='listConBol'>
							<li v-for='(item,index) in category' :key='index'  @mouseenter='listIndex=index;fIndex=index' :class='{"check-unit":listIndex===index}' @click='checkGoods(index,item.category_id)'>
								<img :src="item.selected_icon" v-show='listConBol&&listIndex===index'>
								<img :src="item.icon" v-show='!(listConBol&&listIndex===index)'>
								{{item.name}}
							</li>
						</ul>
						<div class="container" v-show='listBol'  @mouseleave='listBol=false;listConBol=false' @mouseenter='listBol=true;listConBol=true'>
							<div class="detail-list">
								<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2.category_id' v-if='item2.child_category.length'>
									<el-col :span='4'>
									    <span v-text='item2.name' @click='checkGoods(`${fIndex},${index2}`,item2.category_id)'></span>
									    <em>></em>
									</el-col>
									<el-col :span='16' :offset="1">
										<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3.category_id' v-text='item3.name' @click='checkGoods(`${fIndex},${index2},${index3}`,item3.category_id)'></span>
									</el-col>
								</el-row>
							</div>
							<div class="img-box">
								<guess-like></guess-like>
							</div>
						</div>
					</dt>
					<dd><a href="index.html" style='color: #fff;'>返回首页</a></dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
import {getRequest,errorInfo} from '../../common/js/common'
import {getCategory} from '../../common/js/api'
import guessLike from '../Common/guessLike'
  export default {
    data(){
     	return{
     		listBol: false,
     		listConBol: false,
     		listIndex: "",
     		category: [{name:''}],
     		fIndex: 0,
			sIndex: 0,
     	}
    },
    components:{
     	guessLike
    },
    methods:{
    	checkGoods(index,id){
     		location.href = `relatedGoods.html?cat=${index}&category_id=${id}`;
     	},
    	initLevel(cat){
    		let category = this.category ;
    		let catArr = cat.split(',');
    		let len = catArr.length;
    		let level = new  Array ;
    		let fObj =  category[catArr[0]] ;
			level.push(fObj) ;
    		if (len>=2) {
    			let  sObj = category[catArr[0]].child_category[catArr[1]] ;
    			level.push(sObj);
    			if (len===3) {
    				let tObj = category[catArr[0]].child_category[catArr[1]].child_category[catArr[2]] ;
    				level.push(tObj); 
    			}
    		}
    		this.$emit('sendLevel',level); 
			
		}, 
    },
    mounted(){
     	this.$nextTick(()=>{
			getCategory().then(res=>{
				let {errcode,message,content} = res ;
				if (errcode !== 0 ) {
					errorInfo(errcode,message) ;
				}else{
					this.category = content;
				    let reqParams = getRequest();
					let cat = reqParams.cat ;
					if (cat) {
						this.initLevel(cat) ;
					}
				}
			})
     	})
     }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		margin-top: 36px;
	}
    .nav-wrap{
		width: 100%;
		height: 40px;
	}
	.box{
		width: 1250px;
		margin: 0px auto;
		dt,dd{
			width: 150px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			font-size: 14px;
			font-weight: 600;
			text-align: center;
			float: left;
		}
		dt{
			position: relative;
		}
		.con-list{
			position: absolute;
			width: 150px;
			height: 500px;
			background-color: #c81623;
			color: #fff;
			text-indent: 16px;
			text-align: left;
			z-index: 100;
			li{
				width: 100%;
				height: 45.46px;
				line-height: 45.46px;
				font-weight: bolder;
				cursor: pointer;
			}
			.check-unit{
				background-color: #fff;
				color: #c81623;
			}
			img{
				width: 22px;
				vertical-align: -5px;
				margin-right: 10px;
			}
		}
		.container{
			position: absolute;
			top: 40px;
			left: 150px;
			width: 900px;
			height: 500px;
			font-size: 12px;
			font-weight: 400;
			overflow: hidden;
			background-color: #fff;
			z-index: 99;
			color: #000;
		}
		.detail-list{
			width: 600px;
			height: 500px;
			overflow-y: auto;
			overflow-x: hidden;
			padding-left: 20px;
			padding-top: 28px;
			float: left;
			.el-row{
				margin-bottom: 22px;
			}
			.el-col-4{
				font-weight: 600;
				span{
					display: inline-block;
					width: 72px;
					text-align-last: justify;
					cursor: pointer;
				}
				em{
					margin-left: 6px;
				}
				
			}
			.el-col-16{
				overflow: hidden;
				padding-left: 6px;
				padding-bottom: 10px;
				border-bottom:  1px dashed #dcdcdc;
				span{
					float: left;
					margin-right: 16px;
					margin-bottom: 20px;
					cursor: pointer;
				}
			}
		}
		.img-box{
			float: left;
			width: 250px;
			height: 500px;
			padding: 10px;
			background-color: #f2f2f2;
			img{
				width: 100%;
				height: 110px;
			}
			.small-img{
				border-bottom: 1px solid #ccc;
				overflow: hidden;
				li{
					float: left;
					width: 110px;
					margin-bottom: 10px;
					
				}
				.margin-l{
					margin-left: 10px;
				}
			}
			.big-img{
				li{
				    margin-top: 10px;
				}
			}
		}
	}
</style>