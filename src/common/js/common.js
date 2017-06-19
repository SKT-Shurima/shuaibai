// 获取http传递的参数
export const getRequest = ()=>{
	 var url = location.search; //获取url中"?"符后的字串
	 var theRequest = new Object();
	 if (url.indexOf("?") != -1) {
	  let  str = url.substr(1);
	  let strs = str.split("&");
	  for(var i = 0; i < strs.length; i ++) {
	   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	  }
	 }
	 return theRequest;
}

// 获取hash 传递参数
 export const getHashReq = ()=>{
 	let reqParams = {};
	let req = location.hash.split("?")[1];
	req = req.split('&')
	for(let i = 0 ;i<req.length;i++){
		let reqUnit = req[i].split('&');
		for(let j = 0; j<reqUnit.length;j++){
			let key = reqUnit[i].split('=')[0];
			let val = reqUnit[i].split('=')[1];
			reqParams[key] = val;
		}
	}
	return reqParams ;
 }