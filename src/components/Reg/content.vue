<template>
	<div class="wrap">
		<div class="bg">
			<div class="content_layout">
				<reg-info ></reg-info>
				<bind-email v-show='false'></bind-email>
				<v-success v-if='false'> </v-success>
			</div>
		</div>
	</div>
</template>
<script>
	import regInfo from './regInfo'
	import bindEmail from './bindEmail'
	import vSuccess from './success'

	export default {
		components: {
	      regInfo,
	      bindEmail,
	      vSuccess
	    }
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
		margin-top: 4px; 
		.bg{
		    width: 100%;
		    overflow: hidden;
		    background-color: #f9f9f9;
		    .content_layout{
			    width: 900px;
			    margin: 28px auto;
			    overflow: hidden;
			    box-shadow: 0px 2px 4px 2px #dfdfdf;
			   
			}
		}
	}
</style>