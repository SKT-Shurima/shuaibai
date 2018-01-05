<template>
	<el-dialog
        v-model='maskBol'
        size="tiny"
        top='25%'
        @close="handleClose">
	   <add-address @initList='initList' class='addressBox'></add-address>
    </el-dialog>
</template>
<script>
import addAddress from '../Common/addAddress'
    export default {
        data(){
            return {
                maskBol: false
            }
        },
        components:{
    	   addAddress
        },
        props: {
    	    addressBol: {
    		    type: Boolean,
    		    required: true
    	    }
        },
        watch:{
            addressBol(newVal,oldval){
            this.maskBol = newVal;
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