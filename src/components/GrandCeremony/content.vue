<template>
	<div class="wrap">
		<v-nav></v-nav>
		<div class="title">
			<img src="../../../static/grandImg/title.jpg">
		</div>
		<div class="container">
			<dl>
				<dt class="main">
					<ul class="mainListBox">
						<li class="mainList" v-for='(item,index) in agents' :key='item'>
							<div class="mainImg">
								<img src="../../../static/grandImg/main.jpg" height="322" width="564">
							</div>
							<ul class="infoList">
								<li class="infoTitle">世尊印</li>
								<li v-text='item.name' class="info"></li>
								<li class="info">代理人 ：{{item.agent}}</li>
								<li class="info">TEL ：{{item.tel}}</li>
								<li class="address">地址 ：{{item.address}}</li>
							</ul>
						</li>
					</ul>
				</dt>
				<dd class="slider">
					<div class="message">
						<h1>世尊印高端会所</h1>
						<div class="intro">
							<p>以全国连锁形式打造中国文化主题会所标杆；</p>
							<p>以文化金融为杠杆实现艺术品自动化市场流通；</p>
							<p>以打造国际知名品牌‘世尊印’为营运战略；</p>
							<p>以高端艺术品差异化、趋势化、细分化、为精准品牌定位；</p>
							<p>以打造百亿级品牌为核心目标，终而进入资本市场。</p>
						</div>
					</div>
					<div class="imgShow">
						<img src="../../../static/grandImg/small1.jpg" height="114" width="125">
						<img src="../../../static/grandImg/small2.jpg" height="114" width="125" style='margin-left: 6px;'>
					</div>
					<div class="message">
						<h1>文化金融资产包</h1>
						<p class="intro">
						 	浙江世尊获得国有文化产权交易所独家授权，服务对象从内部会员至社会公众，推行文化资产证券化新理念，定期发行文化金融原始资产包；以原始资产包增值、交易金额佣金返佣、个人艺术品收藏为利润来源，让参与投资的会员获得收益
						</p>
					</div>
					<div class='imgShow'>
						<img src="../../../static/grandImg/small3.jpg" height="164" width="238" style="margin-left:12px;">
					</div>
					<div class="newInfo">
						<h1>最新相关资讯</h1>
						<div class="newInfoBox">
							<ul :style='{top:-timeStep+"px"}' id="newInfoList">
								<li v-for='(item,index) in newInfos' v-text='item.info'></li>
							</ul>
							<ul :style='{top:-timeStep+"px"}'>
								<li v-for='(item,index) in newInfos' v-text='item.info'></li>
							</ul>
						</div>
						<div style="margin-top:20px;">
							<img src="../../../static/grandImg/small5.jpg" height="162" width="250" alt="" style='margin-left:7px;'>
						</div>
					</div>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import vNav from '../Head/nav.vue'
	export default{
		data(){
			return {
				agents: [
					{
						name: '杭州市总代',
						agent: '祁女士',
						tel: '136****0891',
						address: '杭州市滨江区江陵路567号新东方1909'
					},
					{
						name: '杭州市余杭区代',
						agent: '丁先生',
						tel: '133****6779',
						address: '暂定'
					},
					{
						name: '杭州市江干区代',
						agent: '汪女士',
						tel: '133****9873',
						address: '杭州市江干区新风路288号红街天城2幢1815'
					},
					{
						name: '南阳市总代',
						agent: '葛先生',
						tel: '156****4635',
						address: '河南省南阳市宛城区白河街道长城东路新城·春华苑2楼'
					},
					{
						name: '新野县总代',
						agent: '葛先生',
						tel: '156****4635',
						address: '河南省南阳市新野县西环路南段世尊汽车生活馆27店'
					},
					{
						name: '嘉兴市总代',
						agent: '钱先生',
						tel: '135****7770',
						address: '嘉兴桐乡市振兴东路43号商会大厦B座1205室'
					}
				],
				newInfos:[
					{info:'恭喜祁**女士签约成为杭州市总代'},
					{info:'恭喜丁**先生签约成为杭州市余杭区代'},
					{info:'恭喜汪**女士签约成为杭州市江干区代'},
					{info:'恭喜葛**先生签约成为南阳市总代'},
					{info:'恭喜葛**先生签约成为新野县(区)代'},
					{info:'恭喜施**女士签约成为永康市(区)代'},
					{info:'恭喜王**女士签约成为杭州市拱墅区代'},
					{info:'恭喜世尊印新人业务起航培训会圆满完成'}
				],
				timeStep: 0,
				h: 0
			}
		},
		components:{
			vNav
		},
		mounted(){
			this.$nextTick(()=>{
				let obj = document.getElementById('newInfoList');
				let h = document.defaultView.getComputedStyle (obj,null)['height'] ;
				h = h.slice(0,h.length-2) ;
				h -= 0;
				this.h = h ;
				let timer = setInterval(()=>{
					this.timeStep++;
					if (this.timeStep>h) {
						this.timeStep = 0;
					}
				},50)
			})
		}
	}
</script>
<style lang='scss' scoped>
$border_color: #ddd;
	.wrap{
		width: 100%;
		.title{
			width: 100%;
			img{
				width: 100%;
			}
		}
		.container{
			width: 1250px;
			margin: 0px auto;
			padding: 0px 20px;
			dl{
				width: 100%;
				overflow: hidden;
				.main,.slider{
					float: left
				}
				.main{
					width: 886px;
					margin-right: 32px;
				}
				.mainListBox{
					.mainList{
						width: 100%;
						height: 322px;
						overflow: hidden;
						margin-bottom: 26px;
						.mainImg{
							float: left;
							width: 564px;
							height: 322px;
						}
						.infoList{
							float: left;
							width: 320px;
							height: 322px;
							padding: 24px 48px;
							text-align: center;
							font-weight: 600;
							border-top: 1px solid $border_color;
							border-right: 1px solid $border_color;
							border-bottom: 1px solid $border_color;
							.infoTitle{
								font-size: 40px;
								line-height: 88px;
								margin: 6px 0px;
							}
							.info,.address{
								font-size: 16px;
								line-height: 24px;
							}
							.address{
								margin-top: 40px;
							}
						}
					}
				}
				.slider{
					width: 290px;
					padding: 20px 14px;
					font-weight: 600;
					color: #fff;
					background-color: #a40000;
					.message{
						textarea,.intro{
							margin: 10px 0px;
							font-size: 16px;
							line-height: 22px;
							text-indent: 2em;
						}
					}
					.imgShow{
						margin-bottom: 40px;
					}
				}
				.newInfo{
					.newInfoBox{
						position: relative;
						width: 100%;
						height: 280px;
						overflow: hidden;
						margin-top:10px;
					}
					ul{
						position: relative;
					}
					li{ 
						font-size: 16px;
						line-height: 22px;
					}
				}
			}
		}
	}
</style>