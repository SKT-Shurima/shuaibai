<template>
	<div class="wrap">
		<div class="bg">
			<div class="content_layout">
			    <component :is="currentView" keep-alive @regSuccess='regFn'></component>
			</div>
		</div>
	</div>
</template>
<script>
	import regInfo from './regInfo'
	import bindEmail from './bindEmail'
	import vSuccess from './success'
	

	export default {
		data() {
		   return {
		   	  showBol: 0,
		   	  currentView: 'view0'
		   }
		},
		components: {
	      'view0': regInfo,
	      'view1': bindEmail,
	      'view2': vSuccess
	    },
	    methods: {
	    	regFn(mark){
	    		if(mark){
	    			this.currentView = 'view2' ;
	    		} else {
	    			this.currentView = 'view1' ;
	    		}
	    	}
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