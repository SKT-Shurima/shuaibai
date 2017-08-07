import {getUserInfo} from './api'
import {getCookie,errorInfo} from './common'
export const userInfo = {
	created(){
		let access_token = getCookie('access_token') ;
		if (access_token) {
			let params = {
				access_token: access_token
			}
			getUserInfo(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.userInfo = content;
				}
			})
		}
	}
}