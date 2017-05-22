<template>
	<div class="wrap">
		<div class="applyInfo">
			<el-row>
				<el-col :span='2'>
					申请时间：
				</el-col>
				<el-col :span='22'>
					2017-01-01 12:00
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					申请原因：
				</el-col>
				<el-col :span='22'>
					2017-01-01 12:00
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					退款金额：
				</el-col>
				<el-col :span='22'>
					{{179.00|currency}}
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2'>
					申请说明：
				</el-col>
				<el-col :span='22'>
					2017-01-01 12:00
				</el-col>
			</el-row>
		</div>
		<ul class="dialogue">
			<li v-for='item in 3'>
				<el-row>
					<el-col :span='3'>
						2017-01-01 12:00
					</el-col>
					<el-col :span='21'>
						您已成功提交售后申请
					</el-col>
				</el-row>
			</li>
		</ul>
		<div class="opera">
			<div>
				<el-button type='primary' size='small'>
					修改申请
				</el-button>
				<el-button type='primary' size='small'>
					撤销申请
				</el-button>
				<el-button type='primary' size='small'>
					留言
				</el-button>
			</div>
			<div>
				<el-button type='primary' size='small' @click='maskbol=true'>
					填写退货单号
				</el-button>
				<el-button type='primary' size='small'>
					留言
				</el-button>
			</div>
		</div>
		<transition name='fade'>
			<div v-show='maskbol' class="mask">
				<div class="addGoodsInfo">
					<div class="addTitle">退货物流信息<i class="el-icon-close" @click='maskbol=false;'></i></div>
					<el-form :model="form" label-width="70px">
					    <el-form-item label="物流公司">
						    <el-select v-model="form.region" placeholder="请选择" size='small' style='width:100%;'>
						        <el-option label="区域一" value="shanghai"></el-option>
						        <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
				        </el-form-item>
				        <el-form-item label="物流单号">
					        <el-input v-model="form.name" size='small'></el-input>
					    </el-form-item>
					</el-form>
					<div class="ensureBtn">
						<el-button type='primary' size='small'>确定</el-button>
					</div>
				</div>
			</div>
		</transition>
		
	</div>
</template>
<script>
import {currency} from '../../common/js/filter.js'
	export default{
		data(){
			return{
		        maskbol: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px'
			}
		},
		filters:{
			currency
		}
	}
</script>
<style lang='scss'  scoped>
$primary:#c71624;
$border_color: #ddd;
$text_color: #666;
$bg_color: #f5f5f5;
	.wrap{
		width: 100%;
		.applyInfo{
			padding: 30px;
			background-color: $bg_color;
			.el-row{
				   width: 846px;
				   margin-bottom: 20px;
				   .el-col-2{
				   		color: $text_color;
				   }
			}
			.el-row:last-child {
				margin-bottom : 0px;
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
				.el-row{
					.el-col-3{
						color: $text_color;
					}
					.el-col-21{
						font-weight: 600;
					}
				}
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
			.addGoodsInfo{
				width: 360px;
				height: 240px;
				position: absolute;
				top: 15%;
				left: 0px;
				right: 0px;
				margin: auto;
				padding: 24px;
				border-radius: 4px;
				background-color: #fff;
				.addTitle{
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
				}
				.ensureBtn{
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
	}
</style>