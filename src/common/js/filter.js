// 数字超过9显示省略号
export const num_filter = val =>{
	val = val - 0 ;
     if (val > 9 ) {
     	return "9+"
     }else{
      return val;
     }
}

// 前置货币符号
export const currency = val =>{
	return '￥' + val;
}

//日期格式转换
export const dateStyle  = time =>{
    time-=0;
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    function trans (val){
      		if (val < 10) {
      			val = "0" + val ;
      		}
      		return val ;
      };
       return y +'-' + m + "-" + d ;
}
//时间日期格式转换
export const timeStyle  = time =>{
    time -= 0;
    var newDate = new Date(time);
    let {h,m,s}={h:newDate.getHours(),m:newDate.getMinutes(),s:newDate.getSeconds()};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    function trans (val){
      		if (val < 10) {
      			val = "0" + val ;
      		}
      		return val ;
      };
       return h +':' + m + ":" + s ;
}

// 日期格式转成中文
export const dateStyleCh  = time =>{
    time -= 0;
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    function trans (val){
          if (val < 10) {
            val = "0" + val ;
          }
          return val ;
      };
       return `${y}年${m}月${d}号` ;
}

// 带点日期格式
export const dateStylePoint  = time =>{
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    function trans (val){
          if (val < 10) {
            val = "0" + val ;
          }
          return val ;
      };
       return `${y}.${m}.${d}` ;
}


// 时间格式转换成中文
export const timeStyleCh  = time =>{
    time -= 0;
    let {d,h,m,s}={d:parseInt(time/(24*3600)),h:parseInt(time/3600%24),m:parseInt(time/60%60),s:parseInt(time%60)};
    if (d===0) {
      d="";
    }else{
      d+="天";
    }
    h = trans(h);
    m = trans(m);
    s = trans(s);
    function trans (val){
          if (val < 10) {
            val = "0" + val ;
          }
          return val ;
      };
       return d + h +'小时' + m + "分" + s + "秒" ;
}