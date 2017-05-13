import axios from '.0.16.1@axios'


let base = '/shuaibo' ;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Accept'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


const trans = params => {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in params) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    return ret ;
  }
// 注册
export const reg = params => {
	params = trans(params);
	return axios.post(`${base}/customerAction/register`,params).then( res => res.data);
}

// 发送验证码 
export const sendCode = params =>{
	params = trans(params);
	return axios.post(`${base}/customerAction/sendCode`,params).then( res=> res.data);
}

// 登录
export const login = params =>{
	params = trans(params);
	return axios.get(`${base}/customerAction/login?`+params).then( res=> res.data);
}

//  生成验证码token
export const createToken = ()=> {
	return axios.get(`${base}/customerAction/createToken`).then(res=>res.data);
}


// 忘记密码
export const resetPasswd = params => {
	params = trans(params) ;
	return axios.post(`${base}/customerAction/resetPasswd`,params).then(res => res.data);
}


// 首页
// 关键列表
export const getKeyWord = ()=>{
	return axios.get(`${base}/initAction/getKeyWord`).then(res=>res.data);
}
// 轮播图标签
export const getHomePage = params => {
	params = trans(params);
	return axios.post(`${base}/initAction/getHomePage`,params).then( res=> res.data);
}
// 每日上新
export const getNewGoods = () => {
    return axios.get(`${base}/initAction/getNewGoods`).then(res=> res.data);
} 
// 分类
export const getCategory = () => {
	return axios.get(`${base}/initAction/getCategory`).then(res=> res.data);
}