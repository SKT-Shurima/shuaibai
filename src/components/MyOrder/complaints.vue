<template>
	<div class="wrap">
		<h4 class="title">
			投诉
		</h4>
		<div class="addInfo">
			填写投诉信息
		</div>
		<el-row>
			<el-col :span='4'>
				投诉类型
			</el-col>
			<el-col :span='20'>
				<el-select v-model="value" placeholder="请选择" style='width:100%;' size='small'>
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				投诉内容
			</el-col>
			<el-col :span='20'>
				<el-input
				  type="textarea"
				  :autosize="{ minRows: 2, maxRows: 4}"
				  placeholder="请输入内容"
				  >
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>
				上传文件
			</el-col>
			<el-col :span='20'>
				<el-upload
				  class="upload-demo"
				  action=""
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="fileList"
				  list-type="picture">
				  <el-button size="small" type="primary">选择文件</el-button>
				  <div slot="tip" class="el-upload__tip">你可以上传以下格式的文件：gif、jpg、png、word、excel、txt、zip、ppt、pdf</div>
				</el-upload>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='20' :offset='4'>
				<el-button type='primary' size='small' style='width:94px;'>提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script >
	export default{
		data(){
			return{
				options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value: '',
		        fileList: [
		        {name: 'food.jpeg', 
		         url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		methods:{
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
		      }
		},
		mounted(){

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
			margin-bottom: 30px;
			border-bottom: 1px solid $border_color;
		}
		.addInfo{
			height: 58px;
			line-height: 58px;
			font-weight: 600;
			font-size: 14px;
			color: $primary;
		}
		.el-row{
			width: 420px;
			margin-bottom: 16px;
			.el-col-4{
				text-align: center;
				line-height: 30px;
			}
		}
	}
</style>