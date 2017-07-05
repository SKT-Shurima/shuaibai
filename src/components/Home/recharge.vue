<template>
	<div class="recharge">
		<div class="recharge_title">
			<div @click='type=1' :class='{"border_top":type===1}'>话费充值</div>
			<div @click='type=2' :class='{"border_top":type===2}'> 流量充值</div>
		</div>
		<el-row>
			<el-col :span='4'>号码</el-col>
			<el-col :span='20'>
				<el-input v-model='phone' size='mini'></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>数额</el-col>
			<el-col :span='10'>
				<select v-model="value" placeholder="请选择" size='mini' class='select' @change='chooseVal(value)'>
				    <option
				      v-for="(item,index) in options"
				      :key="item.mobile_recharge_fee_id"
				      :label="item.amount"
				      :value="item.amount">
				    </option>
				  </select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='4'>售价</el-col>
			<el-col :span='8'>
				<span>{{price|currency}}</span>
			</el-col>
			<div class="top_up" @click='rechargeFn'>立即充值</div>
		</el-row>
		<recharge-type :payBol='payBol' :order='order' @close='payBol=false'></recharge-type>
	</div>
</template>
<script>
import {getActualFee,mobileRecharge} from '../../common/js/api'
import {currency} from '../../common/js/filter'
import {errorInfo} from '../../common/js/common'
import {MessageBox} from  'element-ui'
import rechargeType from './rechargeType'
	export default{
		data(){
			return {
				type: 1,
				payBol: false,
				phone: '',
				options: [],
				price: '',
        		value: '',
        		id: '',
        		order: {}
			}
		},
		filters:{
			currency
		},
		components:{
			rechargeType
		},
		watch:{
			type(){
				let _this = this ;
				_this.feeFn(_this.type);
			}
		},
		methods:{
			chooseVal(value){
				let _this = this ;
				for(let i = 0 ; i< _this.options.length;i++){
					if (_this.options[i].amount === value) {
						_this.id = _this.options[i].mobile_recharge_fee_id ;
						_this.price = _this.options[i].actual_fee ;
						break ;
					}
				}
				
			},
			rechargeFn(){
				let _this = this ;
				let params = {
					access_token: sessionStorage.access_token,
					phone: _this.phone,
					mobile_recharge_fee_id: _this.id
				}
				mobileRecharge(params).then(res=>{
					let {errcode,message,content} = res;
					if (errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.order = content ;
						this.payBol = true;
					}
				})
			},
			feeFn(type){
				type += '';
				let params = {
					type: type
				}
				getActualFee(params).then(res=>{
					let {errcode,message,content} = res;
					if (errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.options= content ;
						this.value = this.options[0].amount ;
						this.chooseVal(this.options[0].amount);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.feeFn(1);
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
	.recharge{
		width: 100%;
		height: 130px;
		.recharge_title{
			width: 100%;
			div{
				display: inline-block;
				width: 48%;
				text-align: center;
				height: 26px;
				line-height: 26px;
				cursor: pointer;
			}
		}
		.border_top{
			border-top: 2px solid $primary;
		}
		.el-row{
			width: 100%;
			height: 32px;
			line-height: 32px;
			.el-col-8{
				color: $primary;
			}
			.top_up{
				width: 76px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				float: right;
				border-radius: 12px;
				background-color: $primary;
				color: #fff;
				margin-top: 4px;
				cursor: pointer;
			}
			.select{
				background-color: #fff;
			    background-image: none;
			    border-radius: 4px;
			    border: 1px solid rgb(217, 193, 191);
			    box-sizing: border-box;
			    color: rgb(61, 33, 31);
			    display: block;
			    font-size: inherit;
			    height: 22px;
			    outline: none;
			    padding: 3px 10px;
			    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			    width: 100%;
			}
		}
	}
</style>