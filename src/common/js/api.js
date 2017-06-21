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
// 手机面额充值
export const  getActualFee = params =>{
	params = trans(params);
	return axios.get(`${base}/MobileRechargeAction/getActualFee?type=${params}`).then(res=>res.data )
} 
// 每日上新
export const getNewGoods = () => {
    return axios.get(`${base}/initAction/getNewGoods`).then(res=> res.data);
}
// 分类
export const getCategory = () => {
	return axios.get(`${base}/initAction/getCategory`).then(res=> res.data);
}
// 专题活动
export const  getActivity = ()=>{
	return axios.get(`${base}/initAction/getActivity`).then(res=>res.data);
}
// 获取首页分类商品
export const getCategoryGoods = ()=>{
	return axios.post(`${base}/initAction/getCategoryGoods`,{}).then(res=>res.data);
}
// 猜你喜欢
export const getGuessLike = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getGuessLike?${params}`).then(res=>res.data);
}
// 关键词搜索
export const goodsList = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/goodsList?${params}`).then(res=>res.data);
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
// 获取地址选择列表
export const linkage = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getAddressList`,params).then(res=>res.data);
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
// 添加绑定邮箱
export const bindEamil = params =>{
	params = trans(params) ;
	return axios.post(`${base}/customerAction/bindEmail`,params).then(res=>res.data);
}
// 设置头像
export const changeAvater = params =>{
	params = trans(params);
	return  axios.post(`${base}/userAction/changeAvater`,params).then(res=>res.data);
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
// 订单列表
export const getOrders = params => {
	params = trans(params);
	return axios.post(`${base}/orderAction/getOrders`,params).then(res=>res.data); 
} 

// 商品收藏列表
export const collection = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/collection`,params).then(res=>res.data);
}
// 取消收藏
export const cancelCollections = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/cancelCollections`,params).then(res=>res.data);
}
// 我的关注
export const attention = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/attention`,params).then(res=>res.data);
}
// 取消关注
export const cancelAttentions = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/cancelAttentions`,params).then(res=>res.data);
}


// 我的足迹
export const footmark = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/footmark`,params).then(res=>res.data); 
}
// 删除足迹
export const delFoots = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/delFoots`,params).then(res=>res.data);
}

// 优惠券
// 获取优惠券
export const getCoupons = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/getCoupons`,params).then(res=>res.data);
}

// 资金
// 充值
export const recharge = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/recharge`,params).then(res=>res.data);
}
// 资金明细
export const finance= params => {
	params = trans(params) ;
	return axios.post(`${base}/userAction/finance`,params).then(res=>res.data);
}
// 请求积分
export const integration = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/integration`,params).then(res=>res.data);
}
// 积分明细
export const integrationDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/integrationDetail`,params).then(res=>res.data);
}
// 请求购物币
export const shoppingCoin = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/shoppingCoin`,params).then(res=>res.data);
} 
// 购物币明细
export const shoppingCoinDetail = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/shoppingCoinDetail`,params).then(res=>res.data);
}


// 购物车相关
// 添加购物车
export const addCart = params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/addCart`,params).then(res=>res.data)
}
// 获取购物车列表
export const getCarts= params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/getCarts`,params).then(res=>res.data);
}
// 删除
export const removeCart = params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/removeCart`,params).then(res=>res.data);
}
// 数量编辑
export const editCart= params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/editCart`,params).then(res=>res.data);
}
// 立即购买、结算
export const buy = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/buy`,params).then(res=>res.data)
}

// 投诉
export const  complain = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/complain`,params).then(res=>res.data);
}

// 提现
export const withdraw =params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/withdraw`,params).then(res=>res.data);
}

// 商家入驻
export const shopJoin = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/shopJoin`,params).then(res=>res.data);
} 

// 物流消息
export const getExpressMessages = params =>{
	params = trans(params) ; 
	return axios.post(`${base}/messageAction/getExpressMessages`,params).then(res=>res.data) ;
}



// 商品详情
export const goodsDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/goodsDetail`,params).then(res=>res.data);
}
// 精品推荐
export const getHighGoods = params =>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/getHighGoods`,params).then(res=>res.data);
}
// 热销排行
export const getHotGoods = params =>{
	params = trans(params);
	return axios.get(`${base}/sellerAction/getHotGoods?${params}`).then(res=>res.data);
}
// 获取店铺推荐
export const getRecommend = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getRecommend?${params}`).then(res=>res.data);
}
// 获取评价列表
export const getComments = params=>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getComments?${params}`).then(res=>res.data);
}
// 获取回复
export const replyContent = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/replyContent?${params}`).then(res=>res.data);
}
// 有用
export const usefulComment = params =>{
	params= trans(params);
	return axios.post(`${base}/goodsAction/usefulComment`,params).then(res=>res.data);
}
// 回复
export const replyComment = params=>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/replyComment`,params).then(res=>res.data);
}
// 收藏、取消收藏
export const collectionGoods = params=>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/collection`,params).then(res=>res.data);
}
// 关注店铺
export const addFollow= params=>{
	params =trans(params);
	return axios.post(`${base}/shopAction/addFollow`,params).then(res=>res.data);
}
// 取消关注
export const cancelFollow= params=>{
	params =trans(params);
	return axios.post(`${base}/shopAction/cancelFollow`,params).then(res=>res.data);
}


// 店铺详情
export const getSellerInfo =  params => {
	params = trans(params);
	return axios.get(`${base}/sellerAction/getSellerInfo?${params}`).then(res=>res.data); 
}

// 订单相关
// 确认订单
export const generate = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/generate`,params).then(res=>res.data);
}
// 订单详情
export const getOrderDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getOrderDetail`,params).then(res=>res.data);
}
//  取消订单
export const cancelOrder = params =>{
	params = trans(params);
	return  axios.post(`${base}/orderAction/cancelOrder`,params).then(res=>res.data);
}
// 支付
export const pay = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/pay`,params).then(res=>res.data);
}
// 催一催(提醒发货)
export const orderRemind = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/orderRemind`,params).then(res=>res.data); 
}
// 获取物流信息
export const express = params =>{
	params =  trans(params);
	return axios.post(`${base}/orderAction/express`,params).then(res=>res.data);
}
// 确认收货
export const  delivery = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/delivery`,params).then(res=>res.data);
}
// 删除订单
export const delOrder = params => {
	params = trans(params);
	return axios.post(`${base}/orderAction/delOrder`,params).then(res=>res.data);
}


// 售后
// 评论
export const commentGoods =params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/commentGoods`,params).then(res=>res.data);
}
// 获取订单评论
export const getCommnets = params =>{
	params =  trans(params) ;
	return axios.post(`${base}/orderAction/getCommnets`,params).then(res=>res.data);
}
// 追加评论
export const addComment = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/addComment`,params).then(res=>res.data);
}