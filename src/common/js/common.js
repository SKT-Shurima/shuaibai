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
		let reqUnit = req[i].split('=');
		let key = reqUnit[0];
		let val = reqUnit[1];
		reqParams[key] = val;
	}
	return reqParams ;
 }

 // 设置cookie  
export const setCookie = (c_name,value,expTime)=>{  
    var exdate = new Date();  
    exdate.setTime(exdate.getTime() + expTime *24 *3600 * 1000);  
    document.cookie= c_name + "=" + escape(value)+((expTime==null) ? "" : ";expires="+exdate.toGMTString());  
}
// 读取cookie  
export const getCookie = (c_name) => {  
    if (document.cookie.length>0)  
    {  
        var c_start=document.cookie.indexOf(c_name + "=");  
        if (c_start!=-1)  
        {   
        c_start=c_start + c_name.length+1;  
        var c_end=document.cookie.indexOf(";",c_start);  
        if (c_end==-1)   
            c_end = document.cookie.length  
            return unescape(document.cookie.substring(c_start, c_end))  
        }  
    }  
    return ""     
}
// 删除cookie  
export const delCookie = (c_name)=>{  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval = getCookie(c_name);  
    if(cval!=null){  
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();  
    }  
}

// 请求接口错误信息提示
import {MessageBox} from  'element-ui'
export const errorInfo= (errcode,message)=>{
	if (errcode === 99) {
		MessageBox.alert(message, '提示', {
          	confirmButtonText: '确定',
          	callback: action => {
          		window.location.href = 'login.html';
          	}
	    });
	}else{
		MessageBox.alert(message, '提示', {
          	confirmButtonText: '确定'
	    });
	}
}