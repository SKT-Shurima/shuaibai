// 数字超过9显示省略号
export const num_filter = val =>{
	val = val - 0 ;
     if (val > 9 ) {
     	return "···"
     }
}

// 前置货币符号
export const currency = val =>{
	return '￥' + val;
}