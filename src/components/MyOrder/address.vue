<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view100")'>我的收货地址</span></h4>
		<add-address @initList='initList'></add-address>
		<div class="address-list" v-if='addressList'>
			<div class="color-primary title" style="margin-bottom:20px;">
				已经保存了{{addressList.length}}条地址，还可以保存{{20-addressList.length}}条地址
			</div>
			<ul v-if='addressList'>
				<li class='border-c' v-for= '(item,index) in addressList' :class='{"border-primary":item.status==="1"}' :key='index'>
					<dl>
						<dt>
							<span v-text='item.name'>
							</span>
							<strong v-text='item.phone'>
							</strong>
							<em class='color-primary' v-show='item.status==="1"'>
								默认地址
							</em>
						</dt>
						<dd class="ellipsis-1 address-info">
						    {{item.province===item.city?item.province:item.province+item.city}}{{item.district}}{{item.address}}
						</dd>
						<dd>
							<em>
								邮编：{{item.postcode}}
							</em>
							<strong>
								电话：{{item.phone}}
							</strong>
							<span class="edit">
								<el-button type='text' size='mini' @click='changeView("view101",item.address_id)'>
									修改
								</el-button>
								<i style='color:#ccc;'>|</i>
								<el-button type='text' size='mini' @click='removeAddress(item.address_id)'>
									删除
								</el-button>
							</span>
						</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getAddress,delAddress,defaultAddress} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {MessageBox} from  'element-ui'
import addAddress from '../Common/addAddress'
  export default {
    data() {
      return {
      	userInfo: '',
      	setDefault: true,
        addressList: null
      };
    },
    components: {
    	addAddress
    },
    mixins: [userInfo],
    methods: {
	    changeView(view,id){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = id?`${view}?address_id=${id}`:view;
	    },
        initList(){
      	    let params = {
	      	 	access_token: getCookie('access_token')
	      	};
	      	getAddress(params).then(res=>{
	      	 	let {errcode,message,content} = res ;
            	if (errcode !== 0 ) {
            		errorInfo(errcode,message) ;
            	} else {
	        		this.addressList = content;
            	}
	      	})
        },
        removeAddress(id){
	      	MessageBox.confirm('此操作将永久删除该地址, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          let params = {
	      	 	access_token: getCookie('access_token'),
	      	 	address_id: id
	      	 };
	      	 delAddress(params).then(res=>{
	      	 	let {errcode,message} = res ;
	            	if (errcode !== 0 ) {
	            		errorInfo(errcode,message) ;
	            	} else {
		        		this.initList();
	            	}
	      	 })
	        }).catch(() => {
	                   
	        });
      	}
    },
    created(){
        this.$nextTick(()=>{
        	let access_token = getCookie('access_token');
        	if (!access_token) {
        		location.href = 'login.html' ;
        	}else{
        		this.initList();
        	}
        })
    }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
	}
	.title{
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		margin-bottom: 10px;
	}
	.address-list{
		ul{
			overflow: hidden;
		}
		li{
			float: left;
			width: 490px;
			padding: 20px;
			margin-right: 14px;
			margin-bottom: 16px;
		}
		dt{
			font-size: 14px;
			font-weight: 600;
			em{
				float: right;
				color: #c71724;
			}
		}
		.address-info{
			padding: 10px 0px;
		}
		.edit{
			float: right;
			.el-button{
				color: #0049b7;
			}
		}
	}
</style>