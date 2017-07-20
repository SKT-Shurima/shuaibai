<template>
	<el-dialog
  v-model='addressBol'
  size="tiny"
  top='25%'
  :before-close="handleClose">
	<add-address @initList='initList' class='addressBox'></add-address>
</el-dialog>
</template>
<script>
import addAddress from '../Common/addAddress'
  export default {
    components:{
    	addAddress
    },
    props: {
    	addressBol: {
    		type: Boolean,
    		required: true
    	}
    },
    methods: {
    	handleClose(done) {
	        this.$emit('close');
	    },
	    initList(bol){
	    	this.$emit('initList',bol)
	    }
    }
  };
</script>
<style lang='scss'>
	.el-dialog.el-dialog--tiny{
		width: 600px;
	}
	.addressBox{
		margin-left: 64px;
		margin-top: -20px;
	}
</style>