<template>
	<div class="wrap">
	    <v-nav></v-nav>
	    <keep-alive>
			<component :is='currentView'></component>
		</keep-alive>
	</div>
</template>
<script>
import vNav from '../Head/nav.vue'
import infoList from './infoList'
import infoDetail from './infoDetail'
import {getInformations} from '../../common/js/api'
import {errorInfo} from '../../common/js/common'
	export default {
		data(){
			window.addEventListener("popstate",()=>{
		 		this.initView();
		 	})
			return {
			}
		},
		computed:{
			currentView(){
				let view = this.$store.state.view;
				return view;;
			}
		},
		methods:{
			initView(){
				let hash = location.hash;
				if (hash.indexOf("infoDetail")>=0) {
					this.$store.commit('switchView',"infoDetail");
				}else{
					this.$store.commit('switchView',"infoList");
				}
			}
		},
		components: {
			vNav,infoDetail,infoList
		},
		mounted(){
			this.$nextTick(()=>{
				this.initView();
			})
		}
	}
</script>