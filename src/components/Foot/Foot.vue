<template>
	<div class="wrap">
		<div class="express_box">
			<ul>
				<li>
					<a href="javascript:void(0);">
						<img src="../../../static/footImg/icon_1.png" alt="" height="66" width="66"/>
						<h4>正品保障</h4>
						<span>正品行货 放心选购</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0);">
						<img src="../../../static/footImg/icon_2.png" alt=""  height="66" width="66"/>
						<h4>专业快递</h4>
						<span>优质服务，快速收货</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0);">
						<img src="../../../static/footImg/icon_3.png" alt=""  height="66" width="66"/>
						<h4>售后无忧</h4>
						<span>7天无理由退货</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0);">
						<img src="../../../static/footImg/icon_4.png" alt="" height="66" width="66"/>
						<h4>准时送达</h4>
						<span>收货时间由你做主</span>
					</a>
				</li>
			</ul>
		</div>
		<div id="footer" style="background:#fff;width:100%;padding:0px 0 0 0;">
		<div class="footer_box">
			<div id="service_2017">
				<div class="service_2017 fix">
                	<dl>
						<dt><a href="javascript:void(0);"><strong>购物指南</strong></a></dt>
						<dd>
							<ul>
								<li><a href="javascript:window.open('shoppingProcess.html')" title="购物流程">购物流程</a></li>
								<li><a href="javascript:window.open('myOrder.html#view10')" title="账号管理">账号管理</a></li>
							</ul>
						</dd>
					</dl>
                    <dl>
						<dt><a href="javascript:void(0);"><strong>售后无忧</strong></a></dt>
						<dd>
							<ul>
                                <li><a href="javascript:window.open('afterSaleService.html')" title="售后服务">售后服务</a></li>
                                <li><a href="javascript:window.open('refundInstructions.html')" title="退款说明">退款说明</a></li>
                                <li><a href="javascript:window.open('returnGoods.html')" title="返修/退换货">返修/退换货</a></li>
                                <li><a href="javascript:window.open('cancelOrder.html')" title="取消订单">取消订单</a></li>
							</ul>
						</dd>
					</dl>
                    <dl>
						<dt><a href="javascript:void(0);"><strong>7天无理由退换货</strong></a></dt>
						<dd>
							<ul>
								<li><a href="javascript: window.open('noReason.html')" title="7天无理由退换货">7天无理由退换货</a></li>
							</ul>
						</dd>
					</dl>
					<dl>
						<dt><a href="javascript:void(0);"><strong>商家服务</strong></a></dt>
						<dd>
							<ul>
								<li><a href="javascript:window.open('http://app.shuaibomall.net/shopadmin/login/index')" title="商家中心">商家中心</a></li>
							</ul>
						</dd>
					</dl>
                    <dl>
						<dt><a href="javascript:void(0);"><strong>联系我们 </strong></a></dt>
						<dd>
							<ul>
								<li><a href="javascript:void(0);" title="客服咨询" @click='kf'>客服咨询</a></li>
								<li><a  v-text='kfInfo.tel'></a></li>
							</ul>
						</dd>
					</dl>
                </div>
                <div class="footer_copy">
                    <ul>
                        <li>
                                                   
                          <a  >免责条款</a> 
                           |  
                           
                          <a  >隐私保护</a> 
                           |  
                           
                          <a  >咨询热点</a> 
                           |  
                           
                          <a  >联系我们</a> 
                           |  
                           
                          <a  >公司简介</a>
                           
                           |<a >商家入驻</a>
                        </li>
                        <li>&copy; 2005-2017 帅柏商城 版权所有，并保留所有权利。浙江 杭州 萧山区北塘路38号 ICP备案证书号：浙ICP备15014916号</li>
                        <div style="width:230px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902000853" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010902000853号</p></a>
		 	</div>
                    </ul>
                </div>
				<div class="fot_link"><img src="" alt="" class="dis_b mar_auto" /></div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import {getKFInfo} from '../../common/js/api'
	export default {
		data(){
			return {
				kfInfo:{
					qq:"",
					tel: ""
				}
			}
		},
		methods:{
			kf(){
		        let qq = this.kfInfo.qq ;
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	      	}
		},
		mounted(){
			this.$nextTick(()=>{
				getKFInfo().then().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.kfInfo = content ;	
					}
				})
			})
		}
	}
</script>

<style scoped lang='scss'>
	.wrap{
		margin-top: 50px;
		.express_box{
			margin: 0px auto;
		    padding: 30px 0px;
		    width: 1210px;
		    overflow: hidden;
		    border-bottom: #ebebeb solid 1px;
		    ul{
		    	margin: 0px auto;
		    	padding: 0px 0px 0px 10px;
		    	width: 1200px;
			    overflow: hidden;
			    li{
			        width: 296px;
				    height: 66px;
				    float: left;
				    display: inline;
				    a{
				    	display: block;
					    height: 66px;
					    overflow: hidden;
					    padding: 0 0 0 80px;
					    color: #333;
				    }
				    img{
				    	float: left;
					    display: inline;
					    margin-left: -80px;
				    }
				    h4{
				    	margin: 0px;
				    	line-height: 24px;
					    font-size: 16px;
					    padding: 10px 0px 0px;
					    color: #000;
				    }
				    span{
				        line-height: 24px;
    					color: #999;
				    }
			    }
		    }
		}
		#footer{
			.footer_box{
				width: 1210px;
			    margin: 0 auto;
			    div{
			    	-ms-zoom: 1;
			    	zoom:1;
			    }
			    #service_2017{
			    	width: 1210px;
			    	overflow: hidden;
				    .service_2017{
			    	    width: 1300px;
					    padding: 20px 0;
					    position: relative;
					    left: 75px;
					    overflow: hidden;
					    dl{
					    	width: 250px;
							float: left;
							dt{
								line-height: 28px;
							    font-size: 14px;
							    a{
							    	color: #333;
								    text-decoration: none;
								    cursor: pointer;
								    outline: none;
							    }
							}
							dd{
								line-height: 24px;
								a{
									color: #666;
								}
							}
						}
						}
					}
					.fix {
					    zoom: 1;
					}
					.footer_copy{
						padding: 10px 0 20px;
    					color: #666;
    					li{
    						line-height: 32px;
    						text-align: center;
    						a{
    							margin: 0 10px;
    							color: #666;
    						}
    					}
					}
			}
		}
	}
</style>