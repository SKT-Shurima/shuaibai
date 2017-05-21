import axios from 'axios'


let base = '/shuaibo' ;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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



// 个人中心
// 获取用户信息
export const getUserInfo = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/getUserInfo`,params).then(res=>res.data);
}
// 保存地址
export const saveAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/saveAddress`,params).then(res=>res.data);
}
// 获取地址列表
export const getAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getAddress`,params).then(res=>res.data);
}
// 删除地址
export const delAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/delAddress`,params).then(res=>res.data);
}
// 设置默认地址
export const defaultAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/defaultAddress`,params).then(res=>res.data);
}
// 获取单个地址
export const getOneAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getOneAddress`,params).then(res=>res.data);
}
// 修改密码
export const modifyPassword = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/modifyPassword`,params).then(res=>res.data);
}
// 添加绑定手机
export const phoneBind = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/phoneBind`,params).then(res => res.data);
}
// 更改绑定手机号
export const changePhoneBind = params =>{
	params =trans(params);
	return axios.post(`${base}/userAction/changePhoneBind`,params).then(res=> res.data);
}
// 设置用户名
export const changeUsername = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/changeUsername`,params).then(res=>res.data);
}
// 设置出生日期
export const changeBirthday = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/changeBirthday`,params).then(res=>res.data);
}
// 设置性别
export const changeSex = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/changeSex`,params).then(res=>res.data);
}