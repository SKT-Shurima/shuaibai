<template>
	<div class="wrap">
		<h4><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view100")'>我的收货地址</span></h4>
		<add-address @initList='initList'></add-address>
		<div class="addressList" v-if='addressList'>
			<div class="title" style="margin-bottom:20px;">
				已经保存了{{addressList.length}}条地址，还可以保存{{20-addressList.length}}条地址
			</div>
			<ul v-if='addressList'>
				<li v-for= '(item,index) in addressList' :class='{"isDefault":item.status==="1"}' :key='item'>
					<dl>
						<dt>
							<span v-text='item.name'>
							</span>
							<strong v-text='item.phone'>
							</strong>
							<em v-show='item.status==="1"'>
								默认地址
							</em>
						</dt>
						<dd class="addressInfo">
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
        	if (sessionStorage.userInfo) {
				this.hasUser = true;
				this.userInfo = JSON.parse(sessionStorage.userInfo);
				this.initList();
			}else{
			    location.href = "login.html";
			}
        })
    }
  }
</script>
<style lang='scss' scoped>
$primary:#c71724;
$border_color: #ccc;
$text_color: #666;
	.wrap{
		width: 100%;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid $border_color;
			color: $text_color;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
		.title{
			font-size: 14px;
			font-weight: 600;
			line-height: 20px;
			margin-bottom: 10px;
			color: $primary;
		}
		.addressList{
			ul{
				overflow: hidden;
				li{
					float: left;
					width: 490px;
					padding: 20px;
					margin-right: 14px;
					margin-bottom: 16px;
					border: 1px solid $border_color;
					dl{
						dt{
							font-size: 14px;
							font-weight: 600;
							em{
								float: right;
								color: $primary;
							}
						}
						.addressInfo{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							padding: 10px 0px;
						}
						dd{
							.edit{
								float: right;
								.el-button{
									color: #0049b7;
								}
							}
						}
					}
				}
				.isDefault{
					border: 1px solid $primary;
				}
			}
		}
	}
</style>