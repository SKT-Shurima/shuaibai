<template>
	<div class="wrap">
		<div class="box">
			<h2>注册协议</h2>
			<p><strong>【审慎阅读】</strong>您在申请注册流程中点击同意前，应当认真阅读以下协议。<strong style="text-decoration: underline;">请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</strong></p>
			<ol>
				<li>1、<strong>与您约定免除或限制责任的条款；</strong></li>
				<li>2、<strong>与您约定法律适用和管辖的条款；</strong></li>
				<li>3、<strong>其他以粗体下划线标识的重要条款。</strong></li>
			</ol>
			<p>如您对协议有任何疑问，可向平台客服咨询。</p>
			<p style="line-height:18px;"><strong>【特别提示】</strong>当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务于帅柏发生争执的，适用《帅柏商城服务协议》处理。如您在使用平台服务过程中与其他用户发生争执的，依您与其他用户达成的协议处理。</p>
			<p style="text-decoration: underline;font-weight:600;">阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p>
			<p><a href="">《帅柏商城服务协议》</a></p>
			<p><a href="">《法律声明及隐私政策》</a></p>
			<div style="width：100%;text-align: center;">
				<el-button type='primary' style='width: 300px;'>同意协议</el-button>
			</div>
		</div>
	</div>	
</template>
<style lang='scss' scoped>
$red_color: #f24450;
	.wrap{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 99;
		background-color: rgba(0,0,0,.5);
		.box{
			width: 742px;
			height: 452px;
			position: absolute;
			top: 0px;
			left: 0px;
			bottom: 0px;
			right: 0px;
			margin: auto;
			background-color: #fff;
			padding-top: 26px;
			padding-left: 36px;
			padding-right: 30px;
			padding-bottom: 30px;
		}
		a{
			color: $red_color;
			font-size: 14px;
			font-weight: 600;
		}
		strong{
			font-weight: 600;
		}
		ol{
			margin: 0px;
			padding: 0px;
		}
		li{
			line-height: 28px;
			strong{
				text-decoration: underline;
				font-weight: 600;
			}
			
		}
	}
</style>