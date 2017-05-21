<template>
	<div class="head_con_wrap">
		<div class="head_con_box">
			<div class="logo">
				<img src="../../../static/headImg/logo.png" height="39" width="269">
			</div>
			<div class="search_box">
				<div class="search_form">
					<form id="searchForm" name="searchForm" method="get" action="">
						<input type="text" name="keywords"  autocomplete="off" id="key" accesskey="s" class="search_text">
						<input type="submit"  class="search_but" value="搜索">
                    </form>
				</div>
				<ul class="hot_words">
					<li v-for='item in keyWordsArr'  :key='item' v-text='item.keyword'></li>
				</ul>
			</div>
			 <div class="shopping_cart">
			 	<img src="../../../static/headImg/shopCarRed.png" height="14" width="14" style="vertical-align:-2px;">
				我的购物车
				<span v-text='userInfo.cart_num?userInfo.cart_num:0'></span>
			 </div> 
		</div>
	</div>
</template>
<script>
    import {getKeyWord} from "../../common/js/api.js"
	export default{
		data(){
			return{
				userInfo: {
					cart_num: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }]
			}
		},
		methods:{
			keyWords(){
				getKeyWord().then(res=>{
					let {errcode,content } =res;
					if (errcode ===0 ) {
						this.keyWordsArr = content;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				if (sessionStorage.userInfo) {
					this.hasUser = true;
					this.userInfo = JSON.parse(sessionStorage.userInfo);
				}
				this.keyWords();
			})
		}
	}
</script>
<style lang='scss' scoped>
$primary:#c71724;
$red_color: #f24450;
	.head_con_wrap{
		width: 100%;
		.head_con_box{
			width: 100%;
			height: 104px;
			.logo{
				width: 270px;
				margin-top: 32px;
				float: left;
				img{
					width: 100%;
				}
			}
			.search_box{
				width: 520px;
				float: left;
				margin-top: 32px;
				margin-left: 120px;
				.search_form{
				    border: 3px solid #e4393c;
				    height: 44px;
				    width: 496px;
				    #searchForm{
				    	overflow: hidden;
				    	.search_text{
							float: left;
							background-color: #fff;
							background-position: 0 -360px;
							background-repeat: repeat-x;
							color: #999;
						 	font-family: arial,"宋体";
							font-size: 14px;
							padding: 5px;
							width: 412px;
							height: 38px;
							line-height: 38px;
							border: none;
							outline: none;
						}
						.search_but{
							float: left;
							background: none repeat scroll 0 0 #e4393c;
						    color: #fff;
						    font-size: 14px;
						    font-weight: 700;
						    width: 78px;
						    height: 38px;
						    border: none;
						    margin: 0px;
						}
				    }
				}
				.hot_words{
					margin: 0px;
					padding: 6px 0px;
					overflow: hidden;
					li{
						float: left;
						padding-left: 10px;
						cursor: pointer;
					}
				}
			}
			.shopping_cart{
				width: 150px;
				height: 36px;
				margin-top: 32px;
				padding-top: 6px;
				color: $primary;
				text-align: center;
				float: right;
				border: 1px  solid $primary;
				span{
					vertical-align: super;
				    border-radius: 6px;
				    padding: 0px 3px;
					color: #fff;
					background-color: $red_color;

				}
			}
		}
	}
</style>